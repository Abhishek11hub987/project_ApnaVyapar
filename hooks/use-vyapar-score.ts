import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Badge = 'Seed Stage' | 'Launch Ready' | 'Business Owner' | 'Serial Entrepreneur';

interface VyaparScoreState {
  score: number;
  level: number;
  badge: Badge;
  addPoints: (points: number) => void;
  calculateBadge: (score: number) => Badge;
  calculateLevel: (score: number) => number;
}

export const useVyaparScore = create<VyaparScoreState>()(
  persist(
    (set, get) => ({
      score: 0,
      level: 1,
      badge: 'Seed Stage',
      calculateLevel: (score) => Math.floor(score / 100) + 1,
      calculateBadge: (score) => {
        if (score >= 1000) return 'Serial Entrepreneur';
        if (score >= 500) return 'Business Owner';
        if (score >= 200) return 'Launch Ready';
        return 'Seed Stage';
      },
      addPoints: (points) => set((state) => {
        const newScore = state.score + points;
        return {
          score: newScore,
          level: get().calculateLevel(newScore),
          badge: get().calculateBadge(newScore),
        };
      }),
    }),
    {
      name: 'vyapar-score-storage',
    }
  )
);
