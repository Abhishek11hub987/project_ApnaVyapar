import { supabaseAdmin } from '@/lib/supabase-admin';
import { Users, Lightbulb, MessageSquare, Clock, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
  const todaySignups = signups.filter(s => new Date(s.signup_date) >= today).length;

  // Calculate this week's signups
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const weekSignups = signups.filter(s => new Date(s.signup_date) >= lastWeek).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white">Platform Overview</h1>
        <p className="text-white/60 mt-1">Track key metrics and recent activity.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="glass-card p-6 rounded-2xl border-white/10 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan/10 rounded-full blur-xl group-hover:bg-cyan/20 transition-colors" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 font-medium text-sm">Total Users</p>
              <h3 className="text-3xl font-black text-white mt-1">{totalSignups}</h3>
            </div>
            <div className="p-3 bg-cyan/10 text-cyan rounded-xl">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/10 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 font-medium text-sm">Total Ideas</p>
              <h3 className="text-3xl font-black text-white mt-1">{totalIdeas}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <Lightbulb size={20} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/10 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 font-medium text-sm">Mitra Sessions</p>
              <h3 className="text-3xl font-black text-white mt-1">{totalChats}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <MessageSquare size={20} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/10 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 font-medium text-sm">Signups (7d)</p>
              <h3 className="text-3xl font-black text-white mt-1">+{weekSignups}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link href="/admin/users" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-cyan" />
                <span className="font-medium text-white/90">Manage Users</span>
              </div>
            </Link>
            <Link href="/admin/ideas" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Lightbulb size={18} className="text-purple-400" />
                <span className="font-medium text-white/90">Moderate Ideas</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-2xl border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan/20 flex items-center justify-center text-cyan">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Signups Today</p>
                  <p className="text-xs text-white/50">{todaySignups} new users joined</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
