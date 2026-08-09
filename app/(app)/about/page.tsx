import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-accent-600 transition-colors">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">About Apna Vyapar</h1>
      <p className="text-gray-600">Apna Vyapar is your AI-powered business navigator. We help aspiring entrepreneurs in India discover, validate, and launch their dream businesses.</p>
    </div>
  );
}
