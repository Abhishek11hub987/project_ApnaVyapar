import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Database } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function StorePrivacyPage({ params }: { params: { slug: string } }) {
  const { data: store, error } = await supabaseAdmin
    .from("store_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !store || !store.is_active) {
    notFound();
  }

  const themeColor = store.theme_color || '#00D4FF';

  const defaultPolicy = `Personal Information We Collect
When you visit the store, we collect certain information about your device, your interaction with the store, and information necessary to process your purchases.

How Do We Use Your Personal Information?
We use the Order Information that we collect generally to fulfill any orders placed through the store (including arranging for shipping, and providing you with invoices and/or order confirmations).

Apna Vyapar Platform
Our store is hosted on Apna Vyapar. They provide us with the online e-commerce platform that allows us to sell our products and services to you. Your data is securely stored through Apna Vyapar's data storage and databases.

Contact Us
For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail or phone provided in the store.`;

  const policyText = store.privacy_policy || defaultPolicy;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={`/store/${store.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {store.logo_url ? (
              <img src={store.logo_url} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: themeColor }}>
                {store.store_name.substring(0, 1).toUpperCase()}
              </div>
            )}
            <span className="font-bold text-lg">{store.store_name}</span>
          </Link>
          <Link href={`/store/${store.slug}`} className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-5 py-2.5 rounded-lg border border-gray-200">
            Back to Store
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-lg mb-6 border border-gray-100 shadow-card">
            <ShieldCheck className="w-10 h-10" style={{ color: themeColor }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            How {store.store_name} protects your data and privacy.
          </p>
        </div>

        {/* Security Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-card flex gap-4 items-start">
            <Lock className="w-6 h-6 shrink-0" style={{ color: themeColor }} />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Infrastructure</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                This store is hosted on Apna Vyapar&apos;s secure platform. All transactions and data transfers are encrypted.
              </p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-card flex gap-4 items-start">
            <Eye className="w-6 h-6 shrink-0" style={{ color: themeColor }} />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We only collect the data necessary to fulfill your orders and provide you with a great shopping experience.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Policy Content */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-lg p-8 md:p-12 shadow-card">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <Database className="w-6 h-6" style={{ color: themeColor }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Policy Details</h2>
          </div>
          <div className="prose prose-gray prose-lg max-w-none whitespace-pre-wrap">
            {policyText}
          </div>
        </div>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 mt-12 bg-gray-50 text-center">
        <p className="text-gray-400 text-sm mb-2">
          &copy; {new Date().getFullYear()} {store.store_name}. All rights reserved.
        </p>
        <p className="text-gray-300 text-xs">
          Powered securely by Apna Vyapar
        </p>
      </footer>
    </div>
  );
}
