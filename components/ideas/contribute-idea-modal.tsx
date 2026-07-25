'use client';

import { useState } from 'react';
import { X, Sparkles, Loader2, Send, Lightbulb, CheckCircle } from 'lucide-react';

const CATEGORIES = [
  'Food', 'Education', 'Technology', 'Services', 'Retail',
  'Manufacturing', 'Agriculture', 'Health', 'Fashion', 'Transportation'
];

export default function ContributeIdeaModal({ isOpen, onClose, onSuccess }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Please provide both a title and description for your idea.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/ideas-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), category }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit idea');
      }

      setSuccess(true);
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setCategory('');
        setSuccess(false);
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-navy-light border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-white/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-emerald-400 to-cyan" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/20 to-emerald-500/20 border border-cyan/30 flex items-center justify-center">
                <Lightbulb size={20} className="text-cyan" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Contribute Your Idea</h2>
                <p className="text-white/40 text-xs">AI will research and create a detailed card</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <X size={16} className="text-white/50" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-90 duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Idea Published!</h3>
              <p className="text-white/50 text-sm text-center">Your business idea has been researched by AI and published to the community.</p>
            </div>
          ) : (
            <>
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Business Idea Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cloud Kitchen for Regional Indian Cuisine"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Brief Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your business idea briefly. What problem does it solve? Who is the target audience? The AI agent will research the rest..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all resize-none"
                  disabled={loading}
                />
              </div>

              {/* Category (optional) */}
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Category <span className="text-white/30 font-normal">(optional, AI will suggest if empty)</span></label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(category === cat ? '' : cat)}
                      disabled={loading}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        category === cat
                          ? 'bg-cyan/20 text-cyan border border-cyan/30'
                          : 'bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !title.trim() || !description.trim()}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-cyan to-emerald-500 text-navy-dark hover:shadow-neon-cyan hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    AI is researching your idea...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Let AI Research & Publish
                  </>
                )}
              </button>

              <p className="text-white/20 text-[11px] text-center leading-relaxed">
                Your idea will be enriched by AI with market analysis, investment estimates, and profit projections before being published.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
