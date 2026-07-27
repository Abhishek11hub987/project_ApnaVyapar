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

        {/* Open Source Highlights */}
        <div className="animate-in fade-in duration-1000 delay-700 fill-mode-both mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-white/70 text-sm font-medium">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <span>100% Free & Open Source</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center border border-cyan/30">
              <Users size={14} className="text-cyan-light" />
            </div>
            <span>Community Driven</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <svg className="w-3.5 h-3.5 text-purple-300" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.52-4.477-10-10-10z"/></svg>
            </div>
            <span>No Vendor Lock-in</span>
          </div>
        </div>

        {/* Premium Bento Grid - Real Insights */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both w-full max-w-5xl mx-auto mt-20 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="md:col-span-2 relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md p-8 overflow-hidden group hover:border-cyan/30 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#cyan-grad)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00d2ff" /><stop offset="100%" stopColor="#3a7bd5" /></linearGradient></defs><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Free Forever</h3>
              <p className="text-white/60 leading-relaxed max-w-md">
                Unlike other platforms that charge hefty monthly fees or take a cut of your sales, Apna Vyapar is completely free. We believe every Indian merchant deserves world-class digital tools without the premium price tag.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">0% Commission</div>
                <div className="px-4 py-2 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan text-sm font-medium">Unlimited Products</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-bl from-white/5 to-transparent backdrop-blur-md p-8 overflow-hidden group hover:border-purple-500/30 transition-colors">
              <div className="absolute -bottom-4 -right-4 p-8 opacity-10 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-110">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Own Your Data</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                As an open-source project, you are never locked in. Your customer data, inventory, and analytics belong entirely to you. Host it anywhere or use our managed service.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-md p-8 overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Built by India,<br/>For India</h3>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-sm">
                Supported by a passionate community of developers. Constant updates, deep integrations with Indian payment gateways, and WhatsApp support out of the box.
              </p>
            </div>

            {/* Card 4 */}
            <div className="md:col-span-2 relative rounded-3xl border border-white/10 bg-[#0a192f]/80 backdrop-blur-md p-8 overflow-hidden group hover:border-cyan/30 transition-colors flex flex-col justify-center items-center text-center">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Transparent Open Source</h3>
              <p className="text-white/60 max-w-lg mb-6 relative z-10">
                You can audit every line of code. We have nothing to hide. Join our community on GitHub to request features or report bugs directly to the creators.
              </p>
              <a href="https://github.com/Abhishek11hub987/project_ApnaVyapar" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.52-4.477-10-10-10z"/></svg>
                View on GitHub
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
