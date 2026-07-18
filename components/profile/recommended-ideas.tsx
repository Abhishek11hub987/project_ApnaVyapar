'use client';

import { BusinessIdea } from '@/types/database';
import { Sparkles } from 'lucide-react';
import IdeaCard from '@/components/ideas/idea-card';
import { GlassCard } from '@/components/ui/glass-card';

export default function RecommendedIdeas({ ideas }: { ideas: BusinessIdea[] }) {
  if (!ideas || ideas.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl text-amber-600 dark:text-amber-400">
          <Sparkles size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Recommended For You</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ideas.map(idea => (
          <div key={idea.id} className="h-full">
            <IdeaCard idea={idea} />
          </div>
        ))}
      </div>
    </div>
  );
}
