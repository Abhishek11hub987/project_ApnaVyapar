"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-accent-200/30 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-accent-100/40 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-50/50 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-200/60 text-accent-700 text-xs font-bold tracking-wide uppercase mb-8 animate-fade-in">
          <Sparkles size={12} className="animate-pulse-soft" />
          AI-Powered Platform for Indian Entrepreneurs
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.05] mb-6">
          Start, Manage &{' '}
          <span className="bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
            Grow Your Business
          </span>
          {' '}Online
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Free open-source platform with AI-powered tools, step-by-step roadmaps, and everything you need to launch your dream business. No hidden fees.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-accent-600 to-accent-500 text-white font-bold text-lg shadow-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Business Ideas <ArrowRight size={20} />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-700 font-semibold text-lg border border-gray-200 hover:border-accent-300 hover:text-accent-600 shadow-xs hover:shadow-card transition-all duration-300"
          >
            How It Works
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>100% Free & Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-400" />
            <span>AI-Powered Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Made for India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
