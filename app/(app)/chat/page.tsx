import ChatInterface from '@/components/chat/chat-interface';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Vyapar Mitra - AI Business Advisor',
  description: 'Chat with your AI business advisor',
};

export default function ChatPage() {
  return (
    <main className="flex flex-col fixed inset-0 z-50 bg-surface-secondary md:relative md:z-auto md:inset-auto md:bg-transparent md:h-auto md:min-h-screen container mx-auto px-0 md:px-4 py-0 md:py-6 max-w-5xl">
      {/* Desktop Header */}
      <div className="hidden md:block mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Vyapar Mitra</h1>
        <p className="text-gray-500 mt-2 font-medium">Your personal AI advisor for business planning and validation.</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative md:static">
        <ChatInterface />
      </div>
    </main>
  );
}
