'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useVyaparScore } from '@/hooks/use-vyapar-score';
import { Check, X, Heart } from 'lucide-react';
import Link from 'next/link';

interface Idea {
  id: number;
  title: string;
  category: string;
  investment_min: number;
  image_url?: string;
  slug?: string;
}

function IdeaCard({
  idea,
  onSwipe,
  isTop,
}: {
  idea: Idea;
  onSwipe: (dir: 'left' | 'right') => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -120, 0, 120, 200], [0, 1, 1, 1, 0]);

  // Color overlays on drag
  const leftOpacity = useTransform(x, [-150, 0], [1, 0]);
  const rightOpacity = useTransform(x, [0, 150], [0, 1]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  // Check if image_url is an actual URL or just an emoji
  const isEmoji = idea.image_url && !idea.image_url.startsWith('http') && !idea.image_url.startsWith('/');
  
  const bgStyle = (idea.image_url && !isEmoji)
    ? { backgroundImage: `url(${idea.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  // Fallback gradient if no image or if it's an emoji
  const fallbackGradients = [
    'from-teal-900 to-slate-900',
    'from-amber-900 to-slate-900',
    'from-purple-900 to-slate-900',
    'from-blue-900 to-slate-900',
    'from-rose-900 to-slate-900',
  ];
  const gradClass = fallbackGradients[idea.id % fallbackGradients.length];

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.02 }}
    >
      {/* Card */}
      <div
        className={`w-full h-full rounded-[20px] overflow-hidden relative shadow-2xl border border-white/10 bg-slate-900 ${(!idea.image_url || isEmoji) ? `bg-gradient-to-br ${gradClass}` : ''}`}
        style={bgStyle}
      >
        {isEmoji && (
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <span style={{ fontSize: '8rem' }}>{idea.image_url}</span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Swipe LEFT overlay */}
        <motion.div
          className="absolute top-6 left-6 bg-red-500/90 text-white font-black text-lg px-4 py-2 rounded-xl border-4 border-red-400 rotate-[-15deg]"
          style={{ opacity: leftOpacity }}
        >
          NOPE
        </motion.div>

        {/* Swipe RIGHT overlay */}
        <motion.div
          className="absolute top-6 right-6 bg-teal-500/90 text-white font-black text-lg px-4 py-2 rounded-xl border-4 border-teal-400 rotate-[15deg]"
          style={{ opacity: rightOpacity }}
        >
          SAVE ♥
        </motion.div>

        {/* Info */}
        <div className="absolute bottom-0 w-full p-5 text-white">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/30 border border-teal-400/50 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
            {idea.category}
          </span>
          <h2 className="text-xl font-extrabold text-white mb-1 leading-tight">{idea.title}</h2>
          <p className="text-teal-200 text-sm font-semibold">
            Est. ₹{(idea.investment_min ?? 0).toLocaleString('en-IN')} to start
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function IdeaRoulette({ ideas }: { ideas: Idea[] }) {
  const [deck, setDeck] = useState<Idea[]>(ideas.slice(0, 5));
  const [lastAction, setLastAction] = useState<'left' | 'right' | null>(null);
  const { addPoints } = useVyaparScore();

  const handleSwipe = (dir: 'left' | 'right') => {
    setLastAction(dir);
    if (dir === 'right') addPoints(10);
    else addPoints(2);

    setTimeout(() => {
      setDeck((prev) => prev.slice(0, -1));
      setLastAction(null);
    }, 300);
  };

  if (deck.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-3 text-center px-4">
        <Heart size={40} className="text-teal-400" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">All caught up!</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">You've explored all ideas for now.</p>
        <Link href="/ideas" className="mt-2 text-sm text-teal-500 underline font-semibold">Browse all ideas →</Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Card Stack */}
      <div className="relative w-64 h-96">
        <AnimatePresence>
          {[...deck].reverse().map((idea, reverseIdx) => {
            const idx = deck.length - 1 - reverseIdx;
            const isTop = idx === deck.length - 1;
            const offset = reverseIdx;
            return (
              <motion.div
                key={idea.id}
                className="absolute inset-0"
                style={{
                  zIndex: idx,
                  scale: 1 - offset * 0.04,
                  y: offset * 8,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1 - offset * 0.04, y: offset * 8, opacity: 1 }}
                exit={{ x: lastAction === 'right' ? 400 : -400, opacity: 0, rotate: lastAction === 'right' ? 20 : -20, transition: { duration: 0.3 } }}
              >
                <IdeaCard idea={idea} onSwipe={handleSwipe} isTop={isTop} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex gap-8 mt-2">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full bg-slate-800/80 dark:bg-slate-800 border border-slate-600 flex items-center justify-center text-red-400 shadow-lg hover:scale-110 hover:border-red-500 transition-all"
          aria-label="Skip"
        >
          <X size={26} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full bg-teal-900/50 border border-teal-600 flex items-center justify-center text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] transition-all"
          aria-label="Save idea"
        >
          <Check size={26} />
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {deck.length} idea{deck.length !== 1 ? 's' : ''} left • Drag or use buttons
      </p>
    </div>
  );
}
