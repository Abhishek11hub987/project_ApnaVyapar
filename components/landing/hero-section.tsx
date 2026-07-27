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

        {/* Floating Terminal Mockup */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both w-full max-w-4xl mx-auto mt-16 relative perspective-1000">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent z-20 pointer-events-none" />
          
          <div className="relative rounded-2xl border border-white/10 bg-[#0d1117]/90 backdrop-blur-3xl shadow-2xl shadow-cyan/20 overflow-hidden transform-gpu rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out group font-mono text-left">
            {/* Terminal Header */}
            <div className="flex gap-2 px-4 py-3 items-center border-b border-white/5 bg-[#161b22]/50">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.5)]" />
              <div className="ml-4 text-xs text-white/50 flex-1 flex justify-center items-center gap-2 pr-10 font-medium">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.52-4.477-10-10-10z"/></svg>
                <a href="https://github.com/Abhishek11hub987/project_ApnaVyapar" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">Abhishek11hub987 / project_ApnaVyapar</a>
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 sm:p-8 text-sm sm:text-[15px] leading-relaxed text-white/80 overflow-x-auto pb-16">
              <div className="flex text-cyan-400 font-semibold mb-1">
                <span className="mr-3 text-green-400">➜</span>
                <span className="text-blue-300">~</span>
                <span className="mx-2 text-white/50">git clone</span>
                <span className="text-white/90 break-all">https://github.com/Abhishek11hub987/project_ApnaVyapar.git</span>
              </div>
              <div className="text-white/40 mb-1">Cloning into 'project_ApnaVyapar'...</div>
              <div className="text-white/40 mb-1">remote: Enumerating objects: 1420, done.</div>
              <div className="text-white/40 mb-4">remote: Counting objects: 100% (1420/1420), done.</div>
              
              <div className="flex text-cyan-400 font-semibold mb-1">
                <span className="mr-3 text-green-400">➜</span>
                <span className="text-blue-300">project_ApnaVyapar</span>
                <span className="mx-2 text-white/50">npm</span>
                <span className="text-white/90">install &amp;&amp; npm run dev</span>
              </div>
              <div className="text-green-400 mb-1">✔ Packages installed successfully.</div>
              <div className="text-[#ffbd2e] mb-2 font-bold">▲ Next.js 14.1.0</div>
              <div className="text-white/70">- Local:        <span className="text-cyan underline decoration-cyan/30 underline-offset-4">http://localhost:3000</span></div>
              <div className="text-white/70 mb-4">- Environments: <span className="text-white/90 font-semibold">.env.local loaded</span></div>
              <div className="text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-[400ms]">
                ✨ Ready in 1250ms. Your free e-commerce platform is running.
              </div>
            </div>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
