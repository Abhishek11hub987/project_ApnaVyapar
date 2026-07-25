'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/language-context';
import { Sun, Moon, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/logo';
import ProtectedLink from '@/components/auth/protected-link';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 grid grid-cols-3 items-center">
        <Link href="/" className="hover:opacity-90 transition-opacity justify-self-start">
          <Logo iconSize={28} />
        </Link>
        
        {/* Desktop Navigation — always centered */}
        <nav className="hidden md:flex items-center justify-center gap-1 bg-slate-50/50 dark:bg-slate-800/30 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <Link href="/" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname === '/' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
            Home
          </Link>
          <Link href="/ideas" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/ideas') ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
            Ideas
          </Link>
          <ProtectedLink href="/chat" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/chat') ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
            Mitra
          </ProtectedLink>
          <ProtectedLink href="/tasks" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/tasks') ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
            Tasks
          </ProtectedLink>
          <ProtectedLink href="/dashboard" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/dashboard') ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
            Dashboard
          </ProtectedLink>
          <ProtectedLink href="/profile" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/profile') ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'}`}>
            Profile
          </ProtectedLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
          {isAuthenticated && (
            <>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-full transition-colors"
              >
                <Globe size={14} />
                {language === 'en' ? 'HI' : 'EN'}
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
