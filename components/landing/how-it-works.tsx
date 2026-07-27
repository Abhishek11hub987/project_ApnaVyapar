"use client";

import { Lightbulb, ListChecks, Rocket } from "lucide-react";

const STEPS = [
  { icon: Lightbulb, title: "Discover Ideas" },
  { icon: ListChecks, title: "Follow Checklist" },
  { icon: Rocket, title: "Launch & Grow" },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-14">
          Three Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="relative mb-5">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <step.icon size={24} className="text-accent-500" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
