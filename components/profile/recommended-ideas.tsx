'use client';

import { BusinessIdea } from '@/types/database';
import { Sparkles } from 'lucide-react';
import IdeaCard from '@/components/ideas/idea-card';
import { GlassCard } from '@/components/ui/glass-card';

export default function RecommendedIdeas({ ideas }: { ideas: BusinessIdea[] }) {
  if (!ideas || ideas.length === 0) return null;

  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          <Sparkles size={20} className="text-gray-500" />
        </div>
        <div>
          <h2 className="text-lg font-black text-gray-900">Ideas Matching Your Profile</h2>
          <p className="text-xs text-gray-500 mt-0.5">Based on your interests and budget preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ideas.map(idea => (
          <div key={idea.id} className="h-full">
            <IdeaCard idea={idea} />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
