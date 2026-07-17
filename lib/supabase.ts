import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Anon Key. Check your .env.local file.');
}

// Client-side Supabase client that syncs auth with cookies for SSR
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

// Admin client removed. Import from lib/supabase-admin.ts instead.