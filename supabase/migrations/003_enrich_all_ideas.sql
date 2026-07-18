-- ==============================================================================
-- PART 1: UPDATE EXISTING IDEAS
-- ==============================================================================

-- 1. Home Tiffin Service
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  market_analysis = '{"market_size": "₹20,000 Crores", "target_audience": "Working professionals, students, elderly", "growth_trends": "15% YoY growth due to urbanization", "demand_india": "Extremely high in Tier 1 and Tier 2 cities"}',
  competition_strategy = '{"competitors": ["Local dhabas", "Swiggy/Zomato daily meals", "Other home chefs"], "differentiation": "Authentic home taste, high hygiene standards, customizable meal plans", "pricing_strategy": "Value-based subscription (₹2000-₹3000/month)"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Menu planning", "FSSAI registration", "Sourcing packaging"]}, {"phase": "Week 2", "tasks": ["Trial cooking", "Social media setup", "WhatsApp group creation"]}, {"phase": "Month 1", "tasks": ["Distribute flyers in nearby offices/PGs", "Onboard first 10 customers", "Optimize delivery route"]}, {"phase": "Month 3", "tasks": ["Reach 50+ subscribers", "Hire delivery boy", "Introduce special weekend menus"]}]',
  financial_projections = '{"break_even": "2 months", "monthly_revenue": "₹60,000 (at 30 subscribers)", "monthly_costs": "₹35,000", "profit_margin": "40%"}',
  resources_needed = '{"Commercial utensils", "Food-grade packaging", "FSSAI Basic License", "Delivery vehicle/partner"}',
  risk_analysis = '[{"risk": "Inconsistent food quality", "mitigation": "Standardize recipes and spice measurements"}, {"risk": "Delivery delays", "mitigation": "Partner with reliable local delivery agents or hire dedicated staff"}, {"risk": "Customer churn", "mitigation": "Rotate menu weekly to avoid taste fatigue"}]',
  success_stories = '[{"name": "Sneha Reddy", "city": "Hyderabad", "story": "Started delivering 5 meals a day to nearby PGs. Within a year, she now runs a 100-meal operation generating ₹1L profit monthly."}, {"name": "Anita Sharma", "city": "Pune", "story": "Focused exclusively on healthy millet-based tiffins for gym-goers, creating a highly profitable niche."}]'
WHERE slug = 'home-tiffin-service';

-- 2. Cloud Kitchen
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  market_analysis = '{"market_size": "₹50,000 Crores", "target_audience": "Gen Z, Millennials, late-night workers", "growth_trends": "Massive post-COVID surge, projected 24% CAGR", "demand_india": "High in metros, growing fast in Tier 2"}',
  competition_strategy = '{"competitors": ["Established QSRs", "Other cloud kitchens", "Street food vendors"], "differentiation": "Niche cuisine (e.g., authentic Korean, healthy keto), quirky branding, eco-friendly packaging", "pricing_strategy": "Competitive initial pricing to gain reviews, then premium pricing based on quality"}',
  roadmap = '[{"phase": "Week 1-2", "tasks": ["Finalize niche concept", "FSSAI & GST registration", "Find commercial space"]}, {"phase": "Week 3-4", "tasks": ["Setup kitchen equipment", "Finalize menu and pricing", "Onboard onto Swiggy/Zomato"]}, {"phase": "Month 1", "tasks": ["Soft launch", "Run aggressive platform discounts", "Gather early reviews"]}, {"phase": "Month 3", "tasks": ["Optimize food cost", "Launch direct ordering via WhatsApp/website", "Introduce combo meals"]}]',
  financial_projections = '{"break_even": "6-8 months", "monthly_revenue": "₹2,50,000 (at 30 orders/day)", "monthly_costs": "₹1,80,000", "profit_margin": "25-30%"}',
  resources_needed = '{"Commercial kitchen space (200 sq ft)", "Industrial exhaust and stoves", "Swiggy/Zomato POS integration", "2 Chefs, 1 Helper"}',
  risk_analysis = '[{"risk": "High aggregator commissions (25-30%)", "mitigation": "Build direct customer base via WhatsApp and Instagram"}, {"risk": "Food wastage", "mitigation": "Implement strict inventory tracking and dynamic menu management"}]',
  success_stories = '[{"name": "Rahul & Vikram", "city": "Bengaluru", "story": "Started a late-night biryani cloud kitchen. Scaled to 3 locations within 18 months using hyper-local SEO and platform ads."}]'
WHERE slug = 'cloud-kitchen';

-- 3. Digital Marketing Agency
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  market_analysis = '{"market_size": "₹35,000 Crores", "target_audience": "Local SMEs, startups, real estate, doctors", "growth_trends": "30% YoY growth as offline businesses move online", "demand_india": "Universal demand across all cities"}',
  competition_strategy = '{"competitors": ["Freelancers", "Established large agencies"], "differentiation": "Performance-based pricing (ROI focused), specializing in one niche (e.g., healthcare only)", "pricing_strategy": "Retainer model (₹15K-₹30K/month per client) + ad spend percentage"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Define niche", "Create agency website and portfolio", "Set up LLC/Sole Proprietorship"]}, {"phase": "Week 2", "tasks": ["Build social media presence", "Create local Google My Business listing"]}, {"phase": "Month 1", "tasks": ["Cold outreach to 100 local businesses", "Offer 1-month free trial to 3 clients for case studies"]}, {"phase": "Month 3", "tasks": ["Secure 5 paying retainer clients", "Hire part-time graphic designer", "Implement automated reporting"]}]',
  financial_projections = '{"break_even": "1-2 months", "monthly_revenue": "₹1,50,000 (with 5 clients)", "monthly_costs": "₹40,000 (software, freelancers)", "profit_margin": "70%+"}',
  resources_needed = '{"High-end laptop", "Software subscriptions (Canva, Semrush, Hootsuite)", "High-speed internet", "Registered business entity"}',
  risk_analysis = '[{"risk": "Client churn", "mitigation": "Set clear expectations, provide weekly transparent reports showing ROI"}, {"risk": "Rapidly changing algorithms", "mitigation": "Dedicate 3 hours weekly to learning and upskilling"}]',
  success_stories = '[{"name": "Priya Sharma", "city": "Delhi", "story": "Focused solely on dental clinics. Now manages marketing for 40+ dentists across India with a team of 4."}]'
WHERE slug = 'digital-marketing-agency';

