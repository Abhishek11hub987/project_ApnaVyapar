import type { Metadata, Viewport } from "next";
import { Inter, Hind } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const hind = Hind({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

import LoginHandler from "@/components/auth/login-handler";
import { ClientProviders } from "@/components/providers/client-providers";
import { Suspense } from "react";

export const viewport: Viewport = {
  themeColor: "#0F766E",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://apnavyapar.vercel.app"),
  title: "Apna Vyapar",
  description: "Get AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Apna Vyapar - Start Your Business Journey",
    description: "Get AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream business.",
    url: "https://apnavyapar.vercel.app",
    siteName: "Apna Vyapar",
    images: [
      {
        url: "https://apnavyapar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apna Vyapar Social Banner",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apna Vyapar",
    description: "Get AI-powered guidance, business ideas, and step-by-step roadmaps to launch your dream.",
    images: ["https://apnavyapar.vercel.app/og-image.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.className} ${hind.variable} bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 antialiased transition-colors`}>
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