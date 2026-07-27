'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/logo';
import ProtectedLink from '@/components/auth/protected-link';

const navItems = [
  { href: '/ideas', labelKey: 'nav.ideas', protected: false },
  { href: '/chat', labelKey: 'nav.mitra', protected: true },
  { href: '/tasks', labelKey: 'nav.tasks', protected: true },
  { href: '/dashboard', labelKey: 'Dashboard', protected: true },
  { href: '/profile', labelKey: 'nav.profile', protected: true },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              const classes = `px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`;
              if (item.protected) {
                return (
                  <ProtectedLink key={item.href} href={item.href} className={classes}>
                    {item.labelKey === 'Dashboard' ? (language === 'hi' ? 'डैशबोर्ड' : 'Dashboard') : t(item.labelKey)}
                  </ProtectedLink>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={classes}>
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Globe size={12} />
                {language === 'en' ? 'HI' : 'EN'}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in-down">
          <nav className="section-container py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              const classes = `px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`;
              if (item.protected) {
                return (
                  <ProtectedLink key={item.href} href={item.href} className={classes} onClick={() => setMobileOpen(false)}>
                    {item.labelKey === 'Dashboard' ? (language === 'hi' ? 'डैशबोर्ड' : 'Dashboard') : t(item.labelKey)}
                  </ProtectedLink>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={classes} onClick={() => setMobileOpen(false)}>
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
