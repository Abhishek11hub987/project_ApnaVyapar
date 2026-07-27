"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X, Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo iconSize={32} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors focus-ring">
            {language === 'hi' ? 'फ़ीचर्स' : 'Features'}
          </a>
          <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors focus-ring">
            {language === 'hi' ? 'यह कैसे काम करता है' : 'How it Works'}
          </a>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link
              href="/?login=true"
              className="hidden md:block text-sm text-white/70 hover:text-white transition-colors font-medium focus-ring"
            >
              {language === 'hi' ? 'लॉग इन' : 'Log in'}
            </Link>
          )}
          
          {/* Language Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-ring flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Languages size={18} />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
          </div>

          <Link
            href="/ideas"
            className="text-sm font-semibold bg-gradient-to-r from-cyan to-cyan-dark text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:scale-105 transition-transform shadow-neon-cyan focus-ring"
          >
            {language === 'hi' ? 'शुरू करें' : 'Get Started'}
          </Link>
          
          <button 
            className="md:hidden ml-2 p-1 text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-dark/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-4">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-white/80 font-medium hover:text-white py-2 border-b border-white/5">
            {language === 'hi' ? 'फ़ीचर्स' : 'Features'}
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-white/80 font-medium hover:text-white py-2 border-b border-white/5">
            {language === 'hi' ? 'यह कैसे काम करता है' : 'How it Works'}
          </a>
          {!isAuthenticated && (
            <Link href="/?login=true" onClick={() => setMobileMenuOpen(false)} className="block text-cyan font-semibold hover:text-cyan-light py-2">
              {language === 'hi' ? 'लॉग इन' : 'Log in'}
            </Link>
          )}
          
          <div className="pt-4 flex items-center gap-4 border-t border-white/5">
            <button
              onClick={() => { setLanguage(language === 'en' ? 'hi' : 'en'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-white/80 hover:text-white py-2"
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
