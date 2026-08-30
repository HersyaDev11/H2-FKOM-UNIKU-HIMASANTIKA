'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Ensure ScrollTrigger refreshes accurately
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

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

      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="relative z-20 w-full bg-[#111111] text-[#FFFFFF] py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 border-t border-neutral-800 overflow-hidden"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="w-full max-w-[120rem] mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-20">
        
        {/* Left Side: Brand & Description */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-4 sm:gap-6 mb-8">
            <div className="footer-element relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-500">
               <Image 
                  src="/logoprodi/UMC-1.webp" 
                  alt="Logo Universitas Muhammadiyah Cirebon" 
                  fill 
                  className="object-contain"
               />
            </div>
            <h2 className="footer-element text-[28px] sm:text-[36px] md:text-[42px] font-normal tracking-[-0.02em] leading-none mt-1">
              Teknik Informatika UMC
            </h2>
          </div>
          <p className="footer-element text-[#A3A3A3] text-[16px] sm:text-[18px] leading-relaxed mb-8">
            Mencetak talenta digital berdaya saing global melalui pendidikan berkualitas, riset inovatif, dan kolaborasi industri yang berkelanjutan.
          </p>
          <div className="footer-element flex items-center gap-6">
            <a href="#" className="text-white hover:text-[#DF1A22] transition-colors duration-300">
              Instagram
            </a>
            <a href="#" className="text-white hover:text-[#DF1A22] transition-colors duration-300">
              LinkedIn
            </a>
            <a href="#" className="text-white hover:text-[#DF1A22] transition-colors duration-300">
              YouTube
            </a>
          </div>
        </div>

        {/* Right Side: Links */}
        <div className="flex-1 flex flex-wrap gap-12 sm:gap-24 justify-start md:justify-end">
          
          <div className="flex flex-col gap-4">
            <h3 className="footer-element text-[20px] font-medium tracking-tight mb-2">Navigasi</h3>
            <Link href="#quotes" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Tentang Kami</Link>
            <Link href="#tahukah-kamu" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Fakta Akademik</Link>
            <Link href="#gallery" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Galeri & Kehidupan</Link>
            <Link href="#kontak" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Hubungi Kami</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="footer-element text-[20px] font-medium tracking-tight mb-2">Akademik</h3>
            <a href="#" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Kurikulum</a>
            <a href="#" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Dosen</a>
            <a href="#" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Fasilitas</a>
            <a href="#" className="footer-element text-[#A3A3A3] hover:text-white transition-colors duration-300">Pendaftaran</a>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="footer-element w-full max-w-[120rem] mx-auto mt-16 sm:mt-24 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#A3A3A3] text-[14px]">
        <p>© {new Date().getFullYear()} Teknik Informatika UMC. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
