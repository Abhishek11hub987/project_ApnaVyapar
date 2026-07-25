"use client";

import { useEffect, useState } from "react";

export function RevenueChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="glass-card p-6 border-white/5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Revenue Overview</h3>
          <p className="text-white/40 text-sm">Last 30 days vs previous period</p>
        </div>
        <select className="bg-navy border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/70 outline-none focus:border-cyan transition-colors">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="flex-1 relative flex items-end min-h-[200px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-white/30 font-medium z-10">
          <span>₹100k</span>
          <span>₹75k</span>
          <span>₹50k</span>
          <span>₹25k</span>
          <span>₹0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-12 right-0 top-1 bottom-10 flex flex-col justify-between z-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-b border-white/5" />
          ))}
        </div>

        {/* Chart SVG */}
        <div className="absolute left-12 right-0 top-0 bottom-10 z-10 overflow-hidden">
          {mounted && (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Previous period line (subtle) */}
              <path 
                d="M 0,80 Q 20,70 30,85 T 60,65 T 100,75" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="2"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />

              {/* Current period line */}
              <path 
                className="animate-[draw-line_2s_ease-out_forwards]"
                d="M 0,60 Q 15,40 30,50 T 60,20 T 100,10" 
                fill="none" 
                stroke="#00D4FF" 
                strokeWidth="3"
                strokeDasharray="300"
                strokeDashoffset="300"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0px 4px 12px rgba(0,212,255,0.5))' }}
              />
              
              {/* Area fill */}
              <path 
                className="animate-[draw-line_2s_ease-out_forwards] opacity-0"
                style={{ animation: 'fade-in 1s ease-out 1s forwards' }}
                d="M 0,60 Q 15,40 30,50 T 60,20 T 100,10 L 100,100 L 0,100 Z" 
                fill="url(#chartGlow)" 
              />
            </svg>
          )}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-0 bottom-0 h-8 flex justify-between items-end text-xs text-white/30 font-medium">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </div>
    </div>
  );
}
