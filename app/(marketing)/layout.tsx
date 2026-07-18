import Footer from "@/components/layout/footer";
import MarketingHeader from "@/components/layout/marketing-header";
import BottomNav from "@/components/layout/bottom-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <MarketingHeader />
      
      <div className="flex-grow pt-10">
        {children}
      </div>
      
      <Footer />
      <BottomNav />
    </div>
  );
}
