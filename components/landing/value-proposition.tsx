"use client";

import { Globe, TrendingUp, Shield } from "lucide-react";

const CARDS = [
  {
    icon: Globe,
    title: "Digital Store",
    desc: "Setup your online store in minutes with our drag-and-drop builder. No coding required.",
  },
  {
    icon: TrendingUp,
    title: "Smart Growth",
    desc: "AI-powered insights that predict trends and help you make data-driven decisions.",
  },
  {
    icon: Shield,
    title: "Complete Security",
    desc: "Built-in encryption and safety protocols to protect you and your customers out of the box.",
  },
];

export function ValueProposition() {
  return (
    <section className="bg-gray-50 py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Why Apna Vyapar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            From Local Shop to Global Empire
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Apna Vyapar gives small businesses the digital infrastructure previously reserved for giants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div key={card.title} className="bg-white border border-gray-100 rounded-lg shadow-card p-8 hover:shadow-elevated hover:border-gray-200 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                <card.icon size={24} className="text-accent-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
