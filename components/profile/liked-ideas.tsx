'use client';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';
import IdeaCard from '@/components/ideas/idea-card';
import { BusinessIdea } from '@/types/database';

interface LikedIdeasProps {
  ideas: BusinessIdea[];
}

export default function LikedIdeas({ ideas }: LikedIdeasProps) {
  const router = useRouter();

  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6">
        <CheckCircle2 size={20} className="text-teal-500" /> Liked Business Ideas
      </h3>
      
      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-4xl mb-3 opacity-50">💡</div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">You haven't liked any ideas yet.</p>
          <button onClick={() => router.push('/')} className="mt-4 text-teal-600 dark:text-teal-400 font-bold hover:underline">
            Go swipe some ideas!
          </button>
        </div>
      )}
    </GlassCard>
  );
}
