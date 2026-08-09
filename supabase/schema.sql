-- ============================================================================
-- APNA VYAPAR — Complete Database Schema
-- Drop & recreate everything (run in Supabase SQL Editor)
-- WARNING: This DELETES all existing data.
-- ============================================================================

-- 0. DROP EVERYTHING FIRST
drop table if exists rate_limits cascade;
drop table if exists orders cascade;
drop table if exists store_settings cascade;
drop table if exists customers cascade;
drop table if exists products cascade;
drop table if exists platform_messages cascade;
drop table if exists signup_analytics cascade;
drop table if exists resource_locations cascade;
drop table if exists saved_ideas cascade;
drop table if exists government_schemes cascade;
drop table if exists checklist_tasks cascade;
drop table if exists checklists cascade;
drop table if exists chat_sessions cascade;
drop table if exists community_ideas cascade;
drop table if exists business_ideas cascade;
drop table if exists profiles cascade;
drop function if exists process_checkout cascade;
drop function if exists handle_new_user cascade;
drop function if exists update_updated_at cascade;
drop function if exists prevent_role_modification cascade;

-- 1. EXTENSIONS
create extension if not exists pgcrypto;

-- ============================================================================
-- 1. PROFILES
-- ============================================================================
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
  role text default 'user' check (role in ('user', 'admin')),
  onboarding_completed boolean default false,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 2. BUSINESS IDEAS (curated catalog)
-- ============================================================================
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
  real_example_url text,
  market_size_note text,
  competition_level text check (competition_level in ('low', 'medium', 'high')),
  image_url text,
  is_trending boolean default false,
  is_active boolean default true,
  view_count integer default 0,
  market_analysis jsonb default '{}'::jsonb,
  competition_strategy jsonb default '{}'::jsonb,
  roadmap jsonb default '{}'::jsonb,
  financial_projections jsonb default '{}'::jsonb,
  resources_needed text[] default '{}',
  risk_analysis jsonb default '[]'::jsonb,
  success_stories jsonb default '[]'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 3. COMMUNITY IDEAS (user-contributed + auto-agent)
