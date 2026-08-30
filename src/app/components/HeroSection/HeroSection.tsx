'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 2 Staggered Columns of Gallery Images for Pinterest-style Infinite Scroll
const COLUMN_1 = [
  { src: '/gallery/praktik-mahasiswa-1.webp', alt: 'Praktikum Coding Mahasiswa TI UMC', height: 'h-60' },
  { src: '/gallery/pembelajaran-jaringan.webp', alt: 'Praktik Jaringan Komputer', height: 'h-48' },
  { src: '/gallery/lab-komputer.webp', alt: 'Laboratorium Komputer Terpadu', height: 'h-52' },
  { src: '/gallery/seminar-nasional-ti.webp', alt: 'Seminar Nasional Teknologi', height: 'h-64' },
  { src: '/gallery/karya-peta-desa.webp', alt: 'Pengembangan Aplikasi Desa', height: 'h-50' },
];

const COLUMN_2 = [
  { src: '/gallery/pembelajaran-kuliah.webp', alt: 'Perkuliahan Interaktif TI UMC', height: 'h-52' },
  { src: '/gallery/ujian-semester.webp', alt: 'Evaluasi & Ujian Praktikum', height: 'h-60' },
  { src: '/gallery/pengabdian-desa.webp', alt: 'Pengabdian Masyarakat Berbasis IT', height: 'h-48' },
  { src: '/gallery/peta-desa-cikondang.webp', alt: 'Karya Sistem Informasi Spasial', height: 'h-56' },
  { src: '/gallery/praktik-mahasiswa-2.webp', alt: 'Proyek Rekayasa Perangkat Lunak', height: 'h-54' },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative z-10 w-full min-h-screen flex flex-col justify-center bg-[#111111] text-[#FFFFFF] select-none font-['Mori',sans-serif] tracking-[-0.01em] overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* 1. Giant Monumental Background Typography: "INFORMATIKA" (Dipertahankan Penuh) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none z-0 overflow-hidden flex items-center justify-center"
      >
        <span className="text-[17vw] leading-none font-bold tracking-[-0.04em] uppercase text-white/[0.035] whitespace-nowrap">
          INFORMATIKA
        </span>
      </div>

      {/* 2. Main 2-Column Split Stage */}
      <div className="relative z-10 w-full max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
        
        {/* === SISI KIRI: Headline Utama & Narasi General Program Studi === */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
          
          {/* Grand Headline (PP Mori Display) */}
          <h1 className="text-[33px] leading-[43px] sm:text-[48px] sm:leading-[58px] md:text-[60px] md:leading-[72px] lg:text-[68px] lg:leading-[80px] xl:text-[80.9999px] xl:leading-[97.1999px] font-normal tracking-[-0.01em] text-[#FFFFFF]">
            Program Studi <br />
            <span className="text-[#DF1A22] font-normal">Teknik Informatika</span> <br />
            <span className="text-neutral-400 font-light">Universitas Muhammadiyah Cirebon.</span>
          </h1>


          {/* Clean Text Action Buttons (Tanpa Ikon Panah) */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://pmb.umc.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#DF1A22] hover:bg-[#c4151d] text-white text-[14px] sm:text-[15px] font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_10px_25px_-5px_rgba(223,26,34,0.45)]"
            >
              Daftar Mahasiswa Baru
            </a>

            <button
              onClick={() => scrollToSection('peminatan')}
              className="inline-flex items-center justify-center px-7 py-4 rounded-full text-[14px] sm:text-[15px] font-normal text-neutral-200 hover:text-white border border-white/20 hover:border-white/40 transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white/[0.02]"
            >
              Eksplorasi Kurikulum
            </button>
          </div>

        </div>

        {/* === SISI KANAN: Pinterest-Style Vertical Scrolling Masonry Columns === */}
        <div className="lg:col-span-6 xl:col-span-5 h-[480px] sm:h-[560px] lg:h-[620px] relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          
          <div className="grid grid-cols-2 gap-4 h-full">
            
            {/* Kolom 1: Gliding Upwards (Kolom Kiri) */}
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 26,
                ease: 'linear',
              }}
              className="flex flex-col gap-4 will-change-transform"
            >
              {[...COLUMN_1, ...COLUMN_1].map((img, idx) => (
                <div
                  key={`col1-${idx}`}
                  className={`relative w-full ${img.height} rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-[0_12px_30px_rgba(0,0,0,0.8)] shrink-0 group`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-[11px] text-white font-medium line-clamp-1">
                      {img.alt}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Kolom 2: Gliding Upwards with Different Pace (Kolom Kanan) */}
            <motion.div
              animate={{ y: ['-25%', '-75%'] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 32,
                ease: 'linear',
              }}
              className="flex flex-col gap-4 will-change-transform"
            >
              {[...COLUMN_2, ...COLUMN_2].map((img, idx) => (
                <div
                  key={`col2-${idx}`}
                  className={`relative w-full ${img.height} rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-[0_12px_30px_rgba(0,0,0,0.8)] shrink-0 group`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-[11px] text-white font-medium line-clamp-1">
                      {img.alt}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
