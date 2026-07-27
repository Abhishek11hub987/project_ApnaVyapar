import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
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

  const protectedRoutes = ['/chat', '/checklist', '/profile', '/saved', '/tasks', '/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/?login=true', request.url))
  }

  // Redirect to onboarding if profile incomplete (skip for onboarding itself)
  if (user && isProtectedRoute && !request.nextUrl.pathname.startsWith('/onboarding')) {
    const { data: profile } = await supabase.from('profiles').select('onboarding_completed').eq('id', user.id).single();
    if (profile && !profile.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

    return response
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/?login=true', request.url));
  }
}

export const config = {
  matcher: ['/', '/ideas/:path*', '/tasks/:path*', '/chat/:path*', '/checklist/:path*', '/profile/:path*', '/saved/:path*', '/admin/:path*', '/api/admin/:path*', '/dashboard/:path*'],
}