'use client';

import { useState } from 'react';
import { Trash2, ExternalLink, Lightbulb } from 'lucide-react';
import { deleteBusinessIdea } from '../actions';
import Link from 'next/link';

export default function ClientIdeasTable({ initialIdeas }: { initialIdeas: any[] }) {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this idea?')) return;
    
    setDeletingId(id);
    const result = await deleteBusinessIdea(id);
    
    if (result.success) {
      setIdeas(ideas.filter((idea: any) => idea.id !== id));
    } else {
      alert(`Failed to delete: ${result.error}`);
    }
    setDeletingId(null);
  };

  return (
    <div className="glass-panel border-gray-100/60 overflow-hidden shadow-sm mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider text-xs border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Idea Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Investment</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ideas.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-medium">
                  No business ideas found.
                </td>
              </tr>
            )}
            {ideas.map((idea: any) => (
              <tr key={idea.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-lg border border-purple-100">
                      {idea.icon ? idea.icon : <Lightbulb size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-accent-600 transition-colors line-clamp-1">{idea.title || 'Untitled Idea'}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5" title={idea.id}>
                        {String(idea.id).substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                    {idea.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-emerald-600 font-mono font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                    ₹{(idea.investment_min || 0).toLocaleString('en-IN')} - ₹{(idea.investment_max || 0).toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/ideas/${idea.slug || idea.id}`}
                      target="_blank"
                      className="p-2 rounded-xl text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors"
                      title="View Idea"
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      disabled={deletingId === idea.id}
                      className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                      title="Delete Idea"
                    >
                      <Trash2 size={16} />
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
