'use client';

import { useState } from 'react';
import { Sparkles, X, Loader2, Plus } from 'lucide-react';
import { createBusinessIdea } from './../actions';

export default function AddIdeaModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || data.details || 'Failed to generate idea');
      
      setGeneratedIdea(data.idea);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedIdea) return;
    
    setIsPublishing(true);
    setError(null);
    try {
      const res = await createBusinessIdea(generatedIdea);
      if (!res.success) throw new Error(res.error);
      
      // Reset and close on success
      setPrompt('');
      setGeneratedIdea(null);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles size={20} className="text-accent-600" /> 
            Add New Idea with AI
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {!generatedIdea ? (
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">What's the business idea?</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Start a pet grooming service in Pune using a mobile van. Target rich neighborhoods."
                className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all resize-none shadow-sm text-gray-900 placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500">The AI will generate a complete business plan, financial projections, and categorize it for you.</p>
              
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 mt-4"
              >
                {isGenerating ? (
                  <><Loader2 size={18} className="animate-spin" /> Generating Plan...</>
                ) : (
                  <><Sparkles size={18} /> Generate with AI</>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-sm font-bold text-emerald-800 mb-1">AI Verification Successful</p>
                <p className="text-xs text-emerald-600">The AI has verified this concept and generated the following business plan structure.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Title</p>
                  <p className="font-bold text-gray-900">{generatedIdea.title}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Category</p>
                  <span className="inline-flex px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700">
                    {generatedIdea.category}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Investment Range</p>
                  <p className="font-bold text-emerald-600">
                    ₹{generatedIdea.investment_min?.toLocaleString('en-IN')} - ₹{generatedIdea.investment_max?.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="col-span-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Brief Description</p>
                  <p className="text-sm text-gray-700">{generatedIdea.description}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setGeneratedIdea(null)}
                  disabled={isPublishing}
                  className="flex-1 py-3.5 btn-secondary flex items-center justify-center"
                >
                  Discard & Try Again
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="flex-1 py-3.5 btn-primary flex items-center justify-center gap-2"
                >
                  {isPublishing ? (
                    <><Loader2 size={18} className="animate-spin" /> Publishing...</>
                  ) : (
                    <><Plus size={18} /> Publish to Catalog</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
