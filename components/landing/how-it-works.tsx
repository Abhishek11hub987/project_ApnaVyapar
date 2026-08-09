"use client";

import { Lightbulb, ListChecks, Store, Bot, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  { 
    icon: Lightbulb, 
    title: "Discover Validated Ideas",
    description: "Browse our curated catalog of high-margin, low-risk business ideas specifically tailored for the Indian market.",
    points: ["Verified Market Data", "Clear Investment Ranges", "Skill Level Matching"]
  },
  { 
    icon: Bot, 
    title: "Consult with Vyapar Mitra",
    description: "Chat with our highly intelligent AI business coach to validate your local market, understand risks, and plan your execution strategy.",
    points: ["24/7 Expert Advice", "Hyper-local Insights", "Financial Modeling"]
  },
  { 
    icon: ListChecks, 
    title: "Execute Step-by-Step",
    description: "Follow the auto-generated, step-by-step interactive checklist to easily handle registrations, licensing, and setups without confusion.",
    points: ["Dynamic Roadmaps", "License Trackers", "Resource Links"]
  },
  { 
    icon: Store, 
    title: "Launch & Grow",
    description: "Once setup is complete, use our integrated dashboard to track sales, manage inventory, and grow your new business flawlessly.",
    points: ["Sales Analytics", "Inventory Management", "Digital Storefront"]
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface-secondary py-24 md:py-32 px-4 relative overflow-hidden border-t border-gray-100">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-20">
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-600 to-accent-500 text-white text-xs font-black tracking-widest uppercase shadow-md mb-6 inline-block">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            From Idea to Enterprise
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            We have engineered a flawless four-step system that completely eliminates the confusion, risk, and guesswork from starting a business in India.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-500 via-accent-300 to-transparent hidden lg:block rounded-full" />

          <div className="space-y-12 lg:space-y-24">
            {STEPS.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={step.title} 
                className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center relative lg:pl-28"
              >
                
                {/* Step Number Indicator */}
                <div className="hidden lg:flex absolute left-8 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-accent-100 items-center justify-center shadow-card z-10">
                  <span className="text-lg font-black text-accent-600">{i + 1}</span>
                </div>

                {/* Mobile Step Indicator */}
                <div className="lg:hidden flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-600 to-accent-500 rounded-full text-white flex items-center justify-center font-black text-sm shadow-md">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-8 group-hover:bg-gradient-to-br group-hover:from-accent-500 group-hover:to-accent-600 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <step.icon size={32} className="text-accent-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="hidden lg:block text-3xl font-extrabold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-500 leading-relaxed mb-8 font-medium">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.points.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-accent-500" />
                        <span className="font-bold text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
