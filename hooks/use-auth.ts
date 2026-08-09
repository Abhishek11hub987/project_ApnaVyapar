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

// Fetch profile directly from Supabase client — no server round-trip needed
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

    // Auto-create profile if missing (RLS allows user to insert own row)
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
    set({ isLoading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await fetchProfileFromDB(session.user.id);
        set({ user: profile, isAuthenticated: !!profile, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (err) {
      console.error('[useAuth] initialize error:', err);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

// Listen for auth state changes (handles Magic Link, Google OAuth, sign-out)
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('[useAuth] auth event:', event);
    if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
      const profile = await fetchProfileFromDB(session.user.id);
      useAuth.setState({ user: profile, isAuthenticated: !!profile, isLoading: false });
    }
    if (event === 'SIGNED_OUT') {
      useAuth.setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  });
}
