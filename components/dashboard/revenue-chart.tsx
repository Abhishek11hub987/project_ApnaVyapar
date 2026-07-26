"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Calendar } from "lucide-react";

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function RevenueChart({ orders = [] }: { orders?: any[] }) {
  const [mounted, setMounted] = useState(false);
  
  const now = new Date();
  const currentYYYYMM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState<string>(currentYYYYMM);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Extract unique months from orders for the dropdown
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    months.add(currentYYYYMM); // Always include current month
    
    orders.forEach(order => {
      const d = new Date(order.created_at);
      const yyyymm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      months.add(yyyymm);
    });
    
    // Sort descending
    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [orders, currentYYYYMM]);

  // 2. Compute daily data for the selected month
  const chartData = useMemo(() => {
    const [yearStr, monthStr] = selectedMonth.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr) - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Initialize array with 0 for each day
    const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
      name: `${i + 1}`,
      fullDate: `${MONTH_NAMES[month]} ${i + 1}, ${year}`,
      revenue: 0,
    }));

    orders.forEach(order => {
      if (order.status === 'cancelled') return;
      const d = new Date(order.created_at);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const dayIndex = d.getDate() - 1;
        dailyData[dayIndex].revenue += Number(order.total_amount || 0);
      }
    });
    
    return dailyData;
  }, [orders, selectedMonth]);

  const hasData = chartData.some(d => d.revenue > 0);
  const totalRevenue = chartData.reduce((s, d) => s + d.revenue, 0);

  const formatCurrency = (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`;
    return `₹${v.toFixed(0)}`;
  };

  const formatMonthLabel = (yyyymm: string) => {
    const [y, m] = yyyymm.split('-');
    return `${MONTH_NAMES[parseInt(m) - 1]} ${y}`;
  };

  // Tooltip formatter
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl z-50">
          <p className="text-white/60 text-xs font-semibold mb-1">{payload[0].payload.fullDate}</p>
          <p className="text-white font-bold text-lg">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const strokeColor = '#00D4FF';

  return (
    <div className="glass-card p-4 sm:p-6 border-white/5 h-full flex flex-col w-full overflow-hidden relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="w-full">
          <h3 className="text-white font-bold text-lg mb-1">Revenue Overview</h3>
          <p className="text-white/40 text-sm">
            {hasData ? "Daily earnings breakdown" : "Waiting for sales in this month..."}
          </p>
          <p className="text-2xl font-extrabold text-cyan mt-2">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        
        <div className="shrink-0 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={14} className="text-cyan" />
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="pl-9 pr-8 py-2 bg-navy/80 border border-white/10 rounded-xl text-sm font-semibold text-white appearance-none cursor-pointer hover:bg-white/5 transition-colors focus:outline-none focus:border-cyan/50"
          >
            {availableMonths.map(m => (
              <option key={m} value={m} className="bg-navy text-white">{formatMonthLabel(m)}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px] -ml-4">
        {mounted && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{fill: 'rgba(255,255,255,0.4)'}}
                interval="preserveStartEnd"
                minTickGap={20}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => formatCurrency(value)}
                allowDecimals={false}
                domain={hasData ? ['auto', 'auto'] : [0, 5000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke={strokeColor} 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                activeDot={{ r: 5, fill: strokeColor, stroke: '#1e293b', strokeWidth: 2 }}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
