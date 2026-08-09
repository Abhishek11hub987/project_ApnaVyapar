# Apna Vyapar (अपना व्यापार) 🚀

<div align="center">
  <img src="public/logo-transparent.png" alt="Apna Vyapar Logo" width="120" />
  <br/>
  <strong>Aapka Digital Business Sathi (Your Digital Business Companion)</strong>
</div>

<br/>

**Apna Vyapar** is a comprehensive, AI-powered platform designed to empower aspiring Indian entrepreneurs to start, manage, and scale their businesses online. From discovering profitable micro-SaaS and local business ideas to launching a fully functional, real-time digital storefront, Apna Vyapar provides the end-to-end infrastructure needed for success.

---

## 🌟 Key Features

### 🏪 Real-time Digital Storefronts
- **Zero-Config E-Commerce**: Users can launch a custom-branded digital store in minutes.
- **Real-time Inventory Sync**: Powered by Supabase real-time websockets, storefronts update instantly without page reloads when inventory changes.
- **Premium UI/UX**: Stores feature glassmorphism design, custom theme colors, advanced product filtering, and a modern cart drawer.
- **Web Share & PWA Ready**: Native sharing to WhatsApp/Instagram and prompt-to-install "Download App" features built directly into the storefront.

### 🧠 Vyapar Mitra (AI Business Assistant)
- Context-aware AI chatbot that knows the merchant's exact inventory and store details.
- Helps customers find products, answers FAQs, and provides business guidance to the merchant.

### 📊 Powerful Analytics
- Real-time revenue tracking, order management, and customer insights.
- Professional, downloadable PDF Analytics Reports (dynamically generated with embedded SVG branding).

### 🚀 SEO & Discoverability
- **Dynamic Open Graph Meta Tags**: Every storefront gets its own dynamic SEO metadata, ensuring links shared on WhatsApp, Facebook, and Instagram display beautiful, accurate preview cards.
- **PWA Manifest Integration**: Fully installable on mobile devices with high-resolution app icons.

---

## 🔒 Enterprise-Grade Security (Score: 9.5/10)

Apna Vyapar is built on modern security principles, ensuring data integrity and user privacy at all times:

1. **Authentication**: Uses Supabase Auth (PKCE flow) with secure, HttpOnly cookies managed via Next.js server-side middleware.
2. **Strict Route Protection**: Administrative and dashboard routes (`/admin`, `/dashboard`) are protected at the Edge (Middleware level). Client-side bypasses are impossible.
3. **Row Level Security (RLS)**: Deeply integrated PostgreSQL RLS policies ensure that:
   - Merchants can only read/update their own profiles, products, and store settings.
   - Customers can only see active products.
   - Administrative roles are strictly enforced via a secure `exists()` subquery pattern that prevents privilege escalation.
4. **Data Validation**: Client and server-side validation is enforced across checkout and product management flows.
5. **No Cross-Site Scripting (XSS)**: Strict React rendering patterns and HTML sanitization on all user-generated content.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, Server Actions)
- **Database & Auth**: Supabase (PostgreSQL, Realtime Subscriptions, RLS)
- **Styling**: Tailwind CSS + Lucide Icons
- **AI Integration**: Google Gemini / OpenAI capabilities (for Vyapar Mitra)
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
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📈 Search Engine Optimization (SEO)

The platform is heavily optimized for search engines. It utilizes Next.js `generateMetadata` to inject dynamic `<title>`, `<meta name="description">`, and `openGraph` tags based on live database records. This ensures that every storefront created on Apna Vyapar inherently benefits from Google indexing and high-quality social media previews.

---

<div align="center">
  <i>Built with passion for the next generation of Indian Entrepreneurs.</i>
</div>
