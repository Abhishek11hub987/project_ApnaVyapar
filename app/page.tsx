'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Bot, MapPin } from 'lucide-react';
import Logo from '@/components/logo';
import { NeonButton } from '@/components/ui/neon-button';
import { GlassCard } from '@/components/ui/glass-card';
import { GuruGyaan } from '@/components/guru-gyaan';
import { SarkariAlert } from '@/components/sarkari-alert';
import { VyaparScore } from '@/components/vyapar-score';
import { IdeaRoulette } from '@/components/idea-roulette';
import { BharatMap } from '@/components/bharat-map';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const { t } = useLanguage();
  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data } = await supabase.from('business_ideas').select('*').limit(5);
      if (data) setIdeas(data);
    };
    fetchIdeas();
  }, []);

  return (
    <main className="min-h-screen bg-transparent pb-24 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="px-4 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          
          <GuruGyaan context="landing" />

          <div className="mt-8 mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 leading-[1.1] tracking-tight">
              {t('hero.title1')}{' '}
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent neon-text-teal">
                {t('hero.title2')}
              </span>
            </h1>
            <p className="mt-6 text-slate-500 dark:text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Link href="/ideas">
              <NeonButton variant="teal" className="w-full sm:w-auto px-8 py-4 text-lg">
                {t('hero.cta.ideas')} <ArrowRight size={20} className="ml-2 inline" />
              </NeonButton>
            </Link>
            <Link href="/chat">
              <NeonButton variant="amber" glow={false} className="w-full sm:w-auto px-8 py-4 text-lg">
                Ask Mitra AI <Bot size={20} className="ml-2 inline" />
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Grid */}
      <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
        
        {/* Left Column: Map & Score */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <BharatMap />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard hoverEffect={false} className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">Your Journey</h3>
              <VyaparScore size={140} />
            </GlassCard>
            
            <div className="flex flex-col gap-4 justify-center">
              <SarkariAlert />
              <SarkariAlert scheme={{
                name: "Stand-Up India Scheme",
                amount: "₹10L - ₹1Cr",
                desc: "Loans for SC/ST and/or women entrepreneurs.",
                link: "https://www.standupmitra.in/"
              }} />
            </div>
          </div>
        </div>

        {/* Right Column: Idea Roulette */}
        <div className="md:col-span-4">
          <GlassCard className="h-full flex flex-col">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Idea Roulette</h3>
              <p className="text-sm text-slate-500">Swipe Right to Save</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center min-h-[450px]">
              {ideas.length > 0 ? (
                <IdeaRoulette ideas={ideas} />
              ) : (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-64 h-96 bg-slate-200 dark:bg-slate-800 rounded-[20px]" />
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
