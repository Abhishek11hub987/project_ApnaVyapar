"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";

export function StoreHeader({ store }: { store: any }) {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const themeColor = store?.theme_color || "#0f172a";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          {store.logo_url ? (
            <img
              src={store.logo_url}
              alt="Store Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm border border-gray-100 flex-shrink-0"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white flex-shrink-0 shadow-sm"
              style={{ background: themeColor }}
            >
              {store.store_name?.substring(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-black text-gray-900 text-base md:text-lg leading-none truncate">
              {store.store_name}
            </p>
            {store.hero_text && (
              <p className="text-gray-400 text-xs mt-0.5 line-clamp-1 hidden sm:block">
                {store.hero_text}
              </p>
            )}
          </div>
        </div>

        {/* Powered by badge */}
        <a
          href="https://apnavyapar.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[11px] text-gray-300 hover:text-gray-400 transition-colors font-medium tracking-wide flex-shrink-0"
        >
          Powered by <span className="font-black text-gray-400">Apna Vyapar</span>
        </a>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm flex-shrink-0"
          style={{
            background: themeColor,
            color: '#fff',
          }}
        >
          <ShoppingBag size={16} />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm animate-bounce">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
