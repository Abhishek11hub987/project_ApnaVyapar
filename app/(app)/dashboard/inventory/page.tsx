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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Inventory</h1>
          <p className="text-white/60">Manage your products, pricing, and stock levels.</p>
        </div>
        <Link 
          href="/dashboard/inventory/new" 
          className="px-5 py-2.5 rounded-xl bg-cyan text-navy-dark text-sm font-bold hover:scale-105 transition-transform shadow-neon-cyan flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="glass-card p-12 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
        </div>
      ) : (
        <InventoryTable initialProducts={products} />
      )}
    </div>
  );
}
