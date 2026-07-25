-- Add missing detail columns to community_ideas to match business_ideas
ALTER TABLE community_ideas
  ADD COLUMN IF NOT EXISTS time_commitment TEXT CHECK (time_commitment IN ('part-time', 'full-time', 'flexible')),
  ADD COLUMN IF NOT EXISTS skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
  ADD COLUMN IF NOT EXISTS required_licenses TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS real_example_name TEXT,
  ADD COLUMN IF NOT EXISTS real_example_location TEXT,
  ADD COLUMN IF NOT EXISTS real_example_description TEXT,
  ADD COLUMN IF NOT EXISTS market_analysis JSONB,
  ADD COLUMN IF NOT EXISTS competition_strategy JSONB,
  ADD COLUMN IF NOT EXISTS roadmap JSONB,
  ADD COLUMN IF NOT EXISTS financial_projections JSONB,
  ADD COLUMN IF NOT EXISTS resources_needed TEXT[],
  ADD COLUMN IF NOT EXISTS risk_analysis JSONB,
  ADD COLUMN IF NOT EXISTS success_stories JSONB;
