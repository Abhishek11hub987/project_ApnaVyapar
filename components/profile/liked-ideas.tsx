'use client';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';
import IdeaCard from '@/components/ideas/idea-card';
import type { BusinessIdea } from '@/types/idea';
import { useLanguage } from '@/lib/i18n/language-context';

interface LikedIdeasProps {
  ideas: BusinessIdea[];
}

export default function LikedIdeas({ ideas }: LikedIdeasProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <GlassCard>
      <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-6">
        <CheckCircle2 size={20} className="text-gray-500" /> {t('liked.title')}
      </h3>
      
      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-4xl mb-3 opacity-50">💡</div>
          <p className="text-gray-500">{t('liked.emptyTitle')}</p>
          <button onClick={() => router.push('/ideas')} className="mt-4 text-accent-500 font-medium hover:underline">
            {t('liked.emptyCta')}
          </button>
        </div>
      )}
    </GlassCard>
  );
}
