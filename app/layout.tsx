import type { Metadata, Viewport } from "next";
import { Hind } from "next/font/google";
import "./globals.css";

const hind = Hind({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

import LoginHandler from "@/components/auth/login-handler";
import { ClientProviders } from "@/components/providers/client-providers";
import SplashScreen from "@/components/splash-screen";
import { Suspense } from "react";
import { GlobalBackground } from "@/components/ui/global-background";

export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://apnavyapar.vercel.app"),
  title: "Apna Vyapar",
  description: "AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream business.",
  keywords: ["Apna Vyapar", "Business Ideas", "Micro-SaaS", "Digital Storefront", "Indian Entrepreneurship", "Start a Business"],
  openGraph: {
    title: "Apna Vyapar - Start Your Business Journey",
    description: "AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream business.",
    url: "https://apnavyapar.vercel.app",
    siteName: "Apna Vyapar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo-transparent.png",
        width: 800,
        height: 800,
        alt: "Apna Vyapar Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apna Vyapar",
    description: "AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream.",
    images: ["/logo-transparent.png"],
  },
  icons: {
    icon: "/logo-transparent.png",
    shortcut: "/logo-transparent.png",
    apple: "/logo-transparent.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Apna Vyapar",
    startupImage: ["/logo-transparent.png"],
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
    <html lang="en">
      <body className={`${hind.variable} bg-surface-secondary text-gray-900 antialiased`} style={{ fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif' }}>
        <GlobalBackground />
        <SplashScreen />
        <ClientProviders>
          {children}
          <Suspense fallback={null}>
            <LoginHandler />
          </Suspense>
        </ClientProviders>
      </body>
    </html>
  );
}