'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/language-context';
import { Sun, Moon, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/logo';

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
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo iconSize={32} />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={`font-semibold text-sm transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${pathname === '/' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'}`}>
            {t('nav.home')}
          </Link>
          <Link href="/ideas" className={`font-semibold text-sm transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${pathname.startsWith('/ideas') ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'}`}>
            {t('nav.ideas')}
          </Link>
          <Link href="/chat" className={`font-semibold text-sm transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${pathname.startsWith('/chat') ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'}`}>
            {t('nav.mitra')}
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/tasks" className={`font-semibold text-sm transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${pathname.startsWith('/tasks') ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('nav.tasks')}
              </Link>
              <Link href="/profile" className={`font-semibold text-sm transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${pathname.startsWith('/profile') ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('nav.profile')}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
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
        </div>
      </div>
    </header>
  );
}
