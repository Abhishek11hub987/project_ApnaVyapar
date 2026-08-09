"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/60 shadow-nav"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity shrink-0">
            <Logo iconSize={26} />
          </Link>

          {/* Right Action: Ideas / Dashboard */}
          {!isLoading && (
            isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-sm font-bold bg-gray-100 text-gray-900 px-5 py-2 md:py-2.5 rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/ideas"
                className="text-sm font-bold bg-gray-900 text-white px-5 py-2 md:py-2.5 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                Ideas
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
