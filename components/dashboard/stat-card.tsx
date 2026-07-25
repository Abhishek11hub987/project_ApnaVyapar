"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export function StatCard({ title, value, trend, isPositive, icon: Icon }: StatCardProps) {
  return (
    <div className="glass-card p-6 border-white/5">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
          <Icon size={18} className="text-cyan" />
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
          isPositive 
            ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
            : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {isPositive ? "+" : ""}{trend}
        </div>
      </div>
      <div>
        <p className="text-white/50 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
