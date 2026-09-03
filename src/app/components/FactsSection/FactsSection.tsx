'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Pilar Keunggulan & Fakta Akademik Teknik Informatika UMC (General, Aman & Berbobot untuk Lomba)
const factsList = [
  {
    num: '01',
    titleId: 'Kurikulum Adaptif Berbasis Kebutuhan Industri',
    titleEn: 'Adaptive Curriculum Based on Industry Needs',
    categoryId: 'Rekayasa Perangkat Lunak, AI & Cloud',
    categoryEn: 'Software Engineering, AI & Cloud',
  },
  {
    num: '02',
    titleId: 'Penguatan Praktikum & Project-Based Learning',
    titleEn: 'Strengthening Practicum & Project-Based Learning',
    categoryId: 'Portofolio Produk & Studi Kasus Nyata',
    categoryEn: 'Product Portfolio & Real Case Studies',
  },
  {
    num: '03',
    titleId: 'Pembekalan Kompetensi & Keahlian Digital',
    titleEn: 'Provision of Digital Competencies & Skills',
    categoryId: 'Kesiapan Karier & Standar Profesional',
    categoryEn: 'Career Readiness & Professional Standards',
  },
  {
    num: '04',
    titleId: 'Inovasi Riset & Pengabdian Berbasis Teknologi',
    titleEn: 'Research Innovation & Technology-Based Community Service',
    categoryId: 'Solusi Digital Tepat Guna untuk Masyarakat',
    categoryEn: 'Appropriate Digital Solutions for Society',
  },
  {
    num: '05',
    titleId: 'Peluang Karier Luas di Era Transformasi Digital',
    titleEn: 'Broad Career Opportunities in the Digital Transformation Era',
    categoryId: 'Software Engineer, Data & Tech Innovator',
    categoryEn: 'Software Engineer, Data & Tech Innovator',
  },
];

export default function FactsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

  useGSAP(
    () => {
      // Smooth reveal for list rows with immediateRender: false
      gsap.fromTo(
        '.facts-list-row',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="fakta-akademik"
      className="relative z-20 w-full min-h-screen bg-[#FFFFFF] text-[#111111] py-20 sm:py-28 md:py-36 select-none font-['Mori',sans-serif] tracking-[-0.01em] shadow-[0_-30px_70px_rgba(0,0,0,0.35)] border-t border-[#DF1A22]/25 overflow-hidden"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Mobile-Only Subtle Colored Background Watermark */}
      <div 
        aria-hidden="true" 
        className="lg:hidden pointer-events-none absolute -right-8 sm:-right-16 top-10 sm:top-14 w-60 h-60 sm:w-80 sm:h-80 select-none z-0 opacity-[0.10] overflow-hidden flex items-center justify-center"
      >
        <Image
          src="/logoprodi/UMC-1.webp"
          alt="Watermark Logo UMC"
          width={320}
          height={320}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        
        {/* Section Header: Side-by-side on Laptop, Full-Width Headline with Mobile Watermark */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 sm:gap-12 lg:gap-14 xl:gap-16 mb-12 sm:mb-16 md:mb-20">
          
          {/* Left: Grand Headline */}
          <div className="max-w-4xl xl:max-w-5xl">
            {/* Grand Headline matching Quotes Headline Scale and Tracking */}
            <h2 className="facts-grand-title text-[33px] leading-[43px] sm:text-[48px] sm:leading-[58px] md:text-[60px] md:leading-[72px] lg:text-[72px] lg:leading-[86px] xl:text-[80.9999px] xl:leading-[97.1999px] font-normal tracking-[-0.01em] text-[#111111]">
              {lang === 'ID' ? 'Fakta di balik kualitas lulusan & kurikulum masa depan Teknik Informatika UMC.' : 'Facts behind the quality of graduates & the future curriculum of UMC Informatics Engineering.'}
            </h2>
          </div>

          {/* Right: Full Official Logo UMC on Laptop (Original Full Scale) */}
          <div className="facts-grand-title hidden lg:flex shrink-0 items-center justify-end lg:-translate-x-6 xl:-translate-x-12">
            <Image
              src="/logoprodi/UMC-1.webp"
              alt="Logo Teknik Informatika UMC"
              width={400}
              height={400}
              className="lg:w-76 lg:h-76 xl:w-88 xl:h-88 object-contain select-none pointer-events-none drop-shadow-sm"
              loading="lazy"
            />
          </div>

        </div>

        {/* 21st.dev Style Full-Width Interactive List (General, Credible & Infallible) */}
        <div className="facts-list-container w-full flex flex-col border-t border-neutral-200">
          {factsList.map((fact, index) => (
            <div
              key={index}
              className="facts-list-row group flex w-full cursor-pointer flex-col md:flex-row md:items-center justify-between border-b border-neutral-200 py-5 sm:py-6 md:py-7 px-2 sm:px-4 transition-all duration-300 hover:bg-neutral-50/80"
            >
              {/* Left: Fixed-width Number Column + Increased Gap to Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 md:gap-12 lg:gap-14 max-w-5xl flex-1">
                {/* Fixed-Width Giant Number Column with Tabular Numbers */}
                <div className="w-16 sm:w-24 md:w-28 lg:w-32 shrink-0 flex items-center justify-start">
                  <span
                    className="text-[52px] sm:text-[72px] md:text-[90px] lg:text-[108px] font-bold tracking-tighter tabular-nums leading-none text-[#111111]/[0.07] group-hover:text-[#DF1A22] transition-colors duration-300 select-none block"
                    aria-hidden="true"
                  >
                    {fact.num}
                  </span>
                </div>

                {/* Mori Title: Perfectly Flush & Vertically Aligned */}
                <h3 className="m-0 text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-normal tracking-[-0.015em] text-[#111111] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#DF1A22]">
                  {lang === 'ID' ? fact.titleId : fact.titleEn}
                </h3>
              </div>

              {/* Right: Subtitle Category */}
              <div className="mt-3 md:mt-0 flex items-center shrink-0">
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[#334155] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00853F] tracking-[-0.01em]">
                  {lang === 'ID' ? fact.categoryId : fact.categoryEn}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
