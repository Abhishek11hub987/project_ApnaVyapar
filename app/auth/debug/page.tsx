'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthDebugPage() {
  const [state, setState] = useState<any>({ loading: true });

  useEffect(() => {
    async function check() {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      let profile = null;
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
        profile = data;
      }

      setState({
        loading: false,
        hasSession: !!session,
        sessionExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
        hasUser: !!user,
        userId: user?.id,
        userEmail: user?.email,
        provider: user?.app_metadata?.provider,
        sessionError: sessionError?.message,
        userError: userError?.message,
        profile,
        profileError: !profile && user ? 'Profile not found in DB' : null,
        cookies: document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(c => c.includes('supabase') || c.includes('sb-')),
      });
    }
    check();

    supabase.auth.onAuthStateChange((event, session) => {
      setState((prev: any) => ({ ...prev, lastEvent: event, eventUser: session?.user?.email }));
    });
  }, []);

  return (
    <div style={{ padding: 32, fontFamily: 'monospace', background: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: 24 }}>🔍 Auth Diagnostic</h1>
      {state.loading ? (
        <p>Checking session...</p>
      ) : (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      )}
      <div style={{ marginTop: 24 }}>
        <button onClick={() => window.location.href = '/'} style={{ marginRight: 16, padding: '8px 16px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 }}>Go Home</button>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ padding: '8px 16px', background: '#c00', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 }}>Sign Out</button>
      </div>
    </div>
  );
}
