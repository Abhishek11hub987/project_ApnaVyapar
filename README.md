<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/briefcase.svg" alt="Apna Vyapar Logo" width="80" height="80">

  <h1 align="center">Apna Vyapar</h1>

  <p align="center">
    <strong>Empowering India's Next Generation of Entrepreneurs</strong>
    <br />
    An AI-powered platform designed to help first-time entrepreneurs in India discover business ideas, understand compliance, and launch successfully.
  </p>

  <p align="center">
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-Auth_%26_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://groq.com/"><img src="https://img.shields.io/badge/Groq-Llama_3-F55036?style=for-the-badge&logo=groq&logoColor=white" alt="Groq" /></a>
  </p>
</div>

<hr />

## ✨ Features

- 🤖 **Vyapar Mitra (AI Advisor)**: An intelligent chatbot powered by Groq and Llama 3. Provides conversational, context-aware guidance in English and Hinglish about business ideas, government schemes, and legal requirements.
- 💡 **Curated Business Ideas**: Browse a comprehensive catalog of tailored Indian business ideas with investment ranges, estimated profits, location requirements, and required licenses.
- 📝 **Dynamic Launch Checklists**: Generate step-by-step launch plans customized to your selected business idea, tracking your progress along the way.
- 🏛️ **Government Schemes Database**: Search and filter through various MSME government schemes, loans, subsidies, and tax benefits.
- 🗺️ **Resource Map**: Find nearby government offices, District Industries Centers (DICs), MSME-DIs, and incubators on an interactive map.

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed and set up:
- Node.js 18+ and npm
- A [Supabase](https://supabase.com/) project
- A [Groq API](https://groq.com/) key

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Project_Apna_Vyapar.git
cd Project_Apna_Vyapar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_APP_NAME=Apna Vyapar
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

Run the SQL scripts provided in the `/supabase` directory within your Supabase project's SQL Editor to set up the necessary tables, Row Level Security (RLS) policies, and seed data:
1. `schema.sql`
2. `seed_business_ideas.sql`
3. `seed_schemes_and_locations.sql`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔒 Security Configurations

This project implements several security best practices before deployment:
- **Strict Content Security Policy (CSP)** and HTTP Security Headers (X-Frame-Options, XSS Protection).
- **Separation of Supabase Clients**: Client-safe usage versus strictly protected Server-side Admin usage.
- **Rate Limiting**: Database-backed rate limiting on the AI API routes to prevent abuse.
- **Input Sanitization**: Utilities to protect against XSS injections.

---

## 📄 License

This project is licensed under the MIT License.
