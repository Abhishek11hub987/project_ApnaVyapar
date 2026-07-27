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

export type CommunityIdea = {
  id: number;
  user_id: string | null;
  title: string;
  description: string;
  category: string;
  investment_min: number;
  investment_max: number;
  location_type: string;
  monthly_profit_min: number | null;
  monthly_profit_max: number | null;
  time_commitment: string | null;
  skill_level: string | null;
  pros: string[];
  cons: string[];
  required_skills: string[];
  required_licenses: string[];
  real_example_name: string | null;
  real_example_location: string | null;
  real_example_description: string | null;
  image_url: string | null;
  slug: string | null;
  is_approved: boolean;
  ai_generated: boolean;
  contributor_name: string | null;
  market_analysis: any;
  competition_strategy: any;
  roadmap: any;
  financial_projections: any;
  resources_needed: string[];
  risk_analysis: any;
  success_stories: any;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export type PlatformMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  sku: string | null;
  image_url: string | null;
  status: 'active' | 'draft' | 'out_of_stock';
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  total_spent: number;
  total_orders: number;
  status: 'active' | 'inactive' | 'vip';
  created_at: string;
  updated_at: string;
};

export type StoreSettings = {
  id: string;
  user_id: string;
  store_name: string;
  slug: string;
  theme_color: string;
  logo_url: string | null;
  hero_text: string | null;
  support_email: string | null;
  support_phone: string | null;
  privacy_policy: string | null;
  terms_conditions: string | null;
  payment_instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  store_id: string;
  customer_id: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: any;
  shipping_address: string | null;
  idempotency_key: string | null;
  created_at: string;
};
