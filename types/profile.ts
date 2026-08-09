export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  city: string | null;
  state: string | null;
  education: string | null;
  work_experience: string | null;
  business_interest: string | null;
  investment_budget: 'under-10k' | '10k-50k' | '50k-2l' | '2l-10l' | 'above-10l' | null;
  preferred_language: 'english' | 'hinglish';
  role: 'user' | 'admin';
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};
