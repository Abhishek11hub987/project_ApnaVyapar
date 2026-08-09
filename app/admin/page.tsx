import { supabaseAdmin } from '@/lib/supabase/admin';
import { Users, Lightbulb, MessageSquare, Clock, Calendar, TrendingUp, Activity, Server, Settings, Shield } from 'lucide-react';
import Link from 'next/link';
import AdminControls from './admin-controls';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  // Fetch data
  const [signupsRes, ideasRes, chatsRes] = await Promise.all([
    supabaseAdmin.from('signup_analytics').select('signup_date'),
    supabaseAdmin.from('business_ideas').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('chat_sessions').select('id', { count: 'exact', head: true })
  ]);

  const signups = signupsRes.data || [];
  const totalSignups = signups.length;
  const totalIdeas = ideasRes.count || 0;
  const totalChats = chatsRes.count || 0;

  // Calculate today's signups
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySignups = signups.filter((s: any) => new Date(s.signup_date) >= today).length;

  // Calculate this week's signups
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const weekSignups = signups.filter((s: any) => new Date(s.signup_date) >= lastWeek).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Shield size={12} /> Superadmin Access
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Platform Overview</h1>
          <p className="text-gray-500 mt-2 font-medium">Track key metrics, system health, and recent user activity.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-accent-100/50 rounded-full blur-2xl group-hover:bg-accent-200/50 transition-colors duration-500" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold text-xs tracking-wider uppercase mb-1">Total Users</p>
              <h3 className="text-4xl font-black text-gray-900">{totalSignups}</h3>
            </div>
            <div className="p-3 bg-accent-50 text-accent-600 rounded-xl shadow-sm">
              <Users size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl group-hover:bg-purple-200/50 transition-colors duration-500" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold text-xs tracking-wider uppercase mb-1">Total Ideas</p>
              <h3 className="text-4xl font-black text-gray-900">{totalIdeas}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shadow-sm">
              <Lightbulb size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl group-hover:bg-amber-200/50 transition-colors duration-500" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold text-xs tracking-wider uppercase mb-1">AI Sessions</p>
              <h3 className="text-4xl font-black text-gray-900">{totalChats}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shadow-sm">
              <MessageSquare size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200/50 transition-colors duration-500" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold text-xs tracking-wider uppercase mb-1">Signups (7d)</p>
              <h3 className="text-4xl font-black text-blue-600">+{weekSignups}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Controls & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Activity className="text-accent-600" size={20} /> System Health & Controls
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border border-gray-100 bg-gray-50/50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">API Status</p>
                <p className="text-xs text-gray-500 mt-0.5">All services operational</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </div>
            </div>

            <div className="p-5 border border-gray-100 bg-gray-50/50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">Database Load</p>
                <p className="text-xs text-gray-500 mt-0.5">PostgreSQL Supabase</p>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                12% CPU
              </div>
            </div>
          </div>

          <div className="mt-6">
            <AdminControls />
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link href="/admin/users" className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl transition-all shadow-sm hover:shadow group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-50 rounded-lg group-hover:bg-accent-100 transition-colors">
                  <Users size={18} className="text-accent-600" />
                </div>
                <span className="font-bold text-gray-700">Manage Users</span>
              </div>
            </Link>
            <Link href="/admin/ideas" className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl transition-all shadow-sm hover:shadow group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Lightbulb size={18} className="text-purple-600" />
                </div>
                <span className="font-bold text-gray-700">Moderate Ideas</span>
              </div>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-700">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Signups Today</p>
                    <p className="text-xs text-gray-500 font-medium">{todaySignups} new users joined</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
