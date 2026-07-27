"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Store, TrendingUp, Users } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy pt-28 pb-16">
      {/* Background gradients and effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan text-sm font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <Sparkles size={16} />
            <span>The Next Generation Platform for Indian Merchants</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-6 max-w-5xl leading-[1.1]">
          Your Business, <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-blue-500">Digitally Transformed</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both text-lg sm:text-xl md:text-2xl text-white/60 font-medium max-w-3xl mb-10 leading-relaxed">
          Launch your online store, manage inventory effortlessly, and grow your sales. Everything you need to scale your business in one powerful, beautifully designed dashboard.
        </p>

        {/* CTAs */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400 fill-mode-both flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/ideas"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan text-navy-dark font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,212,255,0.4)] hover:shadow-[0_0_60px_rgba(0,212,255,0.6)] flex items-center justify-center gap-2"
          >
            Start Your Journey <ArrowRight size={20} />
          </Link>
          <Link
            href="/p/store-builder"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            Explore Features
          </Link>
        </div>

        {/* Stats/Trust Bar */}
        <div className="animate-in fade-in duration-1000 delay-700 fill-mode-both mt-12 flex items-center gap-8 text-white/40 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Store size={18} className="text-cyan/70" />
            <span>10,000+ Stores Created</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-400/70" />
            <span>1M+ Customers Served</span>
          </div>
        </div>

        {/* Floating Mockup / UI elements representation */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both w-full max-w-5xl mx-auto mt-16 relative perspective-1000">
          {/* Fade out bottom of mockup to blend into background */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy via-navy/80 to-transparent z-20 pointer-events-none" />
          
          <div className="relative rounded-t-2xl border border-white/10 bg-[#0a192f]/80 backdrop-blur-2xl p-2 sm:p-4 shadow-2xl shadow-cyan/20 overflow-hidden transform-gpu rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out group">
            {/* Window controls */}
            <div className="flex gap-2 mb-4 px-2 items-center border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <div className="ml-4 text-xs font-mono text-white/20 flex-1 text-center pr-10">dashboard.apnavyapar.com</div>
            </div>
            
            {/* Abstract Dashboard UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-70 group-hover:opacity-100 transition-opacity duration-700 p-2 pb-20">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="h-48 rounded-2xl bg-gradient-to-br from-white/5 to-white-[0.02] border border-white/5 flex flex-col p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                    <TrendingUp className="w-12 h-12 text-cyan/20" />
                  </div>
                  <span className="text-white/40 text-sm font-medium mb-2">Total Revenue</span>
                  <span className="text-4xl font-bold text-white mb-4">₹24,50,000</span>
                  <div className="mt-auto flex items-end gap-2 h-16">
                    {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan/20 rounded-t-sm" style={{ height: `${h}%` }}>
                        <div className="w-full h-full bg-gradient-to-t from-cyan/10 to-cyan/50 rounded-t-sm" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-5 flex flex-col">
                    <span className="text-white/40 text-sm font-medium mb-2">Active Orders</span>
                    <span className="text-2xl font-bold text-white">142</span>
                  </div>
                  <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-5 flex flex-col">
                    <span className="text-white/40 text-sm font-medium mb-2">Conversion Rate</span>
                    <span className="text-2xl font-bold text-white">4.8%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-cyan/10 to-blue-500/10 border border-cyan/20 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-cyan/20 flex items-center justify-center mb-3">
                    <Store className="w-6 h-6 text-cyan" />
                  </div>
                  <span className="text-cyan font-semibold">Store is Live</span>
                </div>
                <div className="h-48 rounded-2xl bg-white/5 border border-white/5 p-5">
                  <span className="text-white/40 text-sm font-medium mb-4 block">Recent Activity</span>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <div className="h-2 w-full bg-white/10 rounded" />
                          <div className="h-2 w-2/3 bg-white/5 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
