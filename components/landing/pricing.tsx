"use client";

import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";

const TIERS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    highlighted: false,
    features: [
      "Basic online store",
      "Up to 50 products",
      "WhatsApp sharing",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Started",
    ctaHref: "/ideas",
    ctaStyle: "border-2 border-white/20 text-white hover:bg-white/10",
  },
  {
    name: "Growth",
    price: "₹999",
    period: "/mo",
    highlighted: true,
    badge: "Popular",
    features: [
      "Everything in Starter",
      "Unlimited products",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Multi-channel selling",
      "CRM integration",
    ],
    cta: "Get Started",
    ctaHref: "/ideas",
    ctaStyle:
      "bg-gradient-to-r from-cyan to-cyan-dark text-white shadow-neon-cyan hover:scale-105",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    highlighted: false,
    features: [
      "Everything in Growth",
      "White-label solution",
      "Dedicated support",
      "Custom API access",
      "SLA guarantee",
      "Onboarding assistance",
    ],
    cta: "Contact Us",
    ctaHref: "/contact",
    ctaStyle: "border-2 border-cyan/40 text-cyan hover:bg-cyan/10",
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".pricing-card"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
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
      id="pricing"
      ref={sectionRef}
      className="bg-navy py-24 md:py-32 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg mx-auto">
            Start free. Upgrade when you are ready to scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card rounded-3xl p-8 md:p-10 opacity-0 relative ${
                tier.highlighted
                  ? "bg-gradient-to-b from-navy-light to-navy border-2 border-cyan/30 md:-translate-y-5 shadow-[0_0_60px_rgba(0,212,255,0.08)]"
                  : "glass-card"
              }`}
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan text-navy-dark text-xs font-bold rounded-full tracking-wider uppercase">
                  {tier.badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-white mb-1">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-white/40 text-sm">{tier.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-white/60"
                  >
                    <Check size={16} className="text-cyan mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`block w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 focus-ring ${tier.ctaStyle}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
