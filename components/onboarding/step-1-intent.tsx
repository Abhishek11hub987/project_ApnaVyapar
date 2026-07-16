'use client';

export default function Step1Intent({ onNext, data, setData }: { onNext: () => void, data: any, setData: (d: any) => void }) {
  const options = [
    { id: 'need_idea', title: 'I need a business idea', desc: 'Help me find something that fits me' },
    { id: 'have_idea', title: 'I have an idea but need guidance', desc: 'Validate my idea and plan' },
    { id: 'compliance', title: 'I want to check compliance', desc: 'Legal and registration help' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">What brings you here?</h2>
        <p className="text-slate-500 mt-2 text-sm">Let us customize your experience.</p>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setData({ ...data, intent: opt.id });
              onNext();
            }}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              data.intent === opt.id 
                ? 'border-teal-700 bg-teal-50/50 shadow-sm' 
                : 'border-slate-200 hover:border-teal-300 bg-white'
            }`}
          >
            <div className="font-semibold text-slate-800">{opt.title}</div>
            <div className="text-sm text-slate-500 mt-1">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
