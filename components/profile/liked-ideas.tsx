'use client';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';
import IdeaCard from '@/components/ideas/idea-card';
import { BusinessIdea } from '@/types/database';
import { useLanguage } from '@/lib/language-context';

interface LikedIdeasProps {
  ideas: BusinessIdea[];
}

export default function LikedIdeas({ ideas }: LikedIdeasProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <GlassCard className="bg-navy-light/40 border-cyan/20 shadow-[0_0_30px_rgba(45,212,191,0.05)]">
      <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
        <CheckCircle2 size={20} className="text-cyan" /> {t('liked.title')}
      </h3>
      
      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <div className="text-4xl mb-3 opacity-50">💡</div>
          <p className="text-white/60 font-medium">{t('liked.emptyTitle')}</p>
          <button onClick={() => router.push('/ideas')} className="mt-4 text-cyan font-bold hover:underline">
            {t('liked.emptyCta')}
          </button>
        </div>
      )}
    </GlassCard>
  );
}
