"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Package, Smartphone, BarChart3, ShieldCheck, Zap, Globe, Layers, ArrowRight, Users, Unlock } from "lucide-react";
import Link from "next/link";
import { FinalCTA } from "@/components/landing/final-cta";

export default function FeaturesPage() {
  return (
    <main className="bg-navy min-h-screen overflow-x-hidden font-sans text-white">
      <LandingNavbar />

      {/* Hero Section for Features */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-semibold mb-6">
            <Zap size={16} />
            Everything you need to grow
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Powerful Features, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-blue-500 drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]">Zero Compromises.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Apna Vyapar gives you enterprise-grade tools without the enterprise price tag. 
            Manage your store, track inventory, and scale your business effortlessly.
          </p>
        </div>
      </section>

      {/* Deep Dive Features - Alternating Blocks */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-8 lg:p-12 overflow-hidden hover:border-cyan/30 transition-colors shadow-2xl shadow-black/50">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Globe size={120} className="text-cyan" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-cyan/20 flex items-center justify-center mb-8 border border-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                  <Globe size={32} className="text-cyan" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Stunning Digital Storefronts</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Create a beautiful, mobile-optimized ecommerce website in minutes. No coding required. 
                  Choose from our premium themes designed specifically for high conversions in the Indian market.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan" /> Mobile-first responsive design</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan" /> Custom domains & SSL included</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan" /> Drag-and-drop customization</li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-[#0a192f] border border-white/10 p-4 shadow-2xl flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-blue-600/10" />
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md relative z-10 shadow-2xl transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                      <div className="w-8 h-8 rounded-full bg-cyan/20" />
                      <div className="flex gap-2">
                        <div className="w-16 h-2 rounded bg-white/20" />
                        <div className="w-8 h-2 rounded bg-white/20" />
                      </div>
                    </div>
                    <div className="w-full h-32 rounded-xl bg-gradient-to-r from-cyan/20 to-blue-500/20 mb-4" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 rounded-lg bg-white/5" />
                      <div className="h-24 rounded-lg bg-white/5" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-[#0a192f] border border-white/10 p-4 shadow-2xl flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-pink-600/10" />
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-md rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative z-10 shadow-2xl transform-gpu rotate-y-[10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    <div className="flex items-end gap-3 mb-6 h-32 border-b border-white/10 pb-4">
                      {[40, 65, 45, 90, 75, 100, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-purple-500/20 to-purple-400/50 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white/40 text-sm mb-1">Total Sales</div>
                        <div className="text-2xl font-bold text-white">₹8,45,200</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">+24.5%</div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-bl from-white/5 to-transparent backdrop-blur-sm p-8 lg:p-12 overflow-hidden hover:border-purple-500/30 transition-colors shadow-2xl shadow-black/50">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <BarChart3 size={120} className="text-purple-400" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <BarChart3 size={32} className="text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Intelligent Analytics</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Stop guessing and start growing. Our built-in analytics dashboard gives you real-time insights into your sales, best-performing products, and customer behavior.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Real-time revenue tracking</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Customer conversion funnels</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Automated daily reports</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-sm p-8 lg:p-12 overflow-hidden hover:border-green-500/30 transition-colors shadow-2xl shadow-black/50">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Package size={120} className="text-green-400" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-8 border border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                  <Package size={32} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Effortless Inventory</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Never oversell again. Manage thousands of SKUs across multiple locations with bulk editing, low stock alerts, and automated reorder suggestions.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Centralized stock control</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Low stock notifications</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> CSV bulk import/export</li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-[#0a192f] border border-white/10 p-4 shadow-2xl flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-emerald-600/10" />
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-sm space-y-3 relative z-10 transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="w-full rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 backdrop-blur-md shadow-xl">
                        <div className="w-12 h-12 rounded-lg bg-white/10" />
                        <div className="flex-1">
                          <div className="h-3 w-24 bg-white/20 rounded mb-2" />
                          <div className="h-2 w-16 bg-white/10 rounded" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">42 in stock</div>
                          <div className="text-xs text-green-400">Available</div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid Quick Look */}
      <section className="py-20 px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">And so much more...</h2>
            <p className="text-white/50 max-w-xl mx-auto">Everything you need is built right in.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Mobile Optimized", desc: "Manage your store on the go." },
              { icon: Users, title: "Community Driven", desc: "Built for and by Indian merchants." },
              { icon: Layers, title: "Theme Customization", desc: "Make it truly yours." },
              { icon: Unlock, title: "No Vendor Lock-in", desc: "Your data belongs to you." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cyan/10 text-cyan flex items-center justify-center mb-4">
                  <f.icon size={20} />
                </div>
                <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <LandingFooter />
    </main>
  );
}
