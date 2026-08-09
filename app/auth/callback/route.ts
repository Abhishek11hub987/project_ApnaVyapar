import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  // Validate next to prevent open redirect
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard'

  if (code) {
    const cookieStore = cookies()

    // Collect cookies set during session exchange so we can forward them on the redirect
    const newCookies: Array<{ name: string; value: string; options: Record<string, any> }> = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            // Collect the cookies to attach to redirect later
            cookiesToSet.forEach(({ name, value, options }) => {
              newCookies.push({ name, value, options: options ?? {} })
              try {
                cookieStore.set({ name, value, ...options })
              } catch {
                // Ignore in Route Handler context
              }
            })
          },
        },
      }
    )

    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && sessionData.user) {
      // Determine redirect target
      let redirectUrl = safeNext

      try {
        const { supabaseAdmin } = await import('@/lib/supabase/admin')
        const user = sessionData.user
        const email = user.email
        const provider = user.app_metadata?.provider || 'email'
        const fullName = user.user_metadata?.full_name || ''
        const firstName = fullName ? fullName.split(' ')[0] : ''

        // Check and create profile if missing
        const { data: existingProfile } = await supabaseAdmin
          .from('profiles')
          .select('id, onboarding_completed')
          .eq('id', user.id)
          .maybeSingle()

        if (!existingProfile) {
          await supabaseAdmin.from('profiles').insert({
            id: user.id,
            email: email,
            full_name: fullName || '',
            onboarding_completed: false
          })
        }

        // Track first-time signups
        const { data: existingAnalytics } = await supabaseAdmin
          .from('signup_analytics')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle()

        if (!existingAnalytics) {
          await supabaseAdmin.from('signup_analytics').insert({
            user_id: user.id,
            email: email,
            provider: provider,
            first_name: firstName,
            is_first_time: true
          })

          const welcomeMessage = {
            role: 'assistant',
            content: `Welcome to Apna Vyapar${firstName ? `, ${firstName}` : ''}! I am Vyapar Mitra, your AI business assistant. Whether you're looking for the right business idea, trying to understand legal registrations, or need a step-by-step launch plan, I'm here to help.\n\nWhat kind of business are you interested in starting today?`
          }

          const { data: newChatSession } = await supabaseAdmin.from('chat_sessions').insert({
            user_id: user.id,
            title: 'Welcome to Apna Vyapar!',
            messages: [welcomeMessage],
            message_count: 1
          }).select('id').maybeSingle()

          if (newChatSession) {
            redirectUrl = `/chat?session=${newChatSession.id}&welcome=true`
          }
        } else {
          // Returning user — send to dashboard
          redirectUrl = existingProfile?.onboarding_completed === false ? '/onboarding' : '/dashboard'
        }
      } catch (err) {
        console.error('[callback] Analytics/profile error:', err)
        // Don't block login for analytics errors — just go to dashboard
        redirectUrl = '/dashboard'
      }

      // Build the redirect response and ATTACH session cookies to it
      const response = NextResponse.redirect(new URL(redirectUrl, request.url))
      newCookies.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })
      return response

    } else {
      console.error('[callback] Code exchange error:', error?.message)
      return NextResponse.redirect(
        new URL(`/?login=true&error=${encodeURIComponent(error?.message || 'Authentication failed')}`, request.url)
      )
    }
  }

  // No code — handle implicit grant (Magic Link via hash fragment)
  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Logging in...</title></head>
      <body>
        <script>
          (function() {
            var hash = window.location.hash.replace('#', '');
            if (hash) {
              var params = new URLSearchParams(hash);
              if (params.get('access_token')) {
                // Let Supabase client-side SDK handle the hash tokens on the homepage
                window.location.href = '/?login=true&redirect=/dashboard#' + hash;
              } else if (params.get('error_description')) {
                window.location.href = '/?login=true&error=' + encodeURIComponent(params.get('error_description'));
              } else {
                window.location.href = '/?login=true';
              }
            } else {
              window.location.href = '/?login=true';
            }
          })();
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
