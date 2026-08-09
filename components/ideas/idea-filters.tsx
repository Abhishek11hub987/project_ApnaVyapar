'use client';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

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
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Filter size={16} className="text-accent-600" /> Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => setFilters({ ...filters, category: cat.value })}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                (filters.category === cat.value)
                  ? 'bg-accent-50 text-accent-700 border border-accent-200 shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
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
          <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
          <div className="relative">
            <select
              value={filters.budget || ''}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="input-base appearance-none cursor-pointer pr-10"
            >
              {BUDGETS.map(b => <option key={b.value} value={b.value} className="bg-white text-gray-900">{b.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Location Type</label>
          <div className="relative">
            <select
              value={filters.location || ''}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="input-base appearance-none cursor-pointer pr-10"
            >
              {LOCATIONS.map(l => <option key={l.value} value={l.value} className="bg-white text-gray-900">{l.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Sort */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
          <div className="relative">
            <select
              value={filters.sort || 'popular'}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="input-base appearance-none cursor-pointer pr-10"
            >
              <option value="popular" className="bg-white text-gray-900">Most Popular</option>
              <option value="inv_low" className="bg-white text-gray-900">Investment (Low to High)</option>
              <option value="inv_high" className="bg-white text-gray-900">Investment (High to Low)</option>
              <option value="profit" className="bg-white text-gray-900">Profit Potential</option>
              <option value="trending" className="bg-white text-gray-900">Trending Now</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
