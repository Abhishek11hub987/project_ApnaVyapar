'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BusinessIdea } from '@/types/database';
import IdeaCard from '@/components/ideas/idea-card';
import IdeaFilters from '@/components/ideas/idea-filters';
import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { GuruGyaan } from '@/components/guru-gyaan';

export default function IdeasCatalog() {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', budget: '', location: '', sort: 'popular' });
  const { t } = useLanguage();

  useEffect(() => {
    fetchIdeas();
  }, [filters]);

  const fetchIdeas = async () => {
    setLoading(true);
    let query = supabase.from('business_ideas').select('*').eq('is_active', true);

    // Apply exact filters
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.location) query = query.eq('location_type', filters.location);
    
    // Apply range filters
    if (filters.budget === 'under-10k') query = query.lte('investment_min', 10000);
    else if (filters.budget === '10k-50k') query = query.gte('investment_min', 10000).lte('investment_max', 50000);
    else if (filters.budget === '50k-2l') query = query.gte('investment_min', 50000).lte('investment_max', 200000);
    else if (filters.budget === '2l-10l') query = query.gte('investment_min', 200000).lte('investment_max', 1000000);

    // Apply sorting
    if (filters.sort === 'inv_low') query = query.order('investment_min', { ascending: true });
    else if (filters.sort === 'inv_high') query = query.order('investment_min', { ascending: false });
    else if (filters.sort === 'profit') query = query.order('monthly_profit_max', { ascending: false });
    else if (filters.sort === 'trending') query = query.order('is_trending', { ascending: false }).order('view_count', { ascending: false });
    else query = query.order('view_count', { ascending: false }); // default popular

    const { data } = await query;
    setIdeas(data || []);
    setLoading(false);
  };

  const filteredIdeas = search 
    ? ideas.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
    : ideas;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 font-sans transition-colors">
      {/* Header */}
      <div className="pt-12 pb-20 px-4 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute top-24 -left-24 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <GuruGyaan context="general" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4">
            {t('catalog.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium text-center">
            {t('catalog.subtitle')}
          </p>
          
          <div className="relative max-w-2xl w-full mt-8 shadow-xl rounded-2xl">
            <Search className="absolute left-4 top-4 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder={t('ideas.searchPlaceholder')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 rounded-2xl pl-12 pr-4 py-4 outline-none text-slate-800 dark:text-slate-200 font-medium border border-transparent dark:border-slate-700 focus:ring-4 focus:ring-teal-500/30 transition-shadow placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-5 md:p-8 mb-10">
          <IdeaFilters filters={filters} setFilters={setFilters} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="h-40 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                <div className="p-5 space-y-4">
                  <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-full" />
                  <div className="h-6 w-4/5 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                  <div className="h-4 w-3/5 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                  <div className="space-y-2 pt-2">
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg" />
                    <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                  </div>
                  <div className="h-12 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-stagger">
            {filteredIdeas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No ideas found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">We couldn't find any business ideas matching your current filters. Try broadening your search.</p>
            <button 
              onClick={() => { setFilters({ category: '', budget: '', location: '', sort: 'popular' }); setSearch(''); }}
              className="bg-amber-500 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-600 transition-colors shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
