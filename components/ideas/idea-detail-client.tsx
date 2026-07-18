'use client';
import { Bot, CheckCircle, FileText, MapPin, Briefcase, Clock, IndianRupee, ShieldAlert, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BusinessIdea } from '@/types/database';
import { useLanguage } from '@/lib/language-context';
import { CATEGORY_IMAGES, DEFAULT_IMAGE } from './idea-card';
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
  const imageUrl = idea.image_url || CATEGORY_IMAGES[idea.category] || DEFAULT_IMAGE;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 font-sans transition-colors">
      {/* Header/Hero */}
      <div className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Background Image with Gradient Overlay */}
        {imageUrl && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={imageUrl} alt={idea.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-slate-900/40 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/50" />
          </>
        )}

        <div className={`relative z-10 pt-6 pb-16 px-4 ${imageUrl ? 'text-white' : ''}`}>
          <div className="max-w-5xl mx-auto">
            <Link href="/ideas" className={`inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors ${imageUrl ? 'text-slate-300 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400'}`}>
              <ArrowLeft size={18} /> Back to Catalog
            </Link>
            
            <div className="mb-8">
              <GuruGyaan context={idea.category.toLowerCase()} />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border ${imageUrl ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/50'}`}>
                {idea.category}
              </span>
              {idea.is_trending && (
                <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-1.5 border ${imageUrl ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'}`}>
                  <TrendingUp size={14} /> Trending Now
                </span>
              )}
            </div>

            <h1 className={`text-3xl md:text-5xl font-extrabold leading-[1.1] mb-5 tracking-tight ${imageUrl ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
              {idea.title}
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl font-medium ${imageUrl ? 'text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
              {idea.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

        {/* Left Column: Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-6">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">{t('ideaDetail.quickFacts')}</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center"><IndianRupee size={16} className="text-amber-600 dark:text-amber-400" /></div>
                  <span className="text-sm font-bold">{t('card.investment')}</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 ml-10">{formatINR(idea.investment_min)} - {formatINR(idea.investment_max)}</div>
              </div>

              <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center"><Briefcase size={16} className="text-emerald-600 dark:text-emerald-400" /></div>
                  <span className="text-sm font-bold">{t('card.profit')}</span>
                </div>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 ml-10">{idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}+` : 'Varies'}</div>
              </div>

              <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center"><MapPin size={16} className="text-blue-600 dark:text-blue-400" /></div>
                  <span className="text-sm font-bold">Location Setup</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100 ml-10 capitalize">{locationType.replace('-', ' ')}</div>
              </div>

              <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center"><Clock size={16} className="text-purple-600 dark:text-purple-400" /></div>
                  <span className="text-sm font-bold">{t('ideaDetail.timeToStart')}</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100 ml-10 capitalize">{timeCommitment.replace('-', ' ')}</div>
              </div>

              <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center"><Target size={16} className="text-teal-600 dark:text-teal-400" /></div>
                  <span className="text-sm font-bold">Skill Level</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100 ml-10 capitalize">{skillLevel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
              <h3 className="text-emerald-900 dark:text-emerald-100 font-extrabold flex items-center gap-2.5 mb-5 text-lg">
                <CheckCircle size={22} className="text-emerald-600 dark:text-emerald-400" /> {t('ideaDetail.whyGood')}
              </h3>
              {pros.length > 0 ? (
                <ul className="space-y-4">
                  {pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-emerald-950 dark:text-emerald-200 leading-snug">
                      <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 font-bold">{"\u2022"}</span> {pro}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">No pros listed.</p>
              )}
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800/50 shadow-sm">
              <h3 className="text-red-900 dark:text-red-100 font-extrabold flex items-center gap-2.5 mb-5 text-lg">
                <ShieldAlert size={22} className="text-red-600 dark:text-red-400" /> {t('ideaDetail.challenges')}
              </h3>
              {cons.length > 0 ? (
                <ul className="space-y-4">
                  {cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-red-950 dark:text-red-200 leading-snug">
                      <span className="text-red-500 dark:text-red-400 mt-0.5 font-bold">{"\u2022"}</span> {con}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">No challenges listed.</p>
              )}
            </div>
          </div>

          {/* Licenses */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center"><FileText size={20} className="text-teal-700 dark:text-teal-400" /></div>
              {t('ideaDetail.licenses')}
            </h3>
            <div className="space-y-3">
              {requiredLicenses.length > 0 ? (
                requiredLicenses.map((license: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                      <span className="font-bold text-slate-700 dark:text-slate-200">{license}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="font-medium text-slate-500 dark:text-slate-400">No special licenses required to start basic operations.</p>
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
            <NeonButton variant="teal" className="w-full">
              <Bot size={22} className="mr-2" />
              <span className="hidden sm:inline">{t('ideaDetail.askMitra')}</span>
              <span className="sm:hidden">Ask AI</span>
            </NeonButton>
          </Link>
          <Link href={`/tasks?idea=${idea.id}`} className="flex-1">
            <NeonButton variant="amber" className="w-full">
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
