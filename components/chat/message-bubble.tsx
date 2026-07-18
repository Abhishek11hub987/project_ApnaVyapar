import { Bot, User } from 'lucide-react';
import LocationMapCard from './location-map-card';

export default function MessageBubble({ role, content }: { role: 'user' | 'assistant' | 'system', content: string }) {
  if (role === 'system') return null;

  const isAI = role === 'assistant';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isAI ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-amber-500/20 text-amber-400 shadow-neon-amber' : 'bg-teal-500/20 text-teal-400 shadow-neon-teal'}`}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${isAI ? 'glass-panel border-amber-500/30 rounded-bl-none text-slate-800 dark:text-slate-200' : 'bg-teal-900/40 border border-teal-500/50 shadow-neon-teal text-teal-50 rounded-br-none'}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed prose prose-sm prose-teal dark:prose-invert max-w-none">
            {!content ? (
              <span className="animate-pulse text-amber-500 font-hindi">Mitra soch raha hai...</span>
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
