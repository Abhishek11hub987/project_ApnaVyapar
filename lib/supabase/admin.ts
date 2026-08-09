import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a client only if keys are present, otherwise create a dummy client 
// that will throw an error when used, rather than crashing the entire app on import.
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : (new Proxy({}, {
      get: () => {
        throw new Error('Missing Supabase Service Role Key. Please add SUPABASE_SERVICE_ROLE_KEY to your environment variables.');
      }
    }) as any);
