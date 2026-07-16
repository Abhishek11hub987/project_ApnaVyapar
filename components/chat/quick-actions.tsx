export default function QuickActions({ onSelect }: { onSelect: (text: string) => void }) {
  const actions = [
    "Is this profitable?",
    "What licenses do I need?",
    "How to get funding?",
    "Show me a business plan"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-2 animate-in fade-in duration-500">
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => onSelect(action)}
          className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
