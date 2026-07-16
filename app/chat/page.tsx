import ChatInterface from '@/components/chat/chat-interface';

export const metadata = {
  title: 'Vyapar Mitra - AI Business Advisor',
  description: 'Chat with your AI business advisor',
};

export default function ChatPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Vyapar Mitra</h1>
        <p className="text-slate-500 mt-2">Your personal AI advisor for business planning and validation.</p>
      </div>
      <ChatInterface />
    </main>
  );
}
