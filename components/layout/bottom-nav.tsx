'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, MessageSquare, CheckSquare, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home, showAlways: true },
    { name: 'Ideas', href: '/ideas', icon: Lightbulb, showAlways: true },
    { name: 'Mitra', href: '/chat', icon: MessageSquare, showAlways: true },
    { name: 'Tasks', href: '/checklist', icon: CheckSquare, showAlways: false },
    { name: 'Profile', href: '/profile', icon: User, showAlways: false },
  ];

  if (!mounted) return null; // Avoid hydration mismatch on auth state

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
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
                  ? 'text-teal-700 font-bold scale-105' 
                  : 'text-slate-500 hover:text-teal-600 font-medium hover:bg-slate-50'
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
