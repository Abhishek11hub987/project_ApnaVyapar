import { create } from 'zustand';
import { Profile } from '@/types/database';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  initialize: async () => {
    set({ isLoading: true });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (profile) {
        set({ user: profile, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

let authListener: ReturnType<typeof supabase.auth.onAuthStateChange> | null = null;

if (typeof window !== 'undefined') {
  authListener = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (profile) {
        useAuth.getState().setUser(profile);
      }
    }
    if (event === 'SIGNED_OUT') {
      useAuth.setState({ user: null, isAuthenticated: false });
    }
  });
}

if (typeof window !== 'undefined' && authListener) {
  window.addEventListener('beforeunload', () => {
    authListener?.data?.subscription?.unsubscribe();
  });
}
