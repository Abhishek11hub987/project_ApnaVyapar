"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

// Configuration
const FRAME_COUNT = 240;
const FOLDER_PATH = "/frames/hero-sequence"; // Inside public directory
const IMAGE_PREFIX = "frame_";
const IMAGE_EXTENSION = ".jpg";

function padStart(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Scroll tracking within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text Animations mapped to scroll progress
  // 0 -> 0.15: Show title
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [50, -50]);

  // 0.3 -> 0.45: Feature 1
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);

  // 0.6 -> 0.75: Feature 2
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.8], [50, -50]);

  // 0.85 -> 1.0: Final Call to Action
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

  // Preload all 240 frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // frame_001.jpg
      const src = `${FOLDER_PATH}/${IMAGE_PREFIX}${padStart(i, 3)}${IMAGE_EXTENSION}`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          // Trigger first render once everything is loaded
          renderFrame(1);
        }
      };
      img.src = src;
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    if (images.length === 0 || !canvasRef.current) return;
    
    // Ensure index is within bounds (1-240)
    const safeIndex = Math.max(1, Math.min(index, FRAME_COUNT));
    const img = images[safeIndex - 1];

    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window for full coverage
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate aspect ratios for "cover" effect (like background-size: cover)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // React to scroll changes and update canvas
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest is 0 to 1. Map to 1 to 240
    const frameIndex = Math.floor(latest * (FRAME_COUNT - 1)) + 1;
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Re-render frame when window resizes
  useEffect(() => {
    const handleResize = () => {
      const latest = scrollYProgress.get();
      const frameIndex = Math.floor(latest * (FRAME_COUNT - 1)) + 1;
      renderFrame(frameIndex);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]); // Dependency on images so it uses the loaded array

  return (
    // The container height determines how long the scroll lasts.
    // 400vh means you have to scroll 4 screen heights to get to the end of the sequence.
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
      
      {/* Sticky wrapper that stays on screen during the 400vh scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Loading Indicator */}
        {loadedCount < FRAME_COUNT && (
          <div className="absolute z-50 text-white/50 text-sm font-medium tracking-widest uppercase">
            Loading Sequence ({Math.floor((loadedCount / FRAME_COUNT) * 100)}%)
          </div>
        )}

        {/* Canvas that draws the frame */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/40" />

        {/* --- SCROLL TRIGGERED TEXT OVERLAYS --- */}
        
        {/* First Text Section */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Start Your First Business.
            <br/>
            <span className="text-teal-400">With AI Guidance.</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Apna Vyapar analyzes your skills, local market, and budget to find the perfect business opportunity.
          </p>
        </motion.div>

        {/* Second Text Section */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Hyper-Local Insights.
          </h2>
          <p className="text-xl text-gray-200 max-w-xl mx-auto">
            Our AI scans real-time demand in your specific city and neighborhood to ensure your business thrives.
          </p>
        </motion.div>

        {/* Third Text Section */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unlock Government Support.
          </h2>
          <p className="text-xl text-gray-200 max-w-xl mx-auto">
            Instantly discover every grant, subsidy, and loan scheme available for your exact profile.
          </p>
        </motion.div>

        {/* Fourth/Final Text Section */}
        <motion.div 
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Ready to Build Your Future?
          </h2>
          <motion.a 
            href="/ideas"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-full font-bold text-lg shadow-[0_0_40px_rgba(20,184,166,0.4)] pointer-events-auto transition-colors"
          >
            Explore Business Ideas
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}
