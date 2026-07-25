-- Migration: Add logo and policies to store_settings

ALTER TABLE store_settings
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS privacy_policy TEXT,
ADD COLUMN IF NOT EXISTS terms_conditions TEXT;
