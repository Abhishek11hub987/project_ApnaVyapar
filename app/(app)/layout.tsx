'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';

// Routes that require authentication
const PROTECTED_PREFIXES = ['/dashboard', '/chat', '/profile', '/onboarding', '/tasks'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const redirectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any pending redirect when auth state changes
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
      redirectTimeout.current = null;
    }

    if (isLoading) return;

    if (!isAuthenticated || !user) {
      if (isProtectedRoute(pathname)) {
        // Small delay to allow onAuthStateChange to fire after OAuth/Magic Link
        redirectTimeout.current = setTimeout(() => {
          // Re-check auth state after delay
          const { isAuthenticated: stillAuth } = useAuth.getState();
          if (!stillAuth) {
            router.push(`/?login=true&redirect=${encodeURIComponent(pathname)}`);
          }
        }, 500);
      }
    } else {
      // Authenticated — send to onboarding if not completed
      if (!user.onboarding_completed && pathname !== '/onboarding') {
        router.push('/onboarding');
      }
    }

    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, [user, isAuthenticated, isLoading, pathname, router]);

  const isDashboard = pathname.startsWith('/dashboard');
  const isChat = pathname === '/chat';

  return (
    <div className="flex flex-col min-h-screen bg-surface-secondary text-gray-900">
      {!isDashboard && (
        <div className={isChat ? 'hidden md:block' : ''}>
          <Header />
        </div>
      )}

      <main className={`flex-1 flex flex-col ${isDashboard ? '' : isChat ? 'pb-0 md:pb-0' : 'pb-20 md:pb-0'}`}>
        {children}
      </main>

      {!isDashboard && (
        <div className={isChat ? 'hidden md:block' : ''}>
          <BottomNav />
        </div>
      )}
    </div>
  );
}
