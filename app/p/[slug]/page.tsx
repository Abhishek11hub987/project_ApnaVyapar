import { notFound } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/logo";
import { ContactForm } from "@/components/contact-form";

const PAGE_CONTENT: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  "inventory-management": {
    title: "Inventory Management",
    subtitle: "Real-time stock tracking to never miss a sale.",
    content: (
      <div className="space-y-6">
        <p>Our advanced inventory management system is fully integrated into your Apna Vyapar dashboard.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real-time stock updates across all your channels.</li>
          <li>Low-stock alerts sent directly to your phone.</li>
          <li>Automatic reorder suggestions based on sales velocity.</li>
        </ul>
        <p>Stop worrying about overselling and start focusing on growth.</p>
      </div>
    )
  },
  "multi-channel-selling": {
    title: "Multi-Channel Selling",
    subtitle: "Be where your customers are.",
    content: (
      <div className="space-y-6">
        <p>With Apna Vyapar, you can manage your sales across multiple platforms from a single interface.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>WhatsApp Business integration for conversational commerce.</li>
          <li>Instagram Shop synchronization.</li>
          <li>Your own branded digital storefront.</li>
        </ul>
      </div>
    )
  },
  "analytics-dashboard": {
    title: "Analytics Dashboard",
    subtitle: "Beautiful charts that actually make sense.",
    content: (
      <div className="space-y-6">
        <p>Data is only useful if you can understand it. Our analytics dashboard translates raw numbers into actionable insights.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Track revenue, profit margins, and growth week-over-week.</li>
          <li>Identify your best-selling products and top customers.</li>
          <li>Export professional PDF reports in one click.</li>
        </ul>
      </div>
    )
  },
  "customer-crm": {
    title: "Customer CRM",
    subtitle: "Build lasting relationships.",
    content: (
      <div className="space-y-6">
        <p>Know exactly who is buying from you and how to keep them coming back.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Detailed customer purchase histories.</li>
          <li>Automated thank-you messages and offers.</li>
          <li>Segmentation for targeted marketing campaigns.</li>
        </ul>
      </div>
    )
  },
  "automated-invoicing": {
    title: "Automated Invoicing",
    subtitle: "GST-compliant bills generated instantly.",
    content: (
      <div className="space-y-6">
        <p>Say goodbye to manual billing and calculators.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Professional, branded invoices generated automatically.</li>
          <li>Full GST compliance and tax calculation.</li>
          <li>Send instantly via WhatsApp or email directly to the customer.</li>
        </ul>
      </div>
    )
  },
  "community-support": {
    title: "Community Support",
    subtitle: "Real humans, real help, powered by GitHub.",
    content: (
      <div className="space-y-6">
        <p>As a solo developer building Apna Vyapar, I cannot provide 24/7 call support, but I am highly active in our community discussions!</p>
        <p>For any queries, feature requests, or bug reports, please head over to our GitHub Discussions page.</p>
        <p><a href="https://github.com/Abhishek11hub987/project_ApnaVyapar/discussions" target="_blank" rel="noopener noreferrer">Join the Discussion on GitHub</a></p>
      </div>
    )
  },
  "store-builder": {
    title: "Store Builder",
    subtitle: "Create your digital storefront in minutes.",
    content: (
      <div className="space-y-6">
        <p>Our intuitive Store Builder lets you launch a professional, mobile-optimized ecommerce website without writing a single line of code.</p>
        <p>Customize your theme, upload your logo, and start accepting orders instantly.</p>
      </div>
    )
  },
  "analytics": {
    title: "Analytics",
    subtitle: "Deep insights into your business.",
    content: (
      <div className="space-y-6">
        <p>Our analytics tools go beyond basic sales tracking. Understand your customer behavior, monitor inventory turnover, and predict seasonal trends with our advanced data modeling.</p>
      </div>
    )
  },
  "payments": {
    title: "Payments",
    subtitle: "Accept money safely and quickly.",
    content: (
      <div className="space-y-6">
        <p>We integrate with leading Indian payment gateways (like Razorpay and PhonePe) to ensure you never miss a sale.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>UPI, Credit/Debit Cards, and Netbanking supported.</li>
          <li>Next-day settlements to your bank account.</li>
          <li>Zero setup fees.</li>
        </ul>
      </div>
    )
  },
  "inventory": {
    title: "Inventory",
    subtitle: "Smart stock management.",
    content: (
      <div className="space-y-6">
        <p>Keep track of every item in your warehouse or store. Apna Vyapar's inventory module syncs automatically with every sale you make.</p>
      </div>
    )
  },
  "about-us": {
    title: "About Us",
    subtitle: "Empowering the Indian Merchant.",
    content: (
      <div className="space-y-6">
        <p>Apna Vyapar was built with a single mission: to digitize every small and medium business in India.</p>
        <p>We believe that powerful technology shouldn't be reserved only for large corporations. By providing an accessible, affordable, and beautiful platform, we are leveling the playing field for local merchants.</p>
      </div>
    )
  },
  "careers": {
    title: "Careers",
    subtitle: "Join the revolution.",
    content: (
      <div className="space-y-6">
        <p>We are always looking for passionate engineers, designers, and marketers to join our team.</p>
        <p>Currently, there are no open positions, but please check back later!</p>
      </div>
    )
  },
  "press": {
    title: "Press",
    subtitle: "Apna Vyapar in the news.",
    content: (
      <div className="space-y-6">
        <p>For press inquiries, media kits, or interview requests, please contact our PR team via GitHub at <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noopener noreferrer">https://github.com/Abhishek11hub987</a>.</p>
      </div>
    )
  },
  "contact": {
    title: "Contact",
    subtitle: "We'd love to hear from you.",
    content: (
      <div className="space-y-6">
        <p>Have a question or need help setting up your store?</p>
        <p>Developer: <a href="https://github.com/Abhishek11hub987" target="_blank" rel="noopener noreferrer">https://github.com/Abhishek11hub987</a></p>
        <div className="mt-12 pt-12 border-t border-white/10">
          <ContactForm />
        </div>
      </div>
    )
  },
  "blog": {
    title: "Blog",
    subtitle: "Insights, tips, and merchant stories.",
    content: (
      <div className="space-y-6">
        <p>Welcome to the Apna Vyapar Blog. Here you will find guides on growing your business, marketing tips, and inspiring stories from merchants using our platform.</p>
        <p><em>Check back soon for our first post!</em></p>
      </div>
    )
  },
  "help-center": {
    title: "Help Center & FAQ",
    subtitle: "Find answers fast.",
    content: (
      <div className="space-y-6">
        <p>Browse our comprehensive guides and tutorials to learn how to get the most out of your Apna Vyapar dashboard.</p>
        <div className="mt-12 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-6">Still need help? Ask the Admin directly!</h2>
          <ContactForm />
        </div>
      </div>
    )
  },
  "api-docs": {
    title: "API Docs",
    subtitle: "Build for Apna Vyapar.",
    content: (
      <div className="space-y-6">
        <p>Our REST API allows developers to integrate external tools, sync inventory with legacy ERPs, and build custom storefronts.</p>
        <p>Documentation is currently available upon request for enterprise partners.</p>
      </div>
    )
  },
  "community": {
    title: "Community",
    subtitle: "Learn and grow together.",
    content: (
      <div className="space-y-6">
        <p>Join thousands of other Indian merchants on our community forums. Share strategies, ask for feedback on your store, and network with suppliers.</p>
      </div>
    )
  },

  "terms": {
    title: "Terms of Service",
    subtitle: "The rules of the road.",
    content: (
      <div className="space-y-6">
        <p>These terms govern your use of the Apna Vyapar platform. You must be at least 18 years old to use our services.</p>
        <p>We reserve the right to suspend accounts that violate our acceptable use policy (e.g., selling prohibited items).</p>
      </div>
    )
  },
  "cookies": {
    title: "Cookie Policy",
    subtitle: "How we use cookies.",
    content: (
      <div className="space-y-6">
        <p>We use cookies to improve your experience, remember your login session, and analyze our website traffic.</p>
        <p>You can manage your cookie preferences through your browser settings.</p>
      </div>
    )
  },
  "security": {
    title: "Security",
    subtitle: "Bank-grade protection for your business.",
    content: (
      <div className="space-y-6">
        <p>Apna Vyapar employs industry-standard security measures, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>End-to-end SSL encryption.</li>
          <li>Regular third-party penetration testing.</li>
          <li>Automated backups every 24 hours.</li>
        </ul>
      </div>
    )
  },
};

export default function InfoPage({ params }: { params: { slug: string } }) {
  const data = PAGE_CONTENT[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Simple Header */}
      <nav className="border-b border-white/10 bg-navy/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo iconSize={32} />
          </Link>
          <Link href="/" className="text-sm font-semibold text-cyan hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {data.title}
          </h1>
          <p className="text-xl text-white/60 font-medium">
            {data.subtitle}
          </p>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-headings:text-white prose-a:text-cyan hover:prose-a:text-cyan-light">
          {data.content}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-12 mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Apna Vyapar. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
