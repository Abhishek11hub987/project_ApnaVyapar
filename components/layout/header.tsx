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
    <header className="sticky top-0 z-50 w-full bg-navy/90 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="hover:opacity-90 transition-opacity justify-self-start">
          <Logo iconSize={28} />
        </Link>
        
        {/* Desktop Navigation — pill style */}
        <nav className="hidden md:flex items-center justify-center gap-1 bg-white/5 p-1.5 px-3 rounded-full border border-white/10">
          <Link href="/" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname === '/' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
            {t('nav.home')}
          </Link>
          <Link href="/ideas" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/ideas') ? 'bg-cyan/20 text-cyan shadow-sm border border-cyan/20' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
            {t('nav.ideas')}
          </Link>
          <ProtectedLink href="/chat" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/chat') ? 'bg-cyan/20 text-cyan shadow-sm border border-cyan/20' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
            {t('nav.mitra')}
          </ProtectedLink>
          <ProtectedLink href="/tasks" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/tasks') ? 'bg-cyan/20 text-cyan shadow-sm border border-cyan/20' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
            {t('nav.tasks')}
          </ProtectedLink>
          <ProtectedLink href="/dashboard" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/dashboard') ? 'bg-cyan/20 text-cyan shadow-sm border border-cyan/20' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
            {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
          </ProtectedLink>
          <ProtectedLink href="/profile" className={`font-medium text-sm transition-all px-4 py-1.5 rounded-full ${pathname.startsWith('/profile') ? 'bg-cyan/20 text-cyan shadow-sm border border-cyan/20' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
            {t('nav.profile')}
          </ProtectedLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
          {isAuthenticated && (
            <>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 px-3 py-2 rounded-full transition-colors"
              >
                <Globe size={14} />
                {language === 'en' ? 'HI' : 'EN'}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
