'use client';
import Link from 'next/link';
import ProtectedLink from '@/components/auth/protected-link';
import { useLanguage } from '@/lib/language-context';
import {
  ArrowRight, Bot, TrendingUp, BarChart2, Map,
  Star, ChevronRight, Zap, BookOpen, CheckCircle2
} from 'lucide-react';
import { GuruGyaan } from '@/components/guru-gyaan';
import { SarkariAlert } from '@/components/sarkari-alert';
import { VyaparScore } from '@/components/vyapar-score';
import { IdeaRoulette } from '@/components/idea-roulette';
import { BharatMap } from '@/components/bharat-map';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, Variants } from 'framer-motion';

// ─── Feature list ────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Map size={26} />,
    color: 'teal',
    title: 'Bharat Heatmap',
    desc: 'Visualise top business opportunities across every Indian state on an interactive clickable map.',
    tag: 'INTERACTIVE',
  },
  {
    icon: <Bot size={26} />,
    color: 'amber',
    title: 'Mitra AI',
    desc: 'Ask for budgets, legal steps, market size or competition analysis. Your 24/7 business advisor.',
    tag: 'AI-POWERED',
  },
  {
    icon: <TrendingUp size={26} />,
    color: 'purple',
    title: 'Deep Analytics',
    desc: 'Every idea has market size, profit projections, risk analysis and a step-by-step launch roadmap.',
    tag: 'DATA-DRIVEN',
  },
  {
    icon: <Star size={26} />,
    color: 'rose',
    title: 'Idea Roulette',
    desc: 'Swipe through curated ideas. Save the ones you like and earn XP points as you explore.',
    tag: 'GAMIFIED',
  },
];

const COLOR_MAP: Record<string, string> = {
  teal:   'text-teal-500 dark:text-teal-400 bg-teal-50 dark:bg-teal-400/10 border-teal-200 dark:border-teal-400/30',
  amber:  'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/30',
  purple: 'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-400/10 border-purple-200 dark:border-purple-400/30',
  rose:   'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/30',
};

const CHIP_MAP: Record<string, string> = {
  teal:   'text-teal-600 dark:text-teal-400 border-teal-300 dark:border-teal-400/40 bg-teal-50 dark:bg-teal-400/10',
  amber:  'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-400/40 bg-amber-50 dark:bg-amber-400/10',
  purple: 'text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-400/40 bg-purple-50 dark:bg-purple-400/10',
  rose:   'text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-400/40 bg-rose-50 dark:bg-rose-400/10',
};

const HOW = [
  { step: '01', icon: <BookOpen size={22} />, title: 'Discover', desc: 'Browse 25+ curated business ideas filtered by budget, category and location.' },
  { step: '02', icon: <Bot size={22} />,      title: 'Validate', desc: 'Chat with Mitra AI to verify market feasibility, costs and legal requirements.' },
  { step: '03', icon: <CheckCircle2 size={22} />, title: 'Launch', desc: 'Follow the auto-generated task checklist to register and launch your business.' },
];

