"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-8">
          <Sparkles size={14} className="text-accent-500" />
          <span>The Next Generation Platform for Indian Merchants</span>
        </div>

        <h1 className="flex flex-col items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1]">
          <span className="text-gray-900">
            Start, Manage & Grow Your
          </span>
          <span className="text-accent-600">Business Online</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Launch your online store, manage inventory, and grow your sales. Everything you need to scale your business in one beautifully designed dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/ideas"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gray-900 text-white font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Start Your Journey <ArrowRight size={18} />
          </Link>
          <Link
            href="#features"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-gray-700 border border-gray-200 font-medium text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            Explore Features
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <span>100% Free & Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <Users size={12} className="text-accent-500" />
            </div>
            <span>Solo Developer Built</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-accent-500" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.52-4.477-10-10-10z"/></svg>
            </div>
            <span>No Vendor Lock-in</span>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-elevated hover:border-gray-200 transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Free Forever</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                Unlike other platforms that charge monthly fees or take a cut of your sales, Apna Vyapar is completely free. Every Indian merchant deserves world-class digital tools without premium price tags.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium ring-1 ring-green-600/20">0% Commission</span>
                <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">Unlimited Products</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-elevated hover:border-gray-200 transition-all duration-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Own Your Data</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                As an open-source project, you are never locked in. Your customer data, inventory, and analytics belong entirely to you.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-elevated hover:border-gray-200 transition-all duration-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Built by India, For India</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Built and maintained by a passionate solo developer. Constant updates, modern tech stack, and WhatsApp support out of the box.
              </p>
            </div>

            <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-elevated hover:border-gray-200 transition-all duration-200 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Transparent Open Source</h3>
              <p className="text-sm text-gray-500 max-w-lg mb-5">
                You can audit every line of code. We have nothing to hide. Connect on GitHub to request features or report bugs directly.
              </p>
              <a href="https://github.com/Abhishek11hub987/project_ApnaVyapar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.52-4.477-10-10-10z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
