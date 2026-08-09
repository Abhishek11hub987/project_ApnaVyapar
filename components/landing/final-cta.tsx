"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Full gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-500 to-accent-400" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Ready to Start?
        </h2>
        <p className="text-lg text-white/80 font-medium mb-10 max-w-lg mx-auto">
          Join thousands of Indian entrepreneurs who are building their dream businesses with Apna Vyapar.
        </p>
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-accent-700 font-bold text-lg hover:bg-white/90 hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
        >
          Get Started Free <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
