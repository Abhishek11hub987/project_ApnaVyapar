'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { BusinessIdea } from '@/types/idea';
import IdeaCard from '@/components/ideas/idea-card';
import IdeaFilters from '@/components/ideas/idea-filters';
import ContributeIdeaModal from '@/components/ideas/contribute-idea-modal';
import { Search, Lightbulb, Users2, Sparkles, Plus, TrendingUp, Layers } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
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
  const router = useRouter();
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
    <main className="min-h-screen bg-surface-secondary pb-24 font-sans selection:bg-accent-500/30">
      {/* Premium Hero Header */}
      <div className="relative pt-16 pb-24 px-4 bg-white border-b border-gray-100 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[100%] bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-600 rounded-full blur-[120px] opacity-[0.07] animate-pulse-slow mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[80%] bg-gradient-to-tl from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur-[100px] opacity-[0.05] animate-pulse-slow mix-blend-multiply pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <div className="animate-fade-in-up">
            <GuruGyaan context="general" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-10 mb-6 text-center tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600">Business Ideas</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto text-center font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Hand-picked, high-profit ideas curated for the Indian market. Find your perfect fit.
          </p>
          
          <div className="relative max-w-2xl w-full mt-10 animate-in fade-in zoom-in-95 duration-700 delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white border border-gray-100 shadow-xl rounded-2xl flex items-center p-2 transition-all focus-within:border-accent-300 focus-within:ring-4 focus-within:ring-accent-500/10">
              <Search className="text-accent-500 ml-3 shrink-0" size={24} />
              <input 
                type="text" 
                placeholder="Search businesses, skills, or keywords..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 text-lg py-3 px-4 focus:outline-none focus:ring-0 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-20">
        {/* Tab Switcher + Contribute Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          
          {/* Segmented Control Tabs */}
          <div className="flex items-center p-1.5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('curated')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === 'curated' 
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Sparkles size={16} className={activeTab === 'curated' ? 'text-amber-400' : ''} /> Curated Ideas
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === 'community' 
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Users2 size={16} className={activeTab === 'community' ? 'text-accent-400' : ''} /> Community Ideas
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/ideas/roulette"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-accent-600 to-purple-600 text-white hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Layers size={16} /> Play Roulette
            </Link>
            <button
              onClick={() => setShowContribute(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-gray-900 border border-gray-200 shadow-sm hover:border-gray-900 hover:shadow-md transition-all duration-300"
            >
              <Plus size={16} /> Contribute Your Idea
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-6 md:p-8 mb-10">
          <IdeaFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Content based on active tab */}
        {activeTab === 'curated' ? (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-100 animate-pulse" />
                    <div className="p-5 space-y-4">
                      <div className="h-5 w-20 bg-gray-100 animate-pulse rounded-full" />
                      <div className="h-6 w-4/5 bg-gray-100 animate-pulse" />
                      <div className="h-4 w-3/5 bg-gray-100 animate-pulse" />
                      <div className="space-y-2 pt-2">
                        <div className="h-10 bg-gray-100 animate-pulse rounded-lg" />
                      </div>
                      <div className="h-10 bg-gray-100 animate-pulse rounded-lg mt-2" />
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
              <div className="text-center py-20 bg-white border border-gray-100 rounded-lg shadow-card">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas found</h3>
                <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">We couldn't find any business ideas matching your search.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {search ? (
                    <button 
                      onClick={() => router.push(`/chat?query=${encodeURIComponent(`I want to start a business related to "${search}". Can you research this idea and publish it to the community catalog?`)}`)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <Sparkles size={16} /> Ask Vyapar Mitra to Research
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowContribute(true)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Contribute an Idea
                    </button>
                  )}
                  <button 
                    onClick={() => { setFilters({ category: '', budget: '', location: '', sort: 'popular' }); setSearch(''); }}
                    className="bg-white text-gray-700 border border-gray-200 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-100 animate-pulse" />
                    <div className="p-5 space-y-4">
                      <div className="h-5 w-20 bg-gray-100 animate-pulse rounded-full" />
                      <div className="h-6 w-4/5 bg-gray-100 animate-pulse" />
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
              <div className="text-center py-20 bg-white border border-gray-100 rounded-lg shadow-card">
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <Lightbulb size={30} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No community ideas found</h3>
                <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">Be the first to contribute a business idea!</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {search ? (
                    <button 
                      onClick={() => router.push(`/chat?query=${encodeURIComponent(`I want to start a business related to "${search}". Can you research this idea and publish it to the community catalog?`)}`)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <Sparkles size={16} /> Ask Vyapar Mitra to Research
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowContribute(true)}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} /> Contribute First Idea
                    </button>
                  )}
                  {search && (
                    <button 
                      onClick={() => setSearch('')}
                      className="bg-white text-gray-700 border border-gray-200 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
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
