"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  Store,
  LogOut,
  Lightbulb,
  MessageSquare
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <aside className="w-64 bg-navy-dark border-r border-white/10 h-screen sticky top-0 flex flex-col hidden md:flex">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan to-cyan-dark rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold text-sm tracking-tighter">AV</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Apna Vyapar</span>
        </Link>
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
      <div className="p-4 border-t border-white/10">
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
    </aside>
  );
}
