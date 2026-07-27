'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white text-xs font-bold">
                AV
              </div>
              <span className="text-lg font-semibold text-gray-900">Apna Vyapar</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              AI-powered guidance, curated business ideas, and step-by-step roadmaps to launch your dream business.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link href="/ideas" className="text-gray-500 hover:text-gray-900 transition-colors">Business Ideas</Link></li>
              <li><Link href="/chat" className="text-gray-500 hover:text-gray-900 transition-colors">Vyapar Mitra</Link></li>
              <li><Link href="/tasks" className="text-gray-500 hover:text-gray-900 transition-colors">My Tasks</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link href="/p/privacy" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy</Link></li>
              <li><Link href="/p/terms" className="text-gray-500 hover:text-gray-900 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Apna Vyapar.</p>
        </div>
      </div>
    </footer>
  );
}
