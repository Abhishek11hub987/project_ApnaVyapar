create extension if not exists pgcrypto;
-- 1. PROFILES TABLE
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text unique,
  email text,
  avatar_url text,
  city text,
  state text,
  education text,
  work_experience text,
  business_interest text,
  investment_budget text check (investment_budget in ('under-10k', '10k-50k', '50k-2l', '2l-10l', 'above-10l')),
  preferred_language text default 'english' check (preferred_language in ('english', 'hinglish')),
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- TRIGGER FOR AUTO PROFILE CREATION
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, phone)
  values (new.id, new.email, new.phone);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. BUSINESS IDEAS CATALOG
create table business_ideas (
  id serial primary key,
  title text not null,
  slug text unique not null,
  category text not null check (category in ('Food', 'Education', 'Technology', 'Services', 'Retail', 'Manufacturing', 'Agriculture', 'Health', 'Fashion', 'Transportation')),
  subcategory text,
  description text not null,
  investment_min integer not null,
  investment_max integer not null,
  location_type text not null check (location_type in ('home-based', 'physical-shop', 'online-only', 'hybrid')),
  time_commitment text check (time_commitment in ('part-time', 'full-time', 'flexible')),
  skill_level text check (skill_level in ('beginner', 'intermediate', 'advanced')),
  monthly_profit_min integer,
  monthly_profit_max integer,
  pros text[] default '{}',
  cons text[] default '{}',
  required_licenses text[] default '{}',
  required_skills text[] default '{}',
  real_example_name text,
  real_example_location text,
  real_example_description text,
  market_size_note text,
  competition_level text check (competition_level in ('low', 'medium', 'high')),
  image_url text,
  is_trending boolean default false,
  is_active boolean default true,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table business_ideas enable row level security;
create policy "Public can view active ideas" on business_ideas for select using (is_active = true);
create policy "Service role can manage ideas" on business_ideas for all using (false) with check (false);

create index idx_business_ideas_search on business_ideas using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));


-- 3. CHAT SESSIONS
create table chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  business_idea_id integer references business_ideas(id) on delete set null,
  title text,
  messages jsonb not null default '[]',
  message_count integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table chat_sessions enable row level security;
create policy "Users can CRUD own chat sessions" on chat_sessions for all using (auth.uid() = user_id);
create index idx_chat_sessions_user on chat_sessions(user_id, created_at desc);


-- 4. CHECKLISTS
create table checklists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  business_idea_id integer references business_ideas(id) on delete cascade,
  title text not null default 'My Launch Roadmap',
  overall_progress integer default 0 check (overall_progress between 0 and 100),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table checklists enable row level security;
create policy "Users can CRUD own checklists" on checklists for all using (auth.uid() = user_id);


