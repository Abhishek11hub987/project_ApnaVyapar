<div align="center">
  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80" alt="Apna Vyapar Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  <h1>🚀 Apna Vyapar</h1>
  <p><strong>Your Ultimate AI-Powered Business Idea Navigator for India</strong></p>

  <h3>🔥 <a href="https://your-live-url.vercel.app">Click Here to Use the Live App!</a> 🔥</h3>

  <p>
    <a href="#features">Features</a> •
    <a href="#catalog">Business Catalog</a> •
    <a href="#ai-assistant">Mitra AI</a> •
    <a href="#for-developers--open-source">For Developers</a>
  </p>
</div>

---

## 🌟 Welcome to Apna Vyapar

**Apna Vyapar** is a premium, beautifully designed open-source web application built to empower aspiring entrepreneurs across India. Instead of vague ideas, Apna Vyapar provides deeply researched, actionable business blueprints. 

If you just want to find a great business idea, **[use the live app here](https://your-live-url.vercel.app)**! You do not need to download this code to use the app.

---

## ✨ Features That Stand Out

- 📚 **Comprehensive 25+ Business Catalog:** Hand-picked, highly profitable business ideas specifically curated for the Indian market.
- 🤖 **Mitra AI Assistant:** Stuck on a step? Need a custom budget? Chat with our integrated AI assistant powered by Google Gemini.
- 📊 **Deep Data & Analytics:** Every single business idea comes with Estimated Market Size, Execution Roadmaps, Financial Projections, and Risk Strategies.
- ✅ **Task Management:** Automatically generate actionable checklists for any business idea.
- 📱 **Progressive Web App (PWA):** Install Apna Vyapar directly to your mobile phone or desktop for a native app experience.
- 🇮🇳 **Multi-Language Support:** Seamlessly switch the entire platform between English and Hindi.

---

## 🔒 Enterprise-Grade Security

We take user data seriously. Apna Vyapar is fortified with a **5-Layer Security Architecture**:
1. **Edge Middleware (RBAC):** Strict Role-Based Access Control ensuring only verified admins can access sensitive routes.
2. **Server-Side Verification:** Double verification on all secure API routes.
3. **Database RLS:** Robust Row Level Security (RLS) via Supabase PostgreSQL.
4. **Anti-Privilege Escalation:** Custom PostgreSQL triggers preventing any malicious role changes.
5. **Strict Security Headers:** Comprehensive CSP (Content Security Policy), HSTS, and X-Frame-Options.

---

## 💻 For Developers / Open Source

Apna Vyapar is proudly Open Source! If you are a developer and want to contribute or run the project locally, follow these steps:

### Tech Stack
`Next.js 14` • `Tailwind CSS` • `TypeScript` • `Supabase` • `Google Gemini AI`

### Local Installation

1. **Clone & Install:**
   ```bash
   git clone https://github.com/Abhishek11hub987/project_ApnaVyapar.git
   cd project_ApnaVyapar
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file using the provided `.env.local.example` and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Database Setup:**
   Run the provided SQL migrations in your Supabase SQL Editor:
   - `supabase/schema.sql` 
   - `supabase-secure-role.sql` 
   - `supabase/migrations/003_enrich_all_ideas.sql` 

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

We welcome pull requests and community contributions! 

---
<div align="center">
  <p><i>"The secret of getting ahead is getting started."</i></p>
</div>
