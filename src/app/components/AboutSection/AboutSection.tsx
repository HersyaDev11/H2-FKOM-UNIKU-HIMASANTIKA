'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ABOUT_TEXT = "Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon tidak hanya mengajarkan cara menulis kode, tetapi juga membentuk cara berpikir komputasional untuk memecahkan masalah nyata. Kami mengintegrasikan teknologi terkini, nilai-nilai etika Islami, dan semangat kewirausahaan global.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Scrubbed Word Reveal Animation
      // Kata-kata akan menyala menjadi putih seiring dengan scroll
      gsap.to('.about-word', {
        color: '#FFFFFF',
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-text-container',
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
        }
      });

      // Metrics Animation (Fade Up & Scale)
      gsap.fromTo(
        '.about-stat-card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-stats-container',
            start: 'top 85%',
          }
        }
      );
    },
    { scope: sectionRef }
  );

  // Memecah teks menjadi kata-kata (words) untuk dianimasikan secara individual
  const renderWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="about-word opacity-40 text-neutral-400 inline-block mr-[0.25em] transition-colors duration-300">
        {word}
      </span>
    ));
  };

  const stats = [
    { value: '95', suffix: '%', label: 'Serapan Kerja' },
    { value: '15', suffix: '+', label: 'Dosen Praktisi' },
    { value: '3', suffix: '', label: 'Konsentrasi Studi' },
    { value: 'A', suffix: '', label: 'Akreditasi' },
  ];

  return (
    <section 
      id="profil" 
      ref={sectionRef} 
      className="w-full py-32 md:py-48 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-[#050505] relative overflow-hidden"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-[#DF1A22]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[50vw] h-[50vw] bg-white/5 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="max-w-[100rem] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.02] mb-12 sm:mb-20 backdrop-blur-md">
          <span className="text-[12px] sm:text-[14px] font-bold tracking-[0.2em] text-[#DF1A22] uppercase">
            Tentang Prodi
          </span>
        </div>

        {/* Huge Scrubbed Text */}
        <div className="about-text-container w-full max-w-7xl text-center mb-24 md:mb-32">
          <h2 className="text-[28px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[72px] leading-[1.3] font-normal tracking-[-0.02em]">
            {renderWords(ABOUT_TEXT)}
          </h2>
        </div>

        {/* Metrics Section */}
        <div className="about-stats-container w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="about-stat-card group relative bg-[#111111] border border-white/5 rounded-[32px] p-8 sm:p-10 flex flex-col items-center text-center overflow-hidden hover:border-white/10 transition-colors duration-500"
            >
              {/* Inner Glow on Hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DF1A22]/10 blur-[60px] -mr-20 -mt-20 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              
              <h3 className="text-[48px] sm:text-[64px] xl:text-[80px] text-white font-normal mb-2 leading-none tracking-tight relative z-10">
                {stat.value}
                <span className="text-[#DF1A22]">{stat.suffix}</span>
              </h3>
              <p className="text-[12px] sm:text-[14px] text-neutral-300 font-bold tracking-widest uppercase relative z-10">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