// ─── Animation ───────────────────────────────────────────────────────
const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger: any = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Card shell — works in light AND dark ────────────────────────────
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 backdrop-blur-md shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ─── Primary button — navigable ──────────────────────────────────────
function PrimaryBtn({
  href,
  children,
  variant = 'teal',
  requireAuth = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'teal' | 'amber';
  requireAuth?: boolean;
}) {
  const cls = variant === 'teal'
    ? 'border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500'
    : 'border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500';
  const className = `inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 font-bold text-sm tracking-wide transition-all duration-200 ${cls}`;

  if (requireAuth) {
    return (
      <ProtectedLink href={href} className={className}>
        {children}
      </ProtectedLink>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────
export default function Home() {
  const { t } = useLanguage();
  const [ideas, setIdeas]           = useState<any[]>([]);
  const [ideaCount, setIdeaCount]   = useState<number | null>(null);

  useEffect(() => {
    // Real idea count from DB
    supabase
      .from('business_ideas')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
      .then(({ count }) => setIdeaCount(count ?? 0));

    // Ideas for roulette — random selection
    supabase
      .from('business_ideas')
      .select('*')
      .eq('is_active', true)
      .limit(5)
      .then(({ data }) => { if (data) setIdeas(data.sort(() => Math.random() - 0.5)); });
  }, []);

  return (
    <main className="min-h-screen pb-28 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-10 px-4">
        {/* Soft ambient — visible in both modes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-amber-400/8 dark:bg-amber-500/8 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-300 dark:border-teal-400/30 bg-teal-50 dark:bg-teal-400/5 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
            <span className="text-teal-700 dark:text-teal-400 text-xs font-bold tracking-widest uppercase">
              AI-Powered Business Navigator for India
            </span>
          </motion.div>

          <GuruGyaan context="landing" />

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show"
            className="mt-6 text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.08] tracking-tight"
          >
            {t('hero.title1')}{' '}
            <span className="bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-500 bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show"
            className="mt-5 text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA — using plain Link + styled anchor, NOT button inside Link */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <PrimaryBtn href="/ideas" variant="teal">
              {t('hero.cta.ideas')} <ArrowRight size={16} />
            </PrimaryBtn>
            <PrimaryBtn href="/chat" variant="amber" requireAuth>
              Ask Mitra AI <Bot size={16} />
            </PrimaryBtn>
          </motion.div>

          {/* Real count pill */}
          {ideaCount !== null && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-5 text-sm text-slate-500 dark:text-slate-400"
            >
              ✅ <strong className="text-slate-700 dark:text-slate-200">{ideaCount} curated business ideas</strong> ready to explore — completely free.
            </motion.p>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="px-4 max-w-5xl mx-auto mb-14">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase mb-1">How it works</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Three steps to your business</h2>
        </div>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {HOW.map((step, i) => (
            <motion.div key={step.title} variants={fadeUp}>
              <Card className="p-6 relative overflow-hidden group hover:border-teal-300 dark:hover:border-teal-400/30 transition-colors">
                <span className="absolute top-4 right-4 text-4xl font-black text-slate-100 dark:text-slate-800 select-none">{step.step}</span>
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-400/10 border border-teal-200 dark:border-teal-400/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                {i < HOW.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-slate-300 dark:text-slate-600" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── MAIN INTERACTIVE GRID ────────────────────────────────── */}
      <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Map + Journey + Alerts */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <BharatMap />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card className="p-5 flex flex-col items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-0.5">Your Journey</h3>
              <p className="text-xs text-slate-500 mb-3">Track progress &amp; earn XP</p>
              <VyaparScore size={130} />
            </Card>

            <div className="flex flex-col gap-3">
              <SarkariAlert />
              <SarkariAlert scheme={{
                name: 'Stand-Up India Scheme',
                amount: '₹10L – ₹1Cr',
                desc: 'Loans for SC/ST and/or women entrepreneurs.',
                link: 'https://www.standupmitra.in/',
              }} />
            </div>
          </div>
        </div>

        {/* Right: Idea Roulette */}
        <div className="lg:col-span-4">
          <Card className="p-5 flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Idea Roulette</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Swipe right to save • Earn XP</p>
            </div>
            <div className="flex-1 flex items-start justify-center min-h-[520px]">
              {ideas.length > 0 ? (
                <IdeaRoulette ideas={ideas} />
              ) : (
                <div className="flex flex-col items-center gap-3 mt-8 w-full">
                  <div className="w-56 h-80 bg-slate-100 dark:bg-slate-800/60 rounded-[20px] animate-pulse" />
                  <p className="text-xs text-slate-400">Loading ideas…</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="px-4 max-w-7xl mx-auto mt-16">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase mb-1">Platform</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Everything to launch your business</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg mx-auto">
            A complete operating system for first-time Indian entrepreneurs.
          </p>
        </div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="group">
              <Card className="p-6 h-full flex flex-col hover:border-teal-300 dark:hover:border-teal-400/30 transition-all duration-300 group-hover:shadow-md">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${COLOR_MAP[f.color]}`}>
                  {f.icon}
                </div>
                <span className={`inline-block text-[10px] font-bold tracking-widest border rounded-full px-2 py-0.5 mb-3 ${CHIP_MAP[f.color]}`}>
                  {f.tag}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="px-4 max-w-3xl mx-auto mt-20">
        <Card className="p-10 text-center bg-gradient-to-br from-teal-50 to-amber-50/50 dark:from-teal-900/20 dark:to-amber-900/10 border-teal-200 dark:border-teal-400/20 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl" />
          </div>
          <Zap size={32} className="text-teal-500 dark:text-teal-400 mx-auto mb-3" />
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
            Your business journey starts today.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-7 text-sm max-w-md mx-auto">
            Thousands of first-time Indian entrepreneurs have already found their perfect idea. Yours is waiting.
          </p>
          <PrimaryBtn href="/ideas" variant="teal">
            Browse All {ideaCount !== null ? ideaCount : '…'} Business Ideas <ArrowRight size={16} />
          </PrimaryBtn>
        </Card>
      </section>

    </main>
  );
}
