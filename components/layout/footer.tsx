'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800 pb-28 md:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm tracking-tighter">AV</span>
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight">Apna Vyapar</span>
          </div>
          <p className="text-sm max-w-sm">
            Get AI-powered guidance, curated business ideas, and step-by-step roadmaps to launch your dream — all for free.
          </p>
        </div>
        
        <div>
          <h4 className="text-slate-100 font-bold mb-4 uppercase text-xs tracking-widest">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
            <li><Link href="/ideas" className="hover:text-teal-400 transition-colors">Business Ideas</Link></li>
            <li><Link href="/chat" className="hover:text-teal-400 transition-colors">Vyapar Mitra AI</Link></li>
            <li><Link href="/checklist" className="hover:text-teal-400 transition-colors">My Tasks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-100 font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Apna Vyapar. Made for India.</p>
      </div>
    </footer>
  );
}
