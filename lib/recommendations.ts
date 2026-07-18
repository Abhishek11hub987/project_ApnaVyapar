import { BusinessIdea } from '@/types/database';

export function getRecommendedIdeas(ideas: BusinessIdea[], user: any): BusinessIdea[] {
  if (!user || !ideas || ideas.length === 0) return [];
  
  const userInterests = user.business_interest 
    ? user.business_interest.split(',').map((i: string) => i.trim().toLowerCase()) 
    : [];
  
  const budgetRanges: Record<string, { min: number, max: number }> = {
    'under-10k': { min: 0, max: 10000 },
    '10k-50k': { min: 10000, max: 50000 },
    '50k-2l': { min: 50000, max: 200000 },
    '2l-10l': { min: 200000, max: 1000000 },
    'above-10l': { min: 1000000, max: 99999999 },
  };

  const userBudgetRange = user.investment_budget ? budgetRanges[user.investment_budget] : null;

  // We score each idea based on how well it matches the user's profile
  const scoredIdeas = ideas.map(idea => {
    let score = 0;
    
    // 1. Category match (+10 points)
    if (userInterests.includes(idea.category.toLowerCase())) {
      score += 10;
    }
    
    // 2. Budget match (+5 points)
    if (userBudgetRange) {
      if (idea.investment_min <= userBudgetRange.max) {
        score += 5;
        
        // Bonus if it fits perfectly within their exact target range (+3 points)
        if (idea.investment_min >= userBudgetRange.min) {
          score += 3;
        }
      }
    }
    
    return { idea, score };
  });

  // Sort by score descending
  scoredIdeas.sort((a, b) => b.score - a.score);

  // Return the top 4 ideas
  return scoredIdeas.slice(0, 4).map(s => s.idea);
}
