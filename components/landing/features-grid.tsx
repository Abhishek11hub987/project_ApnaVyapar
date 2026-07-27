"use client";

import {
  Package, BarChart3, Users, ListChecks, Lightbulb, Bot
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  { icon: Bot, title: "Vyapar Mitra (AI Assistant)", slug: "vyapar-mitra" },
  { icon: Lightbulb, title: "Business Ideas Generator", slug: "ideas" },
  { icon: ListChecks, title: "Smart Setup Checklist", slug: "checklist" },
  { icon: Package, title: "Inventory & Store Builder", slug: "store-builder" },
  { icon: BarChart3, title: "Analytics Dashboard", slug: "analytics" },
  { icon: Users, title: "Customer CRM", slug: "crm" },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="bg-gray-50 py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-14">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Link
              href={`/p/${f.slug}`}
              key={f.title}
              className="bg-white border border-gray-100 rounded-lg shadow-card p-6 hover:shadow-elevated hover:border-gray-200 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <f.icon size={20} className="text-accent-500" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
