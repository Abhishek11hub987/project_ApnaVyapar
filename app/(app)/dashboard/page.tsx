"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  ArrowRight,
  PackageX
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Currently no backend data is connected, so we show an empty state.
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Analytics Overview</h1>
          <p className="text-white/60">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed" disabled>
            Download Report
          </button>
          <Link href="/dashboard/inventory" className="px-4 py-2 rounded-xl bg-cyan text-navy-dark text-sm font-bold hover:scale-105 transition-transform shadow-neon-cyan flex items-center gap-2">
            Add Product <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Top Stats Row (Empty State) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue (30d)"
          value="₹0"
          trend="0%"
          isPositive={true}
          icon={IndianRupee}
        />
        <StatCard 
          title="Total Orders"
          value="0"
          trend="0%"
          isPositive={true}
          icon={ShoppingCart}
        />
        <StatCard 
          title="Active Customers"
          value="0"
          trend="0%"
          isPositive={true}
          icon={Users}
        />
        <StatCard 
          title="Conversion Rate"
          value="0%"
          trend="0%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart (Empty State) */}
        <div className="lg:col-span-2 min-h-[400px]">
          <RevenueChart />
        </div>

        {/* Recent Orders / Activity (Empty State) */}
        <div className="glass-card p-6 border-white/5 h-full flex flex-col">
          <h3 className="text-white font-bold text-lg mb-6">Recent Orders</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 opacity-70">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <PackageX size={28} className="text-white/40" />
            </div>
            <h4 className="text-white font-semibold mb-1">No orders yet</h4>
            <p className="text-white/40 text-sm mb-6">When you receive orders, they will show up here.</p>
            <Link href="/dashboard/store" className="px-4 py-2 rounded-lg border border-cyan/40 text-cyan text-sm font-medium hover:bg-cyan/10 transition-colors">
              Set up your store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
