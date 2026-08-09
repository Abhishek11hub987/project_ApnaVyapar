"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";
import type { Product } from '@/types/store';

export function ProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Our Products</h2>
          <p className="text-gray-500 text-sm">Browse our carefully curated selection.</p>
        </div>
        <div className="bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-600">
          {products?.length || 0} <span className="text-gray-400 font-normal">Items Available</span>
        </div>
      </div>

      {(!products || products.length === 0) ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Store is empty</h3>
          <p className="text-gray-500 max-w-sm mx-auto">This merchant hasn't listed any products yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full group hover:shadow-lg hover:border-gray-300 transition-all duration-200"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={48} className="mb-2" />
                    <span className="font-medium text-xs tracking-wider uppercase">No Image</span>
                  </div>
                )}

                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  {product.stock_quantity <= 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg shadow">
                      Sold Out
                    </span>
                  )}
                  {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg shadow">
                      Only {product.stock_quantity} left
                    </span>
                  )}
                </div>

                {product.stock_quantity > 0 && (
                  <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      onClick={() => addItem(product)}
                      className="bg-gray-900 text-white font-medium px-8 py-3.5 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 active:scale-95 flex items-center gap-2"
                    >
                      <ShoppingBag size={18} /> Add to Cart
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 text-lg group-hover:text-gray-700 transition-colors">{product.name}</h3>
                {product.description ? (
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1 leading-relaxed">{product.description}</p>
                ) : (
                  <div className="flex-1 mb-4" />
                )}

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="font-bold text-xl text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>

                  {product.stock_quantity > 0 && (
                    <button
                      onClick={() => addItem(product)}
                      className="md:hidden w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
