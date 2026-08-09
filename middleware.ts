import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // IMPORTANT: Do not add logic between createServerClient and getUser()
    // that could interfere with session refresh. See Supabase docs.
    const { data: { user } } = await supabase.auth.getUser()

    // ── Admin routes: strictly server-side protected ─────────────────────
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isAdminApiRoute = request.nextUrl.pathname.startsWith('/api/admin')

    if (isAdminRoute || isAdminApiRoute) {
      if (!user) {
        if (isAdminApiRoute) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const redirectRes = NextResponse.redirect(new URL('/?login=true', request.url))
        supabaseResponse.cookies.getAll().forEach(c => redirectRes.cookies.set(c.name, c.value, c))
        return redirectRes
      }

      // Verify admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        if (isAdminApiRoute) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
        return new NextResponse(
          '<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif"><div style="text-align:center"><h1 style="font-size:72px;color:#ddd;margin:0">403</h1><p style="color:#666">Admin access required</p><a href="/" style="display:inline-block;margin-top:16px;padding:10px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Go Home</a></div></body></html>',
          { status: 403, headers: { 'Content-Type': 'text/html' } }
        )
      }
    }

    // ── All other protected routes: let client-side useAuth handle it ─────
    // We only refresh the session here (by calling getUser above) so cookies
    // stay fresh. The actual redirect logic for /dashboard, /chat, etc. is
    // handled client-side in app/(app)/layout.tsx via useAuth to avoid race
    // conditions between server cookies and client session hydration.

    return supabaseResponse
  } catch (error) {
    console.error('[middleware] error:', error)
    return NextResponse.next({ request })
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}