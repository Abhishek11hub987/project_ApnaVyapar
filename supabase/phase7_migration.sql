-- Migration: Add checkout fields to store_settings and orders

ALTER TABLE store_settings
ADD COLUMN IF NOT EXISTS payment_instructions TEXT;

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS shipping_address TEXT;
