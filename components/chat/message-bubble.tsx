import { Bot, User } from 'lucide-react';

export default function MessageBubble({ role, content }: { role: 'user' | 'assistant' | 'system', content: string }) {
  if (role === 'system') return null;

  const isAI = role === 'assistant';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isAI ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-600'}`}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${isAI ? 'bg-white border border-slate-200 rounded-bl-none text-slate-800' : 'bg-teal-700 text-white rounded-br-none'}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed prose prose-sm prose-teal max-w-none">
            {content || <span className="animate-pulse">...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