-- 4. Mobile Repair Shop
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
  market_analysis = '{"market_size": "₹25,000 Crores", "target_audience": "Smartphone users, mostly mid-to-lower income seeking out-of-warranty repairs", "growth_trends": "Steady 10% YoY, driven by expensive official repair costs", "demand_india": "High in every neighborhood"}',
  competition_strategy = '{"competitors": ["Official service centers", "Other local shops"], "differentiation": "While-you-wait transparent repairs, 3-month warranty on parts, free pickup/drop", "pricing_strategy": "Cost of parts + ₹300-₹800 labor charge depending on complexity"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Complete mobile repair course (if not skilled)", "Find a small 50 sq ft shop near high footfall"]}, {"phase": "Week 2", "tasks": ["Purchase toolkits and initial spare parts inventory", "Set up shop counter"]}, {"phase": "Month 1", "tasks": ["Distribute pamphlets", "Start offering tempered glass/covers to attract walk-ins"]}, {"phase": "Month 3", "tasks": ["Establish reliable wholesale contacts for screens/batteries", "Start B2B tie-ups with local offices"]}]',
  financial_projections = '{"break_even": "3-4 months", "monthly_revenue": "₹80,000", "monthly_costs": "₹30,000 (Rent, parts)", "profit_margin": "60%"}',
  resources_needed = '{"Professional toolkit and soldering station", "Small retail space", "Initial inventory (screens, batteries, accessories)", "Local vendor network"}',
  risk_analysis = '[{"risk": "Damaging customer phone", "mitigation": "Thoroughly inspect and document phone condition before repair; keep spare backup parts"}, {"risk": "Obsolete inventory", "mitigation": "Only stock parts for top 10 most popular phone models"}]',
  success_stories = '[{"name": "Mohammad Ali", "city": "Lucknow", "story": "Started a small kiosk. Built trust by fixing phones in front of customers. Now runs a 3-shop chain."}]'
WHERE slug = 'mobile-repair-shop';

-- 5. Online Reselling Business
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  market_analysis = '{"market_size": "₹15,000 Crores", "target_audience": "Budget-conscious online shoppers, fashion enthusiasts", "growth_trends": "Explosive growth via Instagram and WhatsApp", "demand_india": "Massive across Tier 2 and Tier 3 cities"}',
  competition_strategy = '{"competitors": ["Meesho sellers", "Other Instagram thrift stores"], "differentiation": "Curated high-quality aesthetics, unboxing experience, niche products (e.g., Korean fashion, vintage watches)", "pricing_strategy": "Cost + 40-60% markup"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Identify niche (e.g., imitation jewelry)", "Find wholesale suppliers in Surat/Delhi"]}, {"phase": "Week 2", "tasks": ["Order samples", "Set up Instagram Business page and WhatsApp catalog"]}, {"phase": "Month 1", "tasks": ["Run ₹500/day Instagram ads", "Post daily reels", "Process first 20 orders"]}, {"phase": "Month 3", "tasks": ["Partner with micro-influencers", "Set up Razorpay payment links", "Launch a basic Shopify store"]}]',
  financial_projections = '{"break_even": "1 month", "monthly_revenue": "₹70,000", "monthly_costs": "₹40,000 (inventory, shipping, ads)", "profit_margin": "42%"}',
  resources_needed = '{"Smartphone with good camera", "Ring light", "Aesthetic packaging materials", "Reliable courier partner (Shiprocket)"}',
  risk_analysis = '[{"risk": "High RTO (Return to Origin) rate", "mitigation": "Encourage prepaid orders with a 10% discount; strictly verify COD addresses"}, {"risk": "Supplier stockouts", "mitigation": "Maintain relationships with at least 3 different suppliers"}]',
  success_stories = '[{"name": "Simran Kaur", "city": "Chandigarh", "story": "Started selling sourced ethnic wear on Instagram. Reached 50k followers in a year and now ships pan-India."}]'
WHERE slug = 'online-reselling-business';

-- 6. Yoga/Fitness Coaching
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  market_analysis = '{"market_size": "₹12,000 Crores", "target_audience": "Working professionals, housewives, corporate teams", "growth_trends": "20% YoY, major shift towards preventive healthcare", "demand_india": "High in metros, increasing adoption everywhere"}',
  competition_strategy = '{"competitors": ["Local gyms", "Cure.fit", "YouTube fitness channels"], "differentiation": "Personalized attention, holistic diet+yoga plans, specialized niches (prenatal yoga, senior citizen mobility)", "pricing_strategy": "₹2000-₹5000/month for group classes, ₹10k+ for personal training"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Obtain yoga certification (if needed)", "Define niche (e.g., weight loss, corporate stress)"]}, {"phase": "Week 2", "tasks": ["Set up Zoom setup (good camera, mic, lighting)", "Create social media profiles"]}, {"phase": "Month 1", "tasks": ["Offer free weekend workshop", "Convert workshop attendees to paid monthly subscribers"]}, {"phase": "Month 3", "tasks": ["Launch a specialized 21-day challenge", "Partner with local nutritionists", "Start corporate wellness tie-ups"]}]',
  financial_projections = '{"break_even": "Immediate (no inventory)", "monthly_revenue": "₹80,000 (40 students at ₹2k)", "monthly_costs": "₹5,000 (Zoom, marketing)", "profit_margin": "90%+"}',
  resources_needed = '{"Yoga Mat", "Webcam/HD Smartphone", "Tripod", "Zoom Pro Subscription"}',
  risk_analysis = '[{"risk": "Student dropouts after 1 month", "mitigation": "Build community via WhatsApp groups, track attendance, offer 3-month discounted packages"}]',
  success_stories = '[{"name": "Arjun Patel", "city": "Ahmedabad", "story": "Transitioned from local park classes to online Zoom batches. Now trains over 150 NRI clients globally."}]'
WHERE slug = 'yoga-fitness-coaching';

-- 7. Tuition Center
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  market_analysis = '{"market_size": "₹60,000 Crores", "target_audience": "School students (Class 6-12), competitive exam aspirants", "growth_trends": "Evergreen market, hybrid model growing post-COVID", "demand_india": "Massive universal demand in every street"}',
  competition_strategy = '{"competitors": ["Ed-tech apps (Byjus/PhysicsWallah)", "Other local tutors"], "differentiation": "Small batch sizes (max 10), personalized mentoring, focus on weak students, regular parent-teacher meetings", "pricing_strategy": "₹1500-₹3000 per subject/month"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Select subjects and target classes", "Clear out a room at home or rent small space"]}, {"phase": "Week 2", "tasks": ["Buy whiteboards, chairs, desks", "Create curriculum plan"]}, {"phase": "Month 1", "tasks": ["Distribute pamphlets in local schools", "Offer free demo week", "Onboard first batch"]}, {"phase": "Month 3", "tasks": ["Hire an assistant teacher for lower classes", "Implement weekly mock tests"]}]',
  financial_projections = '{"break_even": "2 months", "monthly_revenue": "₹90,000 (30 students, 2 subjects each)", "monthly_costs": "₹20,000 (rent, electricity, notes)", "profit_margin": "75%"}',
  resources_needed = '{"Teaching space", "Whiteboard & markers", "Seating furniture", "Printed study materials"}',
  risk_analysis = '[{"risk": "Losing students to bigger institutes", "mitigation": "Focus on personal attention and visible grade improvements. Let results do the marketing."}]',
  success_stories = '[{"name": "Meera Verma", "city": "Kochi", "story": "Started teaching math to 3 neighborhood kids. Today runs a full-fledged center with 5 teachers and 200+ students."}]'
