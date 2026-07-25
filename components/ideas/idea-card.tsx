'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BusinessIdea } from '@/types/database';
import { useLanguage } from '@/lib/language-context';

export const CATEGORY_IMAGES: Record<string, string> = {
  'Food': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'Education': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'Services': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  'Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  'Manufacturing': 'https://images.unsplash.com/photo-1565439386341-a1e4c76085a8?w=800&q=80',
  'Agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
  'Health': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
  'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
  'Transportation': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  'Food': 'from-orange-500/30 to-red-500/30',
  'Education': 'from-blue-500/30 to-indigo-500/30',
  'Technology': 'from-cyan-500/30 to-blue-500/30',
  'Services': 'from-teal-500/30 to-emerald-500/30',
  'Retail': 'from-purple-500/30 to-pink-500/30',
  'Manufacturing': 'from-slate-500/30 to-zinc-500/30',
  'Agriculture': 'from-green-500/30 to-lime-500/30',
  'Health': 'from-rose-500/30 to-pink-500/30',
  'Fashion': 'from-fuchsia-500/30 to-purple-500/30',
  'Transportation': 'from-amber-500/30 to-yellow-500/30',
};

export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';

import ideasHi from '@/locales/ideas_hi.json';

export default function IdeaCard({ idea }: { idea: BusinessIdea }) {
  const { language, t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  
  const formatINR = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  // Dynamic Hindi translation lookup
  const localizedTitle = language === 'hi' ? (ideasHi as any)[idea.id]?.title || idea.title : idea.title;
  const localizedCategory = language === 'hi' ? (ideasHi as any)[idea.id]?.category || idea.category : idea.category;

  return (
    <div className="h-full">
    <div className="h-full glass-card !p-0 overflow-hidden flex flex-col group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]">
      <div className="h-48 bg-navy-light flex items-center justify-center text-5xl relative overflow-hidden">
        {!imgError ? (
          <img 
            src={idea.image_url || CATEGORY_IMAGES[idea.category] || DEFAULT_IMAGE} 
            alt={localizedTitle} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_GRADIENTS[idea.category] || 'from-cyan-500/30 to-blue-500/30'} flex items-center justify-center text-white/60 font-bold text-4xl group-hover:scale-105 transition-transform duration-500`}>
            {localizedTitle.substring(0, 2).toUpperCase()}
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent pointer-events-none"></div>
        
        {idea.is_trending && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 pointer-events-none">
            {t('card.trending')}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-cyan bg-cyan/10 border border-cyan/20 px-2.5 py-1 rounded-full w-fit mb-3">
          {localizedCategory}
        </span>
        <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 leading-[1.3] group-hover:text-cyan transition-colors">
          {localizedTitle}
        </h3>
        
        <div className="mt-auto space-y-3 text-sm text-white/50 mb-5">
          <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5">
            <span className="font-medium text-white/40">{t('card.investment')}</span>
            <span className="font-bold text-white">
              {formatINR(idea.investment_min)}<span className="text-white/30 font-normal"> - </span>{formatINR(idea.investment_max)}
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">{t('card.location')}</span>
            <span className="font-semibold text-white/70 capitalize">{idea.location_type.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">{t('card.profit')}</span>
            <span className="font-bold text-emerald-400">
              {idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}${t('card.perMonth')}` : 'Varies'}
            </span>
          </div>
        </div>
        
        <Link 
          href={`/ideas/${idea.slug}`}
          className="w-full block text-center bg-transparent hover:bg-cyan text-cyan hover:text-navy-dark border-2 border-cyan/30 hover:border-cyan font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-neon-cyan"
        >
          {t('card.viewDetails')}
        </Link>
      </div>
    </div>
    </div>
  );
}
