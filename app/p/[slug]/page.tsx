import { notFound } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/logo";
import { ContactForm } from "@/components/contact-form";
import { Bot, Lightbulb, ListChecks, Package, BarChart3, UserCircle, Info, ArrowLeft, Zap, Shield, Sparkles } from "lucide-react";

type PageData = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  gradientText: string;
  features: { title: string; desc: string; icon: React.ElementType }[];
  content: React.ReactNode;
};

const PAGE_CONTENT: Record<string, PageData> = {
  "vyapar-mitra": {
    title: "Vyapar Mitra",
    subtitle: "Your AI Business Advisor.",
    icon: Bot,
    color: "from-cyan-500 via-blue-500 to-indigo-600",
    gradientText: "from-cyan-300 to-blue-500",
    features: [
      { title: "24/7 Availability", desc: "Get answers to your business queries anytime, day or night.", icon: Zap },
      { title: "Context Aware", desc: "Understands your specific business type and market.", icon: Shield },
      { title: "Actionable Advice", desc: "Provides concrete steps for marketing, inventory, and growth.", icon: Sparkles },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Running a small business in India comes with a unique set of challenges, from understanding local taxation to figuring out the best ways to market on WhatsApp. <strong className="text-slate-900">Vyapar Mitra</strong> is an AI assistant built specifically to guide you through these hurdles.</p>
        <p>Unlike generic AI tools, Vyapar Mitra is integrated directly into your dashboard. It understands your store's context and provides highly tailored, actionable advice to help you scale efficiently without needing to hire an expensive consultant.</p>
      </div>
    )
  },
  "ideas": {
    title: "Business Ideas",
    subtitle: "Discover your next big venture.",
    icon: Lightbulb,
    color: "from-fuchsia-500 via-purple-500 to-indigo-600",
    gradientText: "from-fuchsia-300 to-purple-500",
    features: [
      { title: "Tailored Matching", desc: "Ideas based on your budget, skills, and local market.", icon: Sparkles },
      { title: "Complete Roadmaps", desc: "Step-by-step guides on how to execute the idea.", icon: Shield },
      { title: "Market Analysis", desc: "Understand the competition and potential profitability.", icon: Zap },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Many aspiring entrepreneurs struggle with the very first step: deciding what business to start. Our <strong className="text-slate-900">Business Ideas Generator</strong> removes the guesswork.</p>
        <p>By analyzing your specific inputs, the AI generates high-potential business concepts perfectly suited for the Indian market. Each idea comes with a comprehensive roadmap, detailing the initial investment required, the target audience, and a Go-To-Market strategy.</p>
      </div>
    )
  },
  "checklist": {
    title: "Smart Setup Checklist",
    subtitle: "Your blueprint for launch.",
    icon: ListChecks,
    color: "from-emerald-400 via-teal-500 to-cyan-600",
    gradientText: "from-emerald-300 to-teal-500",
    features: [
      { title: "Dynamic Tasks", desc: "A checklist customized to your exact business type.", icon: Sparkles },
      { title: "Legal Guidance", desc: "Step-by-step help for GST, MSME, and other registrations.", icon: Shield },
      { title: "Progress Tracking", desc: "Visual indicators to keep you motivated and on track.", icon: Zap },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Starting a business can feel overwhelming when you don't know the exact steps. The <strong className="text-slate-900">Smart Setup Checklist</strong> acts as your personal project manager.</p>
        <p>Whether you are opening a cloud kitchen or a boutique clothing store, the platform automatically generates a tailored checklist. It guides you from the very first step of registering your business name to the final step of launching your digital storefront.</p>
      </div>
    )
  },
  "store-builder": {
    title: "Store Builder",
    subtitle: "Create a stunning digital storefront.",
    icon: Package,
    color: "from-amber-400 via-orange-500 to-red-600",
    gradientText: "from-amber-300 to-orange-500",
    features: [
      { title: "No Coding Required", desc: "Drag and drop interface to design your store instantly.", icon: Zap },
      { title: "Mobile Optimized", desc: "Stores look perfect on any device, ensuring high conversions.", icon: Sparkles },
      { title: "Inventory Synced", desc: "Your storefront connects directly to your backend inventory.", icon: Shield },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Your online store is the face of your business. Our <strong className="text-slate-900">Store Builder</strong> ensures you make a perfect first impression without needing to hire a developer.</p>
        <p>Choose from beautiful, conversion-optimized themes designed for the Indian consumer. Easily add your products, set up categories, and customize your brand colors in minutes.</p>
      </div>
    )
  },
  "analytics": {
    title: "Analytics Dashboard",
    subtitle: "Insights that drive growth.",
    icon: BarChart3,
    color: "from-blue-400 via-indigo-500 to-purple-600",
    gradientText: "from-blue-300 to-indigo-500",
    features: [
      { title: "Real-time Metrics", desc: "Monitor your sales and traffic as they happen.", icon: Zap },
      { title: "Customer Trends", desc: "Understand purchasing behavior to increase repeat sales.", icon: Sparkles },
      { title: "Profit Tracking", desc: "Keep a close eye on your margins and operational costs.", icon: Shield },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Data is the lifeblood of a growing business. The <strong className="text-slate-900">Analytics Dashboard</strong> transforms raw numbers into beautiful, easy-to-understand charts.</p>
        <p>Stop guessing what works. Track your most profitable products, identify your best customers, and make informed decisions that directly impact your bottom line.</p>
      </div>
    )
  },
  "profile": {
    title: "Digital Profile",
    subtitle: "Manage your business identity.",
    icon: UserCircle,
    color: "from-teal-400 via-cyan-500 to-blue-600",
    gradientText: "from-teal-300 to-cyan-500",
    features: [
      { title: "Centralized Identity", desc: "Manage all your business details in one place.", icon: Shield },
      { title: "Community Showcase", desc: "Share your business milestones with the Apna Vyapar community.", icon: Sparkles },
      { title: "Settings & Preferences", desc: "Control your account, notifications, and security.", icon: Zap },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Your <strong className="text-slate-900">Digital Profile</strong> is the control center for your entire Apna Vyapar experience. It securely stores your business information, operational preferences, and community interactions.</p>
        <p>From here, you can seamlessly transition between managing your daily operations, consulting Vyapar Mitra, or updating your digital storefront details.</p>
      </div>
    )
  },
  "crm": {
    title: "Customer CRM",
    subtitle: "Manage relationships seamlessly.",
    icon: UserCircle,
    color: "from-rose-400 via-pink-500 to-purple-600",
    gradientText: "from-rose-300 to-pink-500",
    features: [
      { title: "Lead Tracking", desc: "Never lose track of a potential customer.", icon: Zap },
      { title: "Communication Log", desc: "Keep all your customer interactions in one place.", icon: Sparkles },
      { title: "Sales Pipeline", desc: "Visualize your sales process from lead to conversion.", icon: Shield },
    ],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Building strong customer relationships is the key to long-term success. Our <strong className="text-slate-900">Customer CRM</strong> provides a centralized hub to manage every interaction.</p>
        <p>Track leads, log communication, and manage your sales pipeline efficiently, ensuring that you always provide a personalized experience for your customers.</p>
      </div>
    )
  },
  "privacy": {
    title: "Privacy Policy", 
    subtitle: "How we protect your data.", 
    icon: Info, 
    color: "from-slate-400 via-slate-500 to-slate-700",
    gradientText: "from-white to-slate-400",
    features: [],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>Your privacy is our priority. We do not sell your personal data to third parties. All data stored on Apna Vyapar is encrypted and secured using industry best practices.</p>
      </div>
    )
  },
  "terms": {
    title: "Terms of Service", 
    subtitle: "Rules and guidelines.", 
    icon: Info, 
    color: "from-slate-400 via-slate-500 to-slate-700",
    gradientText: "from-white to-slate-400",
    features: [],
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>By using Apna Vyapar, you agree to our terms of service. This platform is provided open-source and free of charge. Users are responsible for the legality of the products they sell.</p>
      </div>
    )
  }
};

