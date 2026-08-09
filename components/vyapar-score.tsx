'use client';

import { useVyaparScore, useLevel, useBadge } from '@/hooks/use-vyapar-score';
import { GlowProgress } from '@/components/ui/glow-progress';
import { motion } from 'framer-motion';

export function VyaparScore({ size = 120 }: { size?: number }) {
  const score = useVyaparScore((s) => s.score);
  const level = useLevel();
  const badge = useBadge();

  const currentLevelBase = (level - 1) * 100;
  const progressInLevel = score - currentLevelBase;
  const progressPercent = Math.min((progressInLevel / 100) * 100, 100);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="relative">
        <GlowProgress progress={progressPercent} size={size}>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-gray-900">{level}</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Level</span>
          </div>
        </GlowProgress>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-bold text-lg text-gray-900">{badge}</h3>
        <p className="text-sm text-gray-500">{score} Activity Points</p>
      </div>
    </motion.div>
  );
}
