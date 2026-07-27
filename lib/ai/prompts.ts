export const VYAPAR_MITRA_SYSTEM_PROMPT = `You are Vyapar Mitra, an expert Indian business advisor...`;

export const IDEA_ENRICHMENT_PROMPT = `You are an AI business analyst specializing in the Indian market. Given a business idea, enrich it with comprehensive structured data.

Return ONLY a valid JSON object with these fields:
- title: string (catchy business name)
- description: string (300-500 chars detailing the business)
- category: "Food" | "Education" | "Technology" | "Services" | "Retail" | "Manufacturing" | "Agriculture" | "Health" | "Fashion" | "Transportation"
- subcategory: string | null
- investment_min: number (minimum INR required)
- investment_max: number (maximum INR required)
- location_type: "home-based" | "physical-shop" | "online-only" | "hybrid"
- time_commitment: "part-time" | "full-time" | "flexible"
- skill_level: "beginner" | "intermediate" | "advanced"
- monthly_profit_min: number | null
- monthly_profit_max: number | null
- pros: string[] (3-5 advantages)
- cons: string[] (3-5 challenges)
- required_licenses: string[] (licenses needed in India)
- required_skills: string[] (skills needed)
- real_example_name: string | null
- real_example_location: string | null
- real_example_description: string | null
- market_size_note: string | null
- competition_level: "low" | "medium" | "high" | null
- market_analysis: { marketSize?: string, targetAudience?: string, growthPotential?: string, competitiveLandscape?: string } | null
- competition_strategy: { differentiation?: string, pricingStrategy?: string, marketingApproach?: string } | null
- roadmap: { phase1?: string, phase2?: string, phase3?: string, timeline?: string } | null
- financial_projections: { initialInvestment?: string, monthlyRevenue?: string, profitMargin?: string, breakEven?: string } | null
- resources_needed: string[]
- risk_analysis: { keyRisks?: string[], mitigationStrategies?: string[] } | null
- success_stories: { name?: string, location?: string, story?: string }[] | null`;

export function generateSlug(title: string, prefix: string = 'idea'): string {
  return `${prefix}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 60)}-${Date.now().toString(36)}`;
}

export function sanitizeProductName(name: string): string {
  return name.replace(/<[^>]*>/g, '').replace(/[<>;"']/g, '').substring(0, 200);
}
