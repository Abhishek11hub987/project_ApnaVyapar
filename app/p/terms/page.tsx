import Link from "next/link";
import Logo from "@/components/logo";
import { Scale, FileText, AlertTriangle, CheckCircle2, ShieldAlert, Gavel, FileCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Apna Vyapar",
  description: "Terms and conditions for using the Apna Vyapar platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-navy text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none opacity-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Simple Header */}
      <nav className="border-b border-white/10 bg-navy/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo iconSize={32} />
          </Link>
          <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition-colors bg-white/5 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-3xl mb-6 border border-indigo-500/20">
            <Scale className="text-indigo-400 w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using the Apna Vyapar platform to build and manage your online business.
          </p>
          <div className="mt-8 text-sm text-white/40 font-mono">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-indigo-500/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 group">
            <Gavel className="w-8 h-8 text-indigo-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Clear Guidelines</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              We provide straightforward rules so you know exactly what is expected when using our open-source tools.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-indigo-500/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 group">
            <ShieldAlert className="w-8 h-8 text-indigo-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Platform Liability</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Apna Vyapar provides the software infrastructure. Merchants are responsible for their individual products, customers, and fulfillment.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-indigo-500/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 group">
            <FileCheck className="w-8 h-8 text-indigo-400 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Acceptable Use</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Our platform is designed to help legitimate businesses grow. We do not tolerate illegal activities, fraud, or spam.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          
          <section className="scroll-mt-32" id="acceptance-of-terms">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <FileText className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">1. Acceptance of Terms</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70 prose-li:text-white/70">
              <p>
                By accessing or using the Apna Vyapar platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>
              <ul className="space-y-2 mt-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <span>You must be at least 18 years old or the age of majority in your jurisdiction to create an account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <span>You are responsible for keeping your account passwords and API keys secure.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="scroll-mt-32" id="merchant-responsibilities">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Scale className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">2. Merchant Responsibilities</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70">
              <p>
                Apna Vyapar provides the digital tools to help you sell online, but you run your own independent business. As a merchant on our platform, you are solely responsible for:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Fulfillment</h4>
                  <p className="text-sm text-white/60 m-0">Ensuring products and services are delivered to your customers as advertised.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Customer Service</h4>
                  <p className="text-sm text-white/60 m-0">Handling returns, refunds, and complaints from your buyers.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Legal Compliance</h4>
                  <p className="text-sm text-white/60 m-0">Collecting taxes and following the commerce laws in your jurisdiction.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Store Content</h4>
                  <p className="text-sm text-white/60 m-0">Ensuring your images, descriptions, and products do not violate copyright laws.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="scroll-mt-32" id="prohibited-activities">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">3. Prohibited Activities</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70">
              <p>
                To maintain a safe ecosystem, merchants are strictly prohibited from using Apna Vyapar to sell illegal goods, counterfeit items, or engage in fraudulent activities. Violation of these terms will result in immediate termination of your account and storefront.
              </p>
            </div>
          </section>
          
        </div>

        {/* Contact Banner */}
        <div className="mt-24 glass-card p-10 rounded-3xl border-indigo-500/20 bg-indigo-500/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h3 className="text-2xl font-bold text-white mb-4">Questions about our Terms?</h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            If you need clarification on any of the rules outlined in these Terms of Service, reach out to me.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:paradoxhq3@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-500 text-white font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.4)] w-full sm:w-auto">
              Email Me
            </a>
            <a href="https://github.com/Abhishek11hub987" target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all w-full sm:w-auto">
              GitHub Profile
            </a>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-12 mt-12 bg-navy-dark/50 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <Logo iconSize={20} />
            <span className="text-sm font-bold text-white">Apna Vyapar</span>
          </div>
          <div className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Apna Vyapar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
