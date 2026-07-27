import { supabaseAdmin } from '@/lib/supabase-admin';
import ClientIdeasTable from './client-ideas-table';

export const revalidate = 0;

export default async function AdminIdeasPage() {
  const { data: ideas, error } = await supabaseAdmin
    .from('business_ideas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-400 bg-red-400/10 border border-red-400/20 rounded-2xl">
        Failed to load ideas: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Ideas Management</h1>
          <p className="text-white/60 mt-1">Moderate the {ideas?.length || 0} business ideas currently in the catalog.</p>
        </div>
      </div>

      <ClientIdeasTable initialIdeas={ideas || []} />
    </div>
  );
}
