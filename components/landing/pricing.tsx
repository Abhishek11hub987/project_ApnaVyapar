"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Github } from "lucide-react";

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelector(".pricing-card"),
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    init();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="bg-navy py-24 md:py-32 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Radically Free.
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
            We believe digital infrastructure is a fundamental right for small businesses. No paywalls, no subscriptions, no hidden fees.
          </p>
        </div>

        <div className="pricing-card rounded-3xl p-1 md:p-2 bg-gradient-to-b from-cyan/20 to-navy-dark opacity-0">
          <div className="bg-navy rounded-[1.4rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Left side: The pledge */}
              <div>
                <span className="inline-block px-4 py-1 bg-cyan/10 text-cyan text-xs font-bold rounded-full tracking-wider uppercase mb-6 border border-cyan/20">
                  Open Source License
                </span>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  ₹0 <span className="text-lg text-white/40 font-medium tracking-normal">/ forever</span>
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Apna Vyapar is entirely open-source. You get access to every feature immediately, and you can even host it yourself if you prefer.
                </p>
                <Link
                  href="/ideas"
                  className="inline-flex w-full md:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-navy-dark bg-cyan hover:scale-105 transition-all duration-300 shadow-neon-cyan focus-ring"
                >
                  Create Your Account
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full md:w-auto items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus-ring"
                >
                  <Github size={18} />
                  View Source Code
                </a>
              </div>

              {/* Right side: Features included */}
              <div className="bg-navy-light rounded-2xl p-8 border border-white/5">
                <h4 className="text-white font-bold text-lg mb-6 border-b border-white/5 pb-4">
                  Everything is included:
                </h4>
                <ul className="space-y-4">
                  {[
                    "Complete Store Builder",
                    "Unlimited Products & Orders",
                    "Advanced Analytics Dashboard",
                    "Customer CRM",
                    "Automated GST Invoicing",
                    "Self-hosting capabilities"
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-white/70">
                      <div className="mt-1 bg-teal-500/20 rounded-full p-0.5">
                        <Check size={14} className="text-teal-400" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
