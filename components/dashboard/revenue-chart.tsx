"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

type ChartPeriod = 'current' | 'previous' | 'projection';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function RevenueChart({ data, monthlyData }: { data?: number[]; monthlyData?: { current: number[]; previous: number[]; currentMonth: number; currentYear: number } }) {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<ChartPeriod>('current');

  useEffect(() => {
    setMounted(true);
  }, []);

  const now = new Date();
  const currentMonthName = monthlyData ? MONTH_NAMES[monthlyData.currentMonth] : MONTH_NAMES[now.getMonth()];
  const prevMonthName = monthlyData ? MONTH_NAMES[(monthlyData.currentMonth - 1 + 12) % 12] : MONTH_NAMES[(now.getMonth() - 1 + 12) % 12];
  const nextMonthName = monthlyData ? MONTH_NAMES[(monthlyData.currentMonth + 1) % 12] : MONTH_NAMES[(now.getMonth() + 1) % 12];
  const year = monthlyData?.currentYear || now.getFullYear();

  // Get active data based on selected period
  const getActiveData = (): number[] => {
    if (!monthlyData) return data || [0, 0, 0, 0];
    
    switch (period) {
      case 'current':
        return monthlyData.current;
      case 'previous':
        return monthlyData.previous;
      case 'projection': {
        const curr = monthlyData.current;
        const total = curr.reduce((s, v) => s + v, 0);
        const daysElapsed = now.getDate();
        const dailyAvg = daysElapsed > 0 ? total / daysElapsed : 0;
        return [
          Math.round(dailyAvg * 7 * 1.05),
          Math.round(dailyAvg * 7 * 1.1),
          Math.round(dailyAvg * 7 * 1.08),
          Math.round(dailyAvg * 7 * 1.12),
        ];
      }
      default:
        return data || [0, 0, 0, 0];
    }
  };

  const activeData = getActiveData();
  const hasData = activeData.some(v => v > 0);
  const totalRevenue = activeData.reduce((s, v) => s + v, 0);

  const formatCurrency = (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`;
    return `₹${v.toFixed(0)}`;
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'current': return `${currentMonthName} ${year}`;
      case 'previous': return `${prevMonthName} ${year}`;
      case 'projection': return `${nextMonthName} ${year} (Projected)`;
    }
  };

  // Prepare data for recharts
  const chartData = activeData.map((val, i) => ({
    name: `Week ${i + 1}`,
    revenue: val,
  }));

  // Tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl">
          <p className="text-white/60 text-xs font-semibold mb-1">{label}</p>
          <p className="text-white font-bold text-lg">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const strokeColor = period === 'projection' ? '#10B981' : '#00D4FF';

  return (
    <div className="glass-card p-4 sm:p-6 border-white/5 h-full flex flex-col w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="w-full">
          <h3 className="text-white font-bold text-lg mb-1">Revenue Overview</h3>
          <p className="text-white/40 text-sm">
            {hasData ? getPeriodLabel() : "Waiting for first sale..."}
          </p>
          {hasData && (
            <p className="text-2xl font-extrabold text-cyan mt-2">
              {formatCurrency(totalRevenue)}
              {period === 'projection' && <span className="text-xs text-white/30 font-normal ml-2">estimated</span>}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-1 bg-navy/80 rounded-xl p-1 border border-white/5 shrink-0">
          <button
            onClick={() => setPeriod('previous')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              period === 'previous' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {prevMonthName.slice(0, 3)}
          </button>
          <button
            onClick={() => setPeriod('current')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              period === 'current' ? 'bg-cyan/20 text-cyan border border-cyan/30' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {currentMonthName.slice(0, 3)}
          </button>
          <button
            onClick={() => setPeriod('projection')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              period === 'projection' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {nextMonthName.slice(0, 3)} ✨
          </button>
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
              />
              <YAxis 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke={strokeColor} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                activeDot={{ r: 6, fill: strokeColor, stroke: '#1e293b', strokeWidth: 2 }}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
