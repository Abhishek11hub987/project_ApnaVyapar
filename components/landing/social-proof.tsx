"use client";

import { Code2, ShieldCheck, HeartHandshake } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Code2,
    title: "100% Open Source",
    desc: "Built in public. You can inspect the code, host it yourself, or contribute to making it better for everyone.",
  },
  {
    icon: ShieldCheck,
    title: "No Vendor Lock-in",
    desc: "Your data belongs to you. Export your customers, inventory, and analytics at any time with a single click.",
  },
  {
    icon: HeartHandshake,
    title: "Community Driven",
    desc: "Features are built based on what real Indian businesses need, not what looks good on a corporate roadmap.",
  },
];

export function SocialProof() {
  return (
    <section className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Our Commitment
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Built by the Community, for the Community
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Apna Vyapar is an open-source movement to digitize Indian businesses without corporate greed. Honest code, honest growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-white border border-gray-100 rounded-lg shadow-card p-8 hover:shadow-elevated hover:border-gray-200 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                <p.icon size={24} className="text-accent-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
