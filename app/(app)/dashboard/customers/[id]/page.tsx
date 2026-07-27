"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCustomer() {
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        
        if (isMounted && data) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            status: data.status || "active",
          });
        }
      } catch (err: any) {
        console.error("Error fetching customer:", err);
        setError("Failed to load customer details. They may have been deleted.");
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    }

    fetchCustomer();
    return () => { isMounted = false; };
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from("customers")
        .update({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone || null,
          status: formData.status,
        })
        .eq("id", params.id);

      if (updateError) throw updateError;

      router.push("/dashboard/customers");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update customer");
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/customers" className="p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Edit Customer</h1>
          <p className="text-white/60">Update customer details and status.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 md:p-8 border-white/5 space-y-6">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Customer Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                placeholder="e.g. Rahul Sharma"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                  placeholder="rahul@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors appearance-none"
              >
                <option value="active">Active Customer</option>
                <option value="vip">VIP Customer</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/customers"
            className="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan text-navy-dark font-bold hover:scale-105 transition-all shadow-neon-cyan flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Update Customer
          </button>
        </div>
      </form>
    </div>
  );
}
