"use client";

import { useCart } from "./cart-context";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect } from "react";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();

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

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
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

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-slate-500">Subtotal</span>
              <span className="text-2xl font-extrabold text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">Taxes and shipping calculated at checkout.</p>
            <button 
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#0f172a' }} // Default dark slate
              onClick={() => {
                alert("Checkout functionality would connect to Stripe/Razorpay here!");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
