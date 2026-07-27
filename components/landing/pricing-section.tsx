import { CheckCircle2, Github } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-bold tracking-wide mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            RADICALLY FREE
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-6 leading-tight">
            No Paywalls.<br />Just Open Source.
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-medium">
            Apna Vyapar is built to empower Indian entrepreneurs, not to lock them out. Everything is 100% free forever.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Pricing Card */}
          <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-cyan/30 bg-navy-light/40 relative group shadow-[0_0_50px_rgba(45,212,191,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Community Edition</h3>
                  <p className="text-white/60 text-sm">For every aspiring founder</p>
                </div>
                <div className="text-right">
                  <span className="text-5xl font-black text-white">₹0</span>
                  <p className="text-cyan font-bold mt-1">Forever</p>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-cyan/0 via-cyan/20 to-cyan/0 my-8" />

              <ul className="space-y-4 mb-10">
                {[
                  'Full access to Business Ideas Catalog',
                  'Unlimited Vyapar Mitra AI chats',
                  'Custom Roadmap Generation',
                  'Drag & Drop Store Builder',
                  'Open Source on GitHub',
                  'No hidden fees, no credit card'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan shrink-0" />
                    <span className="text-white/80 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="https://github.com/Abhishek11hub987" 
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-navy-dark font-black hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] focus-ring"
              >
                <Github size={20} />
                Follow Abhishek on GitHub
              </Link>
              <p className="text-center text-white/40 text-xs mt-4">
                Built by a solo developer. Star the repo to show support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
