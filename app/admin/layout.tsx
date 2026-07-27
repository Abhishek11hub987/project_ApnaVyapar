'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Lightbulb, ArrowLeft } from 'lucide-react';
import Logo from '@/components/logo';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Ideas', href: '/admin/ideas', icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-navy text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-navy-dark/50 backdrop-blur-xl flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Logo iconSize={28} />
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-cyan/10 text-cyan border border-cyan/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-cyan' : 'text-white/40'} />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-gradient-to-br from-navy to-navy-dark">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-navy/50 backdrop-blur-md sticky top-0 z-50">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo iconSize={24} />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white">Admin</span>
          </Link>
          <Link href="/" className="p-2 rounded-full bg-white/5 text-white/70">
            <ArrowLeft size={20} />
          </Link>
        </header>

        <div className="flex-1 p-4 md:p-8 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
