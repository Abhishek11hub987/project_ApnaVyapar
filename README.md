<div align="center">
  <img src="public/logo.png" width="120" height="120" alt="Apna Vyapar 3D Logo">
  <h1>🚀 Apna Vyapar (अपना व्यापार)</h1>
  <p><strong>An AI‑powered platform empowering aspiring Indian entrepreneurs to discover, evaluate, and launch high‑impact businesses.</strong></p>
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge)](https://project-apna-vyapar-fxk4.vercel.app)
  
  <p>
    <a href="#-for-users">🧑‍💼 For Users</a> &nbsp;|&nbsp; 
    <a href="#-for-developers">💻 For Developers</a> &nbsp;|&nbsp; 
    <a href="CONTRIBUTING.md">🤝 Contribute</a>
  </p>
</div>

---

## ✨ Overview

**Apna Vyapar** is a premium SaaS-style web application built specifically for the Indian market. It guides first-time founders from zero to launch with curated business ideas, interactive data visualization, and an intelligent AI co-pilot. 

The entire platform features a stunning **Project Aethereal** glassmorphism aesthetic—complete with dynamic neon glows, adaptive light/dark modes, and smooth micro-animations.

---

## 🏗️ Architecture & Technologies Used

Apna Vyapar is built using a modern, scalable, and highly interactive stack tailored for high performance and excellent user experience:

### 1. Frontend Architecture
- **Framework:** Next.js 14 (App Router) using React 18 and strict TypeScript.
- **Styling:** Tailwind CSS combined with custom glassmorphism utilities for the Aethereal design.
- **State Management:** `zustand` for lightweight global state (e.g., chat history, user points) and React Context API for themes and languages.
- **Animations:** `framer-motion` for fluid swipe cards, page transitions, and staggered list animations.
- **PWA Capabilities:** `@ducanh2912/next-pwa` allows users to install the app natively on their mobile devices.

### 2. Backend & Data Layer
- **Database:** Supabase (PostgreSQL) acts as the primary data store for business ideas, user profiles, chat sessions, and generated roadmaps.
- **Authentication:** Supabase Auth for seamless user login and registration.
- **Security:** Row-Level Security (RLS) ensures that users can only access their own checklists and chat logs.

### 3. AI & Integrations
- **AI Engine:** Groq API (running `llama-3.3-70b-versatile`) acts as the brain for **Vyapar Mitra**. It is deeply integrated via a custom API route (`/api/chat`) that streams tokens directly to the frontend.
- **Dynamic Context Injection:** Before the AI answers, the backend automatically injects the user's selected business idea, their current task checklist progress, and their preferred language (English or Hinglish) into the system prompt.
- **Maps:** `react-simple-maps` paired with a standard WGS84 GeoJSON map of India for an interactive, accurate SVG heatmap.

---

## 🌟 Key Features

- **🔥 25+ Curated Ideas** – Hand-picked opportunities tailored for Indian demographics, budgets, and trends.
- **🗺️ Bharat Heatmap** – Interactive, state-by-state geographic visualization of trending business sectors.
- **🤖 Mitra AI Assistant** – Your 24/7 AI business advisor for compliance, market size, and budget breakdowns.
- **🎲 Idea Roulette** – Tinder-style swipe interface to discover and save business ideas.
- **📈 Vyapar Score** – Gamified XP and progress tracking system.
- **🚨 Sarkari Alerts** – Real-time updates on MSME government schemes (e.g., Mudra Yojana, Stand-Up India).
- **🗂️ Actionable Roadmaps** – Auto‑generated step-by-step checklists to launch your chosen idea.
- **🇮🇳 Multi‑Language Support** – Seamless switching between English and Hindi.

---

## 🧑‍💼 For Users

Welcome to Apna Vyapar! If you are an aspiring entrepreneur looking to start your first business in India, you are in the right place. **[Click here to visit the Live App!](https://project-apna-vyapar-fxk4.vercel.app)**

### What you can do here:

<details>
<summary><b>🎲 Swipe through Business Ideas (Idea Roulette)</b></summary>
Like Tinder, but for your career! Swipe right to save curated business ideas that match your budget and interests. Each swipe earns you Vyapar XP!
</details>

<details>
<summary><b>🗺️ Explore the Bharat Heatmap</b></summary>
Not sure what works in your state? Hover over our interactive map of India to see the most profitable and trending business sectors in your region.
</details>

<details>
<summary><b>🤖 Chat with Mitra AI</b></summary>
Got questions about legal registrations, GST, or startup capital? Talk to **Vyapar Mitra**, our 24/7 AI business advisor designed to answer your specific queries.
</details>

<details>
<summary><b>🚨 Stay updated on Sarkari Yojanas (Govt Schemes)</b></summary>
Get real-time alerts on MSME loans like Mudra Yojana or Stand-Up India, so you never miss out on financial support.
</details>

---

## 💻 For Developers

Want to look under the hood, contribute, or run the app locally? Here is everything you need to know.

### Local Installation

Follow these steps to run the Apna Vyapar development server on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/Abhishek11hub987/project_ApnaVyapar.git
cd project_ApnaVyapar

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.local.example .env.local
```

**⚠️ Important:** Open `.env.local` and add your required API keys:
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GROQ_API_KEY` (for Mitra AI)

```bash
# 4. Run the development server
npm run dev

# 5. Open the app in your browser
# Visit http://localhost:3000
```

### Contributing
We welcome all contributions! Please read our [**CONTRIBUTING.md**](CONTRIBUTING.md) file for detailed instructions on how to submit code, ideas, or translations.

---

## 📜 License

Distributed under the **Apna Vyapar Proprietary & Non-Commercial License**. 
This project is strictly for educational and personal use. **Commercial use, monetization, or copying the core concept to build a competing product is strictly prohibited.** See the [**LICENSE**](LICENSE) file for full details.

---

<div align="center">
  <em>"व्यापार में जोखिम ही सबसे बड़ा मुनाफा है।"</em><br>
  (In business, taking risks is the biggest profit.)<br><br>
  Built with ❤️ for Indian entrepreneurs.
</div>
