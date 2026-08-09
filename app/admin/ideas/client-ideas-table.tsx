'use client';

import { useState } from 'react';
import { Trash2, ExternalLink, ShieldAlert } from 'lucide-react';
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
    <div className="glass-card rounded-2xl border-white/10 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-white/5 text-white/50 font-semibold uppercase tracking-wider text-xs border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Idea Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Investment</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ideas.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                  No business ideas found.
                </td>
              </tr>
            )}
            {ideas.map((idea: any) => (
              <tr key={idea.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg border border-purple-500/20">
                      {idea.icon || '💡'}
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-cyan transition-colors line-clamp-1">{idea.title}</p>
                      <p className="text-xs text-white/40 font-mono mt-0.5" title={idea.id}>
                        {idea.id.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 whitespace-nowrap">
                    {idea.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-emerald-400 font-mono font-medium">₹{idea.investment_min?.toLocaleString('en-IN')} - ₹{idea.investment_max?.toLocaleString('en-IN')}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/ideas/${idea.slug || idea.id}`}
                      target="_blank"
                      className="p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      title="View Idea"
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      disabled={deletingId === idea.id}
                      className="p-2 rounded-xl hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors disabled:opacity-50"
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
