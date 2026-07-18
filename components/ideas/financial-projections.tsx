import { Wallet, PieChart, IndianRupee, TrendingUp } from 'lucide-react';

interface FinancialsProps {
  financials: any;
}

export default function FinancialProjections({ financials }: FinancialsProps) {
  if (!financials || Object.keys(financials).length === 0) return null;

  const items = [
    { icon: TrendingUp, label: 'Break Even Point', value: financials.break_even, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: IndianRupee, label: 'Estimated Monthly Revenue', value: financials.monthly_revenue, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { icon: Wallet, label: 'Estimated Monthly Costs', value: financials.monthly_costs, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { icon: PieChart, label: 'Expected Profit Margin', value: financials.profit_margin, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-emerald-600" />
        Financial Projections
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => {
          if (!item.value) return null;
          const Icon = item.icon;
          return (
            <div key={idx} className="flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
