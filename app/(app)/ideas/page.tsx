'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BusinessIdea } from '@/types/database';
import IdeaCard from '@/components/ideas/idea-card';
import IdeaFilters from '@/components/ideas/idea-filters';
import ContributeIdeaModal from '@/components/ideas/contribute-idea-modal';
import { Search, Lightbulb, Users2, Sparkles, Plus, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { GuruGyaan } from '@/components/guru-gyaan';
import { CATEGORY_GRADIENTS } from '@/components/ideas/idea-card';

type CommunityIdea = {
  id: number;
  title: string;
  description: string;
  category: string;
  investment_min: number;
  investment_max: number;
  location_type: string;
  monthly_profit_min: number | null;
  monthly_profit_max: number | null;
  pros: string[];
  cons: string[];
  required_skills: string[];
  image_url: string | null;
  slug: string;
  contributor_name: string | null;
  ai_generated: boolean;
  view_count: number;
  created_at: string;
};

export default function IdeasCatalog() {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [communityIdeas, setCommunityIdeas] = useState<CommunityIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', budget: '', location: '', sort: 'popular' });
  const [activeTab, setActiveTab] = useState<'curated' | 'community'>('curated');
  const [showContribute, setShowContribute] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetchIdeas();
  }, [filters, activeTab]);

  const fetchIdeas = async () => {
    setLoading(true);

    if (activeTab === 'curated') {
      let query = supabase.from('business_ideas').select('*').eq('is_active', true);

      if (filters.category) query = query.eq('category', filters.category);
      if (filters.location) query = query.eq('location_type', filters.location);
      
      if (filters.budget === 'under-10k') query = query.lte('investment_min', 10000);
      else if (filters.budget === '10k-50k') query = query.gte('investment_min', 10000).lte('investment_max', 50000);
      else if (filters.budget === '50k-2l') query = query.gte('investment_min', 50000).lte('investment_max', 200000);
      else if (filters.budget === '2l-10l') query = query.gte('investment_min', 200000).lte('investment_max', 1000000);

      if (filters.sort === 'inv_low') query = query.order('investment_min', { ascending: true });
      else if (filters.sort === 'inv_high') query = query.order('investment_min', { ascending: false });
      else if (filters.sort === 'profit') query = query.order('monthly_profit_max', { ascending: false });
      else if (filters.sort === 'trending') query = query.order('is_trending', { ascending: false }).order('view_count', { ascending: false });
      else query = query.order('view_count', { ascending: false });

      const { data } = await query;
      setIdeas(data || []);
    } else {
      // Fetch community ideas
      let query = supabase.from('community_ideas').select('*').eq('is_approved', true);
      
      if (filters.category) query = query.eq('category', filters.category);
      
      query = query.order('created_at', { ascending: false });
      
      const { data } = await query;
      setCommunityIdeas(data || []);
    }
    
    setLoading(false);
  };

  const filteredIdeas = search 
    ? ideas.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
    : ideas;

  const filteredCommunityIdeas = search
    ? communityIdeas.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
    : communityIdeas;

  const formatINR = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <main className="min-h-screen bg-navy pb-24 font-sans transition-colors">
      {/* Header */}
      <div className="pt-12 pb-20 px-4 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan rounded-full blur-3xl"></div>
          <div className="absolute top-24 -left-24 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <GuruGyaan context="general" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-8 mb-4 text-center">
            {t('catalog.title')}
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium text-center">
            {t('catalog.subtitle')}
          </p>
          
          <div className="relative max-w-2xl w-full mt-8">
            <Search className="absolute left-4 top-4 text-white/30" size={22} />
            <input 
              type="text" 
              placeholder={t('ideas.searchPlaceholder')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-xl rounded-2xl pl-12 pr-4 py-4 outline-none text-white font-medium border border-white/10 focus:border-cyan/40 focus:ring-2 focus:ring-cyan/20 transition-all placeholder:text-white/25"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Tab Switcher + Contribute Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('curated')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'curated' 
                  ? 'bg-cyan/20 text-cyan border border-cyan/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Sparkles size={16} /> Curated Ideas
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'community' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Users2 size={16} /> Community Ideas
            </button>
          </div>

          <button
            onClick={() => setShowContribute(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan to-emerald-500 text-navy-dark hover:shadow-neon-cyan hover:scale-105 transition-all"
          >
            <Plus size={16} /> Contribute Your Idea
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card p-5 md:p-8 mb-10 border border-white/5">
          <IdeaFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Content based on active tab */}
        {activeTab === 'curated' ? (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="glass-card overflow-hidden border border-white/5">
                    <div className="h-40 bg-white/5 animate-pulse" />
                    <div className="p-5 space-y-4">
                      <div className="h-5 w-20 bg-white/10 animate-pulse rounded-full" />
                      <div className="h-6 w-4/5 bg-white/10 animate-pulse" />
                      <div className="h-4 w-3/5 bg-white/10 animate-pulse" />
                      <div className="space-y-2 pt-2">
                        <div className="h-10 bg-white/10 animate-pulse rounded-lg" />
                        <div className="h-4 w-2/3 bg-white/10 animate-pulse" />
                      </div>
                      <div className="h-12 bg-white/10 animate-pulse rounded-xl mt-2" />
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
              <div className="text-center py-24 glass-card border border-white/5 animate-in fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No ideas found</h3>
                <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">We couldn't find any business ideas matching your current filters. Try broadening your search.</p>
                <button 
                  onClick={() => { setFilters({ category: '', budget: '', location: '', sort: 'popular' }); setSearch(''); }}
                  className="bg-cyan text-navy-dark px-8 py-3 rounded-full font-bold hover:shadow-neon-cyan transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="glass-card overflow-hidden border border-white/5">
                    <div className="h-40 bg-white/5 animate-pulse" />
                    <div className="p-5 space-y-4">
                      <div className="h-5 w-20 bg-white/10 animate-pulse rounded-full" />
                      <div className="h-6 w-4/5 bg-white/10 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCommunityIdeas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCommunityIdeas.map(idea => (
                  <IdeaCard key={idea.id} idea={idea} isCommunity={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass-card border border-white/5 animate-in fade-in">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <Lightbulb size={36} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No community ideas yet</h3>
                <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">Be the first to contribute a business idea! Our AI will research it and create a detailed card for the community.</p>
                <button 
                  onClick={() => setShowContribute(true)}
                  className="bg-gradient-to-r from-cyan to-emerald-500 text-navy-dark px-8 py-3 rounded-full font-bold hover:shadow-neon-cyan transition-all inline-flex items-center gap-2"
                >
                  <Plus size={18} /> Contribute First Idea
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Contribute Modal */}
      <ContributeIdeaModal 
        isOpen={showContribute} 
        onClose={() => setShowContribute(false)} 
        onSuccess={() => {
          if (activeTab === 'community') {
            fetchIdeas();
          } else {
            setActiveTab('community');
          }
        }}
      />
    </main>
  );
}
