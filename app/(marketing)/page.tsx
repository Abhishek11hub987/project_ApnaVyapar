"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNavbar } from "@/components/landing/landing-navbar";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <LandingFooter />
    </main>
  );
}
