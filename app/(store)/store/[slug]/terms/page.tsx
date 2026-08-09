import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Scale, AlertTriangle, FileText } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function StoreTermsPage({ params }: { params: { slug: string } }) {
  const { data: store, error } = await supabaseAdmin
    .from("store_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !store || !store.is_active) {
    notFound();
  }

  const themeColor = store.theme_color || '#00D4FF';

  const defaultTerms = `Overview
This website is operated by the merchant. Throughout the site, the terms "we", "us" and "our" refer to the merchant. The merchant offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.

Section 1 - Platform Disclaimer
Our store is hosted on the Apna Vyapar platform. Apna Vyapar provides the e-commerce software that allows us to sell our products. Apna Vyapar is NOT responsible for the products, services, or content of this store, and is not liable for any disputes, refunds, or fulfillment issues. All transactions and agreements are strictly between you (the customer) and us (the merchant).

Section 2 - Online Store Terms
By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.

Section 3 - Modifications to the Service and Prices
Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.

Contact Information
Questions about the Terms of Service should be sent to us via the contact details provided in our store.`;

  const termsText = store.terms_conditions || defaultTerms;

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
            <Scale className="w-10 h-10" style={{ color: themeColor }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using {store.store_name}.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="max-w-3xl mx-auto mb-16 bg-white border border-gray-100 rounded-lg p-6 shadow-card flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 shrink-0 text-amber-500 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Platform Disclaimer</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              This storefront is independently owned and operated by the merchant. Apna Vyapar provides the e-commerce platform and software infrastructure only. All agreements and purchases are strictly between you and the merchant.
            </p>
          </div>
        </div>

        {/* Detailed Terms Content */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-lg p-8 md:p-12 shadow-card">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <FileText className="w-6 h-6" style={{ color: themeColor }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Terms Details</h2>
          </div>
          <div className="prose prose-gray prose-lg max-w-none whitespace-pre-wrap">
            {termsText}
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
