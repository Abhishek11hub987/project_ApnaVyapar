import { Bot, User, MapPin } from 'lucide-react';

export default function MessageBubble({ role, content }: { role: 'user' | 'assistant' | 'system', content: string }) {
  if (role === 'system') return null;

  const isAI = role === 'assistant';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isAI ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md'}`}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${isAI ? 'bg-white border border-gray-100 rounded-bl-none text-gray-800' : 'bg-gray-900 text-white rounded-br-none'}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed max-w-none">
            {!content ? (
              <span className="animate-pulse text-indigo-500 font-hindi">Mitra soch raha hai...</span>
            ) : (
              content.split(/(\[MAP:[^\]]+\])/).map((part, i) => {
                if (part.startsWith('[MAP:') && part.endsWith(']')) {
                  const query = part.replace('[MAP:', '').replace(']', '');
                  return (
                    <a
                      key={i}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 my-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800 no-underline font-semibold text-sm"
                    >
                      <MapPin size={16} />
                      View "{query}" on Google Maps
                    </a>
                  );
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
