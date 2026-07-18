import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskProps {
  risks: any[];
}

export default function RiskAnalysis({ risks }: RiskProps) {
  if (!risks || !Array.isArray(risks) || risks.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        Risk Analysis & Mitigation
      </h3>
      
      <div className="space-y-4">
        {risks.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-0 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="flex-1 bg-amber-50 dark:bg-amber-900/10 p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider block mb-1">Risk</span>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{item.risk}</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-wider block mb-1">Mitigation</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{item.mitigation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
