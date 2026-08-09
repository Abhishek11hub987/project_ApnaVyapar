"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FinalCTA } from "@/components/landing/final-cta";
import { Bot, Lightbulb, ListChecks, UserCircle, Heart, GithubIcon, Sparkles, Mail, Package, ShoppingBag, BarChart3 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden font-sans text-gray-900">
      <LandingNavbar />

      {/* Premium Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Ambient Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-accent-400/20 to-transparent blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 text-gray-700 text-sm font-bold mb-8 shadow-sm animate-fade-in-up">
            <Sparkles size={16} className="text-amber-500" />
            Our Vision
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <span className="text-gray-900 mb-2">Built for Bharat.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600 px-2">Free for Everyone.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
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
              <div className="relative rounded-3xl border border-gray-100 bg-white/60 backdrop-blur-xl p-8 lg:p-12 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Bot size={160} className="text-accent-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-accent-50 flex items-center justify-center mb-8 border border-accent-100 shadow-sm">
                  <Bot size={32} className="text-accent-600" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Vyapar Mitra (AI Assistant)</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Running a business is hard. Vyapar Mitra makes it easier. It's your personal 24/7 AI advisor built right into the platform. Ask questions about marketing, taxation, or inventory optimization, and get tailored advice instantly.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-white/40 backdrop-blur-xl border border-gray-100 p-6 shadow-card flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                 <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-100 p-5 relative z-10 shadow-elevated">
                    <div className="flex gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-indigo-500 flex items-center justify-center shadow-md"><Bot size={16} className="text-white"/></div>
                      <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 text-sm font-medium text-gray-700 shadow-sm">
                        Hello! I am Vyapar Mitra. How can I help you scale your business today?
                      </div>
                    </div>
                    <div className="flex gap-3 mb-5 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shadow-md"><UserCircle size={16} className="text-white"/></div>
                      <div className="flex-1 bg-accent-50 border border-accent-100 rounded-2xl rounded-tr-sm p-3.5 text-sm font-medium text-gray-800 text-right shadow-sm">
                        What's the best way to market local handicrafts?
                      </div>
                    </div>
                    <div className="h-12 rounded-full bg-gray-50 border border-gray-100 mt-6 animate-pulse" />
                 </div>
              </div>
            </div>
          </div>

          {/* Ideas Generator */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-white/40 backdrop-blur-xl border border-gray-100 p-6 shadow-card flex flex-col items-center justify-center gap-5 group-hover:-translate-y-2 transition-transform duration-500">
                 <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-100 p-5 relative z-10 shadow-elevated">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-900 font-bold">Cloud Kitchen (Regional Cuisine)</div>
                      <div className="text-accent-600 text-xs font-bold px-2 py-1 bg-accent-50 rounded-md">98% Match</div>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mt-3"><div className="h-full bg-gradient-to-r from-accent-400 to-indigo-500 w-[98%]" /></div>
                 </div>
                 <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-100 p-5 relative z-10 shadow-elevated opacity-75 scale-95">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-gray-900 font-bold">Handmade Organic Soaps</div>
                      <div className="text-indigo-600 text-xs font-bold px-2 py-1 bg-indigo-50 rounded-md">92% Match</div>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mt-3"><div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 w-[92%]" /></div>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl border border-gray-100 bg-white/60 backdrop-blur-xl p-8 lg:p-12 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Lightbulb size={160} className="text-amber-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mb-8 border border-amber-100 shadow-sm">
                  <Lightbulb size={32} className="text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Business Ideas Generator</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Don't know where to start? Tell our AI about your budget, skills, and region. We'll generate a curated list of high-potential business ideas complete with market analysis, required investment, and a step-by-step execution roadmap.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Checklist & Profile */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-gray-100 bg-white/60 backdrop-blur-xl p-8 lg:p-12 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ListChecks size={160} className="text-teal-500" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mb-8 border border-teal-100 shadow-sm">
                  <ListChecks size={32} className="text-teal-600" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Smart Setup Checklist & Profile</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Turn your idea into reality without the overwhelm. Apna Vyapar creates a dynamic, personalized checklist tailored to your specific business type. Track your progress directly from your integrated Digital Profile.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-white/40 backdrop-blur-xl border border-gray-100 p-6 shadow-card flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                 <div className="w-full max-w-sm space-y-4 relative z-10">
                    <div className="w-full rounded-2xl bg-teal-50/50 border border-teal-100 p-5 flex items-center gap-4 shadow-sm opacity-75">
                      <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center shadow-md"><ListChecks size={14} className="text-white"/></div>
                      <span className="text-gray-500 text-sm font-medium line-through">Register Business Name</span>
                    </div>
                    <div className="w-full rounded-2xl bg-white border border-gray-200 p-5 flex items-center gap-4 shadow-elevated scale-105">
                      <div className="w-7 h-7 rounded-full border-2 border-gray-300 bg-gray-50" />
                      <span className="text-gray-900 text-base font-bold">Setup GST & Taxation</span>
                    </div>
                    <div className="w-full rounded-2xl bg-white/80 border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
                      <div className="w-7 h-7 rounded-full border-2 border-gray-200" />
                      <span className="text-gray-500 text-sm font-medium">Add First Product</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-24 px-6 relative bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Dashboard</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need to manage your day-to-day operations seamlessly from one single interface.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center mb-6 border border-indigo-100 group-hover:scale-110 transition-transform shadow-sm">
                <Package size={26} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Inventory Management</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Track stock levels in real-time. Add variations, manage pricing, and receive low-stock alerts before you run out of best-sellers.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-50 to-orange-50 flex items-center justify-center mb-6 border border-accent-100 group-hover:scale-110 transition-transform shadow-sm">
                <ShoppingBag size={26} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Order Processing</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Centralized view of all incoming orders. Change statuses from pending to shipped with a single click and notify your customers automatically.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mb-6 border border-teal-100 group-hover:scale-110 transition-transform shadow-sm">
                <BarChart3 size={26} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Store Analytics</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Visual insights into your sales performance. Identify your top products, monitor daily revenue, and optimize your business strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center mx-auto mb-6 border border-red-100 shadow-sm">
            <Heart size={32} className="text-red-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Open Source & Proud</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
            Apna Vyapar is built by a solo developer (Abhishek Yadav) who believes that technology should enable, not exploit. 
            There are no hidden fees, no vendor lock-ins, and no commissions. 
            If you need any help, have suggestions, or just want to say hi, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:border-gray-900 hover:shadow-md transition-all flex items-center justify-center gap-2">
               <GithubIcon size={20} /> @Abhishek11hub987
            </a>
            <a href="mailto:paradoxhq3@gmail.com" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
               <Mail size={20} /> paradoxhq3@gmail.com
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
      <LandingFooter />
    </main>
  );
}
