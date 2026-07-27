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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory</h1>
          <p className="text-gray-500">Manage your products, pricing, and stock levels.</p>
        </div>
        <Link 
          href="/dashboard/inventory/new" 
          className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-100 rounded-lg shadow-card p-12 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
        </div>
      ) : (
        <InventoryTable initialProducts={products} />
      )}
    </div>
  );
}