-- ============================================================================
create table community_ideas (
  id serial primary key,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text not null,
  category text not null default 'Services',
  investment_min integer default 0,
  investment_max integer default 0,
  location_type text default 'hybrid',
  monthly_profit_min integer,
  monthly_profit_max integer,
  time_commitment text check (time_commitment in ('part-time', 'full-time', 'flexible')),
  skill_level text check (skill_level in ('beginner', 'intermediate', 'advanced')),
  pros text[] default '{}',
  cons text[] default '{}',
  required_skills text[] default '{}',
  required_licenses text[] default '{}',
  real_example_name text,
  real_example_location text,
  real_example_description text,
  real_example_url text,
  image_url text,
  slug text unique,
  is_approved boolean default true,
  ai_generated boolean default false,
  contributor_name text,
  market_analysis jsonb,
  competition_strategy jsonb,
  roadmap jsonb,
  financial_projections jsonb,
  resources_needed text[],
  risk_analysis jsonb,
  success_stories jsonb,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 4. CHAT SESSIONS
-- ============================================================================
create table chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  business_idea_id integer references business_ideas(id) on delete set null,
  title text,
  messages jsonb not null default '[]',
  message_count integer default 0,
  is_active boolean default true,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 5. CHECKLISTS
-- ============================================================================
create table checklists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  business_idea_id integer references business_ideas(id) on delete cascade,
  title text not null default 'My Launch Roadmap',
  overall_progress integer default 0 check (overall_progress between 0 and 100),
  is_active boolean default true,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 6. CHECKLIST TASKS
-- ============================================================================
create table checklist_tasks (
  id uuid default gen_random_uuid() primary key,
  checklist_id uuid references checklists(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null check (category in ('Registration', 'Licenses', 'Finance', 'Location', 'Marketing', 'Operations', 'Hiring', 'Compliance')),
  status text default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date timestamptz,
  resource_link text,
  resource_title text,
  estimated_time text,
  is_mandatory boolean default false,
  sort_order integer default 0,
  completed_at timestamptz,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 7. GOVERNMENT SCHEMES
-- ============================================================================
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
  created_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 8. SAVED IDEAS (bookmarks)
-- ============================================================================
create table saved_ideas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  business_idea_id integer references business_ideas(id) on delete cascade not null,
  note text,
  created_at timestamptz default timezone('utc'::text, now()),
  unique(user_id, business_idea_id)
);

-- ============================================================================
-- 9. RESOURCE LOCATIONS
-- ============================================================================
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
  created_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 10. SIGNUP ANALYTICS
-- ============================================================================
create table signup_analytics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  email text,
  provider text check (provider in ('email', 'google', 'github')),
  signup_date timestamptz default timezone('utc'::text, now()),
  first_name text,
  city text,
  is_first_time boolean default true
);

-- ============================================================================
-- 11. PLATFORM MESSAGES (contact form)
-- ============================================================================
create table platform_messages (
  id serial primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 12. PRODUCTS (inventory)
-- ============================================================================
create table products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  description text,
  price numeric(10,2) not null,
  stock_quantity integer default 0,
  sku text,
  image_url text,
  status text default 'active' check (status in ('active', 'draft', 'out_of_stock')),
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 13. CUSTOMERS (CRM)
-- ============================================================================
create table customers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  email text,
  phone text,
  total_spent numeric(10,2) default 0,
  total_orders integer default 0,
  status text default 'active' check (status in ('active', 'inactive', 'vip')),
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 14. STORE SETTINGS
-- ============================================================================
create table store_settings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null unique,
  store_name text not null,
  slug text unique not null,
  theme_color text default '#475569',
  logo_url text,
  hero_text text,
  support_email text,
  support_phone text,
  privacy_policy text,
  terms_conditions text,
  payment_instructions text,
  is_active boolean default true,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 15. ORDERS
-- ============================================================================
create table orders (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references store_settings(id) on delete cascade not null,
  customer_id uuid references customers(id) on delete set null,
  total_amount numeric(10,2) not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  items jsonb default '[]'::jsonb,
  shipping_address text,
  idempotency_key text unique,
  created_at timestamptz default timezone('utc'::text, now())
);

-- ============================================================================
-- 16. RATE LIMITS
-- ============================================================================
create table rate_limits (
  user_id uuid primary key,
  count integer not null default 1,
  reset_at timestamptz not null,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
create index idx_business_ideas_search on business_ideas using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));
create index idx_community_ideas_category on community_ideas(category);
create index idx_community_ideas_created on community_ideas(created_at desc);
create index idx_community_ideas_approved on community_ideas(is_approved);
create index idx_chat_sessions_user on chat_sessions(user_id, created_at desc);
create index idx_checklist_tasks_checklist on checklist_tasks(checklist_id, sort_order);
create index idx_resource_locations_city on resource_locations(city, type);
create index idx_orders_idempotency on orders(idempotency_key);
create index idx_rate_limits_reset on rate_limits(reset_at);

-- ============================================================================
-- TRIGGER: AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================================
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

-- ============================================================================
-- TRIGGER: AUTO-UPDATE updated_at
-- ============================================================================
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
create trigger community_ideas_updated_at before update on community_ideas
  for each row execute procedure public.update_updated_at();
create trigger chat_sessions_updated_at before update on chat_sessions
  for each row execute procedure public.update_updated_at();
create trigger checklists_updated_at before update on checklists
  for each row execute procedure public.update_updated_at();
create trigger checklist_tasks_updated_at before update on checklist_tasks
  for each row execute procedure public.update_updated_at();
create trigger products_updated_at before update on products
  for each row execute procedure public.update_updated_at();
create trigger customers_updated_at before update on customers
  for each row execute procedure public.update_updated_at();
create trigger store_settings_updated_at before update on store_settings
  for each row execute procedure public.update_updated_at();

-- ============================================================================
-- TRIGGER: PREVENT ROLE MODIFICATION FROM CLIENT
-- ============================================================================
create or replace function prevent_role_modification()
returns trigger as $$
begin
  if auth.role() = 'authenticated' then
    new.role = old.role;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists enforce_role_security on profiles;
create trigger enforce_role_security
  before update on profiles
  for each row execute function prevent_role_modification();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- 1. PROFILES
alter table profiles enable row level security;
drop policy if exists "User own profile" on profiles;
create policy "User own profile" on profiles
  for select using (auth.uid() = id);
drop policy if exists "Admin read all profiles" on profiles;
create policy "Admin read all profiles" on profiles
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);
drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- 2. BUSINESS IDEAS
alter table business_ideas enable row level security;
drop policy if exists "Public can view active ideas" on business_ideas;
create policy "Public can view active ideas" on business_ideas
  for select using (is_active = true);

