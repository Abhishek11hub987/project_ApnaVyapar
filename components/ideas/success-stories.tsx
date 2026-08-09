import { Quote, MapPin } from 'lucide-react';

interface SuccessStoriesProps {
  stories?: { name: string; location?: string; city?: string; story: string; url?: string }[] | null;
}

export default function SuccessStories({ stories }: SuccessStoriesProps) {
  if (!stories || !Array.isArray(stories) || stories.length === 0) return null;

  return (
    <div className="bg-white  rounded-2xl border border-slate-200  p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900  mb-6 flex items-center gap-2">
        <Quote className="w-5 h-5 text-rose-500" />
        Success Stories in India
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map((story, idx) => (
          <div key={idx} className="bg-slate-50  p-5 rounded-xl border border-slate-100  relative">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-200  rotate-180" />
            
            <p className="text-sm text-slate-700  relative z-10 italic mb-4">
              &quot;{story.story}&quot;
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm">
                  {story.name ? story.name.charAt(0) : '?'}
                </div>
                <div>
                  <p className="font-bold text-slate-900  text-sm">{story.name || 'Anonymous'}</p>
                  <div className="flex items-center text-xs text-slate-500 ">
                    <MapPin className="w-3 h-3 mr-1" />
                    {story.location || story.city || 'India'}
                  </div>
                </div>
              </div>
              
              {story.url && (
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors" title="Read Full Story">
                  <Quote className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
