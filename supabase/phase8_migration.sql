-- Phase 8: Community Ideas table for user contributions
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_ideas (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Services',
  investment_min INTEGER DEFAULT 0,
  investment_max INTEGER DEFAULT 0,
  location_type TEXT DEFAULT 'hybrid',
  monthly_profit_min INTEGER,
  monthly_profit_max INTEGER,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  required_skills TEXT[] DEFAULT '{}',
  image_url TEXT,
  slug TEXT UNIQUE,
  is_approved BOOLEAN DEFAULT true,
  ai_generated BOOLEAN DEFAULT false,
  contributor_name TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE community_ideas ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read approved community ideas
CREATE POLICY "Anyone can view approved community ideas"
  ON community_ideas FOR SELECT
  USING (is_approved = true);

-- Allow authenticated users to insert their own ideas
CREATE POLICY "Authenticated users can insert community ideas"
  ON community_ideas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own ideas
CREATE POLICY "Users can update their own community ideas"
  ON community_ideas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_community_ideas_category ON community_ideas(category);
CREATE INDEX IF NOT EXISTS idx_community_ideas_created ON community_ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_ideas_approved ON community_ideas(is_approved);
