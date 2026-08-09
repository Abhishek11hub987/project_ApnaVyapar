'use client';
import { create } from 'zustand';
import type { Profile } from '@/types/profile';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Fetch profile directly from Supabase client — no server round-trip
async function fetchProfileFromDB(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('[useAuth] profile fetch error:', error.message);
      return null;
    }

    // Auto-create profile if missing
    if (!data) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const newProfile = {
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || '',
        onboarding_completed: false,
      };
      const { data: created, error: createError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();
      if (createError) {
        console.error('[useAuth] profile create error:', createError.message);
        return null;
      }
      return created as Profile;
    }

    return data as Profile;
  } catch (err) {
    console.error('[useAuth] unexpected profile error:', err);
    return null;
  }
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  initialize: async () => {
    // Do nothing — auth state is managed entirely by onAuthStateChange below.
    // This function exists for backwards compatibility.
  },
}));

// Single source of truth: onAuthStateChange handles ALL auth events including
// INITIAL_SESSION (page load with existing session), SIGNED_IN (after OAuth/magic link),
// TOKEN_REFRESHED, and SIGNED_OUT.
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('[useAuth] event:', event, '| user:', session?.user?.email ?? 'none');

    if (event === 'INITIAL_SESSION') {
      if (session?.user) {
        // User has a valid session on page load
        const profile = await fetchProfileFromDB(session.user.id);
        useAuth.setState({ user: profile, isAuthenticated: !!profile, isLoading: false });
      } else {
        // No session on page load
        useAuth.setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    }

    if (event === 'SIGNED_IN' && session?.user) {
      const profile = await fetchProfileFromDB(session.user.id);
      useAuth.setState({ user: profile, isAuthenticated: !!profile, isLoading: false });
    }

    if (event === 'TOKEN_REFRESHED' && session?.user) {
      // Don't re-fetch profile for token refresh, just keep session alive
      const current = useAuth.getState();
      if (!current.isAuthenticated) {
        const profile = await fetchProfileFromDB(session.user.id);
        useAuth.setState({ user: profile, isAuthenticated: !!profile, isLoading: false });
      }
    }

    if (event === 'SIGNED_OUT') {
      useAuth.setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  });
}