-- 5. CHECKLIST TASKS
create table checklist_tasks (
  id uuid default gen_random_uuid() primary key,
  checklist_id uuid references checklists(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null check (category in ('Registration', 'Licenses', 'Finance', 'Location', 'Marketing', 'Operations', 'Hiring', 'Compliance')),
  status text default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date timestamp with time zone,
  resource_link text,
  resource_title text,
  estimated_time text,
  is_mandatory boolean default false,
  sort_order integer default 0,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table checklist_tasks enable row level security;
create policy "Users can CRUD own tasks" on checklist_tasks for all using (
  checklist_id in (select id from checklists where user_id = auth.uid())
);
create index idx_checklist_tasks_checklist on checklist_tasks(checklist_id, sort_order);


-- 6. GOVERNMENT SCHEMES
create table government_schemes (
  id serial primary key,
  name text not null,
  ministry text not null,
  category text not null check (category in ('Loan', 'Grant', 'Subsidy', 'Tax Benefit', 'Mentorship', 'Infrastructure')),
  description text not null,
  eligibility text not null,
  benefits text not null,
  max_amount text,
  interest_rate text,
  application_link text,
  documents_required text[] default '{}',
  applicable_states text[] default '{}',
  is_central_scheme boolean default true,
  is_active boolean default true,
  launch_date date,
  last_updated date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table government_schemes enable row level security;
create policy "Public can view active schemes" on government_schemes for select using (is_active = true);


-- 7. SAVED IDEAS (Bookmarks)
create table saved_ideas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  business_idea_id integer references business_ideas(id) on delete cascade not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, business_idea_id)
);

alter table saved_ideas enable row level security;
create policy "Users can CRUD own saved ideas" on saved_ideas for all using (auth.uid() = user_id);


-- 8. RESOURCE LOCATIONS
create table resource_locations (
  id serial primary key,
  name text not null,
  type text not null check (type in ('MSME-DI', 'DIC', 'Bank Branch', 'CSC', 'SEZ', 'Incubator', 'Co-working')),
  address text not null,
  city text not null,
  state text not null,
  pincode text,
  phone text,
  email text,
  website text,
  latitude numeric(10,8),
  longitude numeric(11,8),
  services text[] default '{}',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table resource_locations enable row level security;
create policy "Public can view resource locations" on resource_locations for select using (is_active = true);
create index idx_resource_locations_city on resource_locations(city, type);


-- =========================================================================================
-- SEED DATA (10 BUSINESS IDEAS)
-- =========================================================================================

insert into business_ideas (
  title, slug, category, description, investment_min, investment_max, location_type, 
  time_commitment, skill_level, monthly_profit_min, monthly_profit_max, pros, cons, 
  required_licenses, real_example_name, real_example_location, competition_level, is_trending
) values 
(
  'Home-Based Tiffin Service', 'home-tiffin-service', 'Food', 
  'Prepare and deliver home-cooked meals to working professionals and students in your area.', 
  15000, 50000, 'home-based', 'full-time', 'beginner', 25000, 60000, 
  ARRAY['Low startup cost', 'High demand in urban areas', 'Recurring revenue'], 
  ARRAY['Requires early morning preparation', 'FSSAI license mandatory', 'Logistics can be tough'], 
  ARRAY['FSSAI Basic Registration', 'GST (if turnover exceeds ₹20 lakh)'], 
  'Sharma Tiffin', 'Pune, Maharashtra', 'high', true
),
(
  'Tuition Center', 'tuition-center', 'Education', 
  'Start an after-school tutoring center for local students (classes 1-10) focusing on core subjects.', 
  20000, 100000, 'hybrid', 'part-time', 'intermediate', 30000, 80000, 
  ARRAY['High respect in community', 'Low overhead', 'Scalable by hiring more teachers'], 
  ARRAY['Seasonal income drops during vacations', 'High competition'], 
  ARRAY['Shop and Establishment Act Registration'], 
  'Saraswati Tutorials', 'Indore, MP', 'high', false
),
(
  'Digital Marketing Agency', 'digital-marketing-agency', 'Services', 
  'Provide SEO, social media management, and paid ads services to local small businesses.', 
  10000, 40000, 'online-only', 'flexible', 'advanced', 40000, 150000, 
  ARRAY['Location independent', 'High margins', 'Scalable globally'], 
  ARRAY['Requires constant upskilling', 'Client acquisition can be slow initially'], 
  ARRAY['GST Registration', 'Udyam Registration'], 
  'ClickSpark Media', 'Bangalore, Karnataka', 'medium', true
),
(
  'Mobile Repair Shop', 'mobile-repair-shop', 'Technology', 
  'Offer smartphone screen replacements, battery fixes, and software troubleshooting.', 
  50000, 150000, 'physical-shop', 'full-time', 'intermediate', 40000, 90000, 
  ARRAY['Constant demand', 'Good margins on spare parts'], 
  ARRAY['Requires specific technical training', 'Risk of damaging expensive devices'], 
  ARRAY['Shop and Establishment Act', 'GST Registration'], 
  'FixIt Mobile Solutions', 'Jaipur, Rajasthan', 'high', false
),
(
  'Handmade Jewelry Store', 'handmade-jewelry-store', 'Fashion', 
  'Design and sell custom terracotta, bead, or polymer clay jewelry online via Instagram/WhatsApp.', 
  5000, 25000, 'home-based', 'part-time', 'beginner', 15000, 40000, 
  ARRAY['Creative freedom', 'High markup', 'Work from home'], 
  ARRAY['Trendy and subjective', 'Marketing dependent'], 
  ARRAY['Udyam Registration'], 
  'Clay & Co Creations', 'Ahmedabad, Gujarat', 'medium', true
),
(
  'Organic Fertilizer Production', 'organic-fertilizer-production', 'Agriculture', 
  'Produce vermicompost or organic manure from organic waste and sell to local farmers and nurseries.', 
  40000, 150000, 'physical-shop', 'full-time', 'intermediate', 30000, 100000, 
  ARRAY['Eco-friendly', 'Government subsidies available', 'Growing organic market'], 
  ARRAY['Requires space/land', 'Strong smell/hygiene management needed'], 
  ARRAY['Pollution Control Board Clearance', 'Trade License'], 
  'GreenEarth Compost', 'Nashik, Maharashtra', 'low', true
),
(
  'Cloud Kitchen', 'cloud-kitchen', 'Food', 
  'Operate a delivery-only commercial kitchen specifically optimized for Swiggy/Zomato orders.', 
  100000, 300000, 'physical-shop', 'full-time', 'advanced', 50000, 200000, 
  ARRAY['Lower rent than dine-in', 'Can run multiple brands from one kitchen'], 
  ARRAY['Highly dependent on aggregator commissions', 'High marketing spend needed'], 
  ARRAY['FSSAI State License', 'Fire NOC', 'GST Registration', 'Trade License'], 
  'BiteBox Kitchens', 'Hyderabad, Telangana', 'high', true
),
(
  'Online Reselling Business', 'online-reselling-business', 'Retail', 
  'Buy wholesale goods (clothing, electronics) and resell them on platforms like Meesho or Amazon.', 
  20000, 80000, 'hybrid', 'part-time', 'beginner', 20000, 60000, 
  ARRAY['Low entry barrier', 'No manufacturing hassle', 'Flexible hours'], 
  ARRAY['Low profit margins per item', 'Inventory risk'], 
  ARRAY['GST Registration (Mandatory for e-commerce)'], 
  'Trendz Resell', 'Surat, Gujarat', 'high', false
),
(
  '3D Printing Services', '3d-printing-services', 'Manufacturing', 
  'Offer rapid prototyping and custom 3D printed parts for local engineering firms, students, and hobbyists.', 
  60000, 200000, 'hybrid', 'flexible', 'advanced', 35000, 120000, 
  ARRAY['Niche market with low local competition', 'High tech appeal'], 
  ARRAY['High initial equipment cost', 'Machine maintenance'], 
  ARRAY['Udyam Registration', 'GST Registration'], 
  'ProtoPrint 3D', 'Chennai, Tamil Nadu', 'low', true
),
(
  'Yoga/Fitness Coaching', 'yoga-fitness-coaching', 'Health', 
  'Provide online and offline personal training or group yoga sessions.', 
  5000, 30000, 'hybrid', 'flexible', 'intermediate', 25000, 80000, 
  ARRAY['Almost zero overhead cost', 'High personal satisfaction'], 
  ARRAY['Income tied directly to hours worked', 'Building initial client base is hard'], 
  ARRAY['Certification in Fitness/Yoga (Recommended)'], 
  'Arogya Yoga Studio', 'Rishikesh, Uttarakhand', 'medium', true
);
-- AUTO-UPDATE updated_at TRIGGER
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on profiles
  for each row execute procedure public.update_updated_at();
create trigger business_ideas_updated_at before update on business_ideas
  for each row execute procedure public.update_updated_at();
create trigger chat_sessions_updated_at before update on chat_sessions
  for each row execute procedure public.update_updated_at();
create trigger checklists_updated_at before update on checklists
  for each row execute procedure public.update_updated_at();
create trigger checklist_tasks_updated_at before update on checklist_tasks
  for each row execute procedure public.update_updated_at();