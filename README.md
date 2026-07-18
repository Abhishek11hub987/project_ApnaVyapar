<div align="center">
  <img src="public/logo.png" width="120" height="120" alt="Apna Vyapar 3D Logo">
  <h1>🚀 Apna Vyapar</h1>
  <p><strong>An AI‑powered platform empowering aspiring Indian entrepreneurs to discover, evaluate, and launch high‑impact businesses.</strong></p>
  
  <p>
    <a href="#-for-users">🧑‍💼 For Users</a> &nbsp;|&nbsp; 
    <a href="#-for-developers">💻 For Developers</a> &nbsp;|&nbsp; 
    <a href="CONTRIBUTING.md">🤝 Contribute</a>
  </p>
</div>

---

## ✨ Overview

**Apna Vyapar** (अपना व्यापार) is a premium SaaS-style web application built specifically for the Indian market. It guides first-time founders from zero to launch with curated business ideas, interactive data visualization, and an intelligent AI co-pilot. 

The entire platform features a stunning **Project Aethereal** glassmorphism aesthetic—complete with dynamic neon glows, adaptive light/dark modes, and smooth micro-animations.

---

## 🧑‍💼 For Users

Welcome to Apna Vyapar! If you are an aspiring entrepreneur looking to start your first business in India, you are in the right place.

### 🌟 What you can do here:

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

### 🚀 How to access the app:
*Currently, Apna Vyapar is in active development.*
To try it out right now on your own machine, follow the **"For Developers"** instructions below to run it locally at `http://localhost:3000`. 
*(Once we launch publicly, the Live URL will be placed right here!)*

---

## 💻 For Developers

Want to look under the hood, contribute, or run the app locally? Here is everything you need to know.

### 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS (Custom glassmorphism utilities)
- **Animations:** Framer Motion
- **Maps:** `react-simple-maps` with standard WGS84 GeoJSON for accurate projections
- **Database & Auth:** Supabase (PostgreSQL, Row‑Level Security)
- **AI Integration:** Google Gemini / Groq for Mitra AI

### 📦 Local Installation

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
# Visit http://localhost:3000 (or http://localhost:3001 if 3000 is busy)
```

---

## 🤝 Contributing

We welcome all contributions! Whether it's adding new local business ideas, fixing bugs, or translating the app into more regional languages. 

Please read our [**CONTRIBUTING.md**](CONTRIBUTING.md) file for detailed instructions on how to get started.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <em>Built with ❤️ for Indian entrepreneurs.</em>
</div>
