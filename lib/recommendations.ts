import { BusinessIdea } from '@/types/database';

export function getRecommendedIdeas(ideas: BusinessIdea[], user: any): BusinessIdea[] {
  if (!user || !ideas || ideas.length === 0) return [];
  
  const userInterests = user.business_interest 
    ? user.business_interest.split(',').map((i: string) => i.trim().toLowerCase()) 
    : [];
  
  const userBudget = user.investment_budget || 0;

  // We score each idea based on how well it matches the user's profile
  const scoredIdeas = ideas.map(idea => {
    let score = 0;
    
    // 1. Category match (+10 points)
    if (userInterests.includes(idea.category.toLowerCase())) {
      score += 10;
    }
    
    // 2. Budget match (+5 points)
    // If the idea's min investment is less than or equal to user's budget (and user has a budget)
    if (userBudget > 0 && idea.investment_min <= userBudget) {
      score += 5;
      
      // Bonus if it's very close to their budget (+3 points)
      if (idea.investment_min >= userBudget * 0.5) {
        score += 3;
      }
    }
    
    return { idea, score };
  });

  // Sort by score descending
  scoredIdeas.sort((a, b) => b.score - a.score);

  // Return the top 4 ideas
  return scoredIdeas.slice(0, 4).map(s => s.idea);
}
