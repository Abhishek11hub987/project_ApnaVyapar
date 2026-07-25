import { ReactNode } from "react";
import "../globals.css"; // Ensure global styles are loaded

export const metadata = {
  title: "Storefront - Apna Vyapar",
  description: "Browse products on this store.",
};

export default function StoreLayout({ children }: { children: ReactNode }) {
  // Public storefront layout. Completely decoupled from the dashboard.
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {children}
    </div>
  );
}
