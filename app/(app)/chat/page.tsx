import ChatInterface from '@/components/chat/chat-interface';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Vyapar Mitra - AI Business Advisor',
  description: 'Chat with your AI business advisor',
};

export default function ChatPage() {
  return (
    <main className="flex flex-col h-[100dvh] md:h-auto md:min-h-screen container mx-auto px-0 md:px-4 py-0 md:py-6 max-w-5xl">
      {/* Mobile Header with Back Button */}
      <div className="md:hidden flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">Vyapar Mitra</h1>
          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">AI Business Advisor</p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Vyapar Mitra</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Your personal AI advisor for business planning and validation.</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative md:static">
        <ChatInterface />
      </div>
    </main>
  );
}
