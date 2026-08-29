import QuotesSection from "./components/QuotesSection/QuotesSection";
import FactsSection from "./components/FactsSection/FactsSection";
import GallerySection from "./components/GallerySection/GallerySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FFFFFF]">
      <QuotesSection />
      <FactsSection />
      <GallerySection />
    </main>
  );
}
