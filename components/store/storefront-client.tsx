"use client";

import { CartProvider, useCart } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { ShoppingBag, Search, X, ShieldAlert, FileText, Scale } from "lucide-react";
import { Product } from "@/components/dashboard/inventory-table";
import Link from "next/link";
import Logo from "../logo";

function Header({ store }: { store: any }) {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Parse the brand color, fallback to cyan
  const themeColor = store.theme_color || '#00D4FF';

  return (
    <header className="sticky top-0 z-40 w-full bg-navy/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div 
        className="absolute inset-x-0 top-0 h-1 opacity-80"
        style={{ background: `linear-gradient(to right, ${themeColor}, #10b981, ${themeColor})` }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {store.logo_url ? (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
              <img src={store.logo_url} alt="Store Logo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg border border-white/10"
              style={{ backgroundColor: themeColor }}
            >
              {store.store_name.substring(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-none">
              {store.store_name}
            </h1>
            {store.hero_text && (
              <p className="text-white/50 text-xs md:text-sm mt-1 max-w-md line-clamp-1">
                {store.hero_text}
              </p>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white"
        >
          <ShoppingBag size={18} className="text-cyan" />
          <span className="hidden sm:inline">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan to-emerald-500 text-navy-dark w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black shadow-lg">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Our Products</h2>
          <p className="text-white/50 text-sm">Browse our carefully curated selection.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-semibold text-white/70">
          {products?.length || 0} <span className="text-white/40 font-normal">Items Available</span>
        </div>
      </div>

      {(!products || products.length === 0) ? (
        <div className="glass-card border border-white/5 p-16 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Store is empty</h3>
          <p className="text-white/50 max-w-sm mx-auto">This merchant hasn't listed any products yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div 
              key={product.id} 
              className="glass-card !p-0 border border-white/10 overflow-hidden flex flex-col h-full group hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Container */}
              <div className="aspect-square bg-navy-light flex items-center justify-center relative overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex flex-col items-center justify-center text-white/30 group-hover:scale-105 transition-transform duration-500">
                    <ShoppingBag size={48} className="mb-2 opacity-50" />
                    <span className="font-semibold text-xs tracking-wider uppercase">No Image</span>
                  </div>
                )}
                
                {/* Gradient Overlay for bottom text protection */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent pointer-events-none opacity-60"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2 pointer-events-none">
                  {product.stock_quantity <= 0 && (
                    <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                      Sold Out
                    </span>
                  )}
                  {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                    <span className="bg-amber-500/90 backdrop-blur-sm text-navy-dark text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                      Only {product.stock_quantity} left
                    </span>
                  )}
                </div>

                {/* Hover Add to Cart Overlay */}
                {product.stock_quantity > 0 && (
                  <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => addItem(product)}
                      className="bg-gradient-to-r from-cyan to-emerald-500 text-navy-dark font-black tracking-wide px-8 py-3.5 rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-neon-cyan hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <ShoppingBag size={18} /> Add to Cart
                    </button>
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="p-5 flex flex-col flex-1 relative z-10 bg-navy/40">
                <h3 className="font-bold text-white mb-2 line-clamp-1 text-lg group-hover:text-cyan transition-colors">{product.name}</h3>
                {product.description ? (
                  <p className="text-white/40 text-xs line-clamp-2 mb-4 flex-1 leading-relaxed">{product.description}</p>
                ) : (
                  <div className="flex-1 mb-4" />
                )}
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="font-black text-xl text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  
                  {/* Mobile Add to Cart (visible on touch devices or small screens) */}
                  {product.stock_quantity > 0 && (
                    <button 
                      onClick={() => addItem(product)}
                      className="md:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cyan transition-colors"
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

function Footer({ store }: { store: any }) {
  return (
    <footer className="bg-navy-dark relative z-10 border-t border-white/5 mt-auto">
      {/* Top subtle gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Info */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            {store.logo_url && (
              <img src={store.logo_url} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            )}
            <h3 className="text-white font-extrabold text-2xl tracking-tight">{store.store_name}</h3>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            {store.hero_text || "Thank you for shopping with us! We pride ourselves on delivering quality products directly to you."}
          </p>
          {(store.support_email || store.support_phone) && (
            <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider text-cyan">Customer Support</h4>
              {store.support_email && (
                <a href={`mailto:${store.support_email}`} className="text-sm text-white/70 hover:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/50"></span> {store.support_email}
                </a>
              )}
              {store.support_phone && (
                <a href={`tel:${store.support_phone}`} className="text-sm text-white/70 hover:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span> {store.support_phone}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-4" /> {/* Spacer */}

        {/* Links & Policies */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col md:items-end">
          <h4 className="text-white font-bold text-sm mb-6">Legal & Policies</h4>
          <div className="flex flex-col gap-3 mb-10 w-full md:items-end">
            <Link href={`/store/${store.slug}/privacy`} className="text-sm text-white/50 hover:text-cyan transition-colors flex items-center gap-2 justify-start md:justify-end w-fit">
              <ShieldAlert size={14} /> Privacy Policy
            </Link>
            <Link href={`/store/${store.slug}/terms`} className="text-sm text-white/50 hover:text-cyan transition-colors flex items-center gap-2 justify-start md:justify-end w-fit">
              <Scale size={14} /> Terms of Service
            </Link>
          </div>
          
          <div className="mt-auto pt-6 border-t border-white/5 w-full md:text-right">
            <p className="text-white/30 text-xs mb-3 uppercase tracking-wider font-bold">Powered securely by</p>
            <Link href="/" target="_blank" className="inline-block group">
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl transition-all flex items-center gap-3">
                <Logo iconSize={20} />
                <span className="text-white font-bold tracking-tight text-sm group-hover:text-cyan transition-colors">Apna Vyapar</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-[#050B14] py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 max-w-4xl mx-auto">
            <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              <strong className="text-white/70">Platform Disclaimer:</strong> This storefront is independently owned and operated by the merchant. 
              Apna Vyapar provides the e-commerce platform and software infrastructure only. Apna Vyapar is not responsible 
              for any transactions, claims, product fulfillment, refunds, or misconduct associated with this store. 
              All agreements and purchases are strictly between you and the merchant.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function StorefrontClient({ store, products }: { store: any, products: Product[] }) {
  return (
    <CartProvider storeId={store.id}>
      <Header store={store} />
      <ProductGrid products={products} />
      <Footer store={store} />
      <CartDrawer store={store} />
    </CartProvider>
  );
}