-- 3. COMMUNITY IDEAS
alter table community_ideas enable row level security;
drop policy if exists "Anyone can view approved community ideas" on community_ideas;
create policy "Anyone can view approved community ideas" on community_ideas
  for select using (is_approved = true);
drop policy if exists "Authenticated users can insert community ideas" on community_ideas;
create policy "Authenticated users can insert community ideas" on community_ideas
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users can update their own community ideas" on community_ideas;
create policy "Users can update their own community ideas" on community_ideas
  for update to authenticated using (auth.uid() = user_id);

-- 4. CHAT SESSIONS
alter table chat_sessions enable row level security;
drop policy if exists "Users can CRUD own chat sessions" on chat_sessions;
create policy "Users can CRUD own chat sessions" on chat_sessions
  for all using (auth.uid() = user_id);

-- 5. CHECKLISTS
alter table checklists enable row level security;
drop policy if exists "Users can CRUD own checklists" on checklists;
create policy "Users can CRUD own checklists" on checklists
  for all using (auth.uid() = user_id);

-- 6. CHECKLIST TASKS
alter table checklist_tasks enable row level security;
drop policy if exists "Users can CRUD own tasks" on checklist_tasks;
create policy "Users can CRUD own tasks" on checklist_tasks
  for all using (
    checklist_id in (select id from checklists where user_id = auth.uid())
  );

-- 7. GOVERNMENT SCHEMES
alter table government_schemes enable row level security;
drop policy if exists "Public can view active schemes" on government_schemes;
create policy "Public can view active schemes" on government_schemes
  for select using (is_active = true);

-- 8. SAVED IDEAS
alter table saved_ideas enable row level security;
drop policy if exists "Users can CRUD own saved ideas" on saved_ideas;
create policy "Users can CRUD own saved ideas" on saved_ideas
  for all using (auth.uid() = user_id);

-- 9. RESOURCE LOCATIONS
alter table resource_locations enable row level security;
drop policy if exists "Public can view resource locations" on resource_locations;
create policy "Public can view resource locations" on resource_locations
  for select using (is_active = true);

-- 10. SIGNUP ANALYTICS
alter table signup_analytics enable row level security;
drop policy if exists "Admin read signup analytics" on signup_analytics;
create policy "Admin read signup analytics" on signup_analytics
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 11. PLATFORM MESSAGES
alter table platform_messages enable row level security;
drop policy if exists "Anyone can insert platform messages" on platform_messages;
create policy "Anyone can insert platform messages" on platform_messages
  for insert with check (true);
drop policy if exists "Admins can view messages" on platform_messages;
create policy "Admins can view messages" on platform_messages
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
drop policy if exists "Admins can update messages" on platform_messages;
create policy "Admins can update messages" on platform_messages
  for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 12. PRODUCTS
alter table products enable row level security;
drop policy if exists "Users can CRUD own products" on products;
create policy "Users can CRUD own products" on products
  for all using (auth.uid() = user_id);

-- 13. CUSTOMERS
alter table customers enable row level security;
drop policy if exists "Users can CRUD own customers" on customers;
create policy "Users can CRUD own customers" on customers
  for all using (auth.uid() = user_id);

-- 14. STORE SETTINGS
alter table store_settings enable row level security;
drop policy if exists "Users can CRUD own store" on store_settings;
create policy "Users can CRUD own store" on store_settings
  for all using (auth.uid() = user_id);
drop policy if exists "Public can view active stores" on store_settings;
create policy "Public can view active stores" on store_settings
  for select using (is_active = true);

-- 15. ORDERS
alter table orders enable row level security;
drop policy if exists "Users can CRUD own orders" on orders;
create policy "Users can CRUD own orders" on orders
  for all using (
    store_id in (select id from store_settings where user_id = auth.uid())
  );

-- ============================================================================
-- CHECKOUT ATOMIC RPC
-- ============================================================================
create or replace function process_checkout(
  p_store_id uuid,
  p_customer_id uuid,
  p_total_amount numeric,
  p_shipping_address text,
  p_items jsonb,
  p_idempotency_key text
) returns jsonb
language plpgsql security definer
as $$
declare
  v_order_id uuid;
  v_item jsonb;
  v_product_stock int;
