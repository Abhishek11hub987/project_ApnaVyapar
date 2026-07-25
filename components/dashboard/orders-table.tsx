"use client";

import { useState } from "react";
import { PackageSearch, Edit2, CheckCircle2, Truck, XCircle, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export type Order = {
  id: string;
  store_id: string;
  customer_id: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  customers?: { name: string; email: string }; // joined data
};

export function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(current => 
        current.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <PackageSearch size={28} className="text-white/40" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
        <p className="text-white/50 max-w-sm mb-6">
          When customers purchase products from your public storefront, their orders will appear here for you to fulfill.
        </p>
      </div>
    );
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'processing': return <PackageSearch size={14} />;
      case 'shipped': return <Truck size={14} />;
      case 'delivered': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'processing': return 'bg-cyan/10 text-cyan border-cyan/20';
      case 'shipped': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'delivered': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-white/50 border-b border-white/10 uppercase text-xs tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Order ID & Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-mono text-white text-xs mb-1">
                      {order.id.split('-')[0].toUpperCase()}
                    </p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">
                      {new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order.customers ? (
                    <div>
                      <p className="font-semibold text-white">{order.customers.name}</p>
                      <p className="text-xs text-white/40">{order.customers.email || 'No email'}</p>
                    </div>
                  ) : (
                    <span className="text-white/30 italic">Guest / Unknown</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-white">
                  ₹{order.total_amount.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-100 transition-opacity">
                    {updatingId === order.id ? (
                      <div className="px-3 py-1.5 flex items-center justify-center text-white/50">
                        <Loader2 size={16} className="animate-spin" />
                      </div>
                    ) : (
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="px-2 py-1.5 rounded-lg border border-white/10 bg-navy text-white/70 hover:bg-white/10 hover:text-white transition-colors text-xs font-medium outline-none cursor-pointer text-center appearance-none"
                      >
                        <option value="pending" className="bg-navy text-left">Set Pending</option>
                        <option value="processing" className="bg-navy text-left">Set Processing</option>
                        <option value="shipped" className="bg-navy text-left">Set Shipped</option>
                        <option value="delivered" className="bg-navy text-left">Set Delivered</option>
                        <option value="cancelled" className="bg-navy text-left text-red-400">Cancel Order</option>
                      </select>
                    )}
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
