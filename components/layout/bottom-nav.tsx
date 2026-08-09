'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, MessageSquare, CheckSquare, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import ProtectedLink from '@/components/auth/protected-link';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const publicItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Ideas', href: '/ideas', icon: Lightbulb },
  ];

  const protectedItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mitra', href: '/chat', icon: MessageSquare },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  ];

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/60 pb-safe z-50 md:hidden shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center px-2 py-1.5 max-w-md mx-auto">
        {publicItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-all duration-200 ${
                isActive ? 'text-accent-600' : 'text-gray-400 hover:text-accent-500'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-semibold mt-0.5">{item.name}</span>
              {isActive && <span className="w-1 h-1 rounded-full bg-accent-500 mt-0.5" />}
            </Link>
          );
        })}
        {protectedItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <ProtectedLink
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-all duration-200 ${
                isActive ? 'text-accent-600' : 'text-gray-400 hover:text-accent-500'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-semibold mt-0.5">{item.name}</span>
              {isActive && <span className="w-1 h-1 rounded-full bg-accent-500 mt-0.5" />}
            </ProtectedLink>
          );
        })}
      </div>
    </nav>
  );
}
