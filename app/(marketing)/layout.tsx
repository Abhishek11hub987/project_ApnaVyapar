import Footer from "@/components/layout/footer";
import Logo from "@/components/logo";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="absolute top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo iconSize={32} />
        </Link>
        <Link href="/?login=true" className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg">
          Log in
        </Link>
      </header>
      
      <div className="flex-grow pt-10">
        {children}
      </div>
      
      <Footer />
    </div>
  );
}
