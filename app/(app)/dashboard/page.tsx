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
  PackageX,
  FileText,
  Download
} from "lucide-react";
import Link from "next/link";
import { downloadCSV } from "@/lib/csv";
import { downloadProfessionalReport } from "@/lib/report";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    weeklyRevenue: [0, 0, 0, 0],
    monthlyData: {
      current: [0, 0, 0, 0],
      previous: [0, 0, 0, 0],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    },
    prevMonthRevenue: 0,
    prevMonthOrders: 0,
    prevMonthCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        // First get the user's store ID
        const { data: storeData } = await supabase
          .from("store_settings")
          .select("id")
          .eq("user_id", userData.user.id)
          .single();

        if (!storeData) {
          if (isMounted) setLoading(false);
          return;
        }

        // Fetch total customers
        const { count: customersCount } = await supabase
          .from("customers")
          .select("*", { count: "exact", head: true })
          .eq("store_id", storeData.id);

        // Fetch all orders with dates
        const { data: orders } = await supabase
          .from("orders")
          .select("total_amount, status, created_at, customers(name)")
          .eq("store_id", storeData.id)
          .order("created_at", { ascending: false });

        let totalRevenue = 0;
        let totalOrders = 0;
        let weeklyRevenue = [0, 0, 0, 0];
        let currentMonthWeekly = [0, 0, 0, 0];
        let prevMonthWeekly = [0, 0, 0, 0];
        let prevMonthRevenue = 0;
        let prevMonthOrders = 0;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const prevMonth = (currentMonth - 1 + 12) % 12;
        const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        if (orders) {
          totalOrders = orders.length;

          orders.forEach((order) => {
            if (order.status !== 'cancelled') {
              const amount = Number(order.total_amount);
              totalRevenue += amount;
              
              const orderDate = new Date(order.created_at);
              const orderMonth = orderDate.getMonth();
              const orderYear = orderDate.getFullYear();

              // Current month weekly breakdown
              if (orderMonth === currentMonth && orderYear === currentYear) {
                const dayOfMonth = orderDate.getDate();
                const weekIndex = Math.min(Math.floor((dayOfMonth - 1) / 7), 3);
                currentMonthWeekly[weekIndex] += amount;
              }

              // Previous month weekly breakdown
              if (orderMonth === prevMonth && orderYear === prevMonthYear) {
                const dayOfMonth = orderDate.getDate();
                const weekIndex = Math.min(Math.floor((dayOfMonth - 1) / 7), 3);
                prevMonthWeekly[weekIndex] += amount;
                prevMonthRevenue += amount;
                prevMonthOrders++;
              }

              // Last 4 weeks (for legacy)
              const oneWeek = 7 * 24 * 60 * 60 * 1000;
              const diffTime = Math.abs(now.getTime() - orderDate.getTime());
              const diffWeeks = Math.floor(diffTime / oneWeek);
              if (diffWeeks < 4) {
                weeklyRevenue[3 - diffWeeks] += amount;
              }
            }
          });
        }

        // Calculate real trend percentages
        const currentMonthTotal = currentMonthWeekly.reduce((s, v) => s + v, 0);

        if (isMounted) {
          setStats({
            revenue: totalRevenue,
            orders: totalOrders,
            customers: customersCount || 0,
            weeklyRevenue,
            monthlyData: {
              current: currentMonthWeekly,
              previous: prevMonthWeekly,
              currentMonth,
              currentYear,
            },
            prevMonthRevenue,
            prevMonthOrders,
            prevMonthCustomers: 0, // Would need historical data
          });

          // Store recent orders for the sidebar
          if (orders && orders.length > 0) {
            setRecentOrders(orders.slice(0, 5));
          }
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

  // Calculate real trends
  const currentMonthRev = stats.monthlyData.current.reduce((s, v) => s + v, 0);
  const revenueTrend = stats.prevMonthRevenue > 0 
    ? `${currentMonthRev >= stats.prevMonthRevenue ? '+' : ''}${(((currentMonthRev - stats.prevMonthRevenue) / stats.prevMonthRevenue) * 100).toFixed(0)}%`
    : currentMonthRev > 0 ? '+100%' : '0%';
  
  const ordersTrend = stats.prevMonthOrders > 0
    ? `${stats.orders >= stats.prevMonthOrders ? '+' : ''}${(((stats.orders - stats.prevMonthOrders) / stats.prevMonthOrders) * 100).toFixed(0)}%`
    : stats.orders > 0 ? '+100%' : '0%';

  const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 w-full">
        <div className="max-w-full">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 break-words">Analytics Overview</h1>
          <p className="text-white/60 text-sm md:text-base">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto">
          <button 
            onClick={() => downloadProfessionalReport(stats, 'dashboard_report')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <FileText size={15} /> Download Report
          </button>
          <button
            onClick={() => downloadCSV([{
              'Total Revenue': stats.revenue,
              'Total Orders': stats.orders,
              'Active Customers': stats.customers,
              'Current Month Revenue': currentMonthRev,
              'Week 1': stats.monthlyData.current[0],
              'Week 2': stats.monthlyData.current[1],
              'Week 3': stats.monthlyData.current[2],
              'Week 4': stats.monthlyData.current[3],
            }], 'analytics_export')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download size={15} /> Export CSV
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
          value={formatINR(stats.revenue)}
          trend={revenueTrend}
          isPositive={!revenueTrend.startsWith('-')}
          icon={IndianRupee}
        />
        <StatCard 
          title="Total Orders"
          value={stats.orders.toString()}
          trend={ordersTrend}
          isPositive={!ordersTrend.startsWith('-')}
          icon={ShoppingCart}
        />
        <StatCard 
          title="Active Customers"
          value={stats.customers.toString()}
          trend={stats.customers > 0 ? `+${stats.customers}` : '0'}
          isPositive={stats.customers > 0}
          icon={Users}
        />
        <StatCard 
          title="Conversion Rate"
          value={stats.orders > 0 && stats.customers > 0 ? `${((stats.orders / Math.max(stats.customers, 1)) * 100).toFixed(1)}%` : "0%"}
          trend={stats.orders > 0 ? '+' : '0%'}
          isPositive={stats.orders > 0}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 min-h-[400px]">
          <RevenueChart data={stats.weeklyRevenue} monthlyData={stats.monthlyData} />
        </div>

        {/* Recent Orders / Activity */}
        <div className="glass-card p-6 border-white/5 h-full flex flex-col">
          <h3 className="text-white font-bold text-lg mb-6">Recent Orders</h3>
          
          {recentOrders.length > 0 ? (
            <div className="flex-1 space-y-3 overflow-y-auto">
              {recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-semibold truncate">{order.customers?.name || 'Customer'}</p>
                    <p className="text-white/40 text-xs truncate">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-cyan font-bold text-sm">{formatINR(Number(order.total_amount))}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
