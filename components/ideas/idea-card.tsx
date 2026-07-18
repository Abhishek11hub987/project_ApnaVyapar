'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BusinessIdea } from '@/types/database';
import { useLanguage } from '@/lib/language-context';
import { GlassCard } from '@/components/ui/glass-card';

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

export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';

export default function IdeaCard({ idea }: { idea: BusinessIdea }) {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  
  const formatINR = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="h-full">
    <GlassCard className="h-full !p-0 overflow-hidden flex flex-col group relative">
      <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-5xl relative overflow-hidden">
        {!imgError ? (
          <img 
            src={idea.image_url || CATEGORY_IMAGES[idea.category] || DEFAULT_IMAGE} 
            alt={idea.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 dark:from-teal-900/40 dark:to-emerald-900/40 flex items-center justify-center text-teal-700 dark:text-teal-400 font-bold text-4xl group-hover:scale-105 transition-transform duration-500">
            {idea.title.substring(0, 2).toUpperCase()}
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none"></div>
        
        {idea.is_trending && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 pointer-events-none">
            Trending
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800/50 px-2.5 py-1 rounded-full w-fit mb-3">
          {idea.category}
        </span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 line-clamp-2 leading-[1.3] group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
          {idea.title}
        </h3>
        
        <div className="mt-auto space-y-3 text-sm text-slate-500 dark:text-slate-400 mb-5">
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg">
            <span className="font-medium text-slate-600 dark:text-slate-400">{t('card.investment')}</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {formatINR(idea.investment_min)}<span className="text-slate-400 font-normal"> - </span>{formatINR(idea.investment_max)}
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">Location</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">{idea.location_type.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">{t('card.profit')}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}${t('card.perMonth')}` : 'Varies'}
            </span>
          </div>
        </div>
        
        <Link 
          href={`/ideas/${idea.slug}`}
          className="w-full block text-center bg-white dark:bg-slate-900 hover:bg-teal-700 dark:hover:bg-teal-600 text-teal-700 dark:text-teal-400 hover:text-white border-2 border-teal-100 dark:border-teal-800 hover:border-teal-700 dark:hover:border-teal-600 font-bold py-3 rounded-xl transition-colors"
        >
          View Details
        </Link>
      </div>
    </GlassCard>
    </div>
  );
}
