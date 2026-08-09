'use client';
import { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import type { BusinessIdea } from '@/types/idea';
import { X, Heart, Info, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useVyaparScore } from '@/hooks/use-vyapar-score';

export const CATEGORY_GRADIENTS: Record<string, string> = {
  'Food': 'from-orange-200 to-red-200',
  'Education': 'from-blue-200 to-indigo-200',
  'Technology': 'from-cyan-200 to-blue-200',
  'Services': 'from-teal-200 to-emerald-200',
  'Retail': 'from-purple-200 to-pink-200',
  'Manufacturing': 'from-gray-200 to-zinc-200',
  'Agriculture': 'from-green-200 to-lime-200',
  'Health': 'from-rose-200 to-pink-200',
  'Fashion': 'from-fuchsia-200 to-purple-200',
  'Transportation': 'from-amber-200 to-yellow-200',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';

function ConfettiBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-50">
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: Math.random() * 1.5 + 0.5, 
              x: tx, 
              y: ty 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-3 h-3 rounded-sm"
            style={{ 
              backgroundColor: ['#ffeb3b', '#f44336', '#4caf50', '#2196f3', '#9c27b0'][Math.floor(Math.random() * 5)]
            }}
          />
        );
      })}
    </div>
  );
}

export default function IdeaRoulette({ ideas }: { ideas: BusinessIdea[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const addPoints = useVyaparScore((s) => s.addPoints);
  
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const skipOpacity = useTransform(x, [0, -100], [0, 1]);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleSwipe('right');
      if (e.key === 'ArrowLeft') handleSwipe('left');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe('right');
    } else if (info.offset.x < -100) {
      handleSwipe('left');
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  const handleSwipe = async (dir: 'left' | 'right') => {
    if (currentIndex >= ideas.length) return;
    const sign = dir === 'right' ? 1 : -1;
    await controls.start({ x: sign * 500, opacity: 0, transition: { duration: 0.3 } });
    
    if (dir === 'right') {
      addPoints(10); // +10 for save
      setShowToast(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowToast(false);
      }, 1500);
    } else {
      addPoints(5); // +5 for skip/swipe
    }
    
    setCurrentIndex((prev) => prev + 1);
    x.set(0);
    controls.set({ x: 0, opacity: 1 });
  };

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
         <p className="text-gray-500">Loading ideas...</p>
      </div>
    );
  }

  if (currentIndex >= ideas.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <RotateCcw className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You've seen them all!</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Come back later for more freshly curated business ideas.</p>
        <button 
          onClick={() => setCurrentIndex(0)}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          Start Over
        </button>
      </div>
    );
  }

  const idea = ideas[currentIndex];
  
  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const imgSrc = idea.image_url || DEFAULT_IMAGE;

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] flex items-center justify-center perspective-1000 pb-20 pt-10">
      {showConfetti && <ConfettiBurst />}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-0 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg font-medium tracking-wide flex items-center gap-2"
        >
          <Heart size={18} className="fill-current text-green-400" /> Idea Saved!
        </motion.div>
      )}
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        animate={controls}
        onDragEnd={handleDragEnd}
        className="absolute w-full h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col cursor-grab active:cursor-grabbing will-change-transform z-10"
      >
        <div className="relative h-1/2 w-full bg-gray-100 shrink-0">
          {!imageError && imgSrc ? (
            <img 
              src={imgSrc} 
              alt={idea.title} 
              className="w-full h-full object-cover pointer-events-none" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_GRADIENTS[idea.category] || 'from-gray-200 to-gray-300'}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 pointer-events-none" />
          
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 right-8 border-4 border-green-500 text-green-500 font-bold text-4xl rounded-lg px-4 py-2 rotate-12 pointer-events-none uppercase tracking-widest bg-white/20 backdrop-blur-sm shadow-xl">
            LIKE
          </motion.div>
          <motion.div style={{ opacity: skipOpacity }} className="absolute top-8 left-8 border-4 border-red-500 text-red-500 font-bold text-4xl rounded-lg px-4 py-2 -rotate-12 pointer-events-none uppercase tracking-widest bg-white/20 backdrop-blur-sm shadow-xl">
            SKIP
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2 shadow-sm border border-white/10">
              {idea.category}
            </span>
            <h2 className="text-2xl font-bold leading-tight text-balance shadow-black/50 drop-shadow-md">{idea.title}</h2>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 relative bg-white">
          <p className="text-gray-600 text-sm mb-6 line-clamp-3">
            {idea.description}
          </p>

          <div className="mt-auto space-y-3 text-sm">
            <div className="bg-gray-50 p-3.5 rounded-xl flex items-center justify-between border border-gray-100">
              <span className="text-gray-500 font-medium">Investment</span>
              <span className="font-bold text-gray-900">{formatINR(idea.investment_min)}</span>
            </div>
            <div className="bg-green-50 p-3.5 rounded-xl flex items-center justify-between border border-green-100">
              <span className="text-green-700 font-medium">Est. Profit</span>
              <span className="font-bold text-green-700">
                {idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}/mo` : 'Varies'}
              </span>
            </div>
          </div>
          
          <Link href={`/ideas/${idea.slug}`} className="mt-4 w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center gap-2 text-gray-700 font-medium text-sm py-2.5 rounded-lg transition-colors">
            <Info size={16} /> View Full Details
          </Link>
        </div>
      </motion.div>
      
      {/* Background card to show what's next (stack effect) */}
      {currentIndex + 1 < ideas.length && (
        <div className="absolute w-full h-[500px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden scale-[0.95] translate-y-4 z-0 opacity-50">
           <div className="h-1/2 w-full bg-gray-200"></div>
        </div>
      )}
      
      {/* Controls */}
      <div className="absolute -bottom-4 left-0 right-0 flex items-center justify-center gap-6">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/20 active:scale-95"
        >
          <X size={32} strokeWidth={2.5} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-green-500 hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-500/20 active:scale-95"
        >
          <Heart size={32} strokeWidth={2.5} className="fill-current" />
        </button>
      </div>
    </div>
  );
}
