"use client";

import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-white py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5">
          Ready to Transform Your Business?
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Join thousands of merchants already growing with Apna Vyapar. Start free, no credit card required.
        </p>
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gray-900 text-white font-medium text-lg hover:bg-gray-800 transition-colors"
        >
          Get Started Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
}
