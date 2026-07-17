import { useLanguage } from '@/lib/language-context';

export default function QuickActions({ onSelect }: { onSelect: (text: string) => void }) {
  const { t } = useLanguage();
  
  const actions = [
    t('chat.quick1') || "Is this profitable?",
    t('chat.quick2') || "What licenses do I need?",
    t('chat.quick3') || "How to get funding?",
    t('chat.quick4') || "Show me a business plan"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-2 animate-in fade-in duration-500">
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => onSelect(action)}
          className="bg-teal-50 dark:bg-teal-900/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/50 px-3 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
