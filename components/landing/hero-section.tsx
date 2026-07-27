"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Start, Manage & Grow Your Business Online
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Free open-source platform for Indian entrepreneurs. AI-powered tools, no hidden fees.
        </p>
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gray-900 text-white font-medium text-lg hover:bg-gray-800 transition-colors"
        >
          Start Your Journey <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
