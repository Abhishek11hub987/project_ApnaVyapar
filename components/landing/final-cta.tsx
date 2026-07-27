"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Text entrance animation
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".cta-animate"),
        { y: 50, opacity: 0 },
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
      ref={sectionRef}
      className="relative bg-gradient-to-b from-navy-light via-navy to-navy py-32 md:py-40 px-4 overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="cta-animate text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 opacity-0">
          Ready to Transform{" "}
          <span className="bg-gradient-to-r from-cyan to-cyan-dark bg-clip-text text-transparent">
            Your Business?
          </span>
        </h2>
        <p className="cta-animate text-white/50 text-lg max-w-xl mx-auto mb-10 opacity-0">
          Join 50,000+ merchants already growing with Apna Vyapar. Start free, no credit card required.
        </p>
        <Link
          href="/p/ideas"
          className="cta-animate inline-flex items-center gap-2 px-12 py-5 rounded-full text-white font-bold text-lg
                     bg-gradient-to-r from-cyan to-cyan-dark
                     animate-pulse-glow hover:scale-105
                     active:scale-[0.98] transition-all duration-300
                     focus-ring opacity-0"
        >
          Get Started Free
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
}
