"use client";

import { ShieldAlert, Scale, Mail, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Logo from "../logo";

export function StoreFooter({ store }: { store: any }) {
  const themeColor = store?.theme_color || "#0f172a";

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 relative">
        
        {/* Background accent */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"
          style={{ background: themeColor }}
        />

        <div className="md:col-span-5 lg:col-span-4 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            {store.logo_url ? (
              <img src={store.logo_url} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm border border-gray-100" />
            ) : (
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-sm"
                style={{ background: themeColor }}
              >
                {store.store_name?.substring(0, 1).toUpperCase()}
              </div>
            )}
            <h3 className="text-gray-900 font-black text-2xl tracking-tight leading-none">{store.store_name}</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
            {store.hero_text || "Thank you for shopping with us!"}
          </p>
          {(store.support_email || store.support_phone) && (
            <div className="space-y-4">
              <h4 className="text-gray-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gray-200" /> Customer Support
              </h4>
              <div className="flex flex-col gap-3">
                {store.support_email && (
                  <a href={`mailto:${store.support_email}`} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-3 w-fit group">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <Mail size={14} style={{ color: themeColor }} />
                    </div>
                    {store.support_email}
                  </a>
                )}
                {store.support_phone && (
                  <a href={`tel:${store.support_phone}`} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-3 w-fit group">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <Phone size={14} style={{ color: themeColor }} />
                    </div>
                    {store.support_phone}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-4" />

        <div className="md:col-span-5 lg:col-span-4 flex flex-col md:items-end relative z-10">
          <h4 className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2 md:flex-row-reverse">
            <div className="w-8 h-[1px] bg-gray-200" /> Legal & Policies
          </h4>
          <div className="flex flex-col gap-4 mb-12 w-full md:items-end">
            <Link href={`/store/${store.slug}/privacy`} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-3 justify-start md:justify-end w-fit group">
              <ShieldAlert size={14} className="group-hover:text-gray-900 transition-colors" /> Privacy Policy
            </Link>
            <Link href={`/store/${store.slug}/terms`} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-3 justify-start md:justify-end w-fit group">
              <Scale size={14} className="group-hover:text-gray-900 transition-colors" /> Terms of Service
            </Link>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 w-full md:text-right flex flex-col md:items-end">
            <p className="text-gray-400 text-[10px] mb-3 uppercase tracking-widest font-bold">Powered securely by</p>
            <Link href="/" target="_blank" className="inline-block group">
              <div className="bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl transition-all flex items-center gap-3 group-hover:shadow-md group-hover:bg-white group-hover:border-gray-200">
                <Logo iconSize={20} />
                <span className="text-gray-900 font-black tracking-tight text-sm">Apna Vyapar</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50/80 border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-4 p-4 rounded-2xl max-w-4xl mx-auto" style={{ background: '#fef3c730', border: '1px solid #fef3c7' }}>
            <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              <strong className="text-amber-700 block mb-1 uppercase tracking-wider text-[10px]">Platform Disclaimer</strong> 
              This storefront is independently owned and operated by the merchant.
              Apna Vyapar provides the e-commerce platform only and is not responsible
              for transactions, claims, product fulfillment, refunds, or misconduct associated with this store.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
