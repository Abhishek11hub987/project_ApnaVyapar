"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";

export function StoreHeader({ store }: { store: any }) {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {store.logo_url ? (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
              <img src={store.logo_url} alt="Store Logo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center font-bold text-xl text-white shadow-sm">
              {store.store_name?.substring(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-none">
              {store.store_name}
            </h1>
            {store.hero_text && (
              <p className="text-gray-500 text-xs md:text-sm mt-1 max-w-md line-clamp-1">
                {store.hero_text}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium transition-all hover:bg-gray-800 active:scale-95 flex items-center gap-2"
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-slate-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-sm">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
