'use client';
import { useLanguage } from '@/lib/language-context';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqs = [
    { q: "What is Apna Vyapar?", a: "Apna Vyapar is a free platform that helps Indian entrepreneurs find business ideas, step-by-step roadmaps, and AI guidance to start their business." },
    { q: "Is the Vyapar Mitra AI really free?", a: "Yes, our AI assistant is completely free to use. It can help you understand legal requirements, government schemes, and business strategies." },
    { q: "Do I need to register my business immediately?", a: "Not always. Many small or home-based businesses can start without formal registration, but getting an Udyam Registration (MSME) is free and highly recommended for government benefits." },
    { q: "What is the Udyam Registration?", a: "Udyam Registration is a free government certificate for micro, small, and medium enterprises (MSMEs). It helps you get cheaper bank loans, tax rebates, and government subsidies." },
    { q: "How do I get an FSSAI license for a food business?", a: "If your annual turnover is below ₹12 lakh, you only need an FSSAI Basic Registration, which costs ₹100/year and can be applied for online at the FoSCoS portal." },
    { q: "Can I get a loan to start my business?", a: "Yes, the Indian government offers several schemes like the MUDRA Yojana, which provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises without collateral." },
    { q: "Do I need a GST number to sell online?", a: "Yes. If you plan to sell goods on e-commerce platforms like Amazon, Flipkart, or Meesho, a GST registration is mandatory regardless of your turnover." },
    { q: "What is a Trade License?", a: "A trade license is a certificate issued by your local municipality permitting you to run a business in a particular area. It ensures your business complies with safety and zoning guidelines." },
    { q: "How can the Checklist feature help me?", a: "The checklist breaks down the daunting process of starting a business into manageable, step-by-step tasks (like getting licenses, finding a location, and marketing)." },
    { q: "Who built Apna Vyapar?", a: "Apna Vyapar was built as an open-source initiative to empower the next generation of Indian entrepreneurs and small business owners." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 tracking-tight">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{faq.q}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
