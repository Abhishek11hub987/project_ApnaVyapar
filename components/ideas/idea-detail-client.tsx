'use client';
import { useState } from 'react';
import { Bot, CheckCircle, FileText, MapPin, Briefcase, Clock, IndianRupee, ShieldAlert, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { BusinessIdea } from '@/types/idea';
import { useLanguage } from '@/lib/i18n/language-context';
import { CATEGORY_IMAGES, CATEGORY_GRADIENTS, DEFAULT_IMAGE } from './idea-card';
import MarketAnalysisCard from './market-analysis-card';
import RoadmapTimeline from './roadmap-timeline';
import FinancialProjections from './financial-projections';
import RiskAnalysis from './risk-analysis';
import SuccessStories from './success-stories';
import ResourcesNeeded from './resources-needed';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { GuruGyaan } from '@/components/guru-gyaan';

export default function IdeaDetailClient({ idea }: { idea: BusinessIdea }) {
  const { t } = useLanguage();

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const pros = idea.pros || [];
  const cons = idea.cons || [];
  const requiredLicenses = idea.required_licenses || [];
  const locationType = idea.location_type || '';
  const timeCommitment = idea.time_commitment || 'Flexible';
  const skillLevel = idea.skill_level || 'Beginner';

  const [imgSrc, setImgSrc] = useState<string>(idea.image_url || CATEGORY_IMAGES[idea.category] || DEFAULT_IMAGE);
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleImgError = () => {
    if (!useFallback && imgSrc !== CATEGORY_IMAGES[idea.category]) {
      setUseFallback(true);
      setImgSrc(CATEGORY_IMAGES[idea.category] || DEFAULT_IMAGE);
    } else {
      setImgError(true);
    }
  };

  return (
    <main className="min-h-screen bg-transparent pb-32 font-sans transition-colors">
      {/* Header/Hero */}
      <div className="relative bg-transparent border-b border-gray-200/50 overflow-hidden">
        
        {/* Background Image with Gradient Overlay */}
        {!imgError ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={imgSrc} 
              alt={idea.title} 
              className="w-full h-full object-cover" 
              onError={handleImgError}
            />
          </div>
        ) : (
          <div className={`absolute inset-0 z-0 bg-gradient-to-br ${CATEGORY_GRADIENTS[idea.category] || 'from-slate-700 to-slate-900'}`} />
        )}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-gray-900/50" />

        <div className={`relative z-10 pt-6 pb-16 px-4 text-white`}>
          <div className="max-w-5xl mx-auto">
            <Link href="/ideas" className={`inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors text-slate-300 hover:text-white`}>
              <ArrowLeft size={18} /> Back to Catalog
            </Link>
            
            <div className="mb-8">
              <GuruGyaan context={idea.category.toLowerCase()} />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border bg-teal-500/20 text-teal-300 border-teal-500/30`}>
                {idea.category}
              </span>
              {idea.is_trending && (
                <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-1.5 border bg-amber-500/20 text-amber-300 border-amber-500/30`}>
                  <TrendingUp size={14} /> Trending Now
                </span>
              )}
            </div>

            <h1 className={`text-3xl md:text-5xl font-extrabold leading-[1.1] mb-5 tracking-tight text-white`}>
              {idea.title}
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl font-medium text-slate-200`}>
              {idea.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

        {/* Left Column: Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white  p-6 rounded-2xl border border-slate-200  shadow-sm sticky top-6">
            <h3 className="text-xs font-black text-slate-400  uppercase tracking-widest mb-6">{t('ideaDetail.quickFacts')}</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-slate-500  mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50  flex items-center justify-center"><IndianRupee size={16} className="text-amber-600 " /></div>
                  <span className="text-sm font-bold">{t('card.investment')}</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900  ml-10">{formatINR(idea.investment_min)} - {formatINR(idea.investment_max)}</div>
              </div>

              <div className="w-full h-px bg-slate-100 "></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500  mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50  flex items-center justify-center"><Briefcase size={16} className="text-emerald-600 " /></div>
                  <span className="text-sm font-bold">{t('card.profit')}</span>
                </div>
                <div className="text-xl font-extrabold text-emerald-600  ml-10">{idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}+` : 'Varies'}</div>
              </div>

              <div className="w-full h-px bg-slate-100 "></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500  mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50  flex items-center justify-center"><MapPin size={16} className="text-blue-600 " /></div>
                  <span className="text-sm font-bold">Location Setup</span>
                </div>
                <div className="text-lg font-bold text-slate-900  ml-10 capitalize">{locationType.replace('-', ' ')}</div>
              </div>

              <div className="w-full h-px bg-slate-100 "></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500  mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-purple-50  flex items-center justify-center"><Clock size={16} className="text-purple-600 " /></div>
                  <span className="text-sm font-bold">{t('ideaDetail.timeToStart')}</span>
                </div>
                <div className="text-lg font-bold text-slate-900  ml-10 capitalize">{timeCommitment.replace('-', ' ')}</div>
              </div>

              <div className="w-full h-px bg-slate-100 "></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500  mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-teal-50  flex items-center justify-center"><Target size={16} className="text-teal-600 " /></div>
                  <span className="text-sm font-bold">Skill Level</span>
                </div>
                <div className="text-lg font-bold text-slate-900  ml-10 capitalize">{skillLevel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50  p-6 rounded-2xl border border-emerald-100  shadow-sm">
              <h3 className="text-emerald-900  font-extrabold flex items-center gap-2.5 mb-5 text-lg">
                <CheckCircle size={22} className="text-emerald-600 " /> {t('ideaDetail.whyGood')}
              </h3>
              {pros.length > 0 ? (
                <ul className="space-y-4">
                  {pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-emerald-950  leading-snug">
                      <span className="text-emerald-500  mt-0.5 font-bold">{"\u2022"}</span> {pro}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-emerald-700  font-medium">No pros listed.</p>
              )}
            </div>

            <div className="bg-red-50  p-6 rounded-2xl border border-red-100  shadow-sm">
              <h3 className="text-red-900  font-extrabold flex items-center gap-2.5 mb-5 text-lg">
                <ShieldAlert size={22} className="text-red-600 " /> {t('ideaDetail.challenges')}
              </h3>
              {cons.length > 0 ? (
                <ul className="space-y-4">
                  {cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-red-950  leading-snug">
                      <span className="text-red-500  mt-0.5 font-bold">{"\u2022"}</span> {con}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-700  font-medium">No challenges listed.</p>
              )}
            </div>
          </div>

          {/* Licenses */}
          <div className="bg-white  p-6 md:p-8 rounded-2xl border border-slate-200  shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900  flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-50  rounded-xl flex items-center justify-center"><FileText size={20} className="text-teal-700 " /></div>
              {t('ideaDetail.licenses')}
            </h3>
            <div className="space-y-3">
              {requiredLicenses.length > 0 ? (
                requiredLicenses.map((license: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50  border border-slate-100  hover:border-teal-200  transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500 " />
                      <span className="font-bold text-slate-700 ">{license}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-slate-50  rounded-xl border border-slate-100 ">
                  <p className="font-medium text-slate-500 ">No special licenses required to start basic operations.</p>
                </div>
              )}
            </div>
          </div>

          {/* Real Example */}
          {idea.real_example_name && (
            <div className="bg-slate-900 p-6 md:p-10 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-5 text-teal-400">
                <MapPin size={250} />
              </div>
              <h3 className="text-sm font-black text-teal-400 uppercase tracking-widest mb-6 relative z-10">
                Real Indian Example
              </h3>
              <div className="relative z-10">
                <h4 className="font-extrabold text-3xl mb-2">{idea.real_example_name}</h4>
                {idea.real_example_location && (
                  <p className="text-slate-400 font-medium mb-6 flex items-center gap-1.5"><MapPin size={16} /> {idea.real_example_location}</p>
                )}
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
                  <p className="text-slate-200 text-lg leading-relaxed italic font-medium">
                    {idea.real_example_description
                      ? `\u201C${idea.real_example_description}\u201D`
                      : 'A successful real-world business following this model.'}
                  </p>
                </div>
                {idea.real_example_url && (
                  <div className="mt-6">
                    <a href={idea.real_example_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-colors">
                      <Target size={18} /> View Real Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* New In-Depth Components */}
          <MarketAnalysisCard analysis={idea.market_analysis} />
          <RoadmapTimeline roadmap={idea.roadmap} />
          <FinancialProjections financials={idea.financial_projections} />
          <ResourcesNeeded resources={idea.resources_needed || []} />
          <RiskAnalysis risks={idea.risk_analysis} />
          <SuccessStories stories={idea.success_stories} />

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-[70px] left-0 right-0 glass-panel border-b-0 rounded-b-none p-3 md:p-4 z-40 mx-4 md:mx-auto max-w-5xl">
        <div className="flex gap-4">
          <Link href={`/chat?idea=${idea.id}`} className="flex-1">
            <NeonButton variant="primary" className="w-full">
              <Bot size={22} className="mr-2" />
              <span className="hidden sm:inline">{t('ideaDetail.askMitra')}</span>
              <span className="sm:hidden">Ask AI</span>
            </NeonButton>
          </Link>
          <Link href={`/tasks?idea=${idea.id}`} className="flex-1">
            <NeonButton variant="secondary" className="w-full">
              <CheckCircle size={22} className="mr-2" />
              <span className="hidden sm:inline">{t('ideaDetail.generateChecklist')}</span>
              <span className="sm:hidden">Get Tasks</span>
            </NeonButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
