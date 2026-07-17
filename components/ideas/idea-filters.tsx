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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Filter size={16} className="text-teal-600 dark:text-teal-400" /> Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => setFilters({ ...filters, category: cat.value })}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                (filters.category === cat.value)
                  ? 'bg-teal-700 dark:bg-teal-600 text-white border-transparent'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-400 dark:hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-400 border'
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
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Budget Range</label>
          <div className="relative">
            <select
              value={filters.budget || ''}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer"
            >
              {BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Location Type</label>
          <div className="relative">
            <select
              value={filters.location || ''}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer"
            >
              {LOCATIONS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Sort */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Sort By</label>
          <div className="relative">
            <select
              value={filters.sort || 'popular'}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="inv_low">Investment (Low to High)</option>
              <option value="inv_high">Investment (High to Low)</option>
              <option value="profit">Profit Potential</option>
              <option value="trending">Trending Now</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
