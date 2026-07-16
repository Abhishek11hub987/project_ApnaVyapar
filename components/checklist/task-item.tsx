import { ChecklistTask } from '@/types/database';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TaskItem({ task, onStatusChange }: { task: ChecklistTask, onStatusChange: (id: string, status: string) => void }) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';
  
  const handleToggle = () => {
    if (isCompleted) onStatusChange(task.id, 'pending');
    else if (isInProgress) onStatusChange(task.id, 'completed');
    else onStatusChange(task.id, 'in_progress');
  };

  return (
    <div className={`p-4 rounded-xl border mb-3 transition-colors ${isCompleted ? 'bg-teal-50/50 border-teal-100' : isInProgress ? 'bg-amber-50/30 border-amber-200' : 'bg-white border-slate-200'}`}>
      <div className="flex gap-4">
        <button onClick={handleToggle} className="mt-0.5 flex-shrink-0 focus:outline-none transition-transform active:scale-90">
          {isCompleted ? (
            <CheckCircle2 className="text-teal-600" size={24} />
          ) : isInProgress ? (
            <Clock className="text-amber-500" size={24} />
          ) : (
            <Circle className="text-slate-300 hover:text-teal-500 transition-colors" size={24} />
          )}
        </button>
        <div className="flex-1">
          <h4 className={`font-semibold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
            {task.title}
          </h4>
          {task.description && (
             <p className={`text-sm mt-1 mb-2 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>{task.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-md ${isCompleted ? 'bg-slate-100 text-slate-500' : 'bg-slate-100 text-slate-600'}`}>
              ⏳ {task.estimated_time || 'Varies'}
            </span>
            {task.resource_link && (
              <a href={task.resource_link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-600 hover:underline">
                View Resource →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
