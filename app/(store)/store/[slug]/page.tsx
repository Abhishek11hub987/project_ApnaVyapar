import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import { StorefrontClient } from "@/components/store/storefront-client";
import { VyaparMitraChat } from "@/components/store/vyapar-mitra-chat"; // We will create this next

export const dynamic = 'force-dynamic'; // Prevent aggressive caching for immediate setting updates

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
    <main className="relative min-h-screen">
      <StorefrontClient store={store} products={products || []} />
      {/* 
        Pass products and store info into the AI Chat Widget 
        so it can answer context-aware questions.
      */}
      <VyaparMitraChat store={store} products={products || []} />
    </main>
  );
}
