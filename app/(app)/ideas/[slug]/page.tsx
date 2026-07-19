import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import IdeaDetailClient from '@/components/ideas/idea-detail-client';

export const revalidate = 60;

export default async function IdeaDetailPage({ params }: { params: { slug: string } }) {
  if (!/^[a-z0-9-]+$/.test(params.slug)) {
    notFound();
  }

  const { data: idea, error: fetchError } = await supabaseAdmin
    .from('business_ideas')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (fetchError || !idea) {
    notFound();
  }

  // Increment view count
  await supabaseAdmin
    .from('business_ideas')
    .update({ view_count: (idea.view_count || 0) + 1 })
    .eq('id', idea.id);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  // NULL-SAFE: Fallback to empty arrays/strings
  const pros = idea.pros || [];
  const cons = idea.cons || [];
  const requiredLicenses = idea.required_licenses || [];
  const locationType = idea.location_type || '';
  const timeCommitment = idea.time_commitment || 'Flexible';
  const skillLevel = idea.skill_level || 'Beginner';

  return <IdeaDetailClient idea={idea} />;
}