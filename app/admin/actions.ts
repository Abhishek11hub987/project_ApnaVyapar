'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateSlug } from '@/lib/ai/prompts';

export async function deleteBusinessIdea(ideaId: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options })); } catch (error) {} }
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') {
      throw new Error('Forbidden: Admin access required');
    }

    const { error } = await supabaseAdmin
      .from('business_ideas')
      .delete()
      .eq('id', ideaId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/admin/ideas');
    revalidatePath('/ideas');
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete idea:', error);
    return { success: false, error: error.message };
  }
}

export async function createBusinessIdea(ideaData: any) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set({ name, value, ...options })); } catch (error) {} }
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Unauthorized');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') throw new Error('Forbidden: Admin access required');

    const slug = generateSlug(ideaData.title, 'business');

    const { error } = await supabaseAdmin
      .from('business_ideas')
      .insert({
        ...ideaData,
        slug,
      });

    if (error) throw new Error(error.message);

    revalidatePath('/admin/ideas');
    revalidatePath('/ideas');
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create idea:', error);
    return { success: false, error: error.message };
  }
}
