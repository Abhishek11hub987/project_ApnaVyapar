"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { OrdersTable, Order } from "@/components/dashboard/orders-table";
import { Package, Download } from "lucide-react";
import { downloadCSV } from "@/lib/utils/csv";

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-gradient-to-bl from-cyan-400/10 to-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Orders</h1>
          <p className="text-gray-500 font-medium">Track and fulfill incoming orders from your public storefront.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => downloadCSV(orders, 'orders')}
            className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-12 flex justify-center items-center relative z-10">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative z-10">
          <OrdersTable initialOrders={orders} />
        </div>
      )}
    </div>
  );
}
