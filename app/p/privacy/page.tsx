import Link from "next/link";
import Logo from "@/components/logo";
import { ShieldCheck, Lock, Eye, Database, FileText, CheckCircle2, UserCheck, Cloud, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Apna Vyapar",
  description: "Learn how Apna Vyapar protects your data and privacy.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="text-gray-500 w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Your trust is our foundation. We believe in complete transparency about how we collect, use, and protect your business data.
          </p>
          <div className="mt-8 text-sm text-gray-400 font-mono">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <Lock className="w-8 h-8 text-gray-400 mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Grade Security</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              All your data is encrypted at rest and in transit. We use industry-standard protocols to ensure your information stays safe.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <Eye className="w-8 h-8 text-gray-400 mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Total Transparency</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              No hidden tracking, no sneaky clauses. We are clear about what we collect and exactly why we need it to serve you better.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <UserCheck className="w-8 h-8 text-gray-400 mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">You Own Your Data</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              We never sell your data to third parties. You maintain full ownership and control over your business and customer information.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          
          <section className="scroll-mt-32" id="information-collection">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Database className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">1. Information We Collect</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                To provide you with the best possible e-commerce platform, we collect information that helps us ensure Apna Vyapar runs smoothly and securely for your business.
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-gray-900">Account Information:</strong> Name, email address, phone number, and business details when you register.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-gray-900">Store Data:</strong> Products, pricing, inventory, and customer orders processed through your storefront.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-gray-900">Usage Data:</strong> How you interact with our dashboard, which helps us improve the user experience.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="w-full h-px bg-gray-200" />

          <section className="scroll-mt-32" id="how-we-use">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <RefreshCw className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">2. How We Use Your Data</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                We use the collected data exclusively to provide, maintain, and improve the Apna Vyapar platform. We do not use your customer data for our own marketing purposes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Service Provision</h4>
                  <p className="text-sm text-gray-500">To host your store, process orders, and generate invoices automatically.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Platform Improvement</h4>
                  <p className="text-sm text-gray-500">To analyze usage patterns and develop new features that merchants actually need.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Customer Support</h4>
                  <p className="text-sm text-gray-500">To assist you when you encounter issues or have questions about the platform.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <h4 className="text-gray-900 font-bold mb-2">Security</h4>
                  <p className="text-sm text-gray-500">To detect and prevent fraud, unauthorized access, or other illegal activities.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-gray-200" />

          <section className="scroll-mt-32" id="data-storage">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Cloud className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">3. Data Storage & Security</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                Apna Vyapar uses enterprise-grade cloud infrastructure to store your data. Our primary servers are located in secure facilities with multiple redundancies.
              </p>
              <p>
                We employ strict security measures including SSL/TLS encryption for all data transmission, robust firewalls, and regular security audits. While no system is 100% secure, we continuously update our practices to protect against modern threats.
              </p>
            </div>
          </section>

          <div className="w-full h-px bg-gray-200" />

          <section className="scroll-mt-32" id="your-rights">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">4. Your Rights</h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>
                You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access and update your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
              </p>
              <p>
                Upon request, we will completely delete your account and all associated data from our active databases, subject to any legal obligations we may have to retain certain records (like financial transactions).
              </p>
            </div>
          </section>
          
        </div>

        {/* Contact Banner */}
        <div className="mt-24 bg-white border border-gray-100 rounded-lg p-10 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Have questions about your privacy?</h3>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            I am always here to clarify any doubts you might have regarding how I handle and protect your data.
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
