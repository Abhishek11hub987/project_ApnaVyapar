import Link from 'next/link';
import { ArrowRight, Bot, ShieldCheck, MapPin, Sparkles, Target, Rocket, TrendingUp, IndianRupee } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-16 left-8 w-24 h-24 bg-teal-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-12 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-200/15 rounded-full blur-xl" />

        <div className="px-4 py-16 md:py-24 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-8 animate-fade-in-up">
            <Sparkles size={14} className="text-amber-500" />
            AI-Powered Business Guide for India
          </div>

          <h1 className="text-[32px] md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight animate-fade-in-up">
            Start Your First{' '}
            <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
              Business in India
            </span>
          </h1>
          <p className="mt-5 text-slate-500 text-base md:text-xl max-w-2xl animate-fade-in-up font-medium">
            Get AI-powered guidance, curated business ideas, and step-by-step roadmaps to launch your dream — all for free.
          </p>
          
          <div className="w-full max-w-md mt-10 flex flex-col gap-3 animate-fade-in-up">
            <Link 
              href="/ideas" 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-teal-700/20 hover:shadow-xl hover:shadow-teal-700/30 hover:-translate-y-0.5"
            >
              Explore Business Ideas
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/chat" 
              className="w-full text-teal-700 font-semibold py-3.5 flex items-center justify-center gap-2 hover:bg-teal-50 rounded-xl transition-all border border-transparent hover:border-teal-200"
            >
              Talk to Vyapar Mitra
              <Bot size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-4 -mt-2 md:mt-6 max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap text-sm text-slate-600 font-semibold">
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck size={16} className="text-emerald-500" />
            Free Forever
          </div>
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <Sparkles size={16} className="text-amber-500" />
            AI Powered
          </div>
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <MapPin size={16} className="text-teal-700" />
            Made for India
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 mt-16 md:mt-24 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center md:text-left">How it works</h2>
        <div className="flex overflow-x-auto gap-5 pb-4 snap-x hide-scrollbar animate-stagger">
          {[
            { step: 1, title: 'Discover', desc: 'Find ideas matching your budget and skills', icon: Target, color: 'bg-teal-50 text-teal-700' },
            { step: 2, title: 'Validate', desc: 'Chat with AI to check market feasibility', icon: Bot, color: 'bg-amber-50 text-amber-700' },
            { step: 3, title: 'Launch', desc: 'Get step-by-step legal and setup roadmap', icon: Rocket, color: 'bg-emerald-50 text-emerald-700' },
          ].map((item, i) => (
            <div key={i} className="min-w-[260px] md:min-w-0 md:flex-1 bg-white p-7 rounded-2xl border border-slate-200 shadow-sm snap-start hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon size={24} />
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Step {item.step}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ideas */}
      <section className="px-4 mt-16 md:mt-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Featured Ideas</h2>
          <Link href="/ideas" className="text-teal-700 text-sm font-bold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-5 pb-4 snap-x hide-scrollbar animate-stagger">
          {[
            { title: "Home-Based Tiffin Service", category: "Food", inv: "₹15K - ₹50K", profit: "₹25K - ₹60K", img: "🍛", gradient: "from-orange-50 to-amber-50" },
            { title: "Freelance Social Media Management", category: "Services", inv: "₹0 - ₹5K", profit: "₹20K - ₹1L", img: "📱", gradient: "from-blue-50 to-indigo-50" },
            { title: "Handmade Soap Manufacturing", category: "Retail", inv: "₹10K - ₹30K", profit: "₹15K - ₹45K", img: "🧼", gradient: "from-emerald-50 to-teal-50" },
          ].map((idea, i) => (
            <div key={i} className="min-w-[280px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col snap-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`h-36 bg-gradient-to-br ${idea.gradient} flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500`}>
                {idea.img}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full w-fit mb-3 border border-teal-100">
                  {idea.category}
                </span>
                <h3 className="text-[17px] font-bold text-slate-800 mb-4 line-clamp-2 leading-[1.3]">
                  {idea.title}
                </h3>
                
                <div className="mt-auto space-y-2.5 text-sm text-slate-500">
                  <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-1.5"><IndianRupee size={13} /> Investment</span>
                    <span className="font-bold text-slate-800">{idea.inv}</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Est. Profit</span>
                    <span className="font-bold text-emerald-600">{idea.profit}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 mt-20 md:mt-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-teal-800 to-teal-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-3">
              Ready to become your own boss?
            </h2>
            <p className="text-teal-200 mb-8 text-sm md:text-base max-w-lg mx-auto">
              Join thousands of first-time Indian entrepreneurs launching their dreams today.
            </p>
            <Link 
              href="/ideas" 
              className="inline-flex w-full md:w-auto items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Find My Business Idea
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
