"use client";

import { CartProvider, useCart } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { ShoppingBag, Search, X } from "lucide-react";
import { Product } from "@/components/dashboard/inventory-table";
import { useState } from "react";

function Header({ store }: { store: any }) {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header 
      className="text-white py-12 px-4 shadow-md sticky top-0 z-40 transition-colors"
      style={{ backgroundColor: store.theme_color || '#00D4FF' }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {store.logo_url && (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <img src={store.logo_url} alt="Store Logo" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight">{store.store_name}</h1>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-black/20 hover:bg-black/30 px-5 py-2.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
        >
          <ShoppingBag size={18} /> Cart {itemCount > 0 && <span className="bg-white text-black px-2 py-0.5 rounded-full text-xs">{itemCount}</span>}
        </button>
      </div>
      {store.hero_text && (
        <div className="max-w-5xl mx-auto mt-4 text-white/90 text-lg font-medium">
          {store.hero_text}
        </div>
      )}
    </header>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">All Products</h2>
        <span className="text-slate-500 font-medium">{products?.length || 0} Items</span>
      </div>

      {(!products || products.length === 0) ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No products available</h3>
          <p className="text-slate-500">This store hasn't added any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col h-full">
              {/* Image */}
              <div className="aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <span className="text-slate-300 font-medium text-sm">No Image</span>
                )}
                
                {/* Hover Add to Cart button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => addItem(product)}
                    className="bg-white text-slate-900 font-bold px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Details */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{product.name}</h3>
                {product.description && (
                  <p className="text-slate-500 text-sm line-clamp-2 mb-3 flex-1">{product.description}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="font-extrabold text-lg text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.stock_quantity > 0 ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 bg-teal-50 px-2 py-1 rounded-full">In Stock</span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
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

function Footer({ store }: { store: any }) {
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-bold text-xl mb-4">{store.store_name}</h3>
          <p className="text-sm mb-2">{store.hero_text || "Thank you for shopping with us!"}</p>
          {(store.support_email || store.support_phone) && (
            <div className="mt-6 space-y-2">
              <h4 className="text-white font-semibold text-sm">Contact Support</h4>
              {store.support_email && <p className="text-sm">Email: {store.support_email}</p>}
              {store.support_phone && <p className="text-sm">Phone: {store.support_phone}</p>}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start md:items-end justify-between">
          <div className="flex flex-col md:items-end mb-8 md:mb-0">
            <h4 className="text-white font-semibold text-sm mb-4">Policies</h4>
            <button onClick={() => setActivePolicy('privacy')} className="text-sm text-slate-300 hover:text-white transition-colors mb-2 text-left md:text-right font-medium">Privacy Policy</button>
            <button onClick={() => setActivePolicy('terms')} className="text-sm text-slate-300 hover:text-white transition-colors text-left md:text-right font-medium">Terms of Service</button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 w-full md:w-auto md:border-t-0 md:pt-0">
            <a href="/" target="_blank" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
              <span className="text-xs font-semibold">Hosted by</span>
              <span className="text-cyan font-bold tracking-tight text-sm">Apna Vyapar</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800">
        <p className="text-sm text-slate-300 text-center max-w-3xl mx-auto leading-relaxed font-medium bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <strong className="text-white">Disclaimer:</strong> This storefront is independently owned and operated by the merchant. 
          Apna Vyapar provides the e-commerce platform and software infrastructure only. Apna Vyapar is not responsible 
          for any transactions, claims, product fulfillment, refunds, or misconduct associated with this store. 
          All agreements and purchases are strictly between the customer and the merchant.
        </p>
      </div>

      {/* Policy Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-lg">{activePolicy === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h3>
              <button onClick={() => setActivePolicy(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {activePolicy === 'privacy' 
                ? (store.privacy_policy || "This store has not provided a custom privacy policy yet.") 
                : (store.terms_conditions || "This store has not provided custom terms and conditions yet.")}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setActivePolicy(null)} className="px-6 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export function StorefrontClient({ store, products }: { store: any, products: Product[] }) {
  return (
    <CartProvider storeId={store.id}>
      <Header store={store} />
      <ProductGrid products={products} />
      <Footer store={store} />
      <CartDrawer />
    </CartProvider>
  );
}
