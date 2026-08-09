"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/logo";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  Settings,
  Store,
  LogOut,
  Lightbulb,
  MessageSquare,
  ShieldAlert,
  Menu,
  X,
  ArrowLeft
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { name: "Analytics", href: "/dashboard", icon: LayoutDashboard },
      { name: "Business Plan", href: "/ideas", icon: Lightbulb },
      { name: "AI Chat", href: "/chat", icon: MessageSquare },
    ],
  },
  {
    label: "Manage",
    items: [
      { name: "Inventory", href: "/dashboard/inventory", icon: Package },
      { name: "Customers", href: "/dashboard/customers", icon: Users },
      { name: "Orders", href: "/dashboard/orders", icon: FileText },
      { name: "Store Builder", href: "/dashboard/store", icon: Store },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (data?.is_admin) {
        setIsAdmin(true);
      }
    }
    checkAdmin();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'AV';
    const name = user.full_name || user.email || '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const SidebarContent = (
    <>
      {/* Top: Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/ideas" className="p-1.5 -ml-1.5 text-gray-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors" title="Back to Business Ideas">
            <ArrowLeft size={18} />
          </Link>
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
        </div>
        <button
          className="md:hidden p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav Sections */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-accent-50 text-accent-700 border-l-2 border-accent-500 -ml-px"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={17} className={isActive ? "text-accent-600" : "text-gray-400"} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: Settings + Admin + User + Logout */}
      <div className="p-3 border-t border-gray-100 shrink-0 space-y-1">
        {isAdmin && (
          <Link
            href="/dashboard/admin/messages"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              pathname === "/dashboard/admin/messages"
                ? "bg-red-50 text-red-700"
                : "text-gray-500 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            <ShieldAlert size={17} />
            <span className="text-sm font-medium">Admin Inbox</span>
          </Link>
        )}
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            pathname === "/dashboard/settings"
              ? "bg-accent-50 text-accent-700"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Settings size={17} className="text-gray-400" />
          <span className="text-sm font-medium">Settings</span>
        </Link>

        {/* User card */}
        {user && (
          <div className="mt-2 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
                {getUserInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.full_name || 'User'}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut size={17} />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-gray-100 z-40 flex items-center justify-between px-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Link href="/ideas" className="p-1.5 -ml-1.5 text-gray-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors" title="Back">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
        </div>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {SidebarContent}
      </aside>
    </>
  );
}
