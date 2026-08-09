"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FinalCTA } from "@/components/landing/final-cta";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <main className="bg-white min-h-screen pt-24">
      <LandingNavbar />
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center px-4 py-16 md:py-24 relative">
        <div className="absolute top-8 left-4 md:left-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-accent-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-gray-200">
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          How Apna Vyapar Works
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          We have simplified the process of taking your business online. Follow these three simple steps to start, manage, and grow your digital store.
        </p>
      </div>

      {/* Core Component */}
      <HowItWorks />

      {/* Final Call to Action */}
      <FinalCTA />

      <LandingFooter />
    </main>
  );
}
