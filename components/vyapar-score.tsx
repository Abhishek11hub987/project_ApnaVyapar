'use client';

import { useVyaparScore } from '@/hooks/use-vyapar-score';
import { GlowProgress } from '@/components/ui/glow-progress';
import { motion } from 'framer-motion';

export function VyaparScore({ size = 120 }: { size?: number }) {
  const { score, level, badge } = useVyaparScore();
  
  // Calculate progress to next level (each level is 100 points)
  const currentLevelBase = (level - 1) * 100;
  const nextLevelBase = level * 100;
  const progressInLevel = score - currentLevelBase;
  const progressPercent = (progressInLevel / 100) * 100;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="relative">
        <GlowProgress progress={progressPercent} size={size} color="teal">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold neon-text-teal text-teal-400">{level}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Level</span>
          </div>
        </GlowProgress>
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500/20 shadow-neon-amber flex items-center justify-center animate-pulse">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{badge}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{score} Total XP</p>
      </div>
    </motion.div>
  );
}
