'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Lightbulb, MessageSquare, CheckSquare, 
  Map as MapIcon, User, Settings, HelpCircle, 
  LogOut, X 
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import Logo from '@/components/logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navItems = [
    { name: t('nav.home') || 'Home', href: '/ideas', icon: Home },
    { name: t('nav.ideas') || 'Ideas', href: '/ideas', icon: Lightbulb },
    { name: t('nav.mitra') || 'Vyapar Mitra', href: '/chat', icon: MessageSquare },
    { name: t('nav.tasks') || 'My Checklists', href: '/tasks', icon: CheckSquare },
    { name: 'Resource Map', href: '/map', icon: MapIcon }, // Add to dict later if needed
    { name: t('nav.profile') || 'My Profile', href: '/profile', icon: User },
  ];

  const bottomItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help & FAQ', href: '/faq', icon: HelpCircle },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 -z-10 bg-slate-900/40 backdrop-blur-sm lg:hidden pointer-events-auto"
            />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-50 h-screen w-[280px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl pointer-events-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-800/50">
              <Link href="/ideas" className="flex items-center gap-2" onClick={onClose}>
                <Logo iconSize={28} />
              </Link>
              <button 
                onClick={onClose}
                className="lg:hidden p-2 -mr-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              {navItems.map((item, idx) => {
                // Special check to highlight /ideas instead of having separate /home
                const isActive = pathname === item.href || (item.name === 'Home' && pathname === '/');
                // Don't show duplicates if Home and Ideas point to same
                if (idx === 0 && item.href === '/ideas') return null;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-teal-500' : 'opacity-70'} />
                    {item.name}
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-8 bg-teal-500 rounded-r-full" 
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1">
              {bottomItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium text-sm transition-all"
                >
                  <item.icon size={18} className="opacity-70" />
                  {item.name}
                </Link>
              ))}
              
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium text-sm transition-all mt-2"
              >
                <LogOut size={18} />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
