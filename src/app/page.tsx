import QuotesSection from "./components/QuotesSection/QuotesSection";
import FactsSection from "./components/FactsSection/FactsSection";
import PeminatanSection from "./components/PeminatanSection/PeminatanSection";
import GallerySection from "./components/GallerySection/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FFFFFF]">
      {/* 1. 5 Pilar Keunggulan & Fakta Akademik */}
      <FactsSection />

      {/* 2. Grand Opening Quote / Sambutan Interaktif GSAP */}
      <QuotesSection />

      {/* 3. Pilihan Peminatan & Domain Keahlian */}
      <PeminatanSection />

      {/* 4. Galeri Aktivitas & Praktikum 3D Coverflow */}
      <GallerySection />

      {/* 5. Section Testimoni Alumni Reel (Paling Akhir Tetap) */}
      <TestimonialsSection />
    </main>
  );
}

