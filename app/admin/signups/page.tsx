import { supabaseAdmin } from '@/lib/supabase-admin';
import { Users, Mail, Clock, Calendar } from 'lucide-react';

export const revalidate = 0; // Disable caching for admin dashboard

export default async function AdminSignupsPage() {
  const { data: signups, error } = await supabaseAdmin
    .from('signup_analytics')
    .select('*')
    .order('signup_date', { ascending: false });

  if (error) {
    return <div>Error loading analytics: {error.message}</div>;
  }

  const totalSignups = signups?.length || 0;
  
  // Calculate today's signups
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySignups = signups?.filter(s => new Date(s.signup_date) >= today).length || 0;

  // Calculate this week's signups (last 7 days)
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const weekSignups = signups?.filter(s => new Date(s.signup_date) >= lastWeek).length || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Signups Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Track user acquisition and platform growth.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Signups</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{totalSignups}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Today</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{todaySignups}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">This Week</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{weekSignups}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {signups?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No signups recorded yet.
                    </td>
                  </tr>
                )}
                {signups?.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">
                      {user.first_name || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        user.provider === 'google' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        user.provider === 'github' ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {user.provider || 'Email'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.signup_date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
