'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

  useGSAP(
    () => {
      // Staggered reveal for footer elements
      gsap.fromTo(
        '.footer-element',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="relative z-20 w-full bg-[#111111] text-[#FFFFFF] py-14 sm:py-20 md:py-24 px-5 sm:px-12 md:px-16 lg:px-24 xl:px-32 border-t border-neutral-800/80 overflow-hidden font-['Mori',sans-serif] tracking-[-0.01em]"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="w-full max-w-[120rem] mx-auto flex flex-col md:flex-row justify-between gap-10 sm:gap-16 md:gap-20">
        
        {/* Left Side: Brand & Description */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-3.5 sm:gap-6 mb-5 sm:mb-8">
            <div className="footer-element relative w-11 h-11 sm:w-16 sm:h-16 shrink-0 grayscale-0 opacity-100 sm:grayscale sm:hover:grayscale-0 sm:opacity-80 sm:hover:opacity-100 transition-all duration-500">
               <Image 
                  src="/logoprodi/UMC-1.webp" 
                  alt="Logo Universitas Muhammadiyah Cirebon" 
                  fill 
                  sizes="(max-width: 640px) 44px, 64px"
                  loading="lazy"
                  className="object-contain"
               />
            </div>
            <h2 className="footer-element text-[22px] sm:text-[34px] md:text-[40px] font-normal tracking-[-0.02em] leading-none mt-1">
              {lang === 'ID' ? 'Teknik Informatika UMC' : 'UMC Informatics Engineering'}
            </h2>
          </div>
          <p className="footer-element text-neutral-300 text-[14px] sm:text-[17px] leading-relaxed mb-6 sm:mb-8">
            {lang === 'ID' 
              ? 'Mencetak talenta digital berdaya saing global melalui pendidikan berkualitas, riset inovatif, dan kolaborasi industri yang berkelanjutan.'
              : 'Producing globally competitive digital talents through quality education, innovative research, and sustainable industry collaboration.'
            }
          </p>
          <div className="footer-element flex flex-wrap items-center gap-4 sm:gap-6">
            <a 
              href="https://www.instagram.com/officialpmbumc.id?igsi=emMyc2R0cnVpdno4" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-[#DF1A22] transition-colors duration-300 font-normal text-[14px] sm:text-[15px] py-2 min-h-[44px] flex items-center"
            >
              Instagram
            </a>
            <a 
              href="https://www.tiktok.com/@officialpmbumc.id?_r=1&_t=ZS-99P4h0p6NOe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-[#DF1A22] transition-colors duration-300 font-normal text-[14px] sm:text-[15px] py-2 min-h-[44px] flex items-center"
            >
              TikTok
            </a>
            <a 
              href="https://youtube.com/@umcirebon?si=ZAqeRaGlU7BZBITI" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-[#DF1A22] transition-colors duration-300 font-normal text-[14px] sm:text-[15px] py-2 min-h-[44px] flex items-center"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Right Side: Links in Clean 2-Column Grid on Mobile */}
        <div className="flex-1 grid grid-cols-2 gap-8 sm:flex sm:flex-row sm:gap-16 lg:gap-24 justify-start md:justify-end">
          
          <div className="flex flex-col gap-1.5 sm:gap-3.5">
            <h3 className="footer-element text-[16px] sm:text-[19px] font-medium tracking-tight mb-1 sm:mb-2 text-white">
              {lang === 'ID' ? 'Navigasi' : 'Navigation'}
            </h3>
            <Link href="#beranda" className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center">
              {lang === 'ID' ? 'Beranda' : 'Home'}
            </Link>
            <Link href="#visi-misi" className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center">
              {lang === 'ID' ? 'Visi & Misi' : 'Vision & Mission'}
            </Link>
            <Link href="#fakta-akademik" className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center">
              {lang === 'ID' ? 'Keunggulan' : 'Excellence'}
            </Link>
            <Link href="#peminatan" className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center">
              {lang === 'ID' ? 'Peminatan' : 'Specializations'}
            </Link>
            <Link href="#galeri" className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center">
              {lang === 'ID' ? 'Galeri' : 'Gallery'}
            </Link>
            <Link href="#testimoni-alumni" className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center">
              {lang === 'ID' ? 'Alumni' : 'Alumni'}
            </Link>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-3.5">
            <h3 className="footer-element text-[16px] sm:text-[19px] font-medium tracking-tight mb-1 sm:mb-2 text-white">
              {lang === 'ID' ? 'Informasi Resmi' : 'Official Info'}
            </h3>
            <a 
              href="https://pmb.umc.ac.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center"
            >
              {lang === 'ID' ? 'Pendaftaran (PMB)' : 'Registration (PMB)'}
            </a>
            <a 
              href="https://umc.ac.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-element text-neutral-300 hover:text-white transition-colors duration-300 text-[14px] sm:text-[15px] py-2 sm:py-0.5 min-h-[36px] flex items-center"
            >
              {lang === 'ID' ? 'Website Universitas' : 'University Website'}
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="footer-element w-full max-w-[120rem] mx-auto mt-10 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-neutral-300 text-[13px] sm:text-[13.5px]">
        <p>© {new Date().getFullYear()} {lang === 'ID' ? 'Prodi Teknik Informatika Universitas Muhammadiyah Cirebon.' : 'Informatics Engineering Study Program, Universitas Muhammadiyah Cirebon.'}</p>
        <p className="text-neutral-400 text-[12.5px] sm:text-[13px]">Jl. Tuparev No. 70, Cirebon, Jawa Barat</p>
      </div>
    </footer>
  );
}
