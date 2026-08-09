'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { BusinessIdea } from '@/types/idea';
import IdeaRoulette from '@/components/ideas/idea-roulette';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RoulettePage() {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    // Fetch all active curated ideas, shuffle them to give a random experience
    const { data } = await supabase
      .from('business_ideas')
      .select('*')
      .eq('is_active', true);
      
    if (data) {
      // Fisher-Yates shuffle
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setIdeas(shuffled);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 font-sans flex flex-col">
      {/* Header */}
      <div className="pt-6 pb-6 px-4 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/ideas" className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="text-accent-500" size={20} /> Idea Roulette
            </h1>
            <p className="text-xs text-gray-500">Swipe right to save, left to skip</p>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-md mx-auto px-4 pt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">Curating ideas for you...</p>
          </div>
        ) : (
          <IdeaRoulette ideas={ideas} />
        )}
      </div>
    </main>
  );
}
