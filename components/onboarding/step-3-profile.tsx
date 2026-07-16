'use client';

export default function Step3Profile({ onFinish, onBack, data, setData }: { onFinish: () => void, onBack: () => void, data: any, setData: (d: any) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Almost there</h2>
        <p className="text-slate-500 mt-2 text-sm">Just a few more details.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Your City</label>
          <input 
            type="text"
            value={data.city || ''}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder="e.g. Pune, Indore"
            className="w-full p-3 rounded-xl border border-slate-300 bg-white outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Language</label>
          <select 
            value={data.language || 'english'} 
            onChange={(e) => setData({ ...data, language: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 bg-white outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={onBack} className="flex-1 py-3 text-slate-600 font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
          Back
        </button>
        <button 
          onClick={onFinish}
          disabled={!data.city}
          className="flex-1 py-3 text-white font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 transition-colors"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}
