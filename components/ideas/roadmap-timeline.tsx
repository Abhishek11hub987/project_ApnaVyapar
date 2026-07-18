import { MapPin } from 'lucide-react';

interface RoadmapProps {
  roadmap: any[];
}

export default function RoadmapTimeline({ roadmap }: RoadmapProps) {
  if (!roadmap || !Array.isArray(roadmap) || roadmap.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-indigo-600" />
        Step-by-Step Roadmap
      </h3>
      
      <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900/50 ml-3 md:ml-4 space-y-8">
        {roadmap.map((phase, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"></div>
            
            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              {phase.phase}
            </h4>
            
            <ul className="space-y-3">
              {phase.tasks && Array.isArray(phase.tasks) && phase.tasks.map((task: string, tIdx: number) => (
                <li key={tIdx} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0"></div>
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
