"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-navy text-white font-inter">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-navy-light/50">
        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
