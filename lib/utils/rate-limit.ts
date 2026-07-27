import { supabaseAdmin } from '@/lib/supabase/admin';

const MAX_REQUESTS = 50;
const WINDOW_MINUTES = 60;

export async function checkRateLimit(
  userId: string,
  maxRequests: number = MAX_REQUESTS,
  windowMinutes: number = WINDOW_MINUTES
): Promise<boolean> {
  if (!userId || userId === '00000000-0000-0000-0000-000000000000') {
    return true;
  }

  const now = new Date();

  try {
    const { data, error } = await supabaseAdmin
      .from('rate_limits')
      .select('count, reset_at')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Rate limit check error:', error);
      return true;
    }

    // No existing entry or window expired
    if (!data || new Date(data.reset_at) < now) {
      await supabaseAdmin.from('rate_limits').upsert(
        {
          user_id: userId,
          count: 1,
          reset_at: new Date(now.getTime() + windowMinutes * 60 * 1000),
          updated_at: now,
        },
        { onConflict: 'user_id' }
      );
      return true;
    }

    if (data.count >= maxRequests) {
      return false;
    }

    await supabaseAdmin
      .from('rate_limits')
      .update({
        count: data.count + 1,
        updated_at: now,
      })
      .eq('user_id', userId);

    return true;
  } catch (error) {
    console.error('Rate limit exception:', error);
    return true;
  }
}
