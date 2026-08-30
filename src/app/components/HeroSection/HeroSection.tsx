'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';

// Helper to split text into characters and keep words together for wrapping
const SplitChars = ({ text, className = '' }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, i) => (
            <span key={i} className="inline-block overflow-hidden pb-4 -mb-4">
              <span className={`hero-char inline-block translate-y-[120%] rotate-[3deg] opacity-0 ${className}`}>
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Cinematic Character Reveal (including the inline logo)
      tl.to('.hero-char', {
        y: '0%',
        rotate: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
      });

      // 2. Red Line Expand
      tl.to('.hero-line', {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.inOut',
      }, '-=0.5');

      // 3. Subtitle fade up
      tl.fromTo(
        '.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      // 4. Buttons fade up
      tl.fromTo(
        '.hero-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.6'
      );

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-30 w-full min-h-screen flex items-center justify-center bg-[#111111] text-[#FFFFFF] overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 border-b border-neutral-900"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* COMPLETELY STATIC BACKGROUND */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0"></div>
      
      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full max-w-[120rem] mx-auto flex flex-col items-center text-center mt-[-5vh]">
        
        {/* Cinematic Typography Reveal */}
        <h1 className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[96px] xl:text-[110px] leading-[1.05] font-normal tracking-[-0.03em] max-w-[85rem] mb-6 sm:mb-8 text-[#FFFFFF] flex flex-col justify-center items-center gap-y-2 sm:gap-y-4">
          
          <div className="flex flex-wrap justify-center items-center w-full gap-x-[0.25em] gap-y-[0.1em]">
            <SplitChars text="Mewujudkan" />
            
            {/* INLINE LOGO - Not absolute, flows with text and animates like a character */}
            <span className="inline-block overflow-hidden pb-4 -mb-4 mx-[0.1em]">
              <span className="hero-char inline-flex items-center justify-center translate-y-[120%] rotate-[3deg] opacity-0 bg-white/[0.03] backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(223,26,34,0.15)]">
                <Image 
                  src="/logoprodi/UMC-1.webp" 
                  alt="UMC Logo" 
                  width={90} 
                  height={90} 
                  className="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] md:w-[65px] md:h-[65px] lg:w-[85px] lg:h-[85px] object-contain drop-shadow-md"
                  priority
                />
              </span>
            </span>
            
            <SplitChars text="Inovator" className="text-[#DF1A22]" />
          </div>

          <div className="flex flex-wrap justify-center w-full gap-x-[0.25em] gap-y-[0.1em]">
            <SplitChars text="Masa Depan di Era Digital." />
          </div>

        </h1>

        {/* Aesthetic Animated Divider Line */}
        <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[#DF1A22] to-transparent mb-10 opacity-0 scale-x-0 origin-center hero-line"></div>

        {/* Subtitle */}
        <p className="hero-sub text-[16px] sm:text-[18px] md:text-[22px] text-[#888888] max-w-3xl leading-relaxed mb-12 sm:mb-16 font-light">
          Program Studi Teknik Informatika UMC menghadirkan pendidikan berkualitas global, riset inovatif, dan lingkungan kolaboratif untuk mencetak talenta teknologi berdaya saing tinggi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link 
            href="#pendaftaran"
            className="hero-btn w-full sm:w-auto px-10 py-4 sm:py-4 bg-[#DF1A22] hover:bg-[#B3151B] text-white text-[15px] sm:text-[16px] font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Daftar Sekarang</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
          <Link 
            href="#kurikulum"
            className="hero-btn w-full sm:w-auto px-10 py-4 sm:py-4 bg-transparent border border-neutral-700 hover:border-white text-[#CCCCCC] hover:text-white text-[15px] sm:text-[16px] font-medium rounded-full transition-all duration-300 hover:bg-white/5 flex items-center justify-center"
          >
            Pelajari Kurikulum
          </Link>
        </div>

      </div>

    </section>
  );
}
