import Link from "next/link";
import Logo from "@/components/logo";
import { ShieldCheck, Lock, Eye, Database, FileText, CheckCircle2, UserCheck, Cloud, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Apna Vyapar",
  description: "Learn how Apna Vyapar protects your data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-navy text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-cyan/20 to-transparent pointer-events-none opacity-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

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
          <div className="inline-flex items-center justify-center p-4 bg-cyan/10 rounded-3xl mb-6 border border-cyan/20">
            <ShieldCheck className="text-cyan w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Your trust is our foundation. We believe in complete transparency about how we collect, use, and protect your business data.
          </p>
          <div className="mt-8 text-sm text-white/40 font-mono">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-cyan/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 group">
            <Lock className="w-8 h-8 text-cyan mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Bank-Grade Security</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              All your data is encrypted at rest and in transit. We use industry-standard protocols to ensure your information stays safe.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-cyan/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 group">
            <Eye className="w-8 h-8 text-cyan mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Total Transparency</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              No hidden tracking, no sneaky clauses. We are clear about what we collect and exactly why we need it to serve you better.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-cyan/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 group">
            <UserCheck className="w-8 h-8 text-cyan mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">You Own Your Data</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              We never sell your data to third parties. You maintain full ownership and control over your business and customer information.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          
          <section className="scroll-mt-32" id="information-collection">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Database className="w-6 h-6 text-cyan" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">1. Information We Collect</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70 prose-li:text-white/70">
              <p>
                To provide you with the best possible e-commerce platform, we collect information that helps us ensure Apna Vyapar runs smoothly and securely for your business.
              </p>
              <ul className="space-y-2 mt-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan mt-1 flex-shrink-0" />
                  <span><strong>Account Information:</strong> Name, email address, phone number, and business details when you register.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan mt-1 flex-shrink-0" />
                  <span><strong>Store Data:</strong> Products, pricing, inventory, and customer orders processed through your storefront.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan mt-1 flex-shrink-0" />
                  <span><strong>Usage Data:</strong> How you interact with our dashboard, which helps us improve the user experience.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="scroll-mt-32" id="how-we-use">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <RefreshCw className="w-6 h-6 text-cyan" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">2. How We Use Your Data</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70">
              <p>
                We use the collected data exclusively to provide, maintain, and improve the Apna Vyapar platform. We do not use your customer data for our own marketing purposes.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Service Provision</h4>
                  <p className="text-sm text-white/60 m-0">To host your store, process orders, and generate invoices automatically.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Platform Improvement</h4>
                  <p className="text-sm text-white/60 m-0">To analyze usage patterns and develop new features that merchants actually need.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Customer Support</h4>
                  <p className="text-sm text-white/60 m-0">To assist you when you encounter issues or have questions about the platform.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-bold mb-2">Security</h4>
                  <p className="text-sm text-white/60 m-0">To detect and prevent fraud, unauthorized access, or other illegal activities.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="scroll-mt-32" id="data-storage">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Cloud className="w-6 h-6 text-cyan" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">3. Data Storage & Security</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70">
              <p>
                Apna Vyapar uses enterprise-grade cloud infrastructure to store your data. Our primary servers are located in secure facilities with multiple redundancies.
              </p>
              <p>
                We employ strict security measures including SSL/TLS encryption for all data transmission, robust firewalls, and regular security audits. While no system is 100% secure, we continuously update our practices to protect against modern threats.
              </p>
            </div>
          </section>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="scroll-mt-32" id="your-rights">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <FileText className="w-6 h-6 text-cyan" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">4. Your Rights</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70">
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
        <div className="mt-24 glass-card p-10 rounded-3xl border-cyan/20 bg-cyan/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 via-cyan/10 to-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h3 className="text-2xl font-bold text-white mb-4">Have questions about your privacy?</h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Our team is always here to clarify any doubts you might have regarding how we handle and protect your data.
          </p>
          <a href="mailto:privacy@apnavyapar.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan text-navy-dark font-bold hover:scale-105 transition-transform shadow-neon-cyan">
            Contact Privacy Team
          </a>
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
