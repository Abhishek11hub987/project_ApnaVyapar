'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BusinessIdea } from '@/types/database';
import { useLanguage } from '@/lib/i18n/language-context';
import { Sparkles } from 'lucide-react';

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
  'Food': 'from-orange-200 to-red-200',
  'Education': 'from-blue-200 to-indigo-200',
  'Technology': 'from-cyan-200 to-blue-200',
  'Services': 'from-teal-200 to-emerald-200',
  'Retail': 'from-purple-200 to-pink-200',
  'Manufacturing': 'from-gray-200 to-zinc-200',
  'Agriculture': 'from-green-200 to-lime-200',
  'Health': 'from-rose-200 to-pink-200',
  'Fashion': 'from-fuchsia-200 to-purple-200',
  'Transportation': 'from-amber-200 to-yellow-200',
};

export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';

import ideasHi from '@/locales/ideas-hi.json';

export default function IdeaCard({ idea, isCommunity = false }: { idea: any, isCommunity?: boolean }) {
  const { language, t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const localizedTitle = language === 'hi' ? (ideasHi as any)[idea.id]?.title || idea.title : idea.title;
  const localizedCategory = language === 'hi' ? (ideasHi as any)[idea.id]?.category || idea.category : idea.category;

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-card overflow-hidden flex flex-col group hover:shadow-elevated hover:border-gray-200 transition-all duration-200">
      <div className="h-44 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {!imgError ? (
          <img
            src={idea.image_url || CATEGORY_IMAGES[idea.category] || DEFAULT_IMAGE}
            alt={localizedTitle}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_GRADIENTS[idea.category] || 'from-gray-200 to-gray-300'} flex items-center justify-center text-gray-400 font-bold text-3xl`}>
            {localizedTitle.substring(0, 2).toUpperCase()}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

        {isCommunity && idea.ai_generated && (
          <div className="absolute top-3 right-3 bg-white/90 text-gray-700 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 flex items-center gap-1 border border-gray-200">
            <Sparkles size={10} /> AI Researched
          </div>
        )}

        {!isCommunity && idea.is_trending && (
          <div className="absolute top-3 right-3 bg-amber-50 text-amber-700 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 border border-amber-200">
            {t('card.trending')}
          </div>
        )}

        {isCommunity && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              by {idea.contributor_name || 'Anonymous'}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-medium text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full w-fit mb-3">
          {localizedCategory}
        </span>
        <h3 className="text-base font-semibold text-gray-900 mb-4 line-clamp-2 leading-snug">
          {localizedTitle}
        </h3>

        <div className="mt-auto space-y-2.5 text-sm text-gray-500 mb-4">
          <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
            <span className="font-medium text-gray-400">{t('card.investment')}</span>
            <span className="font-semibold text-gray-900">
              {formatINR(idea.investment_min)}<span className="text-gray-300 font-normal"> - </span>{formatINR(idea.investment_max)}
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">{t('card.location')}</span>
            <span className="font-semibold text-gray-700 capitalize">{idea.location_type.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">{t('card.profit')}</span>
            <span className="font-semibold text-green-600">
              {idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}${t('card.perMonth')}` : 'Varies'}
            </span>
          </div>
        </div>

        <Link
          href={`/ideas/${idea.slug}`}
          className="w-full block text-center bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {t('card.viewDetails')}
        </Link>
      </div>
    </div>
  );
}
