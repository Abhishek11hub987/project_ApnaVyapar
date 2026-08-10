# Apna Vyapar (अपना व्यापार) 🚀

<div align="center">
  <img src="public/logo-transparent.png" alt="Apna Vyapar Logo" width="120" />
  <br/>
  <strong>Aapka Digital Business Sathi (Your Digital Business Companion)</strong>
</div>

<br/>

**Apna Vyapar** is a comprehensive, AI-powered platform designed to empower aspiring Indian entrepreneurs to start, manage, and scale their businesses online. From discovering profitable micro-SaaS and local business ideas to launching a fully functional, real-time digital storefront, Apna Vyapar provides the end-to-end infrastructure needed for success.

---

## 🌟 Comprehensive Feature Suite

### 💡 Business Ideas Engine & Roulette
- **AI-Curated Catalog**: Browse high-profit, hand-picked business ideas tailored specifically for the Indian market.
- **Detailed Roadmaps**: Every idea comes with deep insights including Market Analysis, Financial Projections, Risk Mitigation, and a step-by-step Execution Roadmap.
- **Idea Roulette**: Don't know where to start? "Spin the wheel" with our Business Idea Roulette to randomly discover your next big venture.

### 🏪 Real-time Digital Storefronts
- **Zero-Config E-Commerce**: Launch a custom-branded digital store in minutes using our intuitive Store Builder.
- **Real-time Inventory Sync**: Powered by Supabase real-time websockets, storefronts update instantly without page reloads when inventory changes.
- **Web Share & PWA Ready**: Native sharing to WhatsApp/Instagram and prompt-to-install "Download App" features built directly into the storefront.

### 🤖 Vyapar Mitra (AI Business Assistant)
- Your 24/7 personal AI business consultant integrated directly into your dashboard.
- Context-aware chatbot that understands your exact inventory, business type, and market challenges to provide actionable advice.

### 📋 Smart Setup Checklist
- A tailored step-by-step blueprint guiding you through the exact requirements for your specific business.
- Tracks legal guidance (GST, MSME) and operational tasks to ensure a smooth launch.

### 👥 Customer CRM & Digital Profiles
- **Centralized Identity**: A complete Profile System to manage your account details, notifications, and settings securely.
- **Customer Management**: Track your leads, log customer communication, and manage your sales pipeline. 
- **Export Data**: Easily export your customer lists and order history to CSV for external accounting or marketing.

### 📊 Advanced Analytics & Downloadable Reports
- **Real-time Dashboards**: Monitor sales, profit margins, and traffic trends as they happen.
- **Professional Reports**: Download instantly generated, branded PDF analytics reports for your stakeholders or records.

### 🚀 SEO & Discoverability
- **Dynamic Open Graph Meta Tags**: Every storefront gets its own dynamic SEO metadata, ensuring links shared on WhatsApp, Facebook, and Instagram display beautiful, accurate preview cards.

---

## 🔒 Enterprise-Grade Security

Apna Vyapar is built on modern security principles, ensuring data integrity and user privacy at all times:

1. **Authentication**: Uses Supabase Auth (PKCE flow) with secure, HttpOnly cookies managed via Next.js server-side middleware.
2. **Strict Route Protection**: Administrative and dashboard routes are protected at the Edge (Middleware level). Client-side bypasses are impossible.
3. **Row Level Security (RLS)**: Deeply integrated PostgreSQL RLS policies ensure strict data isolation between merchants and customers.
4. **Data Validation**: Client and server-side validation is enforced across all API routes and checkout flows using Zod.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, Server Actions)
- **Database & Auth**: Supabase (PostgreSQL, Realtime Subscriptions, RLS)
- **Styling**: Tailwind CSS + Lucide Icons
- **AI Integration**: Google Gemini / OpenAI capabilities
- **Deployment**: Vercel (Edge Network)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase Project (Database, Auth)
- Vercel Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek11hub987/project_ApnaVyapar.git
   cd project_ApnaVyapar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🤝 Contact & Support

This project is built and maintained by a solo developer. I am always open to feedback, bug reports, and exciting new ideas to make Apna Vyapar better for everyone!

📧 **Email:** [paradoxhq3@gmail.com](mailto:paradoxhq3@gmail.com)  
🐙 **GitHub:** [Abhishek11hub987](https://github.com/Abhishek11hub987)

---

<div align="center">
  <em>"व्यापार में जोखिम ही सबसे बड़ा मुनाफा है।"</em><br>
  (In business, taking risks is the biggest profit.)<br><br>
  Built with ❤️ for Indian entrepreneurs.
</div>
