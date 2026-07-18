'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (!user.onboarding_completed && pathname !== '/onboarding') {
        router.push('/onboarding');
      }
    }
  }, [user, isAuthenticated, isLoading, pathname, router]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>
      
      <BottomNav />
    </div>
  );
}
