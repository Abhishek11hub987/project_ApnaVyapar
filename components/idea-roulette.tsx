'use client';

import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { motion } from 'framer-motion';
import { useVyaparScore } from '@/hooks/use-vyapar-score';
import { GlassCard } from '@/components/ui/glass-card';
import { Check, X } from 'lucide-react';

interface Idea {
  id: number;
  title: string;
  category: string;
  investment_min: number;
  image_url: string;
}

export function IdeaRoulette({ ideas }: { ideas: Idea[] }) {
  const [deck, setDeck] = useState<Idea[]>(ideas.slice(0, 5)); // Take first 5 for roulette
  const { addPoints } = useVyaparScore();

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    if (direction === 'right') {
      // Save idea logic would go here
      addPoints(10); // Reward for saving an idea
    } else {
      addPoints(2); // Small reward for exploring
    }
  };

  const outOfFrame = (title: string) => {
    console.log(title + ' left the screen!');
    setDeck(prev => prev.filter(idea => idea.title !== title));
  };

  if (deck.length === 0) {
    return (
      <GlassCard className="w-full max-w-sm mx-auto h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">You've seen them all!</h3>
          <p className="text-slate-500 mt-2">Check back later for more ideas.</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto h-[450px]">
      {deck.map((idea, index) => (
        <div key={idea.id} className="absolute inset-0">
          <TinderCard
            className="absolute w-full h-full cursor-grab active:cursor-grabbing"
            onSwipe={(dir) => swiped(dir, idea.title)}
            onCardLeftScreen={() => outOfFrame(idea.title)}
            preventSwipe={['up', 'down']}
          >
            <div 
              className="w-full h-full rounded-[20px] bg-white dark:bg-slate-800 shadow-glass-light dark:shadow-glass-dark border border-slate-200 dark:border-slate-700 overflow-hidden relative"
              style={{
                backgroundImage: `url(${idea.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              
              <div className="absolute bottom-0 w-full p-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                  {idea.category}
                </span>
                <h2 className="text-2xl font-bold text-white mb-1 shadow-sm">{idea.title}</h2>
                <p className="text-teal-200 font-medium">Est. ₹{idea.investment_min.toLocaleString('en-IN')} to start</p>
              </div>
            </div>
          </TinderCard>
        </div>
      ))}
      
      {/* Swipe Indicators */}
      <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-6 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-red-500 shadow-lg">
          <X size={24} />
        </div>
        <div className="w-12 h-12 rounded-full bg-teal-900/50 backdrop-blur-sm border border-teal-700 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          <Check size={24} />
        </div>
      </div>
    </div>
  );
}
