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
  Download,
  CalendarDays,
  X
} from "lucide-react";
import Link from "next/link";
import { downloadCSV } from "@/lib/utils/csv";
import { downloadProfessionalReport } from "@/lib/utils/report";

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
  const [allOrders, setAllOrders] = useState<any[]>([]);
  
  // Calendar date range state
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

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
          if (isMounted) setAllOrders(orders);
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

  // Filter orders based on selected date range
  const filteredOrders = allOrders.filter(order => {
    if (!startDate && !endDate) return true;
    const orderDate = new Date(order.created_at);
    const start = startDate ? new Date(startDate + 'T00:00:00') : null;
    const end = endDate ? new Date(endDate + 'T23:59:59') : null;
    if (start && orderDate < start) return false;
    if (end && orderDate > end) return false;
    return true;
  });

  // Compute filtered stats
  const filteredRevenue = filteredOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const filteredOrdersCount = filteredOrders.length;
  const hasDateFilter = startDate || endDate;

  const displayRevenue = hasDateFilter ? filteredRevenue : stats.revenue;
  const displayOrders = hasDateFilter ? filteredOrdersCount : stats.orders;

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setActiveFilter('all');
    setShowCalendar(false);
  };

  const applyQuickFilter = (filterKey: string) => {
    const now = new Date();
    setActiveFilter(filterKey);
    switch (filterKey) {
      case 'today': {
        const today = now.toISOString().split('T')[0];
        setStartDate(today);
        setEndDate(today);
        break;
      }
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        setStartDate(weekAgo.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        break;
      }
      case 'month': {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        setStartDate(firstDay.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        break;
      }
      case 'year': {
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        setStartDate(firstDayOfYear.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        break;
      }
      case 'all': {
        clearDateFilter();
        return;
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden w-full relative">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] bg-gradient-to-bl from-accent-400/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-gradient-to-tr from-cyan-400/10 to-accent-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 w-full relative z-10">
        <div className="max-w-full">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600">Overview</span></h1>
          <p className="text-gray-500 text-base md:text-lg font-medium">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button 
            onClick={() => downloadProfessionalReport(stats, 'dashboard_report')}
            className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-2"
          >
            <FileText size={16} className="text-accent-500" /> Download Report
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
            className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-2"
          >
            <Download size={16} className="text-accent-500" /> Export CSV
          </button>
          <Link href="/dashboard/inventory" className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2">
            Add Product <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="mb-10 relative z-10">
        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Time' },
                { key: 'today', label: 'Today' },
                { key: 'week', label: 'This Week' },
                { key: 'month', label: 'This Month' },
                { key: 'year', label: 'This Year' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => applyQuickFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === f.key
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Custom Date Range */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  showCalendar
                    ? 'bg-gray-50 text-gray-900 border border-gray-200'
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <CalendarDays size={14} />
                Custom Range
              </button>

              {hasDateFilter && (
                <button
                  onClick={clearDateFilter}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs font-bold border border-red-200 hover:bg-red-100 transition-colors"
                >
                  <X size={12} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Expandable Calendar Inputs */}
          {showCalendar && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-end gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">From Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => { setStartDate(e.target.value); setActiveFilter('custom'); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">To Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => { setEndDate(e.target.value); setActiveFilter('custom'); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              {hasDateFilter && (
                <div className="bg-white border border-gray-100 rounded-lg shadow-card px-4 py-2.5 w-full sm:w-auto">
                  <p className="text-xs text-gray-400 font-bold">Filtered Revenue</p>
                  <p className="text-lg font-black text-gray-900">{formatINR(filteredRevenue)}</p>
                  <p className="text-[10px] text-gray-400">{filteredOrdersCount} orders in range</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title={hasDateFilter ? 'Filtered Revenue' : 'Total Revenue'}
          value={formatINR(displayRevenue)}
          trend={revenueTrend}
          isPositive={!revenueTrend.startsWith('-')}
          icon={IndianRupee}
        />
        <StatCard 
          title={hasDateFilter ? 'Filtered Orders' : 'Total Orders'}
          value={displayOrders.toString()}
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
          value={displayOrders > 0 && stats.customers > 0 ? `${((displayOrders / Math.max(stats.customers, 1)) * 100).toFixed(1)}%` : "0%"}
          trend={displayOrders > 0 ? '+' : '0%'}
          isPositive={displayOrders > 0}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {/* Main Chart */}
        <div className="lg:col-span-2 min-h-[400px]">
          <RevenueChart orders={allOrders} />
        </div>

        {/* Recent Orders / Activity */}
        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-8 h-full flex flex-col hover:shadow-elevated transition-shadow duration-500">
          <h3 className="text-gray-900 font-extrabold text-xl mb-6">Recent Orders</h3>
          
          {recentOrders.length > 0 ? (
            <div className="flex-1 space-y-3 overflow-y-auto">
              {recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm font-semibold truncate">{order.customers?.name || 'Customer'}</p>
                    <p className="text-gray-400 text-xs truncate">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-900 font-bold text-sm">{formatINR(Number(order.total_amount))}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 opacity-70">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                <PackageX size={28} className="text-gray-400" />
              </div>
              <h4 className="text-gray-900 font-semibold mb-1">
                {stats.orders > 0 ? "Orders incoming!" : "No orders yet"}
              </h4>
              <p className="text-gray-400 text-sm mb-6">
                {stats.orders > 0 
                  ? "Your customers are starting to buy your products." 
                  : "When you receive orders, they will show up here."}
              </p>
              <Link href="/dashboard/store" className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                Go to Store Builder
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
