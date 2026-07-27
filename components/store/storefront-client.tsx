"use client";

import { CartProvider, useCart } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { StoreHeader } from "./store-header";
import { ProductGrid } from "./product-grid";
import { StoreFooter } from "./store-footer";
import type { Product } from '@/types/store';

export function StorefrontClient({ store, products }: { store: any, products: Product[] }) {
  return (
    <CartProvider storeId={store.id}>
      <StoreHeader store={store} />
      <ProductGrid products={products} />
      <StoreFooter store={store} />
      <CartDrawer store={store} />
    </CartProvider>
  );
}
