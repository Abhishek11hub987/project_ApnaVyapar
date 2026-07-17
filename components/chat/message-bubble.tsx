import { Bot, User } from 'lucide-react';
import LocationMapCard from './location-map-card';

export default function MessageBubble({ role, content }: { role: 'user' | 'assistant' | 'system', content: string }) {
  if (role === 'system') return null;

  const isAI = role === 'assistant';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isAI ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${isAI ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-bl-none text-slate-800 dark:text-slate-200' : 'bg-teal-700 dark:bg-teal-600 text-white rounded-br-none'}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed prose prose-sm prose-teal dark:prose-invert max-w-none">
            {!content ? (
              <span className="animate-pulse">...</span>
            ) : (
              content.split(/(\[MAP:[^\]]+\])/).map((part, i) => {
                if (part.startsWith('[MAP:') && part.endsWith(']')) {
                  const query = part.replace('[MAP:', '').replace(']', '');
                  return <LocationMapCard key={i} typeQuery={query} />;
                }
                return <span key={i}>{part}</span>;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
