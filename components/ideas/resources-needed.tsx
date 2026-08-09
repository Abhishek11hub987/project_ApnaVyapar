import { Briefcase, CheckCircle2 } from 'lucide-react';

interface ResourcesProps {
  resources: string[];
}

export default function ResourcesNeeded({ resources }: ResourcesProps) {
  if (!resources || !Array.isArray(resources) || resources.length === 0) return null;

  return (
    <div className="bg-white  rounded-2xl border border-slate-200  p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900  mb-6 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-purple-600" />
        Resources Needed
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((res: string, i: number) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50  border border-purple-100 ">
            <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700  font-medium">{res}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
