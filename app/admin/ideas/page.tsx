import { supabaseAdmin } from '@/lib/supabase/admin';
import ClientIdeasTable from './client-ideas-table';
import AdminIdeasHeader from './admin-ideas-header';

export const revalidate = 0;

export default async function AdminIdeasPage() {
  const { data: ideas, error } = await supabaseAdmin
    .from('business_ideas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 border border-red-100 rounded-2xl">
        Failed to load ideas: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-10">
      <AdminIdeasHeader />

      <ClientIdeasTable initialIdeas={ideas || []} />
    </div>
  );
}
