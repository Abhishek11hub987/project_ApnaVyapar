import { Quote, MapPin } from 'lucide-react';

interface SuccessStoriesProps {
  stories: any[];
}

export default function SuccessStories({ stories }: SuccessStoriesProps) {
  if (!stories || !Array.isArray(stories) || stories.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <Quote className="w-5 h-5 text-rose-500" />
        Success Stories in India
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map((story, idx) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 relative">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-200 dark:text-slate-700/50 rotate-180" />
            
            <p className="text-sm text-slate-700 dark:text-slate-300 relative z-10 italic mb-4">
              "{story.story}"
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm">
                {story.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{story.name}</p>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3 h-3 mr-1" />
                  {story.city}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
