import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  // Validate next to prevent open redirect
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/'

  if (code) {
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set({ name, value, ...options })
            })
          },
        },
      }
    )

    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && sessionData.user) {
      try {
        const { supabaseAdmin } = await import('@/lib/supabase/admin');
        const user = sessionData.user;
        const email = user.email;
        const provider = user.app_metadata?.provider || 'email';
        const fullName = user.user_metadata?.full_name || '';
        const firstName = fullName ? fullName.split(' ')[0] : '';

        const { data: existing } = await supabaseAdmin
          .from('signup_analytics')
          .select('id')
          .eq('user_id', user.id)
          .single();

        // Check and create profile if missing
        const { data: existingProfile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (!existingProfile) {
          await supabaseAdmin.from('profiles').insert({
            id: user.id,
            email: email,
            full_name: fullName || '',
            onboarding_completed: false
          });
        }

        if (!existing) {
          await supabaseAdmin.from('signup_analytics').insert({
            user_id: user.id,
            email: email,
            provider: provider,
            first_name: firstName,
            is_first_time: true
          });

          const welcomeMessage = {
            role: 'assistant',
            content: `Welcome to Apna Vyapar${firstName ? `, ${firstName}` : ''}! I am Vyapar Mitra, your AI business assistant. Whether you're looking for the right business idea, trying to understand legal registrations, or need a step-by-step launch plan, I'm here to help.\n\nWhat kind of business are you interested in starting today?`
          };

          const { data: newSession } = await supabaseAdmin.from('chat_sessions').insert({
            user_id: user.id,
            title: 'Welcome to Apna Vyapar!',
            messages: [welcomeMessage],
            message_count: 1
          }).select('id').single();

          if (newSession) {
            return NextResponse.redirect(new URL(`/chat?session=${newSession.id}&welcome=true`, request.url))
          }

          return NextResponse.redirect(new URL(`${safeNext}${safeNext.includes('?') ? '&' : '?'}welcome=true`, request.url))
        }
      } catch (err) {
        console.error('Analytics tracking error:', err);
      }

      return NextResponse.redirect(new URL(safeNext, request.url))
    } else {
      console.error('Code exchange error:', error?.message)
      return NextResponse.redirect(new URL(`/?login=true&error=${encodeURIComponent(error?.message || 'Authentication failed')}`, request.url))
    }
  }

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
                window.location.href = '/auth/callback?' + hash;
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
