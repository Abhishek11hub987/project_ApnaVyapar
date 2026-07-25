"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-navy text-white font-inter">
      <DashboardSidebar />
      <main className="flex-1 w-full flex flex-col pt-16 md:pt-0">
        <div className="flex-1 p-4 md:p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
