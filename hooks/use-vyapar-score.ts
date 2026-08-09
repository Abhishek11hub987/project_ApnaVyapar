import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Badge = 'Seed Stage' | 'Launch Ready' | 'Business Owner' | 'Serial Entrepreneur';

interface VyaparScoreState {
  score: number;
  addPoints: (points: number) => void;
}

function calculateLevel(score: number): number {
  return Math.floor(score / 100) + 1;
}

function calculateBadge(score: number): Badge {
  if (score >= 1000) return 'Serial Entrepreneur';
  if (score >= 500) return 'Business Owner';
  if (score >= 200) return 'Launch Ready';
  return 'Seed Stage';
}

export const useVyaparScore = create<VyaparScoreState>()(
  persist(
    (set) => ({
      score: 0,

      addPoints: (points) => set((state) => ({
        score: state.score + points,
      })),
    }),
    {
      name: 'vyapar-score-storage',
    }
  )
);

export function useLevel(): number {
  const score = useVyaparScore((s) => s.score);
  return calculateLevel(score);
}

export function useBadge(): Badge {
  const score = useVyaparScore((s) => s.score);
  return calculateBadge(score);
}
