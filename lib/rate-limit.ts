import { supabaseAdmin } from '@/lib/supabase-admin';

// Simple in-memory sliding window rate limiter
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(
  userId: string,
  maxRequests: number = 50,
  windowMinutes: number = 60
): Promise<boolean> {
  if (!userId || userId === '00000000-0000-0000-0000-000000000000') {
    return true;
  }

  const now = Date.now();

  const entry = requestCounts.get(userId);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(userId, { count: 1, resetAt: now + windowMinutes * 60 * 1000 });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}
