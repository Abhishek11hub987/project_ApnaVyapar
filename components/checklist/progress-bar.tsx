export default function ProgressBar({ completed, total }: { completed: number, total: number }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="font-semibold text-slate-700">Your Progress</span>
        <span className="text-sm font-bold text-teal-700">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
