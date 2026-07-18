'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/language-context';
import { Sun, Moon, Globe, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/logo';

export default function MarketingHeader() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showAuthControls = mounted && !isLoading;

  return (
    <header className="absolute top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
      <Link href="/" className="hover:opacity-90 transition-opacity">
        <Logo iconSize={32} />
      </Link>

      {showAuthControls && (
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm border border-slate-200/60 dark:border-slate-700"
                aria-label="Profile"
              >
                <User size={18} />
              </Link>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 text-xs font-bold bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-full transition-colors shadow-sm border border-slate-200/60 dark:border-slate-700"
              >
                <Globe size={14} />
                {language === 'en' ? 'HI' : 'EN'}
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm border border-slate-200/60 dark:border-slate-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </>
          ) : (
            <Link
              href="/?login=true"
              className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
