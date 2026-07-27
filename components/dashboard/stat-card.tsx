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
    <div className="bg-white border border-gray-100 rounded-lg shadow-card p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
          <Icon size={18} className="text-gray-400" />
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
