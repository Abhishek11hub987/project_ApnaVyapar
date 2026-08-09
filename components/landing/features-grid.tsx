"use client";

import {
  Package, BarChart3, Users, ListChecks, Lightbulb, Bot
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  { icon: Bot, title: "Vyapar Mitra (AI Assistant)", href: "/p/vyapar-mitra", desc: "24/7 AI business coach for market insights" },
  { icon: Lightbulb, title: "Business Ideas Generator", href: "/p/ideas", desc: "Curated high-profit ideas for India" },
  { icon: ListChecks, title: "Smart Setup Checklist", href: "/p/checklist", desc: "Step-by-step roadmap to launch" },
  { icon: Package, title: "Inventory & Store Builder", href: "/p/store-builder", desc: "Digital storefront in minutes" },
  { icon: BarChart3, title: "Analytics Dashboard", href: "/p/analytics", desc: "Track sales, growth & KPIs" },
  { icon: Users, title: "Customer CRM", href: "/p/crm", desc: "Manage leads and relationships" },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="bg-white py-20 md:py-28 px-4 relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-50/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent-50 border border-accent-200/60 text-accent-700 text-xs font-bold tracking-wide uppercase mb-6">
          Platform Features
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Everything You Need
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-14 font-medium">
          A complete suite of tools designed specifically for Indian entrepreneurs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Link
              href={f.href}
              key={f.title}
              className="flex flex-col items-center text-center bg-surface-secondary border border-gray-100 rounded-3xl shadow-subtle p-8 hover:shadow-elevated hover:border-accent-200 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-accent-500 group-hover:to-accent-600 group-hover:border-accent-500 group-hover:shadow-glow transition-all duration-300">
                <f.icon size={26} className="text-accent-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-400 font-medium">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
