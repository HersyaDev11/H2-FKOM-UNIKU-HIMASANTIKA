import dynamic from "next/dynamic";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import VisiMisiSection from "./components/VisiMisiSection/VisiMisiSection";
import FactsSection from "./components/FactsSection/FactsSection";
import QuotesSection from "./components/QuotesSection/QuotesSection";
import PeminatanSection from "./components/PeminatanSection/PeminatanSection";
import GallerySection from "./components/GallerySection/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import MitraSection from "./components/MitraSection/MitraSection";
import Footer from "./components/Footer/Footer";

// Dynamic import Chatbot to code-split its JavaScript bundle
const Chatbot = dynamic(() => import("./components/Chatbot/Chatbot"));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FFFFFF]">

      <Navbar />

      {/* 0. Kinetic Editorial Hero Section (21st.dev Style) */}
      <HeroSection />

      <VisiMisiSection />

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

      <MitraSection />

      <Footer />

      <Chatbot />
    </main>
  );
}
