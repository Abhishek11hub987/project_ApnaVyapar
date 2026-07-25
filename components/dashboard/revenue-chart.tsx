"use client";

import { useEffect, useState } from "react";

export function RevenueChart({ data }: { data?: number[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="glass-card p-6 border-white/5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Revenue Overview</h3>
          <p className="text-white/40 text-sm">
            {data && data.some(v => v > 0) ? "Performance over the last 4 weeks" : "Waiting for first sale..."}
          </p>
        </div>
        <select className="bg-navy border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/70 outline-none opacity-50 cursor-not-allowed" disabled>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="flex-1 relative flex items-end min-h-[200px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-white/30 font-medium z-10">
          {(() => {
            const maxVal = data && data.some(v => v > 0) ? Math.max(...data) * 1.2 : 100000;
            const format = (v: number) => v >= 1000 ? `₹${(v/1000).toFixed(0)}k` : `₹${v.toFixed(0)}`;
            return (
              <>
                <span>{format(maxVal)}</span>
                <span>{format(maxVal * 0.75)}</span>
                <span>{format(maxVal * 0.5)}</span>
                <span>{format(maxVal * 0.25)}</span>
                <span>₹0</span>
              </>
            );
          })()}
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
              {(() => {
                const hasData = data && data.some(v => v > 0);
                let pathStr = "M 0,100 L 100,100";
                
                if (hasData) {
                  const maxVal = Math.max(...data!) * 1.2;
                  const p1 = 100 - (data![0] / maxVal) * 100;
                  const p2 = 100 - (data![1] / maxVal) * 100;
                  const p3 = 100 - (data![2] / maxVal) * 100;
                  const p4 = 100 - (data![3] / maxVal) * 100;
                  pathStr = `M 0,${p1} L 33.3,${p2} L 66.6,${p3} L 100,${p4}`;
                }

                return (
                  <path 
                    className="animate-[draw-line_2s_ease-out_forwards]"
                    d={pathStr} 
                    fill="none" 
                    stroke="#00D4FF" 
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={hasData ? "0" : "100"}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ opacity: hasData ? 1 : 0.5, transition: 'all 1s ease-out' }}
                  />
                );
              })()}
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
