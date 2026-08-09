import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { StorefrontClient } from "@/components/store/storefront-client";
import { VyaparMitraChat } from "@/components/store/vyapar-mitra-chat"; // We will create this next

export const dynamic = 'force-dynamic'; // Prevent aggressive caching for immediate setting updates

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<import("next").Metadata> {
  const { data: store } = await supabaseAdmin
    .from("store_settings")
    .select("store_name, hero_text, logo_url")
    .eq("slug", params.slug)
    .single();

  if (!store) {
    return { title: "Store Not Found" };
  }

  return {
    title: `${store.store_name} | Apna Vyapar`,
    description: store.hero_text || `Shop online at ${store.store_name} on Apna Vyapar.`,
    openGraph: {
      title: store.store_name,
      description: store.hero_text || `Shop online at ${store.store_name}`,
      images: [
        {
          url: store.logo_url || "/logo-transparent.png",
          width: 800,
          height: 800,
          alt: store.store_name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: store.store_name,
      description: store.hero_text || `Shop online at ${store.store_name}`,
      images: [store.logo_url || "/logo-transparent.png"],
    },
  };
}
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
