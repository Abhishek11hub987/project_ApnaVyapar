import { notFound } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/logo";
import { ContactForm } from "@/components/contact-form";
import { Bot, Lightbulb, ListChecks, Package, BarChart3, UserCircle, Info } from "lucide-react";

type PageData = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  features: { title: string; desc: string }[];
  content: React.ReactNode;
};

const PAGE_CONTENT: Record<string, PageData> = {
  "vyapar-mitra": {
    title: "Vyapar Mitra",
    subtitle: "Your AI Business Advisor.",
    icon: Bot,
    color: "from-cyan to-blue-500",
    features: [
      { title: "24/7 Availability", desc: "Get answers to your business queries anytime, day or night." },
      { title: "Context Aware", desc: "Understands your specific business type and market." },
      { title: "Actionable Advice", desc: "Provides concrete steps for marketing, inventory, and growth." },
    ],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Running a small business in India comes with a unique set of challenges, from understanding local taxation to figuring out the best ways to market on WhatsApp. <strong>Vyapar Mitra</strong> is an AI assistant built specifically to guide you through these hurdles.</p>
        <p>Unlike generic AI tools, Vyapar Mitra is integrated directly into your dashboard. It understands your store's context and provides highly tailored, actionable advice to help you scale efficiently without needing to hire an expensive consultant.</p>
      </div>
    )
  },
  "ideas": {
    title: "Business Ideas Generator",
    subtitle: "Discover your next big venture.",
    icon: Lightbulb,
    color: "from-purple-500 to-pink-500",
    features: [
      { title: "Tailored Matching", desc: "Ideas based on your budget, skills, and local market." },
      { title: "Complete Roadmaps", desc: "Step-by-step guides on how to execute the idea." },
      { title: "Market Analysis", desc: "Understand the competition and potential profitability." },
    ],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Many aspiring entrepreneurs struggle with the very first step: deciding what business to start. Our <strong>Business Ideas Generator</strong> removes the guesswork.</p>
        <p>By analyzing your specific inputs, the AI generates high-potential business concepts perfectly suited for the Indian market. Each idea comes with a comprehensive roadmap, detailing the initial investment required, the target audience, and a Go-To-Market strategy.</p>
      </div>
    )
  },
  "checklist": {
    title: "Smart Setup Checklist",
    subtitle: "Your blueprint for launch.",
    icon: ListChecks,
    color: "from-green-400 to-emerald-600",
    features: [
      { title: "Dynamic Tasks", desc: "A checklist customized to your exact business type." },
      { title: "Legal Guidance", desc: "Step-by-step help for GST, MSME, and other registrations." },
      { title: "Progress Tracking", desc: "Visual indicators to keep you motivated and on track." },
    ],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Starting a business can feel overwhelming when you don't know the exact steps. The <strong>Smart Setup Checklist</strong> acts as your personal project manager.</p>
        <p>Whether you are opening a cloud kitchen or a boutique clothing store, the platform automatically generates a tailored checklist. It guides you from the very first step of registering your business name to the final step of launching your digital storefront.</p>
      </div>
    )
  },
  "store-builder": {
    title: "Store Builder",
    subtitle: "Create a stunning digital storefront.",
    icon: Package,
    color: "from-orange-400 to-red-500",
    features: [
      { title: "No Coding Required", desc: "Drag and drop interface to design your store instantly." },
      { title: "Mobile Optimized", desc: "Stores look perfect on any device, ensuring high conversions." },
      { title: "Inventory Synced", desc: "Your storefront connects directly to your backend inventory." },
    ],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Your online store is the face of your business. Our <strong>Store Builder</strong> ensures you make a perfect first impression without needing to hire a developer.</p>
        <p>Choose from beautiful, conversion-optimized themes designed for the Indian consumer. Easily add your products, set up categories, and customize your brand colors in minutes.</p>
      </div>
    )
  },
  "analytics": {
    title: "Analytics Dashboard",
    subtitle: "Insights that drive growth.",
    icon: BarChart3,
    color: "from-blue-400 to-indigo-600",
    features: [
      { title: "Real-time Metrics", desc: "Monitor your sales and traffic as they happen." },
      { title: "Customer Trends", desc: "Understand purchasing behavior to increase repeat sales." },
      { title: "Profit Tracking", desc: "Keep a close eye on your margins and operational costs." },
    ],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Data is the lifeblood of a growing business. The <strong>Analytics Dashboard</strong> transforms raw numbers into beautiful, easy-to-understand charts.</p>
        <p>Stop guessing what works. Track your most profitable products, identify your best customers, and make informed decisions that directly impact your bottom line.</p>
      </div>
    )
  },
  "profile": {
    title: "Digital Profile",
    subtitle: "Manage your business identity.",
    icon: UserCircle,
    color: "from-teal-400 to-cyan-500",
    features: [
      { title: "Centralized Identity", desc: "Manage all your business details in one place." },
      { title: "Community Showcase", desc: "Share your business milestones with the Apna Vyapar community." },
      { title: "Settings & Preferences", desc: "Control your account, notifications, and security." },
    ],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Your <strong>Digital Profile</strong> is the control center for your entire Apna Vyapar experience. It securely stores your business information, operational preferences, and community interactions.</p>
        <p>From here, you can seamlessly transition between managing your daily operations, consulting Vyapar Mitra, or updating your digital storefront details.</p>
      </div>
    )
  },
  // Keep required legacy legal pages so footer links don't break
  "privacy": {
    title: "Privacy Policy", subtitle: "How we protect your data.", icon: Info, color: "from-slate-400 to-slate-600",
    features: [],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>Your privacy is our priority. We do not sell your personal data to third parties. All data stored on Apna Vyapar is encrypted and secured using industry best practices.</p>
      </div>
    )
  },
  "terms": {
    title: "Terms of Service", subtitle: "Rules and guidelines.", icon: Info, color: "from-slate-400 to-slate-600",
    features: [],
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-lg">
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
    <div className="min-h-screen bg-navy text-white overflow-hidden font-sans">
      {/* Premium Navbar */}
      <nav className="border-b border-white/5 bg-navy/80 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo iconSize={32} />
          </Link>
          <Link href="/features" className="text-sm font-semibold text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2">
            Back to Features
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-24 pb-32 px-6">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br ${data.color} rounded-full blur-[150px] opacity-20 pointer-events-none`} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl backdrop-blur-md">
             <Icon size={40} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </header>

      {/* Main Content & Features Bento */}
      <main className="max-w-6xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Prose Content */}
          <div className="md:col-span-2 relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50 block" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
              {/* Decorative line using the specific color gradient isn't easily done dynamically with Tailwind classes here, so we fallback to a cyan default or just leave it subtle */}
            </div>
            <div className="prose prose-invert prose-lg max-w-none">
              {data.content}
            </div>
          </div>

          {/* Highlight Features Sidebar */}
          <div className="space-y-6">
            {data.features.map((feature, i) => (
              <div key={i} className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-6 hover:border-white/20 transition-colors">
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-bold text-white">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                    </div>
                 </div>
              </div>
            ))}
            
            {data.features.length === 0 && params.slug === 'contact' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                 <ContactForm />
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Apna Vyapar. Open Source for India.
        </div>
      </footer>
    </div>
  );
}
