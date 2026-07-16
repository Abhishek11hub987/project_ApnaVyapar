import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { BusinessIdea } from '@/types/database';
import { Bot, CheckCircle, FileText, MapPin, Briefcase, Clock, IndianRupee, ShieldAlert, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // ISR cache for 60 seconds

export default async function IdeaDetailPage({ params }: { params: { slug: string } }) {
  const { data: idea } = await supabaseAdmin
    .from('business_ideas')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!idea) {
    notFound();
  }

  // Increment view count in background (fire and forget)
  supabaseAdmin
    .from('business_ideas')
    .update({ view_count: (idea.view_count || 0) + 1 })
    .eq('id', idea.id)
    .then();

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <main className="min-h-screen bg-slate-50 pb-32 font-sans">
      {/* Header/Hero */}
      <div className="bg-white border-b border-slate-200 pt-6 pb-12 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <Link href="/ideas" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-700 mb-8 transition-colors">
            <ArrowLeft size={18} /> Back to Catalog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-teal-100 text-teal-800 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-teal-200">
              {idea.category}
            </span>
            {idea.is_trending && (
              <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-1.5 border border-amber-200">
                <TrendingUp size={14} /> Trending Now
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
            {idea.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl font-medium">
            {idea.description}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

        {/* Left Column: Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Business Profile</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-slate-500 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center"><IndianRupee size={16} className="text-amber-600" /></div>
                  <span className="text-sm font-bold">Investment Needed</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 ml-10">{formatINR(idea.investment_min)} - {formatINR(idea.investment_max)}</div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center"><Briefcase size={16} className="text-emerald-600" /></div>
                  <span className="text-sm font-bold">Est. Monthly Profit</span>
                </div>
                <div className="text-xl font-extrabold text-emerald-600 ml-10">{idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}+` : 'Varies'}</div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center"><MapPin size={16} className="text-blue-600" /></div>
                  <span className="text-sm font-bold">Location Setup</span>
                </div>
                <div className="text-lg font-bold text-slate-900 ml-10 capitalize">{idea.location_type.replace('-', ' ')}</div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center"><Clock size={16} className="text-purple-600" /></div>
                  <span className="text-sm font-bold">Time Commitment</span>
                </div>
                <div className="text-lg font-bold text-slate-900 ml-10 capitalize">{idea.time_commitment?.replace('-', ' ') || 'Flexible'}</div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div>
                <div className="flex items-center gap-2.5 text-slate-500 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center"><Target size={16} className="text-teal-600" /></div>
                  <span className="text-sm font-bold">Skill Level</span>
                </div>
                <div className="text-lg font-bold text-slate-900 ml-10 capitalize">{idea.skill_level || 'Beginner'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
              <h3 className="text-emerald-900 font-extrabold flex items-center gap-2.5 mb-5 text-lg">
                <CheckCircle size={22} className="text-emerald-600" /> Why it's great
              </h3>
              <ul className="space-y-4">
                {idea.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-emerald-950 leading-snug">
                    <span className="text-emerald-500 mt-0.5 font-bold">•</span> {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
              <h3 className="text-red-900 font-extrabold flex items-center gap-2.5 mb-5 text-lg">
                <ShieldAlert size={22} className="text-red-600" /> Challenges
              </h3>
              <ul className="space-y-4">
                {idea.cons.map((con: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-red-950 leading-snug">
                    <span className="text-red-500 mt-0.5 font-bold">•</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Licenses */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center"><FileText size={20} className="text-teal-700" /></div>
              Required Licenses
            </h3>
            <div className="space-y-3">
              {idea.required_licenses.map((license: string, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="font-bold text-slate-700">{license}</span>
                  </div>
                </div>
              ))}
              {idea.required_licenses.length === 0 && (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-medium text-slate-500">No special licenses required to start basic operations.</p>
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
                <p className="text-slate-400 font-medium mb-6 flex items-center gap-1.5"><MapPin size={16} /> {idea.real_example_location}</p>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
                  <p className="text-slate-200 text-lg leading-relaxed italic font-medium">
                    "{idea.real_example_description}"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40 pb-safe">
        <div className="max-w-5xl mx-auto flex gap-4">
          <Link
            href={`/chat?idea=${idea.id}`}
            className="flex-1 flex items-center justify-center gap-2.5 bg-teal-50 text-teal-800 font-extrabold py-4 px-4 rounded-xl border-2 border-teal-200 hover:bg-teal-100 hover:border-teal-300 transition-all"
          >
            <Bot size={22} className="text-teal-600" />
            <span className="hidden sm:inline">Ask Vyapar Mitra About This</span>
            <span className="sm:hidden">Ask AI</span>
          </Link>
          <Link
            href={`/checklist?idea=${idea.id}`}
            className="flex-1 flex items-center justify-center gap-2.5 bg-amber-500 text-white font-extrabold py-4 px-4 rounded-xl hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <CheckCircle size={22} />
            <span className="hidden sm:inline">Generate Launch Checklist</span>
            <span className="sm:hidden">Get Checklist</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
