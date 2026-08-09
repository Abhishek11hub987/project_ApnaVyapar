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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-xl animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-gray-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Lightbulb size={20} className="text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Contribute Your Idea</h2>
                <p className="text-gray-500 text-xs">AI will research and create a detailed card</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-90 duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Idea Published!</h3>
              <p className="text-gray-500 text-sm text-center">Your business idea has been researched by AI and published to the community.</p>
            </div>
          ) : (
            <>
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Idea Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cloud Kitchen for Regional Indian Cuisine"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brief Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your business idea briefly. What problem does it solve? Who is the target audience? The AI agent will research the rest..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                  disabled={loading}
                />
              </div>

              {/* Category (optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-gray-400 font-normal">(optional, AI will suggest if empty)</span></label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(category === cat ? '' : cat)}
                      disabled={loading}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        category === cat
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !title.trim() || !description.trim()}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-900 text-white hover:bg-gray-800"
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

              <p className="text-gray-500 text-[11px] text-center leading-relaxed">
                Your idea will be enriched by AI with market analysis, investment estimates, and profit projections before being published.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
