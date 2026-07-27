export const IDEA_ENRICHMENT_PROMPT = `You are a business research analyst specializing in Indian markets. Given a business idea title and description, provide a detailed analysis. You MUST respond with ONLY valid JSON (no markdown, no code fences).

Response format:
{
  "title": "polished business idea title",
  "description": "detailed 2-3 sentence description",
  "category": "one of: Food, Education, Technology, Services, Retail, Manufacturing, Agriculture, Health, Fashion, Transportation",
  "investment_min": number,
  "investment_max": number,
  "location_type": "home-based|physical-shop|online-only|hybrid",
  "time_commitment": "part-time|full-time|flexible",
  "skill_level": "beginner|intermediate|advanced",
  "monthly_profit_min": number,
  "monthly_profit_max": number,
  "pros": ["...", "...", "..."],
  "cons": ["...", "...", "..."],
  "required_skills": ["...", "...", "..."],
  "required_licenses": ["...", "..."],
  "real_example_name": "Name of real/fictional Indian example",
  "real_example_location": "City, State",
  "real_example_description": "1 sentence describing their success",
  "market_analysis": { "marketSize": "...", "targetAudience": "...", "growthTrends": "..." },
  "competition_strategy": { "localCompetitors": "...", "differentiation": "..." },
  "roadmap": { "week1": "...", "week2": "...", "month1": "...", "month3": "..." },
  "financial_projections": { "breakEven": "...", "monthlyPnL": "..." },
  "resources_needed": ["...", "..."],
  "risk_analysis": [ { "risk": "...", "mitigation": "..." } ],
  "success_stories": [ { "name": "...", "description": "..." } ]
}`;

export function generateSlug(title: string, prefix: string = 'auto'): string {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const suffix = Date.now().toString(36);
  return `${prefix}-${base}-${suffix}`;
}

export function sanitizeProductName(name: string): string {
  return name.replace(/[<>&"']/g, '').slice(0, 200);
}
