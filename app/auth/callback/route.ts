import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && sessionData.user) {
      // TRACK SIGNUP ANALYTICS
      try {
        const { supabaseAdmin } = await import('@/lib/supabase-admin');
        const user = sessionData.user;
        const email = user.email;
        const provider = user.app_metadata?.provider || 'email';
        const fullName = user.user_metadata?.full_name || '';
        const firstName = fullName ? fullName.split(' ')[0] : '';
        
        // Check if user is already in signup_analytics
        const { data: existing } = await supabaseAdmin
          .from('signup_analytics')
          .select('id')
          .eq('user_id', user.id)
          .single();
          
        if (!existing) {
          await supabaseAdmin.from('signup_analytics').insert({
            user_id: user.id,
            email: email,
            provider: provider,
            first_name: firstName,
            is_first_time: true
          });
          
          // Append welcome param
          return NextResponse.redirect(new URL(`${next}${next.includes('?') ? '&' : '?'}welcome=true`, request.url))
        }
      } catch (err) {
        console.error('Analytics tracking error:', err);
      }

      return NextResponse.redirect(new URL(next, request.url))
    } else {
      console.error('Code exchange error:', error?.message)
      return NextResponse.redirect(new URL(`/?login=true&error=${encodeURIComponent(error?.message || 'Unknown error')}`, request.url))
    }
  }

  // If no code, serve a page that handles hash-based tokens (implicit flow)
  // This happens with Google OAuth where the token comes as #access_token=...
  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Logging in...</title></head>
      <body>
        <p>Completing login...</p>
        <script>
          // Hash fragments aren't sent to the server, so handle client-side
          const hash = window.location.hash;
          if (hash && (hash.includes('access_token') || hash.includes('error_description'))) {
            // The createBrowserClient in lib/supabase.ts will pick up the hash
            window.location.href = '/' + hash;
          } else {
            window.location.href = '/?login=true';
          }
        </script>
      </body>
    </html>
  `;
  
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
