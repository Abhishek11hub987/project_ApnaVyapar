"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;
const FOLDER_PATH = "/frames/hero-sequence";

function padNum(num: number, size: number): string {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Draw frame onto canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find the image, fallback to nearest loaded
    let img = imagesRef.current[index] || null;
    if (!img) {
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (imagesRef.current[index - d]) { img = imagesRef.current[index - d]; break; }
        if (imagesRef.current[index + d]) { img = imagesRef.current[index + d]; break; }
      }
    }
    if (!img) return;

    // Set canvas resolution to match viewport
    const dpr = 1; // Use 1 for performance with 240 frames
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // Cover-fit the image
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  }, []);

  // Preload all frames
  useEffect(() => {
    imagesRef.current = new Array(FRAME_COUNT).fill(null);
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));

        // Mark ready once first 30 frames loaded
        if (loadedCount >= 30) {
          setIsReady(true);
        }

        // Draw frame 0 as soon as it loads
        if (i === 0) {
          drawFrame(0);
        }
      };
      img.src = `${FOLDER_PATH}/frame_${padNum(i + 1, 3)}.jpg`;
    }
  }, [drawFrame]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!isReady || prefersReducedMotion) {
      if (prefersReducedMotion) drawFrame(119);
      return;
    }

    let killed = false;
    let st: any = null;
    let stText: any = null;

    async function init() {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");

      if (killed) return;

      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      // Draw initial frame
      drawFrame(0);

      // Pin the canvas wrapper and scrub through frames
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: canvasWrapperRef.current,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self: any) => {
          const progress = self.progress;
          const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
          }
        },
      });

      // Text overlay timeline synced to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 0-5%: nothing
      // 5-15%: title fades in
      tl.fromTo(".hero-title",
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: "power3.out" },
        0.05
      );
      // 10-18%: tagline fades in
      tl.fromTo(".hero-tagline",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08, ease: "power3.out" },
        0.10
      );
      // 15-22%: CTA fades in
      tl.fromTo(".hero-cta",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.07, ease: "power3.out" },
        0.15
      );
      // 75-85%: everything fades out
      tl.to(".hero-overlay-content",
        { y: -50, opacity: 0, scale: 0.98, duration: 0.1, ease: "power2.in" },
        0.75
      );

      stText = tl.scrollTrigger;
    }

    init();

    return () => {
      killed = true;
      if (st) st.kill();
      if (stText) stText.kill();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, prefersReducedMotion, drawFrame]);

  // Window resize
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* This div gets pinned by GSAP */}
      <div ref={canvasWrapperRef} className="w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Loading state */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-navy">
            <div
              className="w-12 h-12 border-2 border-cyan/30 border-t-cyan rounded-full mb-4"
              style={{ animation: "spin-slow 1s linear infinite" }}
            />
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
              Loading experience...
            </p>
            <div className="mt-3 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan rounded-full transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="mt-2 text-white/30 text-xs">{loadProgress}%</p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Animated visualization of a digital city growing, representing business expansion"
        />

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 z-[2]" />

        {/* Overlay text content */}
        {!prefersReducedMotion && (
          <div className="hero-overlay-content absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
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
