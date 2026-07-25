"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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
import { downloadCSV } from "@/lib/csv";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        // Fetch total customers
        const { count: customersCount } = await supabase
          .from("customers")
          .select("*", { count: "exact", head: true });

        // Fetch all orders to calculate total revenue
        const { data: orders } = await supabase
          .from("orders")
          .select("total_amount, status");

        let totalRevenue = 0;
        let totalOrders = 0;

        if (orders) {
          totalOrders = orders.length;
          totalRevenue = orders.reduce((sum, order) => {
            // Only sum up non-cancelled orders if you prefer, or all of them.
            if (order.status !== 'cancelled') {
              return sum + Number(order.total_amount);
            }
            return sum;
          }, 0);
        }

        if (isMounted) {
          setStats({
            revenue: totalRevenue,
            orders: totalOrders,
            customers: customersCount || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Analytics Overview</h1>
          <p className="text-white/60">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => downloadCSV([stats], 'dashboard_report')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Download Report
          </button>
          <Link href="/dashboard/inventory" className="px-4 py-2 rounded-xl bg-cyan text-navy-dark text-sm font-bold hover:scale-105 transition-transform shadow-neon-cyan flex items-center gap-2">
            Add Product <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue"
          value={`₹${stats.revenue.toLocaleString('en-IN')}`}
          trend="+12%"
          isPositive={true}
          icon={IndianRupee}
        />
        <StatCard 
          title="Total Orders"
          value={stats.orders.toString()}
          trend="+5%"
          isPositive={true}
          icon={ShoppingCart}
        />
        <StatCard 
          title="Active Customers"
          value={stats.customers.toString()}
          trend="+18%"
          isPositive={true}
          icon={Users}
        />
        <StatCard 
          title="Conversion Rate"
          value={stats.orders > 0 ? "3.2%" : "0%"}
          trend="+1%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 min-h-[400px]">
          <RevenueChart />
        </div>

        {/* Recent Orders / Activity */}
        <div className="glass-card p-6 border-white/5 h-full flex flex-col">
          <h3 className="text-white font-bold text-lg mb-6">Recent Orders</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 opacity-70">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <PackageX size={28} className="text-white/40" />
            </div>
            <h4 className="text-white font-semibold mb-1">
              {stats.orders > 0 ? "Orders incoming!" : "No orders yet"}
            </h4>
            <p className="text-white/40 text-sm mb-6">
              {stats.orders > 0 
                ? "Your customers are starting to buy your products." 
                : "When you receive orders, they will show up here."}
            </p>
            <Link href="/dashboard/store" className="px-4 py-2 rounded-lg border border-cyan/40 text-cyan text-sm font-medium hover:bg-cyan/10 transition-colors">
              Go to Store Builder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