begin
  -- Check idempotency
  select id into v_order_id from orders where idempotency_key = p_idempotency_key limit 1;
  if found then
    return jsonb_build_object('order_id', v_order_id, 'duplicate', true);
  end if;

  -- Deduct stock for each item
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select stock_quantity into v_product_stock
    from products where id = (v_item->'product'->>'id')::uuid;
    if not found then
      return jsonb_build_object('error', 'Product not found');
    end if;
    if v_product_stock < (v_item->>'quantity')::int then
      return jsonb_build_object('error', 'Insufficient stock');
    end if;
    update products
      set stock_quantity = stock_quantity - (v_item->>'quantity')::int
      where id = (v_item->'product'->>'id')::uuid;
  end loop;

  insert into orders (store_id, customer_id, total_amount, status, shipping_address, items, idempotency_key)
  values (p_store_id, p_customer_id, p_total_amount, 'pending', p_shipping_address, p_items, p_idempotency_key)
  returning id into v_order_id;

  return jsonb_build_object('order_id', v_order_id, 'duplicate', false);
end;
$$;

-- ============================================================================
-- SEED DATA: 10 BUSINESS IDEAS
-- ============================================================================
insert into business_ideas (title, slug, category, description, investment_min, investment_max, location_type, time_commitment, skill_level, monthly_profit_min, monthly_profit_max, pros, cons, required_licenses, real_example_name, real_example_location, competition_level, is_trending, market_analysis, competition_strategy, roadmap, financial_projections, resources_needed, risk_analysis, success_stories) values
('Home-Based Tiffin Service', 'home-tiffin-service', 'Food', 'Prepare and deliver home-cooked meals to working professionals and students in your area.', 15000, 50000, 'home-based', 'full-time', 'beginner', 25000, 60000, array['Low startup cost', 'High demand in urban areas', 'Recurring revenue'], array['Requires early morning preparation', 'FSSAI license mandatory', 'Logistics can be tough'], array['FSSAI Basic Registration', 'GST (if turnover exceeds ₹20 lakh)'], 'Sharma Tiffin', 'Pune, Maharashtra', 'high', true, '{"marketSize":"₹500 Crore+ urban market","targetAudience":"Bachelors, corporate employees, students living away from home.","growthTrends":"15% YoY growth due to rising health consciousness."}', '{"localCompetitors":"Local dhabas, Swiggy/Zomato, other home chefs.","differentiation":"Focus on extreme hygiene, zero artificial colors, and customizable diet plans (keto, low carb)."}', '{"week1":"Get FSSAI license, buy containers and bulk groceries, finalize menu.","week2":"Distribute flyers in nearby corporate parks/PGs, start WhatsApp marketing.","month1":"Reach 20 daily subscribers, optimize delivery routes.","month3":"Reach 50+ subscribers, hire a part-time delivery person."}', '{"breakEven":"Month 2 (assuming 15 regular subscribers)","monthlyPnL":"Revenue: ₹45,000 (15 subs x ₹3000), Costs: ₹20,000, Profit: ₹25,000"}', array['Commercial gas stove', 'Large utensils', 'Disposable/reusable delivery containers', 'Two-wheeler for delivery'], '[{"risk":"Food spoilage or contamination","mitigation":"Strict daily hygiene protocol, fresh sourcing."},{"risk":"Delivery delays","mitigation":"Hire dedicated reliable delivery staff or partner with local delivery services."}]', '[{"name":"Maa Ki Rasoi","description":"Started from a 1BHK in Bangalore, now serves 300+ corporate meals daily."}]'),
('Tuition Center', 'tuition-center', 'Education', 'Start an after-school tutoring center for local students (classes 1-10) focusing on core subjects.', 20000, 100000, 'hybrid', 'part-time', 'intermediate', 30000, 80000, array['High respect in community', 'Low overhead', 'Scalable by hiring more teachers'], array['Seasonal income drops during vacations', 'High competition'], array['Shop and Establishment Act Registration'], 'Saraswati Tutorials', 'Indore, MP', 'high', false, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Digital Marketing Agency', 'digital-marketing-agency', 'Services', 'Provide SEO, social media management, and paid ads services to local small businesses.', 10000, 40000, 'online-only', 'flexible', 'advanced', 40000, 150000, array['Location independent', 'High margins', 'Scalable globally'], array['Requires constant upskilling', 'Client acquisition can be slow initially'], array['GST Registration', 'Udyam Registration'], 'ClickSpark Media', 'Bangalore, Karnataka', 'medium', true, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Mobile Repair Shop', 'mobile-repair-shop', 'Technology', 'Offer smartphone screen replacements, battery fixes, and software troubleshooting.', 50000, 150000, 'physical-shop', 'full-time', 'intermediate', 40000, 90000, array['Constant demand', 'Good margins on spare parts'], array['Requires specific technical training', 'Risk of damaging expensive devices'], array['Shop and Establishment Act', 'GST Registration'], 'FixIt Mobile Solutions', 'Jaipur, Rajasthan', 'high', false, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Handmade Jewelry Store', 'handmade-jewelry-store', 'Fashion', 'Design and sell custom terracotta, bead, or polymer clay jewelry online via Instagram/WhatsApp.', 5000, 25000, 'home-based', 'part-time', 'beginner', 15000, 40000, array['Creative freedom', 'High markup', 'Work from home'], array['Trendy and subjective', 'Marketing dependent'], array['Udyam Registration'], 'Clay & Co Creations', 'Ahmedabad, Gujarat', 'medium', true, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Organic Fertilizer Production', 'organic-fertilizer-production', 'Agriculture', 'Produce vermicompost or organic manure from organic waste and sell to local farmers and nurseries.', 40000, 150000, 'physical-shop', 'full-time', 'intermediate', 30000, 100000, array['Eco-friendly', 'Government subsidies available', 'Growing organic market'], array['Requires space/land', 'Strong smell/hygiene management needed'], array['Pollution Control Board Clearance', 'Trade License'], 'GreenEarth Compost', 'Nashik, Maharashtra', 'low', true, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Cloud Kitchen', 'cloud-kitchen', 'Food', 'Operate a delivery-only commercial kitchen specifically optimized for Swiggy/Zomato orders.', 100000, 300000, 'physical-shop', 'full-time', 'advanced', 50000, 200000, array['Lower rent than dine-in', 'Can run multiple brands from one kitchen'], array['Highly dependent on aggregator commissions', 'High marketing spend needed'], array['FSSAI State License', 'Fire NOC', 'GST Registration', 'Trade License'], 'BiteBox Kitchens', 'Hyderabad, Telangana', 'high', true, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Online Reselling Business', 'online-reselling-business', 'Retail', 'Buy wholesale goods (clothing, electronics) and resell them on platforms like Meesho or Amazon.', 20000, 80000, 'hybrid', 'part-time', 'beginner', 20000, 60000, array['Low entry barrier', 'No manufacturing hassle', 'Flexible hours'], array['Low profit margins per item', 'Inventory risk'], array['GST Registration (Mandatory for e-commerce)'], 'Trendz Resell', 'Surat, Gujarat', 'high', false, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('3D Printing Services', '3d-printing-services', 'Manufacturing', 'Offer rapid prototyping and custom 3D printed parts for local engineering firms, students, and hobbyists.', 60000, 200000, 'hybrid', 'flexible', 'advanced', 35000, 120000, array['Niche market with low local competition', 'High tech appeal'], array['High initial equipment cost', 'Machine maintenance'], array['Udyam Registration', 'GST Registration'], 'ProtoPrint 3D', 'Chennai, Tamil Nadu', 'low', true, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb),
('Yoga/Fitness Coaching', 'yoga-fitness-coaching', 'Health', 'Provide online and offline personal training or group yoga sessions.', 5000, 30000, 'hybrid', 'flexible', 'intermediate', 25000, 80000, array['Almost zero overhead cost', 'High personal satisfaction'], array['Income tied directly to hours worked', 'Building initial client base is hard'], array['Certification in Fitness/Yoga (Recommended)'], 'Arogya Yoga Studio', 'Rishikesh, Uttarakhand', 'medium', true, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, '{}'::jsonb, array[]::text[], '[]'::jsonb, '[]'::jsonb);

-- ============================================================================
-- SEED DATA: GOVERNMENT SCHEMES
-- ============================================================================
insert into government_schemes (name, ministry, category, description, eligibility, benefits, max_amount, interest_rate, application_link, is_active) values
('Pradhan Mantri Mudra Yojana', 'Ministry of Finance', 'Loan', 'Collateral-free loans for micro enterprises', 'Non-farm micro enterprises, age 18+', 'Loans up to ₹10 lakh without collateral', '₹10,00,000', '8% - 12%', 'https://www.mudra.org.in', true),
('Startup India Seed Fund', 'DPIIT', 'Grant', 'Financial assistance to startups for proof of concept', 'DPIIT-recognized startups', 'Grants up to ₹1 crore', '₹1,00,00,000', null, 'https://seedfund.startupindia.gov.in', true),
('CGTMSE', 'Ministry of MSME', 'Loan', 'Credit Guarantee for MSME loans', 'All MSMEs', 'Collateral-free loans up to ₹1 crore', '₹1,00,00,000', null, 'https://cgtmse.in', true),
('Stand-Up India', 'SIDBI', 'Loan', 'Loans for SC/ST and women entrepreneurs', 'SC/ST or women, age 18+', 'Loans ₹10 lakh - ₹1 crore', '₹1,00,00,000', 'Base rate + 3%', 'https://www.standupmitra.in', true),
('Udyam Registration', 'Ministry of MSME', 'Tax Benefit', 'Free MSME registration', 'All MSMEs', 'Subsidies, tax exemptions, priority lending', null, null, 'https://udyamregistration.gov.in', true);

-- ============================================================================
-- SEED DATA: RESOURCE LOCATIONS
-- ============================================================================
insert into resource_locations (name, type, address, city, state, pincode, phone, email, website, latitude, longitude, services) values
('MSME Development Institute, New Delhi', 'MSME-DI', 'Okhla Industrial Estate, New Delhi', 'New Delhi', 'Delhi', '110020', '011-26838068', 'dcdi-ndelhi@dcmsme.gov.in', 'https://msmedi-newdelhi.gov.in', 28.5492, 77.2736, array['Udyam Registration Assistance', 'Scheme Consultation', 'Export Guidance']),
('District Industries Centre (DIC) - North Delhi', 'DIC', 'GT Karnal Road, Industrial Area, New Delhi', 'New Delhi', 'Delhi', '110033', '011-27694464', 'dic-north@nic.in', null, 28.7188, 77.1656, array['PMEGP Loan Approval', 'Subsidies']),
('FSSAI Northern Regional Office', 'MSME-DI', 'FDA Bhawan, Kotla Road, New Delhi', 'New Delhi', 'Delhi', '110002', '1800112100', 'fssai-nr@fssai.gov.in', 'https://fssai.gov.in', 28.6321, 77.2372, array['Food Licenses', 'Hygiene Audits']),
('State Bank of India (SME Branch)', 'Bank Branch', 'Connaught Place, New Delhi', 'New Delhi', 'Delhi', '110001', '011-23456789', 'sme.cp@sbi.co.in', null, 28.6315, 77.2167, array['Mudra Loans', 'CGTMSE Loans', 'Business Accounts']),
('MSME Development Institute, Mumbai', 'MSME-DI', 'Kurla Andheri Road, Sakinaka, Mumbai', 'Mumbai', 'Maharashtra', '400072', '022-28570535', 'dcdi-mumbai@dcmsme.gov.in', 'https://msmedimumbai.gov.in', 19.1009, 72.8885, array['Startup India Assistance', 'Technology Upgradation']),
('District Industries Centre (DIC) - Mumbai', 'DIC', 'Bandra Kurla Complex, Mumbai', 'Mumbai', 'Maharashtra', '400051', '022-26590001', 'dic-mumbai@nic.in', null, 19.0653, 72.8659, array['Industrial Permissions', 'State Subsidies']),
('Startup Incubator - T-Hub', 'Incubator', 'Knowledge City, Madhapur, Hyderabad', 'Hyderabad', 'Telangana', '500081', '040-45678901', 'info@t-hub.co', 'https://t-hub.co', 17.4399, 78.3800, array['Mentorship', 'Funding Connections', 'Office Space']),
('Common Service Centre (CSC) - HSR Layout', 'CSC', '27th Main, Sector 1, HSR Layout, Bangalore', 'Bangalore', 'Karnataka', '560102', '080-12345678', null, null, 12.9121, 77.6446, array['Aadhaar Updates', 'GST Filing', 'Trade License']);
