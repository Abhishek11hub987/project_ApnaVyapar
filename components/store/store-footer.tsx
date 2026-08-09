"use client";

import { ShieldAlert, Scale } from "lucide-react";
import Link from "next/link";
import Logo from "../logo";

export function StoreFooter({ store }: { store: any }) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            {store.logo_url && (
              <img src={store.logo_url} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            )}
            <h3 className="text-gray-900 font-bold text-2xl tracking-tight">{store.store_name}</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {store.hero_text || "Thank you for shopping with us!"}
          </p>
          {(store.support_email || store.support_phone) && (
            <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200">
              <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider">Customer Support</h4>
              {store.support_email && (
                <a href={`mailto:${store.support_email}`} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span> {store.support_email}
                </a>
              )}
              {store.support_phone && (
                <a href={`tel:${store.support_phone}`} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span> {store.support_phone}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-4" />

        <div className="md:col-span-5 lg:col-span-4 flex flex-col md:items-end">
          <h4 className="text-gray-900 font-bold text-sm mb-6">Legal & Policies</h4>
          <div className="flex flex-col gap-3 mb-10 w-full md:items-end">
            <Link href={`/store/${store.slug}/privacy`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 justify-start md:justify-end w-fit">
              <ShieldAlert size={14} /> Privacy Policy
            </Link>
            <Link href={`/store/${store.slug}/terms`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 justify-start md:justify-end w-fit">
              <Scale size={14} /> Terms of Service
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200 w-full md:text-right">
            <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider font-medium">Powered securely by</p>
            <Link href="/" target="_blank" className="inline-block group">
              <div className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl transition-all flex items-center gap-3 hover:shadow-sm">
                <Logo iconSize={20} />
                <span className="text-gray-900 font-bold tracking-tight text-sm">Apna Vyapar</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 max-w-4xl mx-auto">
            <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              <strong className="text-gray-700">Platform Disclaimer:</strong> This storefront is independently owned and operated by the merchant.
              Apna Vyapar provides the e-commerce platform only. Apna Vyapar is not responsible
              for any transactions, claims, product fulfillment, refunds, or misconduct associated with this store.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