export default function PremiumFeaturePage({ params }: { params: { slug: string } }) {
  const data = PAGE_CONTENT[params.slug];

  if (!data) {
    notFound();
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans relative selection:bg-cyan-500/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br ${data.color} rounded-full blur-[120px] opacity-[0.15] animate-pulse-slow mix-blend-multiply`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-tl ${data.color} rounded-full blur-[120px] opacity-[0.1] animate-pulse-slow mix-blend-multiply`} style={{ animationDelay: '2s' }} />
        {/* Subtle grid pattern for depth */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Premium Navbar */}
      <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <Logo />
          </Link>
          <Link href="/" className="group text-sm font-bold text-slate-900 hover:text-white transition-all bg-white hover:bg-slate-900 px-6 py-2.5 rounded-full border border-slate-200 flex items-center gap-2 shadow-subtle hover:shadow-lg">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Home
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-24 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <div className="animate-in fade-in zoom-in-95 duration-1000 slide-in-from-bottom-8">
            <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-[32px] bg-gradient-to-br ${data.color} p-[1px] mb-10 shadow-2xl overflow-hidden group`}>
               {/* Inner glass box */}
               <div className="absolute inset-[1px] rounded-[31px] bg-white flex items-center justify-center overflow-hidden">
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                 <Icon size={56} className="text-slate-800 drop-shadow-sm relative z-10" />
               </div>
            </div>
          </div>

          <h1 className={`animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br ${data.gradientText} drop-shadow-sm`}>
            {data.title}
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 text-xl md:text-3xl text-slate-600 font-medium max-w-3xl leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </header>

      {/* Main Content & Features Bento */}
      <main className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Prose Content */}
          <div className="lg:col-span-7 xl:col-span-8 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
            <div className="relative rounded-[2.5rem] border border-slate-100 bg-white/50 backdrop-blur-2xl p-8 md:p-12 overflow-hidden shadow-card group hover:border-slate-200 transition-colors duration-500">
              
              {/* Top Gradient Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${data.color} opacity-70`} />
              
              {/* Subtle inner glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-[0.01] pointer-events-none group-hover:opacity-[0.03] transition-opacity duration-500`} />

              <div className="prose prose-lg md:prose-xl max-w-none relative z-10">
                {data.content}
              </div>
            </div>
          </div>

          {/* Highlight Features Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000 delay-400">
            {data.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={i} className="group relative rounded-3xl border border-slate-100 bg-white/60 backdrop-blur-xl p-8 hover:border-slate-200 hover:bg-white transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-elevated overflow-hidden">
                   {/* Background blob on hover */}
                   <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${data.color} rounded-full blur-[50px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500`} />
                   
                   <div className="relative z-10 flex items-start gap-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${data.color} p-[1px] shrink-0 shadow-sm`}>
                        <div className="w-full h-full rounded-[15px] bg-white flex items-center justify-center">
                          <FeatureIcon size={20} className="text-slate-800" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all">{feature.title}</h3>
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                   </div>
                </div>
              );
            })}
            
            {data.features.length === 0 && params.slug === 'contact' && (
              <div className="rounded-3xl border border-slate-100 bg-white/60 p-8 backdrop-blur-xl shadow-sm">
                 <ContactForm />
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 relative z-10 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Logo iconSize={32} />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/features" className="hover:text-slate-900 transition-colors">All Features</Link>
            <div>&copy; {new Date().getFullYear()} Apna Vyapar. Open Source for India.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
