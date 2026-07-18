import { TrendingUp, Users, Target, BarChart } from 'lucide-react';

interface MarketAnalysisProps {
  analysis: any;
}

export default function MarketAnalysisCard({ analysis }: MarketAnalysisProps) {
  if (!analysis || Object.keys(analysis).length === 0) return null;

  const items = [
    { icon: BarChart, label: 'Market Size', value: analysis.market_size },
    { icon: Users, label: 'Target Audience', value: analysis.target_audience },
    { icon: TrendingUp, label: 'Growth Trends', value: analysis.growth_trends },
    { icon: Target, label: 'Demand in India', value: analysis.demand_india },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-teal-600" />
        Market Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => {
          if (!item.value) return null;
          const Icon = item.icon;
          return (
            <div key={idx} className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{item.label}</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
