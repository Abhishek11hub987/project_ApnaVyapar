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

  const themeColor = store?.theme_color || "#0f172a";

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
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: themeColor }} /> Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50/50">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle size={40} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Order Placed!</h3>
                <p className="text-gray-500 text-sm">The merchant will contact you shortly to fulfill your order.</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3.5 text-white font-bold tracking-wide rounded-xl hover:scale-105 transition-transform shadow-md"
                style={{ background: themeColor }}
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
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <button type="button" onClick={() => setCheckoutMode(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors">
                  <ArrowLeft size={16} />
                </button>
                <h3 className="font-black text-xl text-gray-900">Checkout</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={customerInfo.name} 
                    onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-300 transition-all font-medium shadow-sm"
                    style={{ '--tw-ring-color': `${themeColor}40` } as any}
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={customerInfo.email} 
                    onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-300 transition-all font-medium shadow-sm"
                    style={{ '--tw-ring-color': `${themeColor}40` } as any}
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={customerInfo.phone} 
                    onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-300 transition-all font-medium shadow-sm"
                    style={{ '--tw-ring-color': `${themeColor}40` } as any}
                    placeholder="+91 9876543210" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Address</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={customerInfo.address} 
                    onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-300 transition-all font-medium resize-none shadow-sm"
                    style={{ '--tw-ring-color': `${themeColor}40` } as any}
                    placeholder="123 Main St, City, State, ZIP" 
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-100/50 transition-colors group">
                <input 
                  type="checkbox" 
                  required 
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" 
                />
                <div className="flex-1">
                  <span className="text-xs text-gray-600 leading-relaxed block">
                    <strong className="text-orange-600 flex items-center gap-1.5 mb-1"><ShieldAlert size={12}/> Liability Acknowledgment</strong> 
                    I acknowledge that Apna Vyapar is a software provider and is NOT responsible for this transaction, product fulfillment, or refunds. I am transacting directly with the merchant.
                  </span>
                </div>
              </label>

            </form>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <p className="font-bold text-gray-400 text-lg">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="font-bold transition-colors mt-2"
                style={{ color: themeColor }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.product.id} 
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all animate-in slide-in-from-right-4 group"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-24 h-24 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                      <p className="font-black mt-1" style={{ color: themeColor }}>₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 font-bold text-gray-900 text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-[10px] font-black text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg uppercase tracking-widest transition-colors"
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
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-xs">Subtotal</span>
              <span className="text-2xl font-black text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            
            {checkoutMode ? (
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                style={{ background: themeColor }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            ) : (
              <>
                <p className="text-[10px] text-gray-400 mb-3 text-center uppercase tracking-widest font-bold">Taxes & shipping calculated at checkout</p>
                <button 
                  className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                  style={{ background: themeColor }}
                  onClick={() => setCheckoutMode(true)}
                >
                  Proceed to Checkout <ArrowLeft size={18} className="rotate-180" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
