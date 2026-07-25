"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { OrdersTable, Order } from "@/components/dashboard/orders-table";
import { Package, Download } from "lucide-react";
import { downloadCSV } from "@/lib/csv";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchOrders() {
      try {
        const { data: userData, error: authError } = await supabase.auth.getUser();
        if (authError || !userData?.user) return;

        // First get the user's store ID
        const { data: storeData } = await supabase
          .from("store_settings")
          .select("id")
          .eq("user_id", userData.user.id)
          .single();

        if (!storeData) {
          if (isMounted) setLoading(false);
          return;
        }

        // Fetch orders for this store, joining with customers table for name/email
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*, customers(name, email)")
          .eq("store_id", storeData.id)
          .order("created_at", { ascending: false });

        if (ordersError) {
          console.error("Error fetching orders:", ordersError);
        } else if (isMounted) {
          setOrders(ordersData || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Orders</h1>
          <p className="text-white/60">Track and fulfill incoming orders from your public storefront.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => downloadCSV(orders, 'orders')}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-12 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
        </div>
      ) : (
        <OrdersTable initialOrders={orders} />
      )}
    </div>
  );
}
