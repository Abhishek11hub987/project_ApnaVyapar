import Link from 'next/link';
import { BusinessIdea } from '@/types/database';

export default function IdeaCard({ idea }: { idea: BusinessIdea }) {
  const formatINR = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all hover:border-teal-300">
      {/* Image Placeholder */}
      <div className="h-40 bg-slate-100 flex items-center justify-center text-5xl relative overflow-hidden">
        {idea.image_url ? (
          <img src={idea.image_url} alt={idea.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-3xl opacity-50 group-hover:scale-105 transition-transform duration-500">
            {idea.title.substring(0, 2).toUpperCase()}
          </div>
        )}
        {idea.is_trending && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
            Trending
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-full w-fit mb-3">
          {idea.category}
        </span>
        <h3 className="text-lg font-bold text-slate-800 mb-4 line-clamp-2 leading-[1.3]">
          {idea.title}
        </h3>
        
        <div className="mt-auto space-y-3 text-sm text-slate-500 mb-5">
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg">
            <span className="font-medium text-slate-600">Investment</span>
            <span className="font-bold text-slate-900">
              {formatINR(idea.investment_min)}<span className="text-slate-400 font-normal"> - </span>{formatINR(idea.investment_max)}
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">Location</span>
            <span className="font-semibold text-slate-700 capitalize">{idea.location_type.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-medium">Est. Profit</span>
            <span className="font-bold text-emerald-600">
              {idea.monthly_profit_min ? `${formatINR(idea.monthly_profit_min)}/mo` : 'Varies'}
            </span>
          </div>
        </div>
        
        <Link 
          href={`/ideas/${idea.slug}`}
          className="w-full block text-center bg-white hover:bg-teal-700 text-teal-700 hover:text-white border-2 border-teal-100 hover:border-teal-700 font-bold py-3 rounded-xl transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
