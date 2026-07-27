"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Package, Smartphone, BarChart3, Zap, Globe, Layers, Users, Unlock } from "lucide-react";
import { FinalCTA } from "@/components/landing/final-cta";

export default function FeaturesPage() {
  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden font-sans text-gray-900">
      <LandingNavbar />

      {/* Hero Section for Features */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-500 text-sm font-semibold mb-6">
            <Zap size={16} />
            Everything you need to grow
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Powerful Features, <br />
            <span className="text-gray-900">Zero Compromises.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Apna Vyapar gives you enterprise-grade tools without the enterprise price tag. 
            Manage your store, track inventory, and scale your business effortlessly.
          </p>
        </div>
      </section>

      {/* Deep Dive Features - Alternating Blocks */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-lg border border-gray-200 bg-white p-8 lg:p-12 overflow-hidden shadow-card">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Globe size={120} className="text-gray-300" />
                </div>
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 border border-gray-200">
                  <Globe size={32} className="text-gray-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Stunning Digital Storefronts</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Create a beautiful, mobile-optimized ecommerce website in minutes. No coding required. 
                  Choose from our premium themes designed specifically for high conversions in the Indian market.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Mobile-first responsive design</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Custom domains &amp; SSL included</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Drag-and-drop customization</li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-white border border-gray-200 p-4 shadow-card flex items-center justify-center">
                 <div className="absolute inset-0 bg-gray-50" />
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-sm rounded-lg bg-white border border-gray-100 p-4 relative z-10 shadow-card transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100" />
                      <div className="flex gap-2">
                        <div className="w-16 h-2 rounded bg-gray-200" />
                        <div className="w-8 h-2 rounded bg-gray-200" />
                      </div>
                    </div>
                    <div className="w-full h-32 rounded-lg bg-gray-100 mb-4" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 rounded-lg bg-gray-50" />
                      <div className="h-24 rounded-lg bg-gray-50" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-white border border-gray-200 p-4 shadow-card flex items-center justify-center">
                 <div className="absolute inset-0 bg-gray-50" />
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-md rounded-lg bg-white border border-gray-100 p-6 relative z-10 shadow-card transform-gpu rotate-y-[10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    <div className="flex items-end gap-3 mb-6 h-32 border-b border-gray-100 pb-4">
                      {[40, 65, 45, 90, 75, 100, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-gray-200 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Total Sales</div>
                        <div className="text-2xl font-bold">₹8,45,200</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">+24.5%</div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg border border-gray-200 bg-white p-8 lg:p-12 overflow-hidden shadow-card">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <BarChart3 size={120} className="text-gray-300" />
                </div>
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 border border-gray-200">
                  <BarChart3 size={32} className="text-gray-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Intelligent Analytics</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Stop guessing and start growing. Our built-in analytics dashboard gives you real-time insights into your sales, best-performing products, and customer behavior.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Real-time revenue tracking</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Customer conversion funnels</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Automated daily reports</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-lg border border-gray-200 bg-white p-8 lg:p-12 overflow-hidden shadow-card">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Package size={120} className="text-gray-300" />
                </div>
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 border border-gray-200">
                  <Package size={32} className="text-gray-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Effortless Inventory</h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Never oversell again. Manage thousands of SKUs across multiple locations with bulk editing, low stock alerts, and automated reorder suggestions.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Centralized stock control</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Low stock notifications</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> CSV bulk import/export</li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-white border border-gray-200 p-4 shadow-card flex items-center justify-center">
                 <div className="absolute inset-0 bg-gray-50" />
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-sm space-y-3 relative z-10 transform-gpu rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="w-full rounded-lg bg-white border border-gray-100 p-4 flex items-center gap-4 shadow-card">
                        <div className="w-12 h-12 rounded-lg bg-gray-100" />
                        <div className="flex-1">
                          <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                          <div className="h-2 w-16 bg-gray-100 rounded" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">42 in stock</div>
                          <div className="text-xs text-green-600">Available</div>
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
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">And so much more...</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need is built right in.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Mobile Optimized", desc: "Manage your store on the go." },
              { icon: Users, title: "Community Driven", desc: "Built for and by Indian merchants." },
              { icon: Layers, title: "Theme Customization", desc: "Make it truly yours." },
              { icon: Unlock, title: "No Vendor Lock-in", desc: "Your data belongs to you." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-lg bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-4">
                  <f.icon size={20} />
                </div>
                <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-gray-500 text-sm">{f.desc}</p>
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
