'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Data dummy untuk mitra dengan Logo SVG
const partners = [
  {
    name: 'Microsoft',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 shrink-0">
        <path fill="#f35325" d="M2 2h9v9H2z"/><path fill="#81bc06" d="M13 2h9v9h-9z"/><path fill="#05a6f0" d="M2 13h9v9H2z"/><path fill="#ffba08" d="M13 13h9v9h-9z"/>
      </svg>
    )
  },
  {
    name: 'Google',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 shrink-0">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: 'Tokopedia',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 group-hover:text-[#42B549] transition-colors duration-500 shrink-0">
        <path d="M19 6h-4V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h2v2h-2V4zm8 16H5V8h14v12z" fill="currentColor"/>
        <path d="M12 14c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'AWS',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 group-hover:text-[#FF9900] transition-colors duration-500 shrink-0">
        <path d="M17.5 19.5c-1.5 1.5-4.5 2-7.5 2s-6-.5-7.5-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 20.5l2.5-1-1-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="12" y="14" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">AWS</text>
      </svg>
    )
  },
  {
    name: 'Cisco',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 group-hover:text-[#00bceb] transition-colors duration-500 shrink-0">
        <rect x="2" y="10" width="2" height="4" fill="currentColor"/>
        <rect x="6" y="8" width="2" height="8" fill="currentColor"/>
        <rect x="10" y="4" width="2" height="16" fill="currentColor"/>
        <rect x="14" y="8" width="2" height="8" fill="currentColor"/>
        <rect x="18" y="10" width="2" height="4" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Telkom Indonesia',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 group-hover:text-[#EE2E24] transition-colors duration-500 shrink-0">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: 'Bukalapak',
    logo: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-600 group-hover:text-[#E31E52] transition-colors duration-500 shrink-0">
        <path d="M12 2L2 22h20L12 2z" fill="currentColor"/>
      </svg>
    )
  }
];

export default function MitraSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useGSAP(() => {
    // 1. Reveal header
    gsap.fromTo(
      '.mitra-header',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    // 2. Infinite Marquee GSAP
    if (marqueeRef.current) {
      const track = marqueeRef.current.querySelector('.marquee-track');
      
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 32,
        repeat: -1,
      });
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 w-full py-12 sm:py-16 bg-[#111111] border-t border-white/[0.06] overflow-hidden font-['Mori',sans-serif] tracking-[-0.01em]"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 mb-6 sm:mb-8 text-center">
        <span className="mitra-header inline-block text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-[#DF1A22] uppercase">
          {lang === 'ID' ? 'Kemitraan Industri & Kolaborasi Strategis' : 'Industrial Partnership & Strategic Collaboration'}
        </span>
      </div>

      {/* Marquee Container with Fading Edges via CSS Mask */}
      <div 
        ref={marqueeRef}
        className="relative w-full flex items-center h-14 sm:h-16 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Scrolling Track with 2x duplication for seamless infinite 50% looping */}
        <div className="marquee-track flex items-center w-max shrink-0 will-change-transform transform-gpu">
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center gap-3 min-w-max group cursor-pointer px-6 sm:px-8 lg:px-10"
            >
              {/* Logo */}
              <div className="flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {partner.logo}
              </div>
              {/* Nama Perusahaan */}
              <span className="text-[15px] sm:text-[17px] lg:text-[19px] font-normal text-neutral-400 group-hover:text-white transition-colors duration-300 select-none whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
