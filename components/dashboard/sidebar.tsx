"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/logo";
import { useState, useEffect } from "react";
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

const NAV_ITEMS = [
  { name: "Analytics", href: "/dashboard", icon: LayoutDashboard },
  { name: "Business Plan", href: "/ideas", icon: Lightbulb },
  { name: "AI Chat", href: "/chat", icon: MessageSquare },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Orders", href: "/dashboard/orders", icon: FileText },
  { name: "Store Builder", href: "/dashboard/store", icon: Store },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
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

  const SidebarContent = (
    <>
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 -ml-1 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Back to main site">
            <ArrowLeft size={18} />
          </Link>
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo iconSize={24} />
          </Link>
        </div>
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
          Overview
        </p>
        
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-cyan/10 text-cyan border border-cyan/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]" 
                  : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-cyan" : "text-white/40 group-hover:text-white/70"} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-white/10 shrink-0">
        {isAdmin && (
          <Link
            href="/dashboard/admin/messages"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-2 ${
              pathname === "/dashboard/admin/messages"
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "text-red-400/70 hover:bg-red-500/10 hover:text-red-400 border border-transparent"
            }`}
          >
            <ShieldAlert size={18} className={pathname === "/dashboard/admin/messages" ? "" : "opacity-70"} />
            <span className="font-medium text-sm">Admin Inbox</span>
          </Link>
        )}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-white/60 hover:bg-white/5 hover:text-white"
        >
          <Settings size={18} className="text-white/40" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-red-400/80 hover:bg-red-400/10 hover:text-red-400 mt-2"
        >
          <LogOut size={18} className="opacity-80" />
          <span className="font-medium text-sm">Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-navy border-b border-white/10 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 -ml-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Back to main site">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo iconSize={24} />
          </Link>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-white/70 hover:text-white focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-navy-dark border-r border-white/10 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {SidebarContent}
      </aside>
    </>
  );
}
