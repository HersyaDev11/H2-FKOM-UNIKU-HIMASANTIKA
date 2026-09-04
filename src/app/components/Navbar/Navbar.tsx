'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NAV_LINKS = [
  { id: 'beranda', idLabel: 'Beranda', enLabel: 'Home', href: '/#beranda' },
  { id: 'fakta', idLabel: 'Keunggulan', enLabel: 'Excellence', href: '/#fakta-akademik' },
  { id: 'peminatan', idLabel: 'Peminatan', enLabel: 'Specializations', href: '/#peminatan' },
  { id: 'galeri', idLabel: 'Galeri', enLabel: 'Gallery', href: '/#galeri' },
  { id: 'testimoni', idLabel: 'Alumni', enLabel: 'Alumni', href: '/#testimoni-alumni' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGSAP(
    () => {
      // Elegant initial entrance reveal
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] bg-[#111111]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 sm:py-4 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between transition-all duration-300 select-none font-['Mori',sans-serif] tracking-[-0.01em]"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Left: Brand Monogram & Official Identity */}
      <Link href="#beranda" className="flex items-center gap-3 shrink-0 group">
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-105">
          <Image 
            src="/logoprodi/UMC-1.webp" 
            alt="Logo Teknik Informatika UMC" 
            width={36} 
            height={36} 
            className="object-contain drop-shadow-sm"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium text-[14px] sm:text-[15px] tracking-tight leading-tight group-hover:text-neutral-200 transition-colors">
            {lang === 'ID' ? 'Teknik Informatika' : 'Informatics Engineering'}
          </span>
          <span className="text-neutral-400 font-light text-[11px] sm:text-[12px] tracking-tight leading-tight mt-0.5">
            {lang === 'ID' ? 'Universitas Muhammadiyah Cirebon' : 'Universitas Muhammadiyah Cirebon'}
          </span>
        </div>
      </Link>

      {/* Center: Navigation Links (PP Mori Typography Consistency) */}
      <div className="hidden lg:flex items-center gap-8 xl:gap-10">
        {NAV_LINKS.map((item) => (
          <Link 
            key={item.id} 
            href={item.href} 
            className="group relative py-1 text-[14px] xl:text-[15px] text-neutral-300 hover:text-white transition-colors font-normal tracking-[-0.01em]"
          >
            {lang === 'ID' ? item.idLabel : item.enLabel}
            <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#DF1A22] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </Link>
        ))}
      </div>

      {/* Action Utilities: Language Switcher & Primary CTA Button */}
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <button 
          onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 min-h-[44px] border border-white/10 hover:border-white/25 rounded-full text-neutral-200 hover:text-white transition-all bg-white/[0.03] text-[12px] font-normal cursor-pointer"
          title={lang === 'ID' ? "Ganti Bahasa / Switch Language" : "Switch Language"}
          aria-label={lang === 'ID' ? "Ganti Bahasa" : "Switch Language"}
        >
          <Globe className="w-3.5 h-3.5 text-neutral-300" />
          <span className="font-medium">{lang}</span>
        </button>

        {/* Primary CTA Button (Merah UMC) */}
        <a 
          href="https://pmb.umc.ac.id" 
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 min-h-[44px] bg-[#DF1A22] hover:bg-[#c4151d] text-white text-[13px] sm:text-[14px] font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_8px_20px_-4px_rgba(223,26,34,0.4)]"
        >
          <span>{lang === 'ID' ? 'Daftar PMB' : 'Apply Now'}</span>
        </a>

        {/* Mobile Hamburger Toggle (Touch target min 44x44px) */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 transition-transform rotate-90 duration-200" /> : <Menu className="w-5 h-5 transition-transform duration-200" />}
        </button>
      </div>

      {/* Smooth Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#111111]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl origin-top"
          >
            {NAV_LINKS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.035 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[16px] text-neutral-200 hover:text-white font-normal py-3 min-h-[44px] flex items-center border-b border-white/5 block transition-colors"
                >
                  {lang === 'ID' ? item.idLabel : item.enLabel}
                </Link>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.18 }}
              className="pt-2 flex items-center justify-between"
            >
              <button 
                onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] border border-white/10 rounded-full text-neutral-200 text-[13px] hover:bg-white/5 transition-colors cursor-pointer"
                aria-label={lang === 'ID' ? "Ganti Bahasa" : "Switch Language"}
              >
                <Globe className="w-4 h-4 text-neutral-300" />
                <span>{lang === 'ID' ? 'English' : 'Bahasa Indonesia'}</span>
              </button>

              <a
                href="https://pmb.umc.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] bg-[#DF1A22] hover:bg-[#c4151d] text-white text-[13px] font-medium rounded-full shadow-[0_8px_20px_-4px_rgba(223,26,34,0.4)] transition-all active:scale-95"
              >
                <span>{lang === 'ID' ? 'Daftar PMB' : 'Apply Now'}</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
