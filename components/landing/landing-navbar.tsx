"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo iconSize={28} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {language === 'hi' ? 'Features' : 'Features'}
          </a>
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {language === 'hi' ? 'How it Works' : 'How it Works'}
          </a>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link
              href="/?login=true"
              className="hidden md:block text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              {language === 'hi' ? 'Log in' : 'Log in'}
            </Link>
          )}

          <div className="hidden md:flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Languages size={16} />
              <span className="text-xs font-semibold uppercase">{language}</span>
            </button>
          </div>

          <Link
            href="/ideas"
            className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {language === 'hi' ? 'Get Started' : 'Get Started'}
          </Link>

          <button
            className="md:hidden ml-2 p-1 text-gray-500 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 font-medium hover:text-gray-900 py-2 border-b border-gray-50">
            Features
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 font-medium hover:text-gray-900 py-2 border-b border-gray-50">
            How it Works
          </a>
          {!isAuthenticated && (
            <Link href="/?login=true" onClick={() => setMobileMenuOpen(false)} className="block text-accent-600 font-semibold hover:text-accent-700 py-2">
              Log in
            </Link>
          )}

          <div className="pt-4 flex items-center gap-4 border-t border-gray-100">
            <button
              onClick={() => { setLanguage(language === 'en' ? 'hi' : 'en'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 py-2"
            >
              <Languages size={18} />
              <span className="text-sm uppercase">{language}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
