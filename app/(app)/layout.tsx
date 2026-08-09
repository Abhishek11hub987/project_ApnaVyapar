'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/ideas', '/how-it-works', '/about', '/contact', '/faq', '/schemes', '/about-us'];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/ideas/') || pathname.startsWith('/p/') || pathname.startsWith('/schemes/');
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      if (!isPublicRoute(pathname)) {
        router.push(`/?login=true&redirect=${encodeURIComponent(pathname)}`);
      }
    } else {
      // Authenticated users should complete onboarding
      if (!user.onboarding_completed && pathname !== '/onboarding') {
        router.push('/onboarding');
      }
    }
  }, [user, isAuthenticated, isLoading, pathname, router]);

  // Dashboard has its own layout with sidebar
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
