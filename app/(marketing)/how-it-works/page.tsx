"use client";

import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HowItWorksPage() {
  return (
    <main className="bg-white min-h-screen pt-24">
      <LandingNavbar />
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center px-4 py-16 md:py-24">
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
