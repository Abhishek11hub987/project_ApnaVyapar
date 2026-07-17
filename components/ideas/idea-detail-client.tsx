'use client';
import { Bot, CheckCircle, FileText, MapPin, Briefcase, Clock, IndianRupee, ShieldAlert, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BusinessIdea } from '@/types/database';
import { useLanguage } from '@/lib/language-context';

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

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 font-sans transition-colors">
      {/* Header/Hero */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-6 pb-12 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <Link href="/ideas" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 mb-8 transition-colors">
            <ArrowLeft size={18} /> Back to Catalog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-teal-200 dark:border-teal-800/50">
              {idea.category}
            </span>
            {idea.is_trending && (
              <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-1.5 border border-amber-200 dark:border-amber-800/50">
                <TrendingUp size={14} /> Trending Now
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-[1.1] mb-5 tracking-tight">
            {idea.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl font-medium">
            {idea.description}
          </p>
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

          {/* Market Analysis */}
          {idea.market_analysis && Object.keys(idea.market_analysis).length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Target className="text-blue-500" /> {t('ideaDetail.marketAnalysis')}
              </h3>
              <div className="space-y-4">
                {idea.market_analysis.marketSize && (
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Market Size</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.market_analysis.marketSize}</p>
                  </div>
                )}
                {idea.market_analysis.targetAudience && (
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Target Audience</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.market_analysis.targetAudience}</p>
                  </div>
                )}
                {idea.market_analysis.growthTrends && (
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Growth Trends</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.market_analysis.growthTrends}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Competition */}
          {idea.competition_strategy && Object.keys(idea.competition_strategy).length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <ShieldAlert className="text-orange-500" /> {t('ideaDetail.competitionStrategy')}
              </h3>
              <div className="space-y-4">
                {idea.competition_strategy.localCompetitors && (
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Local Competitors</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.competition_strategy.localCompetitors}</p>
                  </div>
                )}
                {idea.competition_strategy.differentiation && (
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">How to Differentiate</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.competition_strategy.differentiation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Roadmap */}
          {idea.roadmap && Object.keys(idea.roadmap).length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <MapPin className="text-emerald-500" /> {t('ideaDetail.roadmap')}
              </h3>
              <div className="space-y-4">
                {['week1', 'week2', 'month1', 'month3'].map((step, idx) => (
                  idea.roadmap[step] && (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                        {idx !== 3 && <div className="w-px h-full bg-slate-200 dark:bg-slate-700 my-1"></div>}
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 capitalize">{step.replace(/([0-9]+)/, ' $1')}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{idea.roadmap[step]}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Financials */}
          {idea.financial_projections && Object.keys(idea.financial_projections).length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <IndianRupee className="text-amber-500" /> {t('ideaDetail.financialProjections')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {idea.financial_projections.breakEven && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Break-Even Point</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.financial_projections.breakEven}</p>
                  </div>
                )}
                {idea.financial_projections.monthlyPnL && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Monthly P&L Estimate</h4>
                    <p className="text-slate-600 dark:text-slate-400">{idea.financial_projections.monthlyPnL}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resources */}
          {idea.resources_needed && idea.resources_needed.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Briefcase className="text-purple-500" /> {t('ideaDetail.resourcesNeeded')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                {idea.resources_needed.map((res: string, i: number) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Risks */}
          {idea.risk_analysis && Array.isArray(idea.risk_analysis) && idea.risk_analysis.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <ShieldAlert className="text-red-500" /> {t('ideaDetail.riskAnalysis')}
              </h3>
              <div className="space-y-4">
                {idea.risk_analysis.map((item: any, idx: number) => (
                  <div key={idx} className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                    <h4 className="font-bold text-red-900 dark:text-red-200 text-sm mb-1">Risk: {item.risk}</h4>
                    <p className="text-red-700 dark:text-red-400 text-sm"><span className="font-semibold">Mitigation:</span> {item.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Success Stories */}
          {idea.success_stories && Array.isArray(idea.success_stories) && idea.success_stories.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <TrendingUp className="text-teal-500" /> {t('ideaDetail.successStories')}
              </h3>
              <div className="space-y-4">
                {idea.success_stories.map((story: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{story.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 italic">"{story.description}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-[70px] left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 md:p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.3)] z-40">
        <div className="max-w-5xl mx-auto flex gap-4">
          <Link
            href={`/chat?idea=${idea.id}`}
            className="flex-1 flex items-center justify-center gap-2.5 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 font-extrabold py-4 px-4 rounded-xl border-2 border-teal-200 dark:border-teal-700 hover:bg-teal-100 dark:hover:bg-teal-900/50 hover:border-teal-300 dark:hover:border-teal-600 transition-all"
          >
            <Bot size={22} className="text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">{t('ideaDetail.askMitra')}</span>
            <span className="sm:hidden">Ask AI</span>
          </Link>
          <Link
            href={`/checklist?idea=${idea.id}`}
            className="flex-1 flex items-center justify-center gap-2.5 bg-amber-500 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <CheckCircle size={22} />
            <span className="hidden sm:inline">{t('ideaDetail.generateChecklist')}</span>
            <span className="sm:hidden">Get Checklist</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
