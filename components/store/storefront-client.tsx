"use client";

import { CartProvider } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { StoreHeader } from "./store-header";
import { ProductGrid } from "./product-grid";
import { StoreFooter } from "./store-footer";
import type { Product } from '@/types/store';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function StorefrontClient({ store, products: initialProducts }: { store: any, products: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Real-time product updates — when merchant adds/edits inventory, storefront updates instantly
  useEffect(() => {
    const channel = supabase
      .channel(`store-products-${store.user_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
          filter: `user_id=eq.${store.user_id}`,
        },
        async () => {
          // Re-fetch all active products for this store on any change
          const { data } = await supabase
            .from('products')
            .select('*')
            .eq('user_id', store.user_id)
            .eq('status', 'active')
            .order('created_at', { ascending: false });
          if (data) setProducts(data as Product[]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [store.user_id]);

  return (
    <CartProvider storeId={store.id}>
      <StoreHeader store={store} />
      <ProductGrid products={products} store={store} />
      <StoreFooter store={store} />
      <CartDrawer store={store} />
    </CartProvider>
  );
}
