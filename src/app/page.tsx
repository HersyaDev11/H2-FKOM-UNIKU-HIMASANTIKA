import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import VisiMisiSection from "./components/VisiMisiSection/VisiMisiSection";
import QuotesSection from "./components/QuotesSection/QuotesSection";
import FactsSection from "./components/FactsSection/FactsSection";
import GallerySection from "./components/GallerySection/GallerySection";
import AdmissionSection from "./components/AdmissionSection/AdmissionSection";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FFFFFF]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VisiMisiSection />
      <QuotesSection />
      <FactsSection />
      <GallerySection />
      <AdmissionSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
