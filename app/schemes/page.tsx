'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { GovernmentScheme } from '@/types/database';
import { Search, ExternalLink, IndianRupee, Building2, CheckCircle2 } from 'lucide-react';

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const CATEGORIES = ['All', 'Loan', 'Grant', 'Subsidy', 'Tax Benefit'];

  useEffect(() => {
    fetchSchemes();
  }, [categoryFilter]);

  const fetchSchemes = async () => {
    setLoading(true);
    let query = supabase.from('government_schemes').select('*').eq('is_active', true);
    
    if (categoryFilter && categoryFilter !== 'All') {
      query = query.eq('category', categoryFilter);
    }
    
    const { data } = await query;
    setSchemes(data || []);
    setLoading(false);
  };

  const filteredSchemes = search
    ? schemes.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
    : schemes;

  const formatINR = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Loan': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Grant': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Subsidy': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Tax Benefit': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-32">
      <div className="bg-teal-700 pt-12 pb-24 px-4 text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Government Schemes</h1>
          <p className="text-teal-100 text-lg max-w-2xl font-medium mb-8">
            Discover financial support, subsidies, and tax benefits available for Indian entrepreneurs.
          </p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="Search schemes (e.g. Mudra, Startup India)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 outline-none text-slate-800 shadow-lg focus:ring-4 focus:ring-teal-500/30 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-colors border ${
                (categoryFilter === cat || (cat === 'All' && !categoryFilter))
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-48 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredSchemes.length > 0 ? (
          <div className="space-y-6">
            {filteredSchemes.map(scheme => (
              <div key={scheme.id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border mb-3 ${getCategoryColor(scheme.category)}`}>
                      {scheme.category}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{scheme.name}</h2>
                    <p className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Building2 size={16} /> {scheme.ministry}
                    </p>
                  </div>
                  
                  {scheme.max_amount && scheme.max_amount !== 'N/A' && (
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 flex items-center gap-3 shrink-0">
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                        <IndianRupee size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amber-700 uppercase">Up to</p>
                        <p className="text-lg font-black text-amber-900">{scheme.max_amount}</p>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {scheme.eligibility && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Who is eligible?</h4>
                      <div className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                        <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" /> 
                        <span>{scheme.eligibility}</span>
                      </div>
                    </div>
                  )}
                  
                  {scheme.benefits && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Key Benefits</h4>
                      <div className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                        <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" /> 
                        <span>{scheme.benefits}</span>
                      </div>
                    </div>
                  )}
                </div>

                {scheme.application_link && (
                  <a 
                    href={scheme.application_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 hover:bg-teal-700 hover:text-white font-bold py-3 px-6 rounded-xl border border-teal-200 transition-colors w-full sm:w-auto justify-center"
                  >
                    Apply Now <ExternalLink size={18} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No schemes found</h3>
            <p className="text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </main>
  );
}
