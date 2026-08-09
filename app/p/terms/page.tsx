import Link from "next/link";
import Logo from "@/components/logo";
import { Scale, FileText, AlertTriangle, CheckCircle2, ShieldAlert, Gavel, FileCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Apna Vyapar",
  description: "Terms and conditions for using the Apna Vyapar platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Simple Header */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo iconSize={32} />
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 px-5 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-lg mb-6 border border-gray-200">
            <Scale className="text-gray-500 w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using the Apna Vyapar platform to build and manage your online business.
          </p>
          <div className="mt-8 text-sm text-gray-400 font-mono">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <Gavel className="w-8 h-8 text-gray-400 mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Clear Guidelines</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              We provide straightforward rules so you know exactly what is expected when using our open-source tools.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <ShieldAlert className="w-8 h-8 text-gray-400 mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Platform Liability</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Apna Vyapar provides the software infrastructure. Merchants are responsible for their individual products, customers, and fulfillment.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <FileCheck className="w-8 h-8 text-gray-400 mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Acceptable Use</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Our platform is designed to help legitimate businesses grow. We do not tolerate illegal activities, fraud, or spam.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          
          <section className="scroll-mt-32" id="acceptance-of-terms">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">1. Acceptance of Terms</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                By accessing or using the Apna Vyapar platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>You must be at least 18 years old or the age of majority in your jurisdiction to create an account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>You are responsible for keeping your account passwords and API keys secure.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="w-full h-px bg-gray-200" />

          <section className="scroll-mt-32" id="merchant-responsibilities">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Scale className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">2. Merchant Responsibilities</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                Apna Vyapar provides the digital tools to help you sell online, but you run your own independent business. As a merchant on our platform, you are solely responsible for:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Fulfillment</h4>
                  <p className="text-sm text-gray-500">Ensuring products and services are delivered to your customers as advertised.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Customer Service</h4>
                  <p className="text-sm text-gray-500">Handling returns, refunds, and complaints from your buyers.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Legal Compliance</h4>
                  <p className="text-sm text-gray-500">Collecting taxes and following the commerce laws in your jurisdiction.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Store Content</h4>
                  <p className="text-sm text-gray-500">Ensuring your images, descriptions, and products do not violate copyright laws.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-gray-200" />

          <section className="scroll-mt-32" id="prohibited-activities">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <AlertTriangle className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">3. Prohibited Activities</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                To maintain a safe ecosystem, merchants are strictly prohibited from using Apna Vyapar to sell illegal goods, counterfeit items, or engage in fraudulent activities. Violation of these terms will result in immediate termination of your account and storefront.
              </p>
            </div>
          </section>
          
        </div>

        {/* Contact Banner */}
        <div className="mt-24 bg-white border border-gray-100 rounded-lg p-10 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions about our Terms?</h3>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            If you need clarification on any of the rules outlined in these Terms of Service, reach out to me.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:paradoxhq3@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto">
              Email Me
            </a>
            <a href="https://github.com/Abhishek11hub987" target="_blank" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-gray-700 font-bold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors w-full sm:w-auto">
              GitHub Profile
            </a>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 py-12 mt-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <Logo iconSize={20} />
            <span className="text-sm font-bold text-gray-900">Apna Vyapar</span>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Apna Vyapar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
