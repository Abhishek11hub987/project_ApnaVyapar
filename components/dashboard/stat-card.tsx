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
    <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-6 lg:p-8 hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-500 group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200/50 flex items-center justify-center group-hover:from-accent-500 group-hover:to-accent-600 group-hover:border-accent-500 group-hover:shadow-glow transition-all duration-300">
          <Icon size={18} className="text-accent-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
          isPositive 
            ? "bg-green-50 text-green-700 ring-1 ring-green-600/20" 
            : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
        }`}>
          {isPositive ? "+" : ""}{trend}
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
