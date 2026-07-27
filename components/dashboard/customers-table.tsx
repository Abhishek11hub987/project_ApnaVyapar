"use client";

import { useState } from "react";
import { Users, MoreVertical, Edit2, Trash2, Mail, Phone, IndianRupee } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export type Customer = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  total_spent: number;
  total_orders: number;
  status: 'active' | 'inactive' | 'vip';
  created_at: string;
};

export function CustomersTable({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer? This action cannot be undone.")) return;
    
    setIsDeleting(id);
    try {
      const { error } = await supabase.from('customers').delete().eq('id', id);
      if (error) throw error;
      setCustomers(customers.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer");
    } finally {
      setIsDeleting(null);
    }
  };

  if (customers.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg shadow-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
          <Users size={28} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No customers yet</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          Your customer database is empty. Once you start making sales, customer profiles will automatically appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 uppercase text-xs tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4 text-right">Total Spent</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-gray-500">
                        {customer.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-gray-900 transition-colors">{customer.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Joined {new Date(customer.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 space-y-1">
                  {customer.email && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-900 transition-colors cursor-pointer">
                      <Mail size={12} className="shrink-0" />
                      <span className="truncate max-w-[150px]">{customer.email}</span>
                    </div>
                  )}
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-900 transition-colors cursor-pointer">
                      <Phone size={12} className="shrink-0" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {!customer.email && !customer.phone && (
                    <span className="text-gray-400 text-xs italic">No contact info</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    customer.status === 'vip' ? 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20' :
                    customer.status === 'active' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                    'bg-gray-50 text-gray-600 ring-1 ring-gray-400/20'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-medium text-gray-700">
                  {customer.total_orders}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                  ₹{customer.total_spent.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/dashboard/customers/${customer.id}`} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors" title="Edit Customer">
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(customer.id)}
                      disabled={isDeleting === customer.id}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50" 
                      title="Delete Customer"
                    >
                      {isDeleting === customer.id ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
