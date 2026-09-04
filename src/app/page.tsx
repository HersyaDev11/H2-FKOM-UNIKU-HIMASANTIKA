import dynamic from "next/dynamic";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";

// Dynamic imports for below-the-fold sections to reduce initial bundle size
const AboutSection = dynamic(() => import("./components/AboutSection/AboutSection"));
const VisiMisiSection = dynamic(() => import("./components/VisiMisiSection/VisiMisiSection"));
const FactsSection = dynamic(() => import("./components/FactsSection/FactsSection"));
const QuotesSection = dynamic(() => import("./components/QuotesSection/QuotesSection"));
const PeminatanSection = dynamic(() => import("./components/PeminatanSection/PeminatanSection"));
const GallerySection = dynamic(() => import("./components/GallerySection/GallerySection"));
const TestimonialsSection = dynamic(() => import("./components/TestimonialsSection/TestimonialsSection"));
const MitraSection = dynamic(() => import("./components/MitraSection/MitraSection"));
const FaqContactSection = dynamic(() => import("./components/FaqContactSection/FaqContactSection"));
const Footer = dynamic(() => import("./components/Footer/Footer"));

// Dynamic import Chatbot to code-split its JavaScript bundle
const Chatbot = dynamic(() => import("./components/Chatbot/Chatbot"));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FFFFFF]">

      <Navbar />

      {/* 0. Kinetic Editorial Hero Section (21st.dev Style) */}
      <HeroSection />
      
      <AboutSection />

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

      <FaqContactSection />

      <Footer />

      <Chatbot />
    </main>
  );
}
