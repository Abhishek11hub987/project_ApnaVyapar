"use client";

import { ShoppingBag, Package, Search } from "lucide-react";
import { useCart } from "./cart-context";
import type { Product } from '@/types/store';
import { useState } from "react";

export function ProductGrid({ products, store }: { products: Product[], store: any }) {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const themeColor = store?.theme_color || "#0f172a";

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product: Product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[64px]">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden py-16 md:py-24 text-center"
        style={{
          background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}08 50%, transparent 100%)`,
          borderBottom: `3px solid ${themeColor}25`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <p
            className="text-sm font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: themeColor }}
          >
            Welcome to
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
            {store?.store_name}
          </h1>
          {store?.hero_text && (
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {store.hero_text}
            </p>
          )}
          <div className="mt-6 flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: `${themeColor}15`, color: themeColor }}
            >
              <Package size={14} />
              {products.length} products available
            </span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search + filter bar */}
        {products.length > 4 && (
          <div className="mb-8 relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:ring-2 shadow-sm transition-all"
              style={{ '--tw-ring-color': `${themeColor}40` } as any}
            />
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {search ? "No matching products" : "Store is empty"}
            </h3>
            <p className="text-gray-400 max-w-sm">
              {search ? "Try a different search term." : "The merchant hasn't listed any products yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => {
              const isAdded = addedId === product.id;
              const isOutOfStock = product.stock_quantity <= 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${themeColor}10, ${themeColor}05)` }}>
                        <ShoppingBag size={40} style={{ color: `${themeColor}40` }} />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {isOutOfStock && (
                        <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                          Sold Out
                        </span>
                      )}
                      {!isOutOfStock && product.stock_quantity <= 5 && (
                        <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                          Only {product.stock_quantity} left!
                        </span>
                      )}
                    </div>

                    {/* Quick add overlay on desktop */}
                    {!isOutOfStock && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center">
                        <button
                          onClick={() => handleAdd(product)}
                          className="font-bold px-6 py-3 rounded-xl text-sm shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
                          style={{
                            background: isAdded ? '#10b981' : themeColor,
                            color: '#fff',
                          }}
                        >
                          {isAdded ? '✓ Added!' : <><ShoppingBag size={15} /> Add to Cart</>}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 line-clamp-1 text-base mb-1 group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <span className="font-black text-xl text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      {isOutOfStock ? (
                        <span className="text-xs text-gray-400 font-medium">Out of stock</span>
                      ) : (
                        <button
                          onClick={() => handleAdd(product)}
                          className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-all active:scale-95"
                          style={{
                            background: isAdded ? '#10b98120' : `${themeColor}15`,
                            color: isAdded ? '#10b981' : themeColor,
                          }}
                        >
                          {isAdded ? '✓ Added' : <><ShoppingBag size={14} />Add</>}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
