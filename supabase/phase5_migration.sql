-- Phase 5 Migration: Add Image URLs and Store Details

-- 1. Add image_url to products
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Add extra details to store_settings
ALTER TABLE public.store_settings
ADD COLUMN IF NOT EXISTS support_email TEXT,
ADD COLUMN IF NOT EXISTS support_phone TEXT,
ADD COLUMN IF NOT EXISTS hero_text TEXT;

-- 3. Storage Policies for product-images bucket
-- Note: You MUST manually create the bucket 'product-images' and set it to 'Public' in the Supabase Dashboard first!

-- Allow authenticated users to upload files to product-images
CREATE POLICY "Allow authenticated uploads to product-images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Allow users to update their own images
CREATE POLICY "Allow users to update their own images" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'product-images' AND auth.uid() = owner);

-- Allow users to delete their own images
CREATE POLICY "Allow users to delete their own images" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'product-images' AND auth.uid() = owner);

-- Allow public read access to product-images (since it's a public storefront)
CREATE POLICY "Allow public read access to product-images" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'product-images');
