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

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    months.add(currentYYYYMM);
    
    orders.forEach(order => {
      const d = new Date(order.created_at);
      const yyyymm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      months.add(yyyymm);
    });
    
    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [orders, currentYYYYMM]);

  const chartData = useMemo(() => {
    const [yearStr, monthStr] = selectedMonth.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr) - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-card z-50">
          <p className="text-gray-500 text-xs font-semibold mb-1">{payload[0].payload.fullDate}</p>
          <p className="text-gray-900 font-bold text-lg">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const strokeColor = '#9CA3AF';

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-card p-4 sm:p-6 h-full flex flex-col w-full overflow-hidden relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="w-full">
          <h3 className="text-gray-900 font-bold text-lg mb-1">Revenue Overview</h3>
          <p className="text-gray-500 text-sm">
            {hasData ? "Daily earnings breakdown" : "Waiting for sales in this month..."}
          </p>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        
        <div className="shrink-0 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={14} className="text-gray-400" />
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 appearance-none cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            {availableMonths.map(m => (
              <option key={m} value={m} className="bg-white text-gray-900">{formatMonthLabel(m)}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#E5E7EB" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{fill: '#9CA3AF'}}
                interval="preserveStartEnd"
                minTickGap={20}
              />
              <YAxis 
                stroke="#E5E7EB" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => formatCurrency(value)}
                allowDecimals={false}
                domain={hasData ? ['auto', 'auto'] : [0, 5000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 2, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke={strokeColor} 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                activeDot={{ r: 5, fill: strokeColor, stroke: '#ffffff', strokeWidth: 2 }}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
