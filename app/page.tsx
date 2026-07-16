import Link from 'next/link';
import { ArrowRight, Bot, ShieldCheck, MapPin, Sparkles, Target, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-[32px] md:text-5xl font-bold text-slate-800 leading-[1.2] tracking-tight">
          Start Your First <span className="text-teal-700">Business in India</span>
        </h1>
        <p className="mt-4 text-slate-500 text-base md:text-lg max-w-2xl">
          Get AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream.
        </p>
        
        <div className="w-full max-w-md mt-8 flex flex-col gap-4">
          <Link 
            href="/ideas" 
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            Explore Business Ideas
            <ArrowRight size={20} />
          </Link>
          <Link 
            href="/chat" 
            className="w-full text-teal-700 font-medium py-3 flex items-center justify-center gap-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Talk to Vyapar Mitra
            <Bot size={20} />
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-4 mt-8 md:mt-12 max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck size={16} className="text-emerald-500" />
            Free Forever
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Sparkles size={16} className="text-amber-500" />
            AI Powered
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <MapPin size={16} className="text-teal-700" />
            Made for India
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 mt-16 md:mt-24 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">How it works</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
          {[
            { step: 1, title: 'Discover', desc: 'Find ideas matching your budget and skills', icon: Target },
            { step: 2, title: 'Validate', desc: 'Chat with AI to check market feasibility', icon: Bot },
            { step: 3, title: 'Launch', desc: 'Get step-by-step legal and setup roadmap', icon: Rocket },
          ].map((item, i) => (
            <div key={i} className="min-w-[260px] md:min-w-0 md:flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm snap-start">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4 text-teal-700">
                <item.icon size={24} />
              </div>
              <div className="text-sm font-bold text-slate-400 mb-1">Step {item.step}</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ideas */}
      <section className="px-4 mt-16 md:mt-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Featured Ideas</h2>
          <Link href="/ideas" className="text-teal-700 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
          {[
            { title: "Home-Based Tiffin Service", category: "Food", inv: "₹15K - ₹50K", profit: "₹25K - ₹60K", img: "🍛" },
            { title: "Freelance Social Media Management", category: "Services", inv: "₹0 - ₹5K", profit: "₹20K - ₹1L", img: "📱" },
            { title: "Handmade Soap Manufacturing", category: "Retail", inv: "₹10K - ₹30K", profit: "₹15K - ₹45K", img: "🧼" },
          ].map((idea, i) => (
            <div key={i} className="min-w-[280px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col snap-start">
              <div className="h-32 bg-slate-100 flex items-center justify-center text-5xl">
                {idea.img}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full w-fit mb-3">
                  {idea.category}
                </span>
                <h3 className="text-[18px] font-semibold text-slate-800 mb-3 line-clamp-2 leading-[1.4]">
                  {idea.title}
                </h3>
                
                <div className="mt-auto space-y-2 text-sm text-slate-500">
                  <div className="flex justify-between">
                    <span>Investment:</span>
                    <span className="font-medium text-slate-800">{idea.inv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Profit:</span>
                    <span className="font-medium text-emerald-600">{idea.profit}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 mt-20 md:mt-24 max-w-7xl mx-auto">
        <div className="bg-amber-50 rounded-2xl p-6 md:p-10 border border-amber-200 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
            Ready to become your own boss?
          </h2>
          <p className="text-slate-600 mb-6 text-sm md:text-base">
            Join thousands of first-time Indian entrepreneurs launching their dreams today.
          </p>
          <Link 
            href="/ideas" 
            className="inline-flex w-full md:w-auto items-center justify-center bg-secondary-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm"
          >
            Find My Business Idea
          </Link>
        </div>
      </section>
    </main>
  );
}