WHERE slug = 'tuition-center';

-- 8. Handmade Jewelry Store
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  market_analysis = '{"market_size": "₹8,000 Crores (Imitation/Handmade)", "target_audience": "Young women, college students, gifting market", "growth_trends": "High growth driven by Instagram influencers and eco-conscious fashion", "demand_india": "High in urban areas and online"}',
  competition_strategy = '{"competitors": ["Fast fashion brands", "Other Instagram sellers"], "differentiation": "Unique materials (terracotta, resin, polymer clay), custom personalization (name engraving), eco-friendly packaging", "pricing_strategy": "Premium pricing for unique art (Cost x 3 to x4 markup)"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Learn/refine craft via YouTube", "Source raw materials (beads, wire, clay)"]}, {"phase": "Week 2", "tasks": ["Create first collection (15-20 pieces)", "Do a professional photoshoot at home"]}, {"phase": "Month 1", "tasks": ["Launch Instagram page", "Send PR packages to 5 micro-influencers", "Attend local flea market"]}, {"phase": "Month 3", "tasks": ["Set up Etsy/website", "Launch festive specific collections"]}]',
  financial_projections = '{"break_even": "1-2 months", "monthly_revenue": "₹40,000", "monthly_costs": "₹15,000 (materials, ads, shipping)", "profit_margin": "62%"}',
  resources_needed = '{"Raw materials and jewelry tools", "Packaging boxes", "Ring light & styling props", "Shipping account"}',
  risk_analysis = '[{"risk": "Design copying", "mitigation": "Build a strong personal brand story so customers buy into YOU, not just the product"}, {"risk": "Fragile items breaking in transit", "mitigation": "Invest in sturdy, bubble-wrapped tin box packaging"}]',
  success_stories = '[{"name": "Kavya Menon", "city": "Chennai", "story": "Started making terracotta earrings as a hobby. Now employs 3 women and exports globally via Etsy."}]'
WHERE slug = 'handmade-jewelry-store';

-- 9. 3D Printing Services
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  market_analysis = '{"market_size": "₹3,500 Crores", "target_audience": "Engineering students, architects, local manufacturers, hobbyists", "growth_trends": "35% CAGR, extremely fast-growing tech sector", "demand_india": "Concentrated in manufacturing hubs and educational cities"}',
  competition_strategy = '{"competitors": ["Large industrial 3D printing labs", "Online platforms"], "differentiation": "Fast local turnaround (24 hours), design-assistance services, printing in exotic materials (wood-fill, flexible TPU)", "pricing_strategy": "Per gram of filament + machine hour rate (e.g., ₹10/gram + ₹50/hour)"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Research and purchase reliable FDM 3D printer (Ender 3/Prusa)", "Learn slicing software"]}, {"phase": "Week 2", "tasks": ["Print test models", "Set up social media and Google Maps listing"]}, {"phase": "Month 1", "tasks": ["Visit local engineering colleges and architect firms to offer services", "Complete first 5 orders"]}, {"phase": "Month 3", "tasks": ["Purchase resin printer for high-detail jewelry/miniatures", "Build an automated quoting website"]}]',
  financial_projections = '{"break_even": "4-6 months", "monthly_revenue": "₹60,000", "monthly_costs": "₹15,000 (Filament, electricity)", "profit_margin": "75%"}',
  resources_needed = '{"FDM 3D Printer (₹20k-₹50k)", "Various Filaments (PLA, ABS, PETG)", "CAD Software skills", "Good PC"}',
  risk_analysis = '[{"risk": "Machine breakdowns/clogs", "mitigation": "Learn basic printer maintenance, stock spare nozzles and thermistors"}, {"risk": "Long print failures", "mitigation": "Install a webcam to monitor prints remotely and stop failures early"}]',
  success_stories = '[{"name": "Siddharth Jain", "city": "Coimbatore", "story": "Started prototyping parts for local textile machinery. Now owns a farm of 10 printers running 24/7."}]'
WHERE slug = '3d-printing-services';

-- 10. Organic Fertilizer
UPDATE business_ideas SET 
  image_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
  market_analysis = '{"market_size": "₹10,000 Crores", "target_audience": "Farmers, urban gardeners, nurseries", "growth_trends": "Government pushing for organic farming, urban terrace gardening booming", "demand_india": "High in agricultural states (Punjab, MH) and urban centers (Bangalore)"}',
  competition_strategy = '{"competitors": ["Chemical fertilizer giants", "Local composters"], "differentiation": "High-quality vermicompost with lab-tested NPK values, attractive retail packaging for urban gardeners", "pricing_strategy": "₹15-₹20/kg wholesale, ₹100/kg retail (packaged)"}',
  roadmap = '[{"phase": "Week 1", "tasks": ["Secure small land/shed", "Source cow dung and Eisenia fetida earthworms"]}, {"phase": "Week 2", "tasks": ["Set up vermicompost beds", "Monitor moisture and temperature"]}, {"phase": "Month 1 (Waiting)", "tasks": ["Design packaging", "Apply for MSME and trade license", "Network with local nurseries"]}, {"phase": "Month 3", "tasks": ["Harvest first batch", "Sieve and package", "Distribute to 10 local nurseries and launch on Amazon"]}]',
  financial_projections = '{"break_even": "3-4 months", "monthly_revenue": "₹80,000", "monthly_costs": "₹25,000 (Labor, transport, raw dung)", "profit_margin": "68%"}',
  resources_needed = '{"Shaded land (500 sq ft+)", "Cow dung supply", "Earthworms", "Sieving machine", "Packaging materials"}',
  risk_analysis = '[{"risk": "Extreme heat killing worms", "mitigation": "Ensure proper shading, regular watering, and use gunny bags for cooling"}, {"risk": "Pests and ants", "mitigation": "Maintain proper pH and moisture; use natural deterrents around beds"}]',
  success_stories = '[{"name": "Ravi Kumar", "city": "Mysuru", "story": "Started in his backyard. Now processes 5 tons of waste monthly and supplies premium compost to organic farms."}]'
WHERE slug = 'organic-fertilizer-production';
-- ==============================================================================
-- PART 2: INSERT NEW IDEAS (11 to 18)
-- ==============================================================================

