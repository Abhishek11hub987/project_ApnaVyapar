"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesGrid } from "@/components/landing/features-grid";

import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNavbar } from "@/components/landing/landing-navbar";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* Fixed navbar — landing-only, no app header */}
      <LandingNavbar />

      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: Features Grid */}
      <FeaturesGrid />



      {/* Section 4: Final CTA */}
      <FinalCTA />

      {/* Section 5: Footer */}
      <LandingFooter />
    </main>
  );
}
