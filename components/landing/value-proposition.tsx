"use client";

import { Globe, TrendingUp, Shield } from "lucide-react";
import { useEffect, useRef } from "react";

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
    title: "Secure Payments",
    desc: "Bank-grade encryption for every transaction. UPI, cards, and net banking supported.",
  },
];

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initAnimations() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!cardsRef.current) return;

      gsap.fromTo(
        cardsRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    initAnimations();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Subtle gradient transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Why Apna Vyapar
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            From Local Shop to{" "}
            <span className="bg-gradient-to-r from-cyan to-cyan-dark bg-clip-text text-transparent">
              Global Empire
            </span>
          </h2>
          <p className="mt-4 text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Apna Vyapar gives small businesses the digital infrastructure
            previously reserved for giants.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {CARDS.map((card) => (
            <div key={card.title} className="glass-card p-8 md:p-10 group">
              <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 animate-float">
                <card.icon size={28} className="text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
