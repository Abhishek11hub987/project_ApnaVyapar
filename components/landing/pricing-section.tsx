import { CheckCircle2, Github } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-50 py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            RADICALLY FREE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            No Paywalls. Just Open Source.
          </h2>
          <p className="text-gray-500">
            Apna Vyapar is built to empower Indian entrepreneurs, not to lock them out. Everything is 100% free forever.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white border border-gray-100 rounded-xl shadow-card p-8 md:p-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Community Edition</h3>
                <p className="text-sm text-gray-500">For every aspiring founder</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-gray-900">₹0</span>
                <p className="text-accent-600 font-medium text-sm">Forever</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 my-6" />

            <ul className="space-y-3 mb-8">
              {[
                'Full access to Business Ideas Catalog',
                'Unlimited Vyapar Mitra AI chats',
                'Custom Roadmap Generation',
                'Drag & Drop Store Builder',
                'Open Source on GitHub',
                'No hidden fees, no credit card'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="https://github.com/Abhishek11hub987"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              <Github size={18} />
              Follow Abhishek on GitHub
            </Link>
            <p className="text-center text-gray-400 text-xs mt-3">
              Built by a solo developer. Star the repo to show support!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
