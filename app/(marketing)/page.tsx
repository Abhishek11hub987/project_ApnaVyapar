"use client";

import "@/styles/landing-animations.css";
import { HeroSection } from "@/components/landing/hero-section";
import { ValueProposition } from "@/components/landing/value-proposition";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { SocialProof } from "@/components/landing/social-proof";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNavbar } from "@/components/landing/landing-navbar";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* Fixed navbar */}
      <LandingNavbar />

      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: Value Proposition */}
      <ValueProposition />

      {/* Section 3: How It Works */}
      <HowItWorks />

      {/* Section 4: Features Grid */}
      <FeaturesGrid />

      {/* Section 5: Social Proof */}
      <SocialProof />

      {/* Section 6: Pricing */}
      <PricingSection />

      {/* Section 7: Final CTA */}
      <FinalCTA />

      {/* Section 8: Footer */}
      <LandingFooter />
    </main>
  );
}
