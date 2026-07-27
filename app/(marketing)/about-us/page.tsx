"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FinalCTA } from "@/components/landing/final-cta";
import { Bot, Lightbulb, ListChecks, UserCircle, Heart, GithubIcon, Sparkles, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-navy min-h-screen overflow-x-hidden font-sans text-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-semibold mb-6">
            <Sparkles size={16} />
            Our Vision
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 flex flex-col items-center">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-2">Built for Bharat.</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-blue-500 drop-shadow-[0_0_30px_rgba(0,212,255,0.3)] px-2">Free for Everyone.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Apna Vyapar is an open-source initiative designed to democratize digital commerce in India. 
            We provide enterprise-grade tools, powered by AI, completely free of charge.
          </p>
        </div>
      </section>

      {/* Core AI & Integrated Features */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Vyapar Mitra */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-8 lg:p-12 overflow-hidden hover:border-cyan/30 transition-colors shadow-2xl shadow-black/50">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Bot size={120} className="text-cyan" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-cyan/20 flex items-center justify-center mb-8 border border-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                  <Bot size={32} className="text-cyan" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Vyapar Mitra (AI Assistant)</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Running a business is hard. Vyapar Mitra makes it easier. It's your personal 24/7 AI advisor built right into the platform. Ask questions about marketing, taxation, or inventory optimization, and get tailored advice instantly.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-[#0a192f] border border-white/10 p-6 shadow-2xl flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-blue-600/10" />
                 <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md relative z-10 shadow-2xl transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center"><Bot size={16} className="text-cyan"/></div>
                      <div className="flex-1 bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-white/80">
                        Hello! I am Vyapar Mitra. How can I help you scale your business today?
                      </div>
                    </div>
                    <div className="flex gap-3 mb-4 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><UserCircle size={16} className="text-blue-400"/></div>
                      <div className="flex-1 bg-blue-500/20 rounded-2xl rounded-tr-none p-3 text-sm text-white/80 text-right">
                        What's the best way to market local handicrafts?
                      </div>
                    </div>
                    <div className="h-10 rounded-full bg-white/5 border border-white/10 mt-6" />
                 </div>
              </div>
            </div>
          </div>

          {/* Ideas Generator */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-[#0a192f] border border-white/10 p-6 shadow-2xl flex flex-col items-center justify-center gap-4">
                 <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-pink-600/10" />
                 <div className="w-full max-w-sm rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-md relative z-10 transform-gpu translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                    <div className="text-purple-400 text-sm font-bold mb-1">Idea Match 98%</div>
                    <div className="text-white font-semibold mb-2">Cloud Kitchen (Regional Cuisine)</div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-purple-400 w-[98%]" /></div>
                 </div>
                 <div className="w-full max-w-sm rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-md relative z-10 transform-gpu -translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                    <div className="text-pink-400 text-sm font-bold mb-1">Idea Match 92%</div>
                    <div className="text-white font-semibold mb-2">Handmade Organic Soaps</div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-pink-400 w-[92%]" /></div>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-bl from-white/5 to-transparent backdrop-blur-sm p-8 lg:p-12 overflow-hidden hover:border-purple-500/30 transition-colors shadow-2xl shadow-black/50">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Lightbulb size={120} className="text-purple-400" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Lightbulb size={32} className="text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Business Ideas Generator</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Don't know where to start? Tell our AI about your budget, skills, and region. We'll generate a curated list of high-potential business ideas complete with market analysis, required investment, and a step-by-step execution roadmap.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Checklist & Profile */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-sm p-8 lg:p-12 overflow-hidden hover:border-green-500/30 transition-colors shadow-2xl shadow-black/50">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <ListChecks size={120} className="text-green-400" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-8 border border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                  <ListChecks size={32} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Smart Setup Checklist & Profile</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Turn your idea into reality without the overwhelm. Apna Vyapar creates a dynamic, personalized checklist tailored to your specific business type. Track your progress directly from your integrated Digital Profile.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-[#0a192f] border border-white/10 p-6 shadow-2xl flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-emerald-600/10" />
                 <div className="w-full max-w-sm space-y-3 relative z-10 transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    <div className="w-full rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 backdrop-blur-md">
                      <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center"><ListChecks size={14} className="text-white"/></div>
                      <span className="text-white text-sm line-through opacity-50">Register Business Name</span>
                    </div>
                    <div className="w-full rounded-xl bg-white/10 border border-green-500/50 p-4 flex items-center gap-4 backdrop-blur-md shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                      <div className="w-6 h-6 rounded border border-white/20" />
                      <span className="text-white text-sm font-semibold">Setup GST & Taxation</span>
                    </div>
                    <div className="w-full rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 backdrop-blur-md">
                      <div className="w-6 h-6 rounded border border-white/20" />
                      <span className="text-white text-sm opacity-80">Add First Product</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Heart size={32} className="text-red-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Open Source & Proud</h2>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            Apna Vyapar is built by a solo developer (Abhishek Yadav) who believes that technology should enable, not exploit. 
            There are no hidden fees, no vendor lock-ins, and no commissions. 
            If you need any help, have suggestions, or just want to say hi, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
               <GithubIcon size={18} /> @Abhishek11hub987
            </a>
            <a href="mailto:paradoxhq3@gmail.com" className="px-6 py-3 rounded-xl bg-cyan text-navy-dark font-bold hover:scale-105 transition-transform shadow-neon-cyan flex items-center gap-2">
               <Mail size={18} /> paradoxhq3@gmail.com
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
      <LandingFooter />
    </main>
  );
}
