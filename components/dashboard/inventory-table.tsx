"use client";

import { useState } from "react";
import { Package, MoreVertical, Edit2, Trash2, Tag, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  sku: string | null;
  status: 'active' | 'draft' | 'out_of_stock';
  image_url: string | null;
  created_at: string;
};

export function InventoryTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  if (products.length === 0) {
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <Package size={28} className="text-white/40" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Your inventory is empty</h3>
        <p className="text-white/50 max-w-sm mb-6">
          Start building your store by adding your first product. You can track stock, set prices, and manage variants.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-white/50 border-b border-white/10 uppercase text-xs tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Tag size={16} className="text-white/40" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-cyan transition-colors">{product.name}</p>
                      {product.description && (
                        <p className="text-xs text-white/40 truncate max-w-[200px]">{product.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/60 font-mono text-xs">
                  {product.sku || "—"}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    product.status === 'active' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                    product.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {product.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                      <AlertCircle size={14} className="text-amber-400" />
                    )}
                    <span className={`font-medium ${product.stock_quantity === 0 ? 'text-red-400' : 'text-white/80'}`}>
                      {product.stock_quantity}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/dashboard/inventory/${product.id}`}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors" 
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                          try {
                            const { error } = await supabase.from('products').delete().eq('id', product.id);
                            if (error) throw error;
                            setProducts(prev => prev.filter(p => p.id !== product.id));
                          } catch (err: any) {
                            alert(`Failed to delete: ${err.message}`);
                          }
                        }
                      }}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-white/60 hover:text-red-400 transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
