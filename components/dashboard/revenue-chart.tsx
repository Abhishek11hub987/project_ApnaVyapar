"use client";

import { useEffect, useState } from "react";

type ChartPeriod = 'current' | 'previous' | 'projection';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function RevenueChart({ data, monthlyData }: { data?: number[]; monthlyData?: { current: number[]; previous: number[]; currentMonth: number; currentYear: number } }) {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<ChartPeriod>('current');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

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
        // Project next month based on current month's trend
        const curr = monthlyData.current;
        const total = curr.reduce((s, v) => s + v, 0);
        const daysElapsed = now.getDate();
        const dailyAvg = daysElapsed > 0 ? total / daysElapsed : 0;
        // Project 4 weeks of next month
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
  const maxVal = hasData ? Math.max(...activeData) * 1.3 : 100000;
  const totalRevenue = activeData.reduce((s, v) => s + v, 0);

  const formatCurrency = (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`;
    return `₹${v.toFixed(0)}`;
  };

  // Generate smooth SVG path points
  const points = activeData.map((val, i) => ({
    x: (i / (activeData.length - 1)) * 100,
    y: hasData ? 100 - (val / maxVal) * 100 : 100,
  }));

  // Build smooth curve path
  const buildPath = () => {
    if (points.length < 2) return "M 0,100 L 100,100";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 3;
      const cp1y = points[i].y;
      const cp2x = points[i + 1].x - (points[i + 1].x - points[i].x) / 3;
      const cp2y = points[i + 1].y;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i + 1].x},${points[i + 1].y}`;
    }
    return d;
  };

  // Area fill path (closes to bottom)
  const buildAreaPath = () => {
    const linePath = buildPath();
    return `${linePath} L 100,100 L 0,100 Z`;
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'current': return `${currentMonthName} ${year}`;
      case 'previous': return `${prevMonthName} ${year}`;
      case 'projection': return `${nextMonthName} ${year} (Projected)`;
    }
  };

  return (
    <div className="glass-card p-6 border-white/5 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
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
        <div className="flex gap-1 bg-navy/80 rounded-xl p-1 border border-white/5">
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

      <div className="flex-1 relative flex items-end min-h-[220px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-14 flex flex-col justify-between text-xs text-white/30 font-medium z-10">
          <span>{formatCurrency(maxVal)}</span>
          <span>{formatCurrency(maxVal * 0.75)}</span>
          <span>{formatCurrency(maxVal * 0.5)}</span>
          <span>{formatCurrency(maxVal * 0.25)}</span>
          <span>₹0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-14 right-0 top-1 bottom-10 flex flex-col justify-between z-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-b border-white/5" />
          ))}
        </div>

        {/* Chart SVG */}
        <div className="absolute left-14 right-0 top-0 bottom-10 z-10 overflow-visible">
          {mounted && (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={period === 'projection' ? '#10B981' : '#00D4FF'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={period === 'projection' ? '#10B981' : '#00D4FF'} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              {hasData && (
                <path 
                  d={buildAreaPath()} 
                  fill="url(#areaGrad)"
                  style={{ transition: 'all 0.8s ease-out' }}
                />
              )}
              
              {/* Line */}
              <path 
                d={buildPath()} 
                fill="none" 
                stroke={period === 'projection' ? '#10B981' : '#00D4FF'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  opacity: hasData ? 1 : 0.3,
                  transition: 'all 0.8s ease-out',
                  filter: hasData ? `drop-shadow(0 0 6px ${period === 'projection' ? '#10B98180' : '#00D4FF80'})` : 'none'
                }}
              />
            </svg>
          )}

          {/* Data point dots with tooltips */}
          {mounted && hasData && points.map((pt, i) => (
            <div
              key={i}
              className="absolute z-20"
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                period === 'projection' 
                  ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                  : 'bg-cyan border-cyan-300 shadow-[0_0_8px_rgba(0,212,255,0.5)]'
              } ${hoveredPoint === i ? 'scale-150' : 'scale-100'}`} />
              
              {hoveredPoint === i && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap shadow-xl z-30 pointer-events-none">
                  {formatCurrency(activeData[i])}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-white/10 transform rotate-45 -mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-14 right-0 bottom-0 h-8 flex justify-between items-end text-xs text-white/30 font-medium">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </div>
    </div>
  );
}
