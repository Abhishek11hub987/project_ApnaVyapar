import { supabaseAdmin } from '@/lib/supabase/admin';
import { Mail, Calendar, Shield, User, Copy } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const { data: signups, error } = await supabaseAdmin
    .from('signup_analytics')
    .select('*')
    .order('signup_date', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-400 bg-red-400/10 border border-red-400/20 rounded-2xl">
        Failed to load users: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white">Users Management</h1>
          <p className="text-white/60 mt-1">View all {signups?.length || 0} registered users on the platform.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-white/50 font-semibold uppercase tracking-wider text-xs border-b border-white/10">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {signups?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                    No users found.
                  </td>
                </tr>
              )}
              {signups?.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center text-cyan border border-cyan/20">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.first_name || 'Anonymous'}</p>
                        <p className="text-xs text-white/40 font-mono mt-0.5" title={user.id}>
                          {user.id.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-white/40" />
                      <a href={`mailto:${user.email}`} className="text-cyan hover:underline">{user.email}</a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${
                      user.provider === 'google' 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : user.provider === 'github' 
                          ? 'bg-white/10 text-white/80 border-white/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {user.provider || 'Email'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar size={14} />
                      {new Date(user.signup_date).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
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
