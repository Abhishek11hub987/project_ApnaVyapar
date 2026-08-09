import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

  const { data: { user } } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAdminApiRoute = request.nextUrl.pathname.startsWith('/api/admin');

  if (isAdminRoute || isAdminApiRoute) {
    if (!user) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/?login=true', request.url));
    }
    
    // Check if user is admin
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') {
      console.warn(`[SECURITY] Blocked non-admin access attempt to ${request.nextUrl.pathname} by user ${user.id}`);
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Forbidden', message: 'Admin access required' }, { status: 403 });
      }
      return new NextResponse(
        '<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#fff;font-family:sans-serif"><div style="text-align:center"><h1 style="font-size:72px;color:#ddd;margin:0">403</h1><p style="color:#666;font-size:16px">Admin access required</p><a href="/" style="display:inline-block;margin-top:16px;padding:10px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px;font-size:14px">Go Home</a></div></body></html>',
        { status: 403, headers: { 'Content-Type': 'text/html' } }
      );
    }
  }

  const protectedPrefixes = ['/dashboard', '/chat', '/profile', '/onboarding', '/tasks'];
  const isProtectedRoute = protectedPrefixes.some(prefix => request.nextUrl.pathname.startsWith(prefix));

  if (isProtectedRoute && !user) {
    // Prevent redirect loop if already going to login
    if (request.nextUrl.searchParams.get('login') === 'true') {
      return supabaseResponse;
    }
    return NextResponse.redirect(new URL('/?login=true', request.url))
  }

  // Redirect to onboarding if profile incomplete (skip for onboarding itself)
  if (user && isProtectedRoute && !request.nextUrl.pathname.startsWith('/onboarding')) {
    const { data: profile } = await supabase.from('profiles').select('onboarding_completed').eq('id', user.id).single();
    if (profile && !profile.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

    return supabaseResponse
  } catch (error) {
    console.error('Middleware error:', error);
    // Don't redirect to login on random errors to prevent infinite loops, just return the response
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}