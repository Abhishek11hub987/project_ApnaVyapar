import { supabaseAdmin } from '@/lib/supabase/admin';
import { Mail, Calendar, Shield, User, Copy, CheckCircle, Ban } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const { data: signups, error } = await supabaseAdmin
    .from('signup_analytics')
    .select('*')
    .order('signup_date', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 border border-red-100 rounded-2xl">
        Failed to load users: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Users Management</h1>
          <p className="text-gray-500 mt-2 font-medium">View all {signups?.length || 0} registered users on the platform.</p>
        </div>
      </div>

      <div className="glass-panel border-gray-100/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider text-xs border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {signups?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No users found.
                  </td>
                </tr>
              )}
              {signups?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-accent-600 border border-accent-100">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.first_name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5" title={user.id}>
                          {user.id.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      <a href={`mailto:${user.email}`} className="text-accent-600 font-medium hover:underline">{user.email}</a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                      user.provider === 'google' 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : user.provider === 'github' 
                          ? 'bg-gray-100 text-gray-700 border-gray-200'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {user.provider || 'Email'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Calendar size={14} />
                      {new Date(user.signup_date).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Suspend User (Mock)">
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
