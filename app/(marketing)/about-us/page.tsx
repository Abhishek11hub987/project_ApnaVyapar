"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FinalCTA } from "@/components/landing/final-cta";
import { Bot, Lightbulb, ListChecks, UserCircle, Heart, GithubIcon, Sparkles, Mail, Package, ShoppingBag, BarChart3 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden font-sans text-gray-900">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-500 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            Our Vision
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 flex flex-col items-center">
            <span className="text-gray-900 mb-2">Built for Bharat.</span>
            <span className="text-gray-600 px-2">Free for Everyone.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
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
              <div className="relative rounded-lg border border-gray-100 bg-white p-8 lg:p-12 overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Bot size={120} className="text-gray-300" />
                </div>
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 border border-gray-200">
                  <Bot size={32} className="text-gray-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Vyapar Mitra (AI Assistant)</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Running a business is hard. Vyapar Mitra makes it easier. It's your personal 24/7 AI advisor built right into the platform. Ask questions about marketing, taxation, or inventory optimization, and get tailored advice instantly.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden aspect-square bg-white border border-gray-100 p-6 shadow-sm flex items-center justify-center">
                 <div className="w-full max-w-sm rounded-lg bg-white border border-gray-100 p-4 relative z-10 shadow-sm">
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Bot size={16} className="text-gray-500"/></div>
                      <div className="flex-1 bg-gray-50 rounded-lg rounded-tl-none p-3 text-sm text-gray-600">
                        Hello! I am Vyapar Mitra. How can I help you scale your business today?
                      </div>
                    </div>
                    <div className="flex gap-3 mb-4 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><UserCircle size={16} className="text-gray-500"/></div>
                      <div className="flex-1 bg-gray-100 rounded-lg rounded-tr-none p-3 text-sm text-gray-600 text-right">
                        What's the best way to market local handicrafts?
                      </div>
                    </div>
                    <div className="h-10 rounded-full bg-gray-50 border border-gray-100 mt-6" />
                 </div>
              </div>
            </div>
          </div>

          {/* Ideas Generator */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden aspect-square bg-white border border-gray-100 p-6 shadow-sm flex flex-col items-center justify-center gap-4">
                 <div className="w-full max-w-sm rounded-lg bg-white border border-gray-100 p-4 relative z-10">
                    <div className="text-gray-500 text-sm font-bold mb-1">Idea Match 98%</div>
                    <div className="text-gray-800 font-semibold mb-2">Cloud Kitchen (Regional Cuisine)</div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gray-400 w-[98%]" /></div>
                 </div>
                 <div className="w-full max-w-sm rounded-lg bg-white border border-gray-100 p-4 relative z-10">
                    <div className="text-gray-500 text-sm font-bold mb-1">Idea Match 92%</div>
                    <div className="text-gray-800 font-semibold mb-2">Handmade Organic Soaps</div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gray-400 w-[92%]" /></div>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg border border-gray-100 bg-white p-8 lg:p-12 overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Lightbulb size={120} className="text-gray-300" />
                </div>
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 border border-gray-200">
                  <Lightbulb size={32} className="text-gray-500" />
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
              <div className="relative rounded-lg border border-gray-100 bg-white p-8 lg:p-12 overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ListChecks size={120} className="text-gray-300" />
                </div>
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 border border-gray-200">
                  <ListChecks size={32} className="text-gray-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Smart Setup Checklist & Profile</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Turn your idea into reality without the overwhelm. Apna Vyapar creates a dynamic, personalized checklist tailored to your specific business type. Track your progress directly from your integrated Digital Profile.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden aspect-square bg-white border border-gray-100 p-6 shadow-sm flex items-center justify-center">
                 <div className="w-full max-w-sm space-y-3 relative z-10">
                    <div className="w-full rounded-lg bg-white border border-gray-100 p-4 flex items-center gap-4">
                      <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center"><ListChecks size={14} className="text-white"/></div>
                      <span className="text-gray-500 text-sm line-through">Register Business Name</span>
                    </div>
                    <div className="w-full rounded-lg bg-gray-50 border border-gray-200 p-4 flex items-center gap-4">
                      <div className="w-6 h-6 rounded border border-gray-300" />
                      <span className="text-gray-800 text-sm font-semibold">Setup GST & Taxation</span>
                    </div>
                    <div className="w-full rounded-lg bg-white border border-gray-100 p-4 flex items-center gap-4">
                      <div className="w-6 h-6 rounded border border-gray-200" />
                      <span className="text-gray-500 text-sm">Add First Product</span>
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
            <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6 border border-gray-200">
                <Package size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Inventory Management</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Track stock levels in real-time. Add variations, manage pricing, and receive low-stock alerts before you run out of best-sellers.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6 border border-gray-200">
                <ShoppingBag size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Order Processing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Centralized view of all incoming orders. Change statuses from pending to shipped with a single click and notify your customers automatically.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6 border border-gray-200">
                <BarChart3 size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Store Analytics</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Visual insights into your sales performance. Identify your top products, monitor daily revenue, and optimize your business strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-6 border border-gray-200">
            <Heart size={32} className="text-gray-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Open Source & Proud</h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Apna Vyapar is built by a solo developer (Abhishek Yadav) who believes that technology should enable, not exploit. 
            There are no hidden fees, no vendor lock-ins, and no commissions. 
            If you need any help, have suggestions, or just want to say hi, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-white border border-gray-100 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
               <GithubIcon size={18} /> @Abhishek11hub987
            </a>
            <a href="mailto:paradoxhq3@gmail.com" className="px-6 py-3 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
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
