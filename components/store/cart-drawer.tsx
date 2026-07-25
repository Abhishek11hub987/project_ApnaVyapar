"use client";

import { useCart } from "./cart-context";
import { X, Minus, Plus, ShoppingBag, CheckCircle, ArrowLeft } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShoppingBag size={20} /> Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Order Placed!</h3>
                <p className="text-slate-500">The merchant will contact you shortly.</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : checkoutMode ? (
            <form id="checkout-form" className="space-y-6" onSubmit={async (e) => {
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
              <div className="flex items-center gap-2 mb-6">
                <button type="button" onClick={() => setCheckoutMode(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h3 className="font-bold text-lg text-slate-800">Checkout</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input type="text" required value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-800" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <input type="email" required value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-800" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" required value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-800" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Shipping Address</label>
                  <textarea required rows={3} value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-800 resize-none" placeholder="123 Main St, City, State, ZIP" />
                </div>
              </div>

              {store.payment_instructions && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6">
                  <h4 className="font-bold text-blue-900 mb-2">Payment Instructions</h4>
                  <div className="text-sm text-blue-800 whitespace-pre-wrap font-mono">{store.payment_instructions}</div>
                </div>
              )}

              <label className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input 
                  type="checkbox" 
                  required 
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900" 
                />
                <span className="text-xs text-slate-600 font-medium leading-relaxed">
                  <strong>Liability Acknowledgment:</strong> I acknowledge that Apna Vyapar is a software provider and is NOT responsible for this transaction, product fulfillment, or refunds. I am transacting directly with the merchant.
                </span>
              </label>

            </form>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-slate-400">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-teal-600 font-bold hover:underline mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 line-clamp-2">{item.product.name}</h3>
                      <p className="text-slate-500 font-medium">₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 font-semibold text-slate-800 text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-wide"
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
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-slate-500">Subtotal</span>
              <span className="text-2xl font-extrabold text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            
            {checkoutMode ? (
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: '#0f172a' }} // Default dark slate
              >
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Place Order"}
              </button>
            ) : (
              <>
                <p className="text-xs text-slate-500 mb-6">Taxes and shipping calculated at checkout.</p>
                <button 
                  className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: '#0f172a' }} // Default dark slate
                  onClick={() => setCheckoutMode(true)}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
