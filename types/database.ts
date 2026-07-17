export type Profile = {
  id: string; // uuid
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
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type BusinessIdea = {
  id: number;
  title: string;
  slug: string;
  category: 'Food' | 'Education' | 'Technology' | 'Services' | 'Retail' | 'Manufacturing' | 'Agriculture' | 'Health' | 'Fashion' | 'Transportation';
  subcategory: string | null;
  description: string;
  investment_min: number;
  investment_max: number;
  location_type: 'home-based' | 'physical-shop' | 'online-only' | 'hybrid';
  time_commitment: 'part-time' | 'full-time' | 'flexible' | null;
  skill_level: 'beginner' | 'intermediate' | 'advanced' | null;
  monthly_profit_min: number | null;
  monthly_profit_max: number | null;
  pros: string[];
  cons: string[];
  required_licenses: string[];
  required_skills: string[];
  real_example_name: string | null;
  real_example_location: string | null;
  real_example_description: string | null;
  market_size_note: string | null;
  competition_level: 'low' | 'medium' | 'high' | null;
  image_url: string | null;
  is_trending: boolean;
  is_active: boolean;
  view_count: number;
  market_analysis?: any;
  competition_strategy?: any;
  roadmap?: any;
  financial_projections?: any;
  resources_needed?: string[];
  risk_analysis?: any;
  success_stories?: any;
  created_at: string;
  updated_at: string;
};

export type ChatSession = {
  id: string; // uuid
  user_id: string; // uuid
  business_idea_id: number | null;
  title: string | null;
  messages: any[]; // Assuming JSON structure for roles and content
  message_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Checklist = {
  id: string;
  user_id: string;
  business_idea_id: number | null; // ← FIXED: was just `number`
  title: string;
  overall_progress: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
export type ChecklistTask = {
  id: string; // uuid
  checklist_id: string; // uuid
  title: string;
  description: string | null;
  category: 'Registration' | 'Licenses' | 'Finance' | 'Location' | 'Marketing' | 'Operations' | 'Hiring' | 'Compliance';
  status: 'not_started' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  resource_link: string | null;
  resource_title: string | null;
  estimated_time: string | null;
  is_mandatory: boolean;
  sort_order: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GovernmentScheme = {
  id: number;
  name: string;
  ministry: string;
  category: 'Loan' | 'Grant' | 'Subsidy' | 'Tax Benefit' | 'Mentorship' | 'Infrastructure';
  description: string;
  eligibility: string;
  benefits: string;
  max_amount: string | null;
  interest_rate: string | null;
  application_link: string | null;
  documents_required: string[];
  applicable_states: string[];
  is_central_scheme: boolean;
  is_active: boolean;
  launch_date: string | null;
  last_updated: string | null;
  created_at: string;
};

export type SavedIdea = {
  id: string; // uuid
  user_id: string; // uuid
  business_idea_id: number;
  note: string | null;
  created_at: string;
};

export type ResourceLocation = {
  id: number;
  name: string;
  type: 'MSME-DI' | 'DIC' | 'Bank Branch' | 'CSC' | 'SEZ' | 'Incubator' | 'Co-working';
  address: string;
  city: string;
  state: string;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  services: string[];
  is_active: boolean;
  created_at: string;
};
