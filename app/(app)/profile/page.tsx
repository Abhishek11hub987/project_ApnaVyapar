'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { BusinessIdea } from '@/types/database';

// Import our new modular components
import ProfileHeader from '@/components/profile/profile-header';
import StatsGrid from '@/components/profile/stats-grid';
import ActivityTimeline from '@/components/profile/activity-timeline';
import LikedIdeas from '@/components/profile/liked-ideas';
import SettingsPanel from '@/components/profile/settings-panel';
import EditProfileModal from '@/components/profile/edit-profile-modal';

import RecommendedIdeas from '@/components/profile/recommended-ideas';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout, initialize } = useAuth();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({ chats: 0, checklists: 0, ideas: 12, locations: 3 });
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>([]);
  const [recommendedIdeas, setRecommendedIdeas] = useState<BusinessIdea[]>([]);

  useEffect(() => {
    setMounted(true);
    if (!authLoading) initialize();
  }, []);

  const fetchProfileData = async () => {
    if (!user) return;
    
    // Fetch user stats
    const [{ count: chatsCount }, { count: checkCount }] = await Promise.all([
      supabase.from('chat_sessions').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('checklists').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
    ]);
    setStats(prev => ({ ...prev, chats: chatsCount || 0, checklists: checkCount || 0 }));

    // Fetch saved ideas
    const { data: savedData } = await supabase
      .from('saved_ideas')
      .select(`business_ideas (*)`)
      .eq('user_id', user.id);
    
    if (savedData) {
      setSavedIdeas(savedData.map((d: any) => d.business_ideas));
    }

    // Fetch all ideas for recommendations
    const { data: allIdeas } = await supabase.from('business_ideas').select('*').eq('is_active', true);
    if (allIdeas) {
      const { getRecommendedIdeas } = await import('@/lib/recommendations');
      setRecommendedIdeas(getRecommendedIdeas(allIdeas, user));
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !user) {
      router.push('/?login=true');
      return;
    }
    fetchProfileData();
  }, [user, isAuthenticated, authLoading]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!mounted || authLoading || !user) return null;

  return (
    <main className="min-h-screen bg-transparent pb-24 font-sans pt-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* 1. Profile Header (Full Width) */}
        <ProfileHeader user={user} onEditClick={() => setIsEditing(true)} />
        
        {/* Desktop: 2-column layout for Stats & Timeline. Mobile: Stack vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. Stats Grid (Left Column on Desktop) */}
          <div className="lg:col-span-4 h-full">
            <StatsGrid stats={stats} />
          </div>
          
          {/* 3. Activity Timeline (Right Column on Desktop) */}
          <div className="lg:col-span-8">
            <ActivityTimeline />
          </div>
          
        </div>

        {/* 4. Liked Business Ideas (Full Width) */}
        <LikedIdeas ideas={savedIdeas} />

        {/* 6. Recommended For You */}
        {recommendedIdeas.length > 0 && (
          <RecommendedIdeas ideas={recommendedIdeas} />
        )}

        {/* 5. Settings Panel (Full Width) */}
        <SettingsPanel onLogout={handleLogout} />

      </div>

      {/* Modals */}
      <EditProfileModal 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
        user={user} 
        onProfileUpdated={() => {
          initialize(); // Refresh user context from Auth
          fetchProfileData(); // Re-fetch any dependent data
        }} 
      />
    </main>
  );
}
