"use client";

import { useCart } from "./cart-context";
import { X, Minus, Plus, ShoppingBag, CheckCircle, ArrowLeft, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export function CartDrawer({ store }: { store: any }) {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal, storeId, clearCart } = useCart();
  
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Reset states when drawer closes
  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => {
        setCheckoutMode(false);
        setOrderSuccess(false);
      }, 300);
    }
  }, [isCartOpen]);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-navy-light shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-500 border-l border-white/10">
        
        {/* Top subtle gradient line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan via-emerald-400 to-cyan"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag size={20} className="text-cyan" /> Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle size={48} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2">Order Placed!</h3>
                <p className="text-white/50 text-sm">The merchant will contact you shortly to fulfill your order.</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan to-emerald-500 text-navy-dark font-black tracking-wide rounded-xl hover:scale-105 transition-transform shadow-neon-cyan"
              >
                Continue Shopping
              </button>
            </div>
          ) : checkoutMode ? (
            <form id="checkout-form" className="space-y-6 animate-in slide-in-from-right-4 duration-300" onSubmit={async (e) => {
              e.preventDefault();
              if (!disclaimerAccepted) {
                alert("You must accept the disclaimer to proceed.");
                return;
              }
              setIsSubmitting(true);
              try {
                const res = await fetch('/api/checkout', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    storeId,
                    customerInfo,
                    cartItems: items,
                    totalAmount: cartTotal
                  })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                
                setOrderSuccess(true);
                clearCart();
              } catch (err: any) {
                alert(err.message || "Failed to place order.");
              } finally {
                setIsSubmitting(false);
              }
            }}>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                <button type="button" onClick={() => setCheckoutMode(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                  <ArrowLeft size={16} />
                </button>
                <h3 className="font-bold text-xl text-white">Checkout</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={customerInfo.name} 
                    onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan/50 focus:bg-white/10 text-white placeholder:text-white/20 transition-all font-medium" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={customerInfo.email} 
                    onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan/50 focus:bg-white/10 text-white placeholder:text-white/20 transition-all font-medium" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={customerInfo.phone} 
                    onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan/50 focus:bg-white/10 text-white placeholder:text-white/20 transition-all font-medium" 
                    placeholder="+91 9876543210" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Shipping Address</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={customerInfo.address} 
                    onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan/50 focus:bg-white/10 text-white placeholder:text-white/20 transition-all font-medium resize-none" 
                    placeholder="123 Main St, City, State, ZIP" 
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-colors group">
                <input 
                  type="checkbox" 
                  required 
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-amber-500 bg-navy border-white/20 rounded focus:ring-amber-500 focus:ring-offset-navy" 
                />
                <div className="flex-1">
                  <span className="text-xs text-white/70 leading-relaxed block group-hover:text-white transition-colors">
                    <strong className="text-amber-400 flex items-center gap-1.5 mb-1"><ShieldAlert size={12}/> Liability Acknowledgment</strong> 
                    I acknowledge that Apna Vyapar is a software provider and is NOT responsible for this transaction, product fulfillment, or refunds. I am transacting directly with the merchant.
                  </span>
                </div>
              </label>

            </form>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-white/30 animate-in fade-in zoom-in-95 duration-500">
              <ShoppingBag size={64} className="opacity-20 mb-2" />
              <p className="font-medium text-white/50 text-lg">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-cyan font-bold hover:text-white transition-colors mt-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div 
                  key={item.product.id} 
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan/30 transition-colors animate-in slide-in-from-right-4"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-20 h-20 rounded-xl bg-navy overflow-hidden flex-shrink-0 border border-white/5">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white line-clamp-1">{item.product.name}</h3>
                      <p className="text-cyan font-black mt-1">₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-navy border border-white/10 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-white/10 text-white/70 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-bold text-white text-xs min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-white/10 text-white/70 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-[10px] font-black text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded uppercase tracking-widest transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {!orderSuccess && items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-navy/80 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="font-bold text-white/50 uppercase tracking-wider text-xs">Subtotal</span>
              <span className="text-2xl font-black text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            
            {checkoutMode ? (
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-black text-navy-dark tracking-wide bg-gradient-to-r from-cyan to-emerald-500 shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            ) : (
              <>
                <p className="text-[10px] text-white/30 mb-4 text-center uppercase tracking-widest font-bold">Taxes & shipping calculated at checkout</p>
                <button 
                  className="w-full py-4 rounded-xl font-black text-navy-dark tracking-wide bg-gradient-to-r from-cyan to-emerald-500 shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  onClick={() => setCheckoutMode(true)}
                >
                  Proceed to Checkout <ArrowLeft size={16} className="rotate-180" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
