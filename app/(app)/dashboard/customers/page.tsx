"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CustomersTable, Customer } from "@/components/dashboard/customers-table";
import { Download, Plus, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import { downloadCSV } from "@/lib/utils/csv";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCustomers() {
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .order("total_spent", { ascending: false });

        if (error) {
          console.error("Error fetching customers:", error);
        } else if (isMounted) {
          setCustomers(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCustomers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-gradient-to-bl from-rose-400/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Customers</h1>
          <p className="text-gray-500 font-medium">Manage your clients, view their purchase history, and track lifetime value.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => downloadCSV(customers, 'customers')}
            className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
          <Link 
            href="/dashboard/customers/new" 
            className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Customer
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-card p-12 flex justify-center items-center relative z-10">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative z-10">
          <CustomersTable initialCustomers={customers} />
        </div>
      )}
    </div>
  );
}
