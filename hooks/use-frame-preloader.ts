"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;
const FOLDER_PATH = "/frames/hero-sequence";
const CRITICAL_FRAMES = 30;   // Phase 1: load immediately
const STAGGER_FRAMES = 90;    // Phase 2: load with requestIdleCallback

function padStart(num: number, size: number): string {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}

function getFrameSrc(index: number): string {
  return `${FOLDER_PATH}/frame_${padStart(index, 3)}.jpg`;
}

export interface FramePreloaderResult {
  images: (HTMLImageElement | null)[];
  loadedCount: number;
  isReady: boolean;  // true once critical frames are loaded
  progress: number;  // 0 to 100
}

export function useFramePreloader(): FramePreloaderResult {
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const loadFrame = useCallback((index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (imagesRef.current[index]) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        imagesRef.current[index] = img;
        loadedCountRef.current++;
        setLoadedCount(loadedCountRef.current);

        if (loadedCountRef.current >= CRITICAL_FRAMES && !isReady) {
          setIsReady(true);
        }
        resolve();
      };
      img.onerror = () => resolve(); // Don't block on failed frames
      img.src = getFrameSrc(index + 1); // Frames are 1-indexed
    });
  }, [isReady]);

  useEffect(() => {
    let cancelled = false;

    async function preload() {
      // Phase 1: Load critical frames (1-30) immediately, in parallel
      const phase1 = [];
      for (let i = 0; i < CRITICAL_FRAMES && i < FRAME_COUNT; i++) {
        phase1.push(loadFrame(i));
      }
      await Promise.all(phase1);
      if (cancelled) return;

      // Phase 2: Load frames 31-120 with stagger
      for (let i = CRITICAL_FRAMES; i < CRITICAL_FRAMES + STAGGER_FRAMES && i < FRAME_COUNT; i++) {
        if (cancelled) return;
        await loadFrame(i);
        // Small delay to not block main thread
        await new Promise((r) => setTimeout(r, 10));
      }

      // Phase 3: Load remaining frames in background
      for (let i = CRITICAL_FRAMES + STAGGER_FRAMES; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        await loadFrame(i);
        await new Promise((r) => setTimeout(r, 5));
      }
    }

    preload();

    return () => {
      cancelled = true;
    };
  }, [loadFrame]);

  return {
    images: imagesRef.current,
    loadedCount,
    isReady,
    progress: Math.floor((loadedCount / FRAME_COUNT) * 100),
  };
}
