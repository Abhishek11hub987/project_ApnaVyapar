"use client";

import {
  Package, Share2, BarChart3, Users, FileText, Headphones,
} from "lucide-react";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Real-time stock tracking with low-stock alerts and automatic reorder suggestions.",
  },
  {
    icon: Share2,
    title: "Multi-Channel Selling",
    desc: "Sell on WhatsApp, Instagram, and your own website — all from one dashboard.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Beautiful charts that actually make sense. Track revenue, growth, and customer trends.",
  },
  {
    icon: Users,
    title: "Customer CRM",
    desc: "Know your customers, build lasting relationships, and increase repeat purchases.",
  },
  {
    icon: FileText,
    title: "Automated Invoicing",
    desc: "GST-compliant bills generated automatically. Send via WhatsApp or email instantly.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Real humans, real help, anytime you need. Chat, call, or email — we are always here.",
  },
];

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".feature-card"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    init();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-gradient-to-b from-navy to-navy-light py-24 md:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Platform
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Scale
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg mx-auto">
            A complete digital infrastructure for modern Indian businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card glass-card p-8 opacity-0 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-5 group-hover:bg-cyan/20 transition-colors">
                <f.icon size={22} className="text-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
