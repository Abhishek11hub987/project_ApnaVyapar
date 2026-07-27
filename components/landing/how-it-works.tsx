"use client";

import { Lightbulb, ListChecks, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Lightbulb,
    title: "Discover Ideas",
    desc: "Use our AI generator to find profitable, tailored business ideas.",
  },
  {
    icon: ListChecks,
    title: "Follow Checklist",
    desc: "Complete your customized setup steps with the help of Vyapar Mitra.",
  },
  {
    icon: Rocket,
    title: "Launch & Grow",
    desc: "Publish your store, manage inventory, and track analytics from one dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Three Steps to Digital Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <step.icon size={24} className="text-accent-500" />
                </div>
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