INSERT INTO business_ideas (
  title, slug, category, description, investment_min, investment_max, location_type, time_commitment, skill_level, monthly_profit_min, monthly_profit_max, is_active,
  image_url, market_analysis, competition_strategy, roadmap, financial_projections, resources_needed, risk_analysis, success_stories
) VALUES 
(
  'Last-Mile Delivery Service', 'last-mile-delivery', 'Transportation',
  'Partner with Amazon/Flipkart or local e-commerce for package delivery in your area.',
  30000, 80000, 'hybrid', 'full-time', 'beginner', 25000, 60000, true,
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  '{"market_size": "₹80,000 Crores", "target_audience": "E-commerce giants, local D2C brands, grocery delivery", "growth_trends": "Explosive 25% CAGR due to quick commerce", "demand_india": "Crucial in all tier cities"}',
  '{"competitors": ["Delhivery", "Shadowfax", "Local logistics"], "differentiation": "Reliability, zero-damage guarantee, tech-enabled tracking for local brands", "pricing_strategy": "Per package rate (₹30-₹60 depending on weight/distance)"}',
  '[{"phase": "Week 1", "tasks": ["Register business", "Acquire commercial 2-wheeler or EV"]}, {"phase": "Week 2", "tasks": ["Sign up as delivery partner with Amazon/Flipkart", "Hire 1-2 riders if scaling"]}, {"phase": "Month 1", "tasks": ["Optimize local delivery routes", "Deliver 50 packages/day"]}, {"phase": "Month 3", "tasks": ["Tie up directly with 5 local D2C brands for better margins"]}]',
  '{"break_even": "2-3 months", "monthly_revenue": "₹70,000", "monthly_costs": "₹20,000 (Fuel, vehicle maintenance)", "profit_margin": "70%"}',
  '{"Commercial 2-wheeler or EV", "Smartphone with GPS", "Delivery bags", "Rain gear"}',
  '[{"risk": "Vehicle breakdown", "mitigation": "Strict weekly maintenance schedule"}, {"risk": "Package theft/damage", "mitigation": "Secure cargo bags and transit insurance"}]',
  '[{"name": "Imran Khan", "city": "Bhopal", "story": "Started as a solo delivery agent. Now manages a fleet of 8 EVs doing local e-commerce deliveries."}]'
),
(
  'Bike Rental Service', 'bike-rental-service', 'Transportation',
  'Rent bikes to tourists, students, and daily commuters. Start with 3-5 bikes.',
  50000, 200000, 'physical-shop', 'full-time', 'intermediate', 30000, 80000, true,
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
  '{"market_size": "₹2,500 Crores", "target_audience": "Tourists, college students, outstation employees", "growth_trends": "Growing steadily as micro-mobility gains traction", "demand_india": "High in tourist hubs (Goa, Manali) and student cities (Pune, Kota)"}',
  '{"competitors": ["Bounce", "Royal Brothers", "Local rental shops"], "differentiation": "Well-maintained fleet, transparent pricing with no hidden charges, easy digital booking", "pricing_strategy": "₹300-₹800/day depending on bike model"}',
  '[{"phase": "Week 1", "tasks": ["Obtain commercial registration for 3-5 second-hand bikes", "Get comprehensive insurance"]}, {"phase": "Week 2", "tasks": ["Rent a small parking space near transit hubs", "Print marketing flyers"]}, {"phase": "Month 1", "tasks": ["Tie up with local hostels and budget hotels", "Launch Google My Business page"]}, {"phase": "Month 3", "tasks": ["Launch a simple booking website", "Add 2 premium bikes (e.g., Royal Enfield)"]}]',
  '{"break_even": "6-8 months", "monthly_revenue": "₹90,000", "monthly_costs": "₹20,000 (Maintenance, parking, insurance)", "profit_margin": "75%"}',
  '{"3-5 Commercial Bikes", "Helmets", "GPS Trackers", "Basic tool kit"}',
  '[{"risk": "Vehicle theft or severe damage", "mitigation": "Install hidden GPS trackers, take security deposits, verify original ID"}, {"risk": "Legal issues from accidents", "mitigation": "Ensure bulletproof rental agreements and insurance coverage"}]',
  '[{"name": "Suresh Naik", "city": "Goa", "story": "Bought 3 Activas with his savings. Through hotel tie-ups, he now operates 20+ two-wheelers with a 90% utilization rate."}]'
),
(
  'Home Cleaning Service', 'home-cleaning-service', 'Services',
  'Professional cleaning for homes, offices, and post-construction sites.',
  10000, 35000, 'home-based', 'full-time', 'beginner', 20000, 50000, true,
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  '{"market_size": "₹15,000 Crores", "target_audience": "Working couples, bachelors, new homeowners, small offices", "growth_trends": "30% CAGR as people value time over money", "demand_india": "Surging in Tier 1 and IT hubs"}',
  '{"competitors": ["Urban Company", "Local maids"], "differentiation": "Deep cleaning specialization, eco-friendly chemicals, highly trained verified staff", "pricing_strategy": "₹2000-₹5000 per deep clean based on BHK size"}',
  '[{"phase": "Week 1", "tasks": ["Buy professional cleaning equipment and chemicals", "Register business"]}, {"phase": "Week 2", "tasks": ["Hire and train 1-2 reliable cleaners", "Create WhatsApp Business profile"]}, {"phase": "Month 1", "tasks": ["Run targeted Facebook ads in premium apartments", "Complete first 10 deep cleans"]}, {"phase": "Month 3", "tasks": ["Secure 3 monthly office cleaning contracts", "Introduce sofa/carpet dry cleaning"]}]',
  '{"break_even": "1 month", "monthly_revenue": "₹80,000 (20 cleans)", "monthly_costs": "₹30,000 (Labor, chemicals, transport)", "profit_margin": "62%"}',
  '{"Industrial Vacuum Cleaner", "Microfiber cloths", "Professional cleaning chemicals", "Uniforms"}',
  '[{"risk": "Staff attrition or unreliability", "mitigation": "Pay above market rate, offer incentives for 5-star reviews"}, {"risk": "Damaging client property", "mitigation": "Train staff rigorously on surface-specific chemicals; hold liability insurance"}]',
  '[{"name": "Pooja Hegde", "city": "Mumbai", "story": "Started taking deep cleaning contracts for new flats. Now leads a team of 10 servicing premium high-rises."}]'
),
(
  'Packer & Mover Service', 'packer-mover-service', 'Services',
  'Help families relocate within city or inter-city with packing and transport.',
  30000, 100000, 'physical-shop', 'full-time', 'intermediate', 25000, 70000, true,
  'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&q=80',
  '{"market_size": "₹20,000 Crores", "target_audience": "Renting professionals, transferring government/bank employees, businesses", "growth_trends": "Steady 12% YoY driven by urban migration", "demand_india": "High in all major cities"}',
  '{"competitors": ["Agarwal Packers", "NoBroker", "Unorganized truck owners"], "differentiation": "Zero-damage guarantee, premium bubble wrapping, polite trained staff, transparent fixed pricing", "pricing_strategy": "₹5000-₹15000 for local shifting; ₹20k+ for inter-city"}',
  '[{"phase": "Week 1", "tasks": ["Register business", "Tie up with local mini-truck owners (Tata Ace/Bolero)"]}, {"phase": "Week 2", "tasks": ["Purchase bulk packing materials", "Print visiting cards"]}, {"phase": "Month 1", "tasks": ["Network with real estate brokers for leads", "Execute 5 local shiftings"]}, {"phase": "Month 3", "tasks": ["Invest in own mini-truck", "Start inter-city services"]}]',
  '{"break_even": "2 months", "monthly_revenue": "₹1,20,000 (10 shiftings)", "monthly_costs": "₹60,000 (Truck rental, labor, packing material)", "profit_margin": "50%"}',
  '{"Bubble wrap & Corrugated boxes", "Heavy-duty tapes & markers", "Tie-ups with commercial vehicles", "Reliable daily-wage labor"}',
  '[{"risk": "Damaging expensive electronics/furniture", "mitigation": "Double layer packing for fragile items; take transit insurance"}, {"risk": "Labor not showing up", "mitigation": "Maintain a large roster of reliable daily-wage workers"}]',
  '[{"name": "Vikash Yadav", "city": "Gurgaon", "story": "Started by partnering with a single Tata Ace driver. Now handles 30+ corporate and residential relocations monthly."}]'
),
(
  'Interior Design Consultancy', 'interior-design-consultancy', 'Services',
  'Design home and office interiors. Start with 3D renders, scale to full execution.',
  15000, 50000, 'hybrid', 'full-time', 'advanced', 30000, 100000, true,
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  '{"market_size": "₹1.5 Lakh Crores", "target_audience": "New home buyers, retail stores, office spaces", "growth_trends": "Booming real estate market driving 20% CAGR", "demand_india": "Massive in Tier 1 and fast-growing in Tier 2"}',
  '{"competitors": ["Livspace", "HomeLane", "Local contractors"], "differentiation": "Highly personalized designs, 3D VR walkthroughs, strict timeline adherence", "pricing_strategy": "₹50-₹100/sq ft for design only; 10-15% of project cost for turnkey execution"}',
  '[{"phase": "Week 1", "tasks": ["Create a stunning portfolio (even of conceptual renders)", "Set up Instagram page"]}, {"phase": "Week 2", "tasks": ["Network with civil contractors and carpenters", "Register on Houzz and local directories"]}, {"phase": "Month 1", "tasks": ["Secure first consultation client", "Deliver complete 3D renders and material selection"]}, {"phase": "Month 3", "tasks": ["Take on a turnkey project", "Hire a junior draftsperson for AutoCAD work"]}]',
  '{"break_even": "1 project", "monthly_revenue": "₹1,50,000", "monthly_costs": "₹30,000 (Software, travel)", "profit_margin": "80% (for design only)"}',
  '{"High-end PC/Laptop", "SketchUp/AutoCAD/V-Ray subscriptions", "Material sample catalogs", "Measuring tools"}',
  '[{"risk": "Contractors delaying execution", "mitigation": "Build a trusted vendor network; include strict penalty clauses in contractor agreements"}, {"risk": "Client changing mind constantly", "mitigation": "Limit free revisions to 2 in the contract; charge hourly for further changes"}]',
  '[{"name": "Neha Sharma", "city": "Pune", "story": "Started by designing a friend''s studio apartment. Her Instagram reels went viral, and she now runs a premium boutique firm."}]'
),
(
  'Event Planning Service', 'event-planning-service', 'Services',
  'Plan weddings, birthdays, and corporate events. Start small, scale to full coordination.',
  15000, 50000, 'hybrid', 'flexible', 'intermediate', 25000, 75000, true,
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  '{"market_size": "₹3.5 Lakh Crores (Weddings alone)", "target_audience": "Families planning weddings/birthdays, corporates", "growth_trends": "Rebounding strongly post-COVID, trend towards personalized/theme events", "demand_india": "Immense, deeply ingrained in culture"}',
  '{"competitors": ["Established event companies", "Hotel in-house planners"], "differentiation": "Unique Pinterest-worthy themes, strict budget management, stress-free execution", "pricing_strategy": "10-15% of total event budget, or fixed management fee (₹20k-₹1L+)"}',
  '[{"phase": "Week 1", "tasks": ["Build vendor database (caterers, decorators, venues, photographers)", "Create brand identity"]}, {"phase": "Week 2", "tasks": ["Do a styled shoot or plan a family event for free to build portfolio", "Launch social media"]}, {"phase": "Month 1", "tasks": ["Market to local corporates for small seminars", "Book first paid birthday/anniversary event"]}, {"phase": "Month 3", "tasks": ["Book first wedding", "Partner with popular banquet halls for referrals"]}]',
  '{"break_even": "1-2 events", "monthly_revenue": "₹1,00,000 (3 small events)", "monthly_costs": "₹15,000 (Marketing, travel)", "profit_margin": "85% (excluding vendor payouts)"}',
  '{"Vendor network", "Smartphone/Laptop", "Social media presence", "Event management software/spreadsheets"}',
  '[{"risk": "Vendor no-shows or poor quality", "mitigation": "Always have a backup vendor list; sign clear SLAs with vendors"}, {"risk": "Client budget overruns", "mitigation": "Maintain a contingency fund (10%); get approvals for all extra expenses in writing"}]',
  '[{"name": "Karan & Rishi", "city": "Jaipur", "story": "Started organizing college fests. Scaled to a premier destination wedding planning company handling ₹50L+ budgets."}]'
),
(
  'Photography Business', 'photography-business', 'Services',
  'Cover weddings, portraits, product shoots, and real estate photography.',
  25000, 80000, 'hybrid', 'flexible', 'intermediate', 20000, 60000, true,
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80',
  '{"market_size": "₹1 Lakh Crores", "target_audience": "Couples, small businesses, models, families", "growth_trends": "Driven by Instagram aesthetics and D2C brands needing product shoots", "demand_india": "Extremely high year-round"}',
  '{"competitors": ["Local studios", "Other freelance photographers"], "differentiation": "Candid/documentary style, fast 48-hour delivery of edited photos, drone photography", "pricing_strategy": "₹5000-₹15000/day for shoots; premium packages for weddings"}',
  '[{"phase": "Week 1", "tasks": ["Acquire entry-level DSLR/Mirrorless and a prime lens (50mm)", "Learn Lightroom/Photoshop"]}, {"phase": "Week 2", "tasks": ["Do free TFP (Time for Portfolio) shoots with friends/local brands", "Set up Instagram portfolio"]}, {"phase": "Month 1", "tasks": ["Reach out to 50 local cafes/brands for product shoots", "Book first paid gig"]}, {"phase": "Month 3", "tasks": ["Second-shoot for a major wedding photographer to learn ropes", "Invest in better lighting equipment"]}]',
  '{"break_even": "3-5 months", "monthly_revenue": "₹70,000", "monthly_costs": "₹10,000 (Adobe subscription, travel, cloud storage)", "profit_margin": "85%"}',
  '{"DSLR/Mirrorless Camera", "Lenses (35mm/50mm)", "Editing Laptop", "Adobe Creative Cloud"}',
  '[{"risk": "Losing SD card data", "mitigation": "Use dual-slot cameras; backup to cloud/external HDD immediately after shoot"}, {"risk": "Client dissatisfaction with edits", "mitigation": "Agree on a moodboard beforehand; watermark proofs before final delivery"}]',
  '[{"name": "Anjali Das", "city": "Kolkata", "story": "Started doing maternity shoots on weekends. Now runs a full-time studio specializing in newborn photography."}]'
),
(
  'DJ & Sound Rental', 'dj-sound-rental', 'Services',
  'Rent DJ equipment, speakers, and lights for events and parties.',
  40000, 120000, 'physical-shop', 'part-time', 'intermediate', 20000, 50000, true,
  'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?w=800&q=80',
  '{"market_size": "₹15,000 Crores", "target_audience": "Event planners, weddings, corporate parties, college fests", "growth_trends": "Spikes heavily during wedding season (Nov-Feb)", "demand_india": "High in all regions, especially North India"}',
  '{"competitors": ["Large event production companies", "Local tent houses"], "differentiation": "High-quality branded audio (JBL/Pioneer), professional clean cable management, reliable backup systems", "pricing_strategy": "₹5000-₹15000 per night depending on equipment scale"}',
  '[{"phase": "Week 1", "tasks": ["Purchase 2 active tops, 1 subwoofer, a basic mixer, and LED par cans", "Learn sound balancing"]}, {"phase": "Week 2", "tasks": ["Network with local event planners and banquet hall managers", "Print brochures"]}, {"phase": "Month 1", "tasks": ["Execute first 3 events (even at discount) to build relationships", "Gather photos/videos for marketing"]}, {"phase": "Month 3", "tasks": ["Reinvest profits into a DJ console and smoke machine", "Hire a helper for loading/unloading"]}]',
  '{"break_even": "6-8 months", "monthly_revenue": "₹60,000 (average 6 gigs)", "monthly_costs": "₹15,000 (Transport, helper, maintenance)", "profit_margin": "75%"}',
  '{"PA System (Tops & Subs)", "Mixer & Mics", "Basic Lighting", "Mini-truck transport tie-up"}',
  '[{"risk": "Equipment damage from drunk guests/spills", "mitigation": "Set up physical barriers; take advance deposits"}, {"risk": "Power fluctuations frying gear", "mitigation": "Always use high-quality voltage stabilizers and spike guards"}]',
  '[{"name": "DJ Kunal", "city": "Surat", "story": "Started renting out his personal speakers. Reinvested consistently and now provides trussing and sound for massive Garba nights."}]'
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  investment_min = EXCLUDED.investment_min,
  investment_max = EXCLUDED.investment_max,
  location_type = EXCLUDED.location_type,
  time_commitment = EXCLUDED.time_commitment,
  skill_level = EXCLUDED.skill_level,
  monthly_profit_min = EXCLUDED.monthly_profit_min,
  monthly_profit_max = EXCLUDED.monthly_profit_max,
  image_url = EXCLUDED.image_url,
  market_analysis = EXCLUDED.market_analysis,
  competition_strategy = EXCLUDED.competition_strategy,
  roadmap = EXCLUDED.roadmap,
  financial_projections = EXCLUDED.financial_projections,
  resources_needed = EXCLUDED.resources_needed,
  risk_analysis = EXCLUDED.risk_analysis,
  success_stories = EXCLUDED.success_stories;
-- ==============================================================================
-- PART 3: INSERT NEW IDEAS (19 to 25)
-- ==============================================================================

INSERT INTO business_ideas (
  title, slug, category, description, investment_min, investment_max, location_type, time_commitment, skill_level, monthly_profit_min, monthly_profit_max, is_active,
  image_url, market_analysis, competition_strategy, roadmap, financial_projections, resources_needed, risk_analysis, success_stories
) VALUES 
(
  'Food Truck Business', 'food-truck-business', 'Food',
  'Mobile kitchen serving street food, burgers, or regional cuisine.',
  100000, 500000, 'physical-shop', 'full-time', 'intermediate', 40000, 150000, true,
  'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&q=80',
  '{"market_size": "₹20,000 Crores", "target_audience": "Office goers, college students, late-night crowd", "growth_trends": "15% YoY growth, driven by hygienic street food demand", "demand_india": "High in IT corridors and student hubs"}',
  '{"competitors": ["Street vendors", "Local QSRs"], "differentiation": "High hygiene standards, Instagrammable aesthetics, unique fusion menu (e.g., Mac & Cheese Dosa)", "pricing_strategy": "₹100-₹250 per meal (Premium street food pricing)"}',
  '[{"phase": "Week 1", "tasks": ["Finalize concept and menu", "Purchase a second-hand tempo/truck"]}, {"phase": "Month 1", "tasks": ["Fabricate the kitchen interior", "Obtain FSSAI, RTO, and local municipal NOCs"]}, {"phase": "Month 2", "tasks": ["Hire 1 cook and 1 helper", "Scout and finalize 2 strategic parking spots (day/night)"]}, {"phase": "Month 3", "tasks": ["Launch with a free-tasting event", "Tie up with Swiggy/Zomato for delivery"]}]',
  '{"break_even": "6-12 months", "monthly_revenue": "₹2,50,000", "monthly_costs": "₹1,50,000 (Raw materials, fuel, salaries)", "profit_margin": "40%"}',
  '{"Fabricated Food Truck", "Commercial kitchen equipment", "Generator/Inverter", "POS System"}',
  '[{"risk": "Municipal/Police harassment over parking", "mitigation": "Secure official hawker licenses or rent space inside private tech parks/colleges"}, {"risk": "Vehicle breakdown", "mitigation": "Regular servicing; have a towing backup plan"}]',
  '[{"name": "The Burger Bros", "city": "Bengaluru", "story": "Started with one truck in Indiranagar. Their juicy burgers went viral on Instagram, now they operate a fleet of 5 trucks."}]'
),
(
  'Bakery & Cake Shop', 'bakery-cake-shop', 'Food',
  'Fresh bread, pastries, and custom birthday/wedding cakes.',
  30000, 100000, 'physical-shop', 'full-time', 'advanced', 25000, 70000, true,
  'https://images.unsplash.com/photo-1556217477-d325251ece38?w=800&q=80',
  '{"market_size": "₹75,000 Crores", "target_audience": "Families, birthday celebrants, cafes needing wholesale supplies", "growth_trends": "Rising demand for eggless, gluten-free, and custom fondant cakes", "demand_india": "Evergreen everywhere"}',
  '{"competitors": ["Monginis", "Local sweet shops", "Home bakers"], "differentiation": "Custom 3D fondant designs, 100% eggless options, premium packaging", "pricing_strategy": "₹500-₹1500 per kg for custom cakes"}',
  '[{"phase": "Week 1", "tasks": ["Perfect 3 signature recipes", "Obtain FSSAI registration"]}, {"phase": "Week 2", "tasks": ["Purchase commercial oven and planetary mixer", "Source premium packaging"]}, {"phase": "Month 1", "tasks": ["Set up Instagram page", "Distribute free samples to local cafes for B2B tie-ups"]}, {"phase": "Month 3", "tasks": ["List on Swiggy/Zomato Minis", "Start taking pre-orders for large wedding/anniversary cakes"]}]',
  '{"break_even": "4-6 months", "monthly_revenue": "₹1,20,000", "monthly_costs": "₹60,000 (Ingredients, electricity, packaging)", "profit_margin": "50%"}',
  '{"Commercial Deck Oven", "Planetary Mixer", "Display Fridge (if retail)", "Baking tools & molds"}',
  '[{"risk": "High wastage of unsold perishable items", "mitigation": "Use data to predict daily demand; sell day-old items at 50% discount via apps like Too Good To Go (if available) or local networks"}, {"risk": "Cakes melting in transit", "mitigation": "Use sturdy AC transport or dry ice for large fondant cakes"}]',
  '[{"name": "Sita''s Oven", "city": "Chandigarh", "story": "Started baking from home during lockdown. Specializing in eggless bento cakes, she now owns a premium retail outlet."}]'
),
(
  'Masala & Spice Grinding', 'masala-spice-grinding', 'Food',
  'Grind and pack fresh spices for local markets and kirana stores.',
  15000, 40000, 'home-based', 'part-time', 'beginner', 20000, 50000, true,
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
  '{"market_size": "₹60,000 Crores", "target_audience": "Households, local restaurants, caterers", "growth_trends": "Shift towards pure, unadulterated, locally sourced spices", "demand_india": "Staple requirement in 100% of Indian households"}',
  '{"competitors": ["MDH/Everest", "Local loose spice vendors"], "differentiation": "100% pure guarantee, no added colors, freshly ground to order, custom blends (e.g., special biryani masala)", "pricing_strategy": "Slight premium over commercial brands (₹300-₹500/kg)"}',
  '[{"phase": "Week 1", "tasks": ["Research wholesale spice markets (e.g., Khari Baoli)", "Buy a commercial pulverizer/grinder"]}, {"phase": "Week 2", "tasks": ["Experiment with signature blends", "Get FSSAI license and design food-grade stand-up pouches"]}, {"phase": "Month 1", "tasks": ["Sell to friends and family", "Pitch to 10 local restaurants for bulk supply"]}, {"phase": "Month 3", "tasks": ["List products on Amazon/Flipkart", "Set up a small stall in a local weekend market"]}]',
  '{"break_even": "2-3 months", "monthly_revenue": "₹75,000", "monthly_costs": "₹40,000 (Raw spices, packaging, electricity)", "profit_margin": "45%"}',
  '{"Commercial Pulverizer Machine", "Weighing Scale", "Sealing Machine", "Food-grade pouches"}',
  '[{"risk": "Spice adulteration at the source", "mitigation": "Buy whole spices only, never pre-ground. Build trust with one reliable wholesale farmer/supplier"}, {"risk": "Moisture ruining stock", "mitigation": "Store in airtight food-grade drums in a dry, cool room"}]',
  '[{"name": "Gita Devi", "city": "Patna", "story": "Started grinding pure turmeric and chili at home. Her word-of-mouth reputation grew so much she now supplies 50+ local kirana stores."}]'
),
(
  'Dropshipping Store', 'dropshipping-store', 'Technology',
  'Sell products online without inventory. Supplier ships directly to customer.',
  5000, 20000, 'online-only', 'flexible', 'intermediate', 15000, 40000, true,
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  '{"market_size": "₹35,000 Crores", "target_audience": "Impulse buyers on Instagram/Facebook, niche hobbyists", "growth_trends": "Growing fast via Shopify and local Indian suppliers like Roposo Clout/GlowRoad", "demand_india": "High, especially for trending gadgets and fashion"}',
  '{"competitors": ["Amazon/Flipkart", "Other dropshippers"], "differentiation": "Hyper-focused niche (e.g., only pet accessories), viral video marketing, exceptional customer support", "pricing_strategy": "Cost + 100-200% markup to cover high ad costs"}',
  '[{"phase": "Week 1", "tasks": ["Find a winning product via TikTok/Reels trends", "Set up Shopify store"]}, {"phase": "Week 2", "tasks": ["Integrate Indian suppliers (GlowRoad/Roboso)", "Create high-converting video ads"]}, {"phase": "Month 1", "tasks": ["Launch ₹1000/day Facebook/Insta ads", "Optimize product page based on analytics"]}, {"phase": "Month 3", "tasks": ["Scale winning ads", "Implement email marketing for abandoned carts", "Transition to private label (bulk buying) for better margins"]}]',
  '{"break_even": "1-2 months", "monthly_revenue": "₹1,50,000", "monthly_costs": "₹1,10,000 (Product cost, Facebook Ads, Shopify fees)", "profit_margin": "25%"}',
  '{"Laptop & Internet", "Shopify Subscription", "Facebook Ad Budget", "Supplier Integration App"}',
  '[{"risk": "Facebook banning ad accounts", "mitigation": "Follow ad policies strictly, have backup business managers"}, {"risk": "High RTO (Return to Origin) on COD orders", "mitigation": "Call to verify every COD order before dispatch; offer 5% off for prepaid"}]',
  '[{"name": "Aman Verma", "city": "Delhi", "story": "Failed 3 times before finding a winning posture-corrector product. Scaled it to ₹5L/month revenue using clever Instagram meme marketing."}]'
),
(
  'Freelance Web Development', 'freelance-web-development', 'Technology',
  'Build websites for small businesses using WordPress, Next.js, or Shopify.',
  0, 10000, 'online-only', 'flexible', 'advanced', 20000, 80000, true,
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  '{"market_size": "₹40,000 Crores (IT Services SME)", "target_audience": "Local businesses without a website, startups, e-commerce brands", "growth_trends": "Every business needs a digital storefront post-COVID", "demand_india": "Universal, plus massive export potential to US/UK clients"}',
  '{"competitors": ["Large IT firms", "Wix/Squarespace DIY", "Other freelancers"], "differentiation": "Fast delivery (1-week sites), SEO-optimized out of the box, offering ongoing AMC (Annual Maintenance Contracts)", "pricing_strategy": "₹15,000 for basic WordPress; ₹50,000+ for custom Next.js/Shopify"}',
  '[{"phase": "Week 1", "tasks": ["Build your own stellar portfolio website", "Set up profiles on Upwork/Fiverr"]}, {"phase": "Week 2", "tasks": ["Cold email 50 local businesses with outdated websites", "Offer to build a homepage mockup for free"]}, {"phase": "Month 1", "tasks": ["Close first 2 clients", "Deliver exceptional work and collect video testimonials"]}, {"phase": "Month 3", "tasks": ["Move to retainer models (SEO + Maintenance)", "Partner with a graphic designer for full-service offerings"]}]',
  '{"break_even": "Immediate", "monthly_revenue": "₹80,000 (2-3 projects)", "monthly_costs": "₹5,000 (Hosting, domains, software)", "profit_margin": "90%+"}',
  '{"Good Laptop", "Coding Skills / WordPress Knowledge", "Internet Connection", "Figma (for design)"}',
  '[{"risk": "Scope creep (clients asking for endless changes)", "mitigation": "Write iron-clad contracts specifying max 2 revisions. Charge hourly for extra work."}, {"risk": "Feast or famine income cycle", "mitigation": "Upsell monthly maintenance and SEO packages for recurring revenue"}]',
  '[{"name": "Tariq Anwar", "city": "Hyderabad", "story": "Started by building a free site for his uncle''s restaurant. Word spread, and he now runs a 5-person web agency serving clients in Dubai and the US."}]'
),
(
  'Cyber Cafe & Printing', 'cyber-cafe-printing', 'Technology',
  'Internet, printing, photocopy, and form filling. Still in demand in Tier 2/3 cities.',
  20000, 60000, 'physical-shop', 'full-time', 'beginner', 15000, 40000, true,
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  '{"market_size": "₹5,000 Crores", "target_audience": "Students, job seekers, individuals needing govt form assistance", "growth_trends": "Declining in metros, but highly profitable in Tier 3/4 towns and near colleges/courts", "demand_india": "High in rural and semi-urban areas"}',
  '{"competitors": ["Other local photocopy shops"], "differentiation": "High-speed color printing, expert assistance in filling complex govt/passport forms, lamination/spiral binding services", "pricing_strategy": "₹2/page B&W, ₹10/page Color, ₹50-₹100 for form filling assistance"}',
  '[{"phase": "Week 1", "tasks": ["Rent a small shop near a college, court, or govt office", "Buy 2 second-hand PCs and 1 heavy-duty multi-function printer"]}, {"phase": "Week 2", "tasks": ["Set up high-speed broadband", "Create price list banners outside shop"]}, {"phase": "Month 1", "tasks": ["Offer bulk printing discounts to students", "Learn the processes for PAN card, Passport, and state govt job applications"]}, {"phase": "Month 3", "tasks": ["Add stationery items (pens, files) to increase cart value", "Become an authorized CSC (Common Service Centre)"]}]',
  '{"break_even": "4-6 months", "monthly_revenue": "₹45,000", "monthly_costs": "₹15,000 (Rent, electricity, paper, toner)", "profit_margin": "66%"}',
  '{"2-3 Desktop PCs", "Commercial Heavy-Duty Printer/Copier", "Broadband Internet", "Lamination & Spiral Binding Machine"}',
  '[{"risk": "Printer breakdowns halting business", "mitigation": "Have a backup basic printer; sign an AMC with a local printer repair guy"}, {"risk": "Declining internet usage", "mitigation": "Pivot heavily into services: ticketing, form filling, Aadhaar updates, and money transfer (AEPS)"}]',
  '[{"name": "Rajesh Kumar", "city": "Gorakhpur", "story": "Opened near a local college. Realized students struggled with scholarship forms. Started charging ₹50 for form assistance and doubled his income."}]'
),
(
  'Mushroom Farming', 'mushroom-farming', 'Agriculture',
  'Grow oyster or button mushrooms in small space. High demand from hotels.',
  10000, 30000, 'home-based', 'part-time', 'intermediate', 20000, 50000, true,
  'https://images.unsplash.com/photo-1576076567699-247103a75b10?w=800&q=80',
  '{"market_size": "₹2,500 Crores", "target_audience": "Local restaurants, hotels, supermarkets, health-conscious consumers", "growth_trends": "20% YoY, driven by veganism and high-protein diets", "demand_india": "High demand, but requires specific temperature control depending on region"}',
  '{"competitors": ["Large commercial mushroom farms"], "differentiation": "Organic certification, exotic varieties (Shiitake, Oyster), farm-to-table freshness delivered same day", "pricing_strategy": "₹150-₹300/kg for Oyster; premium for Shiitake/Button"}',
  '[{"phase": "Week 1", "tasks": ["Take a Krishi Vigyan Kendra (KVK) training course", "Prepare a dark, humid 10x10 ft room"]}, {"phase": "Week 2", "tasks": ["Procure agricultural waste (straw) and sterilize it", "Buy high-quality mushroom spawn (seeds)"]}, {"phase": "Month 1", "tasks": ["Inoculate bags and monitor humidity (80-90%) and temp (20-25°C)", "Pitch to 5 local Chinese/Italian restaurants"]}, {"phase": "Month 2", "tasks": ["Harvest first flush (crop)", "Package in breathable punnets and deliver to buyers"]}]',
  '{"break_even": "2-3 months", "monthly_revenue": "₹40,000 (Yielding 200kg/month)", "monthly_costs": "₹10,000 (Spawn, straw, electricity, transport)", "profit_margin": "75%"}',
  '{"Dark room/shed", "Mushroom spawn", "Wheat/Paddy straw", "Humidifier/Sprayers", "Polythene bags"}',
  '[{"risk": "Contamination (green mold) destroying crop", "mitigation": "Maintain strict surgical hygiene; boil/pasteurize straw perfectly"}, {"risk": "Short shelf life (1-2 days)", "mitigation": "Secure buyers BEFORE harvesting. Dry unsold mushrooms in the sun to sell as powder."}]',
  '[{"name": "Ananya Singh", "city": "Dehradun", "story": "Started growing Oyster mushrooms in her basement. Now supplies 50kg daily to top cafes and sells dried mushroom powder on Amazon."}]'
)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  investment_min = EXCLUDED.investment_min,
  investment_max = EXCLUDED.investment_max,
  location_type = EXCLUDED.location_type,
  time_commitment = EXCLUDED.time_commitment,
  skill_level = EXCLUDED.skill_level,
  monthly_profit_min = EXCLUDED.monthly_profit_min,
  monthly_profit_max = EXCLUDED.monthly_profit_max,
  image_url = EXCLUDED.image_url,
  market_analysis = EXCLUDED.market_analysis,
  competition_strategy = EXCLUDED.competition_strategy,
  roadmap = EXCLUDED.roadmap,
  financial_projections = EXCLUDED.financial_projections,
  resources_needed = EXCLUDED.resources_needed,
  risk_analysis = EXCLUDED.risk_analysis,
  success_stories = EXCLUDED.success_stories;
