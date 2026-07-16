'use client';

export default function Step2Constraints({ onNext, onBack, data, setData }: { onNext: () => void, onBack: () => void, data: any, setData: (d: any) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Your Constraints</h2>
        <p className="text-slate-500 mt-2 text-sm">To give you realistic ideas.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">What's your budget?</label>
          <select 
            value={data.budget || ''} 
            onChange={(e) => setData({ ...data, budget: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 bg-white outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="" disabled>Select Budget</option>
            <option value="under-10k">Under ₹10,000</option>
            <option value="10k-50k">₹10K – ₹50K</option>
            <option value="50k-2l">₹50K – ₹2L</option>
            <option value="2l-10l">₹2L – ₹10L</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Where will you operate?</label>
          <div className="grid grid-cols-2 gap-3">
            {['Home', 'Physical Shop', 'Online Only'].map((loc) => (
              <button
                key={loc}
                onClick={() => setData({ ...data, location: loc })}
                className={`p-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                  data.location === loc 
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">How much time can you dedicate?</label>
          <div className="flex gap-3">
            {['Part-time', 'Full-time'].map((time) => (
              <button
                key={time}
                onClick={() => setData({ ...data, time })}
                className={`flex-1 p-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                  data.time === time 
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={onBack} className="flex-1 py-3 text-slate-600 font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={!data.budget || !data.location || !data.time}
          className="flex-1 py-3 text-white font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
