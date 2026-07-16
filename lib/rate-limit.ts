import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Checks if a user has exceeded their rate limit for chat sessions.
 * @param userId - The ID of the user.
 * @param maxRequests - Maximum allowed requests in the time window (default 50).
 * @param windowMinutes - The time window in minutes (default 60).
 * @returns Promise<boolean> - true if allowed, false if limit exceeded.
 */
export async function checkRateLimit(
  userId: string,
  maxRequests: number = 50,
  windowMinutes: number = 60
): Promise<boolean> {
  if (!userId || userId === '00000000-0000-0000-0000-000000000000') {
    return true; // Bypass or handle differently for unauthenticated if needed
  }

  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  const { count, error } = await supabaseAdmin
    .from('chat_sessions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', windowStart);

  if (error) {
    console.error('Rate limit check error:', error);
    // Fail closed or open? Let's fail open to not block users on DB error, or closed for strict security.
    // Assuming open is safer for UX unless strict.
    return true;
  }

  return (count || 0) < maxRequests;
}
