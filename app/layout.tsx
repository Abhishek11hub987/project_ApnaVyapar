import type { Metadata, Viewport } from "next";
import { Hind } from "next/font/google";
import "./globals.css";

const hind = Hind({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

import LoginHandler from "@/components/auth/login-handler";
import { ClientProviders } from "@/components/providers/client-providers";
import SplashScreen from "@/components/splash-screen";
import { Suspense } from "react";

export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://apnavyapar.vercel.app"),
  title: "Apna Vyapar",
  description: "AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream business.",
  openGraph: {
    title: "Apna Vyapar - Start Your Business Journey",
    description: "AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream business.",
    url: "https://apnavyapar.vercel.app",
    siteName: "Apna Vyapar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Apna Vyapar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apna Vyapar",
    description: "AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream.",
    images: ["/twitter-image.png"],
  },
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
    <html lang="en">
      <body className={`${hind.variable} bg-surface-secondary text-gray-900 antialiased`} style={{ fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif' }}>
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