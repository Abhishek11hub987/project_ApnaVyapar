'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, MessageSquare, CheckSquare, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '/', icon: Home, showAlways: true },
    { name: t('nav.ideas'), href: '/ideas', icon: Lightbulb, showAlways: true },
    { name: t('nav.mitra'), href: '/chat', icon: MessageSquare, showAlways: true },
    { name: t('nav.tasks'), href: '/tasks', icon: CheckSquare, showAlways: false },
    { name: t('nav.profile'), href: '/profile', icon: User, showAlways: false },
  ];

  if (!mounted) return null; // Avoid hydration mismatch on auth state

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-colors">
      <div className="flex justify-around items-center px-2 py-2.5 max-w-md mx-auto">
        {navItems.map((item) => {
          if (!item.showAlways && !isAuthenticated) return null;
          
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all ${
                isActive 
                  ? 'text-teal-700 dark:text-teal-400 font-bold scale-105' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className={`mb-1 transition-transform ${isActive ? 'translate-y-0.5' : ''}`}>
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
