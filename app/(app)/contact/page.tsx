import Link from 'next/link';
import { Mail, Github, Globe, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24 pt-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-8 tracking-tight">
          Contact Us
        </h1>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-lg">
            Apna Vyapar is an open-source initiative aimed at empowering the next generation of Indian entrepreneurs. We&apos;d love to hear from you!
          </p>
          
          <div className="space-y-6">
            <a href="mailto:hello@apnavyapar.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-400 rounded-full flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-50">Email Us</h3>
                <p className="text-gray-500 dark:text-gray-400">hello@apnavyapar.com</p>
              </div>
            </a>

            <a href="https://github.com/Abhishek11hub987/project_ApnaVyapar" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-50">GitHub Repository</h3>
                <p className="text-gray-500 dark:text-gray-400">Contribute to the open source project</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-400 rounded-full flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-50">Made in India</h3>
                <p className="text-gray-500 dark:text-gray-400">Built for the future of Indian startups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
