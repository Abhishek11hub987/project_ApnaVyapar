import type { BusinessIdea } from '@/types/idea';
import type { Profile } from '@/types/profile';

const BUDGET_RANGES: Record<string, { min: number; max: number }> = {
  'under-10k': { min: 0, max: 10000 },
  '10k-50k': { min: 10000, max: 50000 },
  '50k-2l': { min: 50000, max: 200000 },
  '2l-10l': { min: 200000, max: 1000000 },
  'above-10l': { min: 1000000, max: 99999999 },
};

export function getRecommendedIdeas(ideas: BusinessIdea[], user: Profile | null): BusinessIdea[] {
  if (!user || ideas.length === 0) return ideas.slice(0, 4);

  const userInterests = user.business_interest
    ? user.business_interest.split(',').map((i: string) => i.trim().toLowerCase())
    : [];

  const userBudgetRange = user.investment_budget ? BUDGET_RANGES[user.investment_budget] : null;

  const scoredIdeas = ideas.map(idea => {
    let score = 0;

    if (userInterests.includes(idea.category.toLowerCase())) {
      score += 10;
    }

    if (userBudgetRange) {
      if (idea.investment_min <= userBudgetRange.max) {
        score += 5;
        if (idea.investment_min >= userBudgetRange.min) {
          score += 3;
        }
      }
    }

    return { idea, score };
  });

  scoredIdeas.sort((a, b) => b.score - a.score);

  return scoredIdeas.slice(0, 4).map(s => s.idea);
}
