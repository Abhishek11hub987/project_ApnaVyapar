"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CustomersTable, Customer } from "@/components/dashboard/customers-table";
import { Download, Plus, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import { downloadCSV } from "@/lib/csv";

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Customers</h1>
          <p className="text-white/60">Manage your clients, view their purchase history, and track lifetime value.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => downloadCSV(customers, 'customers')}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download size={16} /> Export CSV
          </button>
          <Link 
            href="/dashboard/customers/new" 
            className="px-5 py-2.5 rounded-xl bg-cyan text-navy-dark text-sm font-bold hover:scale-105 transition-transform shadow-neon-cyan flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Customer
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-12 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
        </div>
      ) : (
        <CustomersTable initialCustomers={customers} />
      )}
    </div>
  );
}
