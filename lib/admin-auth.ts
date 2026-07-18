import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Wraps an API route handler to ensure only admins can access it.
 * It checks the session and the user's role from the profiles table.
 */
export function withAdminAuth(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.warn(`[SECURITY] Unauthorized API access attempt to ${request.url}`);
      return NextResponse.json({ error: 'Unauthorized', message: 'Authentication required' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      console.warn(`[SECURITY] Forbidden API access attempt to ${request.url} by user ${user.id}`);
      return NextResponse.json({ error: 'Forbidden', message: 'Admin access required' }, { status: 403 });
    }

    // User is an admin, proceed with the actual handler
    return handler(request, ...args, { user, profile });
  };
}
