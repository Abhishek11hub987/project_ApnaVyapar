"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { InventoryTable, Product } from "@/components/dashboard/inventory-table";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // In a real app, RLS (Row Level Security) ensures we only get the logged-in user's products.
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-gradient-to-bl from-accent-400/10 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Inventory</h1>
          <p className="text-gray-500 font-medium">Manage your products, pricing, and stock levels.</p>
        </div>
        <Link 
          href="/dashboard/inventory/new" 
          className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-12 flex justify-center items-center relative z-10">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-accent-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative z-10">
          <InventoryTable initialProducts={products} />
        </div>
      )}
    </div>
  );
}
