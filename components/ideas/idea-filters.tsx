'use client';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function IdeaFilters({ filters, setFilters }: { filters: any, setFilters: (f: any) => void }) {
  const { t } = useLanguage();

  const CATEGORIES = [
    { label: t('filter.all'), value: '' },
    { label: 'Food', value: 'Food' },
    { label: 'Education', value: 'Education' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Services', value: 'Services' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Manufacturing', value: 'Manufacturing' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Health', value: 'Health' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Transportation', value: 'Transportation' }
  ];

  const BUDGETS = [
    { label: t('filter.all'), value: '' },
    { label: 'Under ₹10,000', value: 'under-10k' },
    { label: '₹10,000 - ₹50,000', value: '10k-50k' },
    { label: '₹50,000 - ₹2,00,000', value: '50k-2l' },
    { label: '₹2,00,000 - ₹10,00,000', value: '2l-10l' },
  ];

  const LOCATIONS = [
    { label: t('filter.all'), value: '' },
    { label: t('filter.homeBased'), value: 'home-based' },
    { label: 'Physical Shop', value: 'physical-shop' },
    { label: t('filter.online'), value: 'online-only' },
    { label: t('filter.offline'), value: 'hybrid' },
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
          <Filter size={16} className="text-cyan" /> Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => setFilters({ ...filters, category: cat.value })}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                (filters.category === cat.value)
                  ? 'bg-cyan/20 text-cyan border border-cyan/30 shadow-[0_0_10px_rgba(0,212,255,0.15)]'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:border-cyan/30 hover:text-white/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Budget */}
        <div>
          <label className="block text-sm font-bold text-white/60 mb-2">Budget Range</label>
          <div className="relative">
            <select
              value={filters.budget || ''}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80 outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30 appearance-none cursor-pointer transition-colors"
            >
              {BUDGETS.map(b => <option key={b.value} value={b.value} className="bg-navy text-white">{b.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-white/60 mb-2">Location Type</label>
          <div className="relative">
            <select
              value={filters.location || ''}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80 outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30 appearance-none cursor-pointer transition-colors"
            >
              {LOCATIONS.map(l => <option key={l.value} value={l.value} className="bg-navy text-white">{l.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Sort */}
        <div>
          <label className="block text-sm font-bold text-white/60 mb-2">Sort By</label>
          <div className="relative">
            <select
              value={filters.sort || 'popular'}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80 outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30 appearance-none cursor-pointer transition-colors"
            >
              <option value="popular" className="bg-navy text-white">Most Popular</option>
              <option value="inv_low" className="bg-navy text-white">Investment (Low to High)</option>
              <option value="inv_high" className="bg-navy text-white">Investment (High to Low)</option>
              <option value="profit" className="bg-navy text-white">Profit Potential</option>
              <option value="trending" className="bg-navy text-white">Trending Now</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
