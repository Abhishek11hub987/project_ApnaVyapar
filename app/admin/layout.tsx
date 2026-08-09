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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <aside className="w-64 border-r border-gray-200 bg-white flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Logo iconSize={24} />
            <span className="text-lg font-semibold text-gray-900">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-accent-600' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to App
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-50">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo iconSize={22} />
            <span className="text-base font-semibold">Admin</span>
          </Link>
          <Link href="/" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
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
