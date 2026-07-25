import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export const revalidate = 60; // Revalidate cache every 60 seconds

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
};

export default async function PublicStorePage({ params }: { params: { slug: string } }) {
  // 1. Fetch Store Settings by slug
  const { data: store, error: storeError } = await supabaseAdmin
    .from("store_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (storeError || !store || !store.is_active) {
    notFound();
  }

  // 2. Fetch active products for this store's owner
  const { data: products, error: productsError } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("user_id", store.user_id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <main>
      {/* Store Header */}
      <header 
        className="text-white py-12 px-4 shadow-md"
        style={{ backgroundColor: store.theme_color || '#00D4FF' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">{store.store_name}</h1>
          <button className="bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2">
            <ShoppingBag size={18} /> Cart (0)
          </button>
        </div>
      </header>

      {/* Product Catalog */}
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
            {products.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                {/* Image Placeholder */}
                <div className="aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <span className="text-slate-300 font-medium text-sm">No Image</span>
                  {/* Hover Add to Cart button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-slate-900 font-bold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                {/* Details */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
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
    </main>
  );
}
