import Link from 'next/link';
import { Mail, Github, Globe, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 pt-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 tracking-tight">
          Contact Us
        </h1>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">
            Apna Vyapar is an open-source initiative aimed at empowering the next generation of Indian entrepreneurs. We'd love to hear from you!
          </p>
          
          <div className="space-y-6">
            <a href="mailto:hello@apnavyapar.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Email Us</h3>
                <p className="text-slate-500 dark:text-slate-400">hello@apnavyapar.com</p>
              </div>
            </a>

            <a href="https://github.com/Abhishek11hub987/project_ApnaVyapar" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">GitHub Repository</h3>
                <p className="text-slate-500 dark:text-slate-400">Contribute to the open source project</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Made in India</h3>
                <p className="text-slate-500 dark:text-slate-400">Built for the future of Indian startups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
