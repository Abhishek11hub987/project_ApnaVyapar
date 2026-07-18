import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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
      // Return 403 Forbidden for UI routes as requested to block scrapers
      return new NextResponse('403 Forbidden - Admin Access Required', { status: 403 });
    }
  }

  const protectedRoutes = ['/chat', '/checklist', '/profile', '/saved', '/tasks']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/?login=true', request.url))
  }

  return response
}

export const config = {
  matcher: ['/', '/ideas/:path*', '/tasks/:path*', '/chat/:path*', '/checklist/:path*', '/profile/:path*', '/saved/:path*', '/admin/:path*', '/api/admin/:path*'],
}