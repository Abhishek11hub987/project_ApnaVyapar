import { supabaseAdmin } from '@/lib/supabase/admin';
import ClientIdeasTable from './client-ideas-table';
import { Plus } from 'lucide-react';

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Ideas Management</h1>
          <p className="text-gray-500 mt-2 font-medium">Moderate the {ideas?.length || 0} business ideas currently in the catalog.</p>
        </div>
        <button className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 shadow-md hover:shadow-lg">
          <Plus size={18} /> Add New Idea
        </button>
      </div>

      <ClientIdeasTable initialIdeas={ideas || []} />
    </div>
  );
}
