"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const STATS = [
  { label: "GMV Processed", value: 500, prefix: "₹", suffix: "Cr+" },
  { label: "Merchants", value: 50000, prefix: "", suffix: "+" },
  { label: "Uptime", value: 99.9, prefix: "", suffix: "%" },
  { label: "Rating", value: 4.9, prefix: "", suffix: "★" },
];

const TESTIMONIALS = [
  {
    quote: "Apna Vyapar transformed my kirana store into a digital powerhouse. My sales doubled in just 2 months.",
    name: "Rajesh Kumar",
    location: "Mumbai",
    role: "Kirana Store Owner",
  },
  {
    quote: "I went from zero online presence to 200 orders a day in 3 weeks. The AI insights are incredibly accurate.",
    name: "Priya Sharma",
    location: "Bangalore",
    role: "Fashion Boutique Owner",
  },
  {
    quote: "The GST invoicing alone saves me 4 hours every week. Best business decision I have ever made.",
    name: "Amit Patel",
    location: "Ahmedabad",
    role: "Electronics Retailer",
  },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const isDecimal = value % 1 !== 0;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * value;
            setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatted = value >= 1000
    ? display.toLocaleString("en-IN")
    : display.toString();

  return (
    <span ref={ref} className="stat-number">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".testimonial-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".testimonials-grid"),
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
            Social Proof
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Trusted by 50,000+ Businesses
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-card glass-card p-8 opacity-0"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/40 text-xs">
                  {t.role} &middot; {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
