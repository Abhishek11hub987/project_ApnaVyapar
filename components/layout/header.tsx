'use client';
import Link from 'next/link';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/logo';
import ProtectedLink from '@/components/auth/protected-link';

const navItems = [
  { href: '/ideas', label: 'Ideas', protected: false },
  { href: '/chat', label: 'Vyapar Mitra', protected: true },
  { href: '/tasks', label: 'Tasks', protected: true },
  { href: '/dashboard', label: 'Dashboard', protected: true },
];

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '?';
    const name = user.full_name || user.email || '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Center Nav — Desktop */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/ideas' && pathname.startsWith(item.href));
              const classes = `px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                active
                  ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`;
              if (item.protected) {
                return (
                  <ProtectedLink key={item.href} href={item.href} className={classes}>
                    {item.label}
                  </ProtectedLink>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={classes}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions — Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* User Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-white text-xs font-black shadow-inner">
                    {getUserInitials()}
                  </div>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-elevated py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.full_name || 'User'}</p>
                      <p className="text-xs text-gray-400 truncate font-medium">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User size={16} className="text-gray-400" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                    >
                      <LogOut size={16} className="text-red-400" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/?login=true"
                className="text-sm font-bold bg-gradient-to-r from-accent-600 to-accent-500 text-white px-5 py-2 rounded-full hover:shadow-glow transition-all duration-300 shadow-sm hover:-translate-y-0.5"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-accent-600 rounded-lg hover:bg-accent-50 transition-all"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl animate-fade-in-down">
          <nav className="section-container py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/ideas' && pathname.startsWith(item.href));
              const classes = `px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                active ? 'bg-accent-50 text-accent-700' : 'text-gray-500 hover:text-accent-600 hover:bg-accent-50/50'
              }`;
              if (item.protected) {
                return (
                  <ProtectedLink key={item.href} href={item.href} className={classes} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </ProtectedLink>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={classes} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {isAuthenticated && user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:text-accent-600 hover:bg-accent-50/50 rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {getUserInitials()}
                  </div>
                  {user.full_name || 'Profile'}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all w-full"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </>
            ) : (
              <Link
                href="/?login=true"
                className="block text-center text-sm font-bold bg-gradient-to-r from-accent-600 to-accent-500 text-white px-5 py-2.5 rounded-full shadow-md mt-1"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
