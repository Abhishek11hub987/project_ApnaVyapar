import type { Metadata, Viewport } from "next";
import { Inter, Hind } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const hind = Hind({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

import BottomNav from "@/components/layout/bottom-nav";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoginHandler from "@/components/auth/login-handler";
import { ClientProviders } from "@/components/providers/client-providers";
import { Suspense } from "react";

export const viewport: Viewport = {
  themeColor: "#0F766E",
};

export const metadata: Metadata = {
  title: "Apna Vyapar",
  description: "Get AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Apna Vyapar",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.className} ${hind.variable} bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 antialiased pb-20 md:pb-0 transition-colors`}>
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
            <BottomNav />
          </div>
          <Suspense fallback={null}>
            <LoginHandler />
          </Suspense>
        </ClientProviders>
      </body>
    </html>
  );
}