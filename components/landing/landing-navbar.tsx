"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan to-cyan-dark rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold text-sm tracking-tighter">AV</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Apna Vyapar
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors focus-ring">
            Features
          </a>
          <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors focus-ring">
            Pricing
          </a>
          <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors focus-ring">
            How it Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link
              href="/?login=true"
              className="text-sm text-white/70 hover:text-white transition-colors font-medium focus-ring"
            >
              Log in
            </Link>
          )}
          <Link
            href="/ideas"
            className="text-sm font-semibold bg-gradient-to-r from-cyan to-cyan-dark text-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-neon-cyan focus-ring"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
