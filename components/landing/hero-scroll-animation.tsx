"use client";

import { useEffect, useRef, useState } from "react";
import { useFramePreloader } from "@/hooks/use-frame-preloader";

const FRAME_COUNT = 240;

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { images, isReady, progress } = useFramePreloader();
  const [isPinned, setIsPinned] = useState(true);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Check reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Draw a specific frame onto the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) {
      // Find nearest loaded frame
      let nearest = null;
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (images[index + d]) { nearest = images[index + d]; break; }
        if (images[index - d]) { nearest = images[index - d]; break; }
      }
      if (!nearest) return;
      renderImage(ctx, canvas, nearest);
      return;
    }
    renderImage(ctx, canvas, img);
  };

  const renderImage = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cover fit
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  };

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    if (!isReady || prefersReducedMotion) {
      // For reduced motion, just show frame 120 (middle)
      if (prefersReducedMotion && images[119]) {
        drawFrame(119);
      }
      return;
    }

    let gsapModule: any;
    let ScrollTriggerModule: any;

    async function initGSAP() {
      const gsapPkg = await import("gsap");
      const stPkg = await import("gsap/ScrollTrigger");

      gsapModule = gsapPkg.gsap || gsapPkg.default;
      ScrollTriggerModule = stPkg.ScrollTrigger || stPkg.default;
      gsapModule.registerPlugin(ScrollTriggerModule);

      // Draw first frame immediately
      drawFrame(0);

      // Main hero pin + frame scrub
      ScrollTriggerModule.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self: any) => {
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(self.progress * FRAME_COUNT)
          );

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
          }
        },
        onLeave: () => setIsPinned(false),
        onEnterBack: () => setIsPinned(true),
      });

      // Overlay text animations
      const tl = gsapModule.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // Title: 5% - 22%
      tl.fromTo(
        ".hero-title",
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, ease: "power3.out" },
        0.05
      );
      // Tagline: 12% - 22%
      tl.fromTo(
        ".hero-tagline",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out" },
        0.12
      );
      // CTA: 18% - 22%
      tl.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, ease: "power3.out" },
        0.18
      );
      // Hold static 22% - 75%
      tl.to(".hero-overlay-content", { opacity: 1 }, 0.22);
      // Fade out 75% - 85%
      tl.to(
        ".hero-overlay-content",
        { y: -50, opacity: 0, scale: 0.98, ease: "power2.in" },
        0.75
      );
    }

    initGSAP();

    return () => {
      if (ScrollTriggerModule) {
        ScrollTriggerModule.getAll().forEach((t: any) => t.kill());
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, prefersReducedMotion]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Fixed canvas */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Loading state */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-navy">
            <div className="w-12 h-12 border-2 border-cyan/30 border-t-cyan rounded-full mb-4" style={{ animation: "spin-slow 1s linear infinite" }} />
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
              Loading experience...
            </p>
            <div className="mt-3 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-white/30 text-xs">{progress}%</p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Animated visualization of a digital city growing, representing business expansion"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-[2]" />

        {/* Overlay content */}
        {!prefersReducedMotion && (
          <div
            ref={overlayRef}
            className="hero-overlay-content absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <h1 className="hero-title hero-text-shadow text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-[-0.03em] mb-6 opacity-0">
              Apna Vyapar
            </h1>
            <p className="hero-tagline hero-text-shadow text-lg sm:text-xl md:text-2xl text-white/85 font-normal max-w-2xl opacity-0">
              Your Business, Digitally Transformed
            </p>
            <a
              href="/ideas"
              className="hero-cta mt-10 inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-semibold text-base
                         bg-gradient-to-r from-cyan to-cyan-dark
                         shadow-neon-cyan hover:scale-105 hover:-translate-y-0.5
                         active:scale-[0.98] transition-all duration-300
                         pointer-events-auto focus-ring opacity-0"
            >
              Start Your Journey
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        )}

        {/* Reduced motion fallback */}
        {prefersReducedMotion && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <h1 className="hero-text-shadow text-5xl md:text-7xl font-extrabold text-white tracking-[-0.03em] mb-6">
              Apna Vyapar
            </h1>
            <p className="hero-text-shadow text-xl text-white/85 max-w-2xl">
              Your Business, Digitally Transformed
            </p>
            <a
              href="/ideas"
              className="mt-10 inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-semibold
                         bg-gradient-to-r from-cyan to-cyan-dark shadow-neon-cyan
                         hover:scale-105 transition-all duration-300 focus-ring"
            >
              Start Your Journey →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
