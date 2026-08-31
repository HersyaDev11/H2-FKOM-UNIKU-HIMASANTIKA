'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  useGSAP(
    () => {
      // 1. Entrance animation (Slide down from top)
      gsap.fromTo(
        navRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
      );
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3 sm:py-4 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between transition-all duration-300"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Left: Brand / Logo */}
      <Link href="#" className="flex items-center gap-3 shrink-0 group">
        <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
          <Image 
            src="/logoprodi/UMC-1.webp" 
            alt="Logo UMC" 
            width={32} 
            height={32} 
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium text-[15px] sm:text-[16px] tracking-tight leading-tight">Teknik Informatika</span>
          <span className="text-neutral-500 text-[10px] sm:text-[11px] uppercase tracking-widest leading-tight mt-0.5">Univ. Muhammadiyah Cirebon</span>
        </div>
      </Link>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-10">
        {[
          { id: 'home', idLabel: 'Beranda', enLabel: 'Home', href: '#' },
          { id: 'profile', idLabel: 'Profil', enLabel: 'Profile', href: '#profil' },
          { id: 'curriculum', idLabel: 'Kurikulum', enLabel: 'Academics', href: '#kurikulum' },
          { id: 'facts', idLabel: 'Fakta', enLabel: 'Facts', href: '#Fakta' },
          { id: 'gallery', idLabel: 'Galeri', enLabel: 'Gallery', href: '#gallery' },
        ].map((item) => (
          <Link key={item.id} href={item.href} className="group relative py-1 text-[13.5px] xl:text-[14px] text-neutral-400 hover:text-white transition-colors font-medium tracking-wider">
            {lang === 'ID' ? item.idLabel : item.enLabel}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#DF1A22] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </Link>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Language Toggle */}
        <button 
          onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-neutral-800 hover:border-neutral-500 rounded-full text-neutral-300 hover:text-white transition-colors bg-[#0A0A0A]"
          title="Change Language"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
          </svg>
          <span className="text-[12px] font-semibold w-5 text-center">{lang}</span>
        </button>

        {/* CTA Button */}
        <Link 
          href="#pendaftaran" 
          className="hidden sm:flex px-6 py-2.5 bg-[#DF1A22] hover:bg-[#B3151B] text-white text-[13px] font-medium rounded-full transition-colors shadow-lg shadow-[#DF1A22]/20 items-center justify-center"
        >
          {lang === 'ID' ? 'Daftar PMB' : 'Apply'}
        </Link>

        {/* Mobile Hamburger Menu */}
        <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
}
