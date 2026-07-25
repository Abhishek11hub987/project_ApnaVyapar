"use client";

import { UserPlus, Palette, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Sign Up",
    desc: "Create your account in under 2 minutes with just your phone number.",
  },
  {
    icon: Palette,
    title: "Customize",
    desc: "Design your store with our intuitive drag-and-drop builder.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Go live instantly and start selling to customers across India.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      // Animate steps
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".step-card"),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate connecting line
      const line = sectionRef.current.querySelector(".connecting-line");
      if (line) {
        gsap.fromTo(
          line,
          { strokeDashoffset: 600 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
    init();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-navy py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Three Steps to Digital Success
          </h2>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2 z-0">
            <svg width="100%" height="4" viewBox="0 0 600 4" preserveAspectRatio="none">
              <line
                className="connecting-line"
                x1="0" y1="2" x2="600" y2="2"
                stroke="rgba(0, 212, 255, 0.3)"
                strokeWidth="2"
                strokeDasharray="600"
                strokeDashoffset="600"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((step, i) => (
              <div key={step.title} className="step-card text-center opacity-0">
                {/* Step number ring */}
                <div className="relative mx-auto mb-6 w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-cyan/10 flex items-center justify-center">
                      <step.icon size={24} className="text-cyan" />
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cyan text-navy-dark text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
