"use client";

import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".principle-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".principles-grid"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    init();
  }, []);

  return (
    <section ref={sectionRef} className="bg-navy-light py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Our Commitment
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Built by the Community, for the Community
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Apna Vyapar is an open-source movement to digitize Indian businesses without corporate greed. Honest code, honest growth.
          </p>
        </div>

        {/* Open Source Principles */}
        <div className="principles-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="principle-card glass-card p-8 opacity-0 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 group-hover:bg-cyan/20 transition-colors">
                <p.icon size={28} className="text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
