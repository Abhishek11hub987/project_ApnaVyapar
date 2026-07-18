# Apna Vyapar - AI-Powered Business Idea Navigator 🚀

Apna Vyapar is a modern, Next.js-based web application designed to empower aspiring entrepreneurs in India. It provides an enriched catalog of deeply researched business ideas, complete with localized market analysis, financial projections, interactive roadmaps, and an AI-powered assistant (Mitra) to guide users step-by-step from idea to execution.

## 🌟 Key Features

- **Comprehensive Business Catalog:** 25+ meticulously detailed business ideas tailored for the Indian market, covering categories like Food, Retail, Technology, Services, and Agriculture.
- **Deep Data & Analytics:** Every business idea includes:
  - Market Size & Demand Analysis
  - Step-by-Step Execution Roadmaps
  - Financial Projections & Break-Even Timelines
  - Real-World Success Stories in India
  - Risk Analysis & Mitigation Strategies
- **Mitra AI Assistant:** An integrated chatbot powered by Gemini, allowing users to ask context-aware questions about any business idea, calculate custom budgets, and seek localized advice.
- **Task Management:** Automatically generate actionable, step-by-step checklists for any selected business idea to track progress.
- **Progressive Web App (PWA):** fully installable on mobile and desktop for a native-like experience.
- **Multi-Language Support:** Seamlessly switch between English and Hindi.
- **Secure Admin Dashboard:** A dedicated, hidden `/admin` panel to track user signups and analytics, protected by a 5-layer enterprise-grade security architecture.

## 🛠️ Technology Stack

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), React, TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), Lucide Icons
- **Backend/Database:** [Supabase](https://supabase.com/) (PostgreSQL, Authentication)
- **AI Integration:** Google Gemini API
- **PWA:** `next-pwa`

## 🔒 5-Layer Security Architecture

Apna Vyapar implements rigorous security standards to protect both user data and admin routes:

1. **Edge Middleware (Route Protection):** Intercepts requests before they hit the server. Verifies active sessions and enforces Role-Based Access Control (RBAC) to block non-admins from `/admin` routes entirely (Returns HTTP 403).
2. **Server-Side Verification:** Server components perform a secondary check against the database to ensure the user hasn't spoofed their session data.
3. **Database Row Level Security (RLS):** Policies are enforced at the PostgreSQL level. Non-admins cannot run `SELECT`, `UPDATE`, or `DELETE` queries on secure tables (like `profiles` or analytics tables).
4. **Anti-Privilege Escalation Triggers:** A custom SQL trigger (`prevent_role_modification()`) monitors the `profiles` table. It ensures that regular authenticated users cannot maliciously update their own profile to assign themselves the `admin` role via the client API.
5. **Strict Security Headers (CSP & HSTS):** The `next.config.js` enforces `Strict-Transport-Security`, `X-Frame-Options (DENY)`, `X-Content-Type-Options (nosniff)`, and a robust Content Security Policy (CSP) to prevent XSS, clickjacking, and packet sniffing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase Project
- A Gemini API Key

### Installation

1. **Clone the repository & Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Database Setup:**
   Run the provided SQL migrations in your Supabase SQL Editor:
   - `supabase/schema.sql` (Creates tables, RLS policies, and seed data)
   - `supabase-secure-role.sql` (Creates the security trigger)
   - `supabase/migrations/003_enrich_all_ideas.sql` (Populates the 25 in-depth business ideas)

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 PWA Configuration
The app is configured as a Progressive Web App. To test it, build the application for production (`npm run build` & `npm run start`). You will see an install icon in the URL bar in supported browsers (like Chrome).

## 📄 License
This project is proprietary and confidential.
