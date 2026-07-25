"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Analytics Overview</h1>
          <p className="text-white/60">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
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
          title="Total Revenue (30d)"
          value="₹1,24,500"
          trend="12.5%"
          isPositive={true}
          icon={IndianRupee}
        />
        <StatCard 
          title="Total Orders"
          value="342"
          trend="8.2%"
          isPositive={true}
          icon={ShoppingCart}
        />
        <StatCard 
          title="Active Customers"
          value="1,204"
          trend="4.1%"
          isPositive={true}
          icon={Users}
        />
        <StatCard 
          title="Conversion Rate"
          value="3.8%"
          trend="1.2%"
          isPositive={false}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 min-h-[400px]">
          <RevenueChart />
        </div>

        {/* Recent Orders / Activity */}
        <div className="glass-card p-6 border-white/5 h-full">
          <h3 className="text-white font-bold text-lg mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { id: "ORD-8923", customer: "Priya S.", amount: "₹1,240", status: "Delivered", time: "2h ago" },
              { id: "ORD-8924", customer: "Rajesh K.", amount: "₹3,400", status: "Processing", time: "5h ago" },
              { id: "ORD-8925", customer: "Amit P.", amount: "₹890", status: "Shipped", time: "1d ago" },
              { id: "ORD-8926", customer: "Sneha M.", amount: "₹5,200", status: "Delivered", time: "1d ago" },
              { id: "ORD-8927", customer: "Vikram R.", amount: "₹1,150", status: "Processing", time: "2d ago" },
            ].map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy border border-white/10 flex items-center justify-center text-xs font-bold text-white/50">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan transition-colors">{order.customer}</p>
                    <p className="text-xs text-white/40">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white mb-0.5">{order.amount}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'Delivered' ? 'bg-teal-500/20 text-teal-400' :
                    order.status === 'Processing' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-cyan/20 text-cyan'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 rounded-lg border border-white/10 text-white/50 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
