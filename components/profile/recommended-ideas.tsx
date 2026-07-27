'use client';

import { BusinessIdea } from '@/types/database';
import { Sparkles } from 'lucide-react';
import IdeaCard from '@/components/ideas/idea-card';
import { GlassCard } from '@/components/ui/glass-card';

export default function RecommendedIdeas({ ideas }: { ideas: BusinessIdea[] }) {
  if (!ideas || ideas.length === 0) return null;

  return (
    <GlassCard className="bg-navy-light/40 border-cyan/20 shadow-[0_0_30px_rgba(45,212,191,0.05)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan/10 p-2.5 rounded-xl text-cyan border border-cyan/20">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black text-white">Ideas Matching Your Profile</h2>
          <p className="text-xs text-white/40 mt-0.5">Based on your interests and budget preferences</p>
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
