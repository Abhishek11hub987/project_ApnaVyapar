"use client";

import {
  Package, BarChart3, Users, ListChecks, Lightbulb, Bot
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Bot,
    title: "Vyapar Mitra (AI Assistant)",
    desc: "Your personal 24/7 AI business advisor to help you grow, manage, and scale your operations.",
    slug: "vyapar-mitra",
  },
  {
    icon: Lightbulb,
    title: "Business Ideas Generator",
    desc: "Discover profitable, tailored business ideas with complete roadmaps based on your skills and budget.",
    slug: "ideas",
  },
  {
    icon: ListChecks,
    title: "Smart Setup Checklist",
    desc: "A personalized step-by-step guide to get your business legally registered, funded, and launched.",
    slug: "checklist",
  },
  {
    icon: Package,
    title: "Inventory & Store Builder",
    desc: "Real-time stock tracking with a drag-and-drop store builder to create beautiful storefronts.",
    slug: "store-builder",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Beautiful charts that actually make sense. Track revenue, growth, and customer trends.",
    slug: "analytics",
  },
  {
    icon: Users,
    title: "Customer CRM",
    desc: "Manage your customer relationships, track orders, and send personalized communications.",
    slug: "crm",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="bg-gray-50 py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Platform
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Everything You Need to Scale
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            A complete digital infrastructure for modern Indian businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Link
              href={`/p/${f.slug}`}
              key={f.title}
              className="bg-white border border-gray-100 rounded-lg shadow-card p-6 hover:shadow-elevated hover:border-gray-200 transition-all duration-200 group block"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <f.icon size={20} className="text-accent-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
