'use client';

import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CoverflowCarousel, type CoverflowSlide } from './coverflow-carousel';
import { useLanguage } from '../../context/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Curated Gallery Slides: Aktivitas Praktik & Pembelajaran Mahasiswa Teknik Informatika UMC (Symmetrical & Clean)
const GALLERY_SLIDES_ID = [
  {
    src: '/gallery/praktik-mahasiswa-1.webp',
    alt: 'Mahasiswa Teknik Informatika UMC sedang Praktik Pemrograman di Laboratorium Komputer',
    title: 'Praktikum Pemrograman Komputer',
    subtitle: 'Aktivitas Coding & Logika Perangkat Lunak',
    meta: [
      { label: 'Aktivitas', value: 'Coding & Algoritma' },
      { label: 'Fasilitas', value: 'Laboratorium TI' },
      { label: 'Peserta', value: 'Mahasiswa TI' },
    ],
  },
  {
    src: '/gallery/pembelajaran-jaringan.webp',
    alt: 'Mahasiswa Teknik Informatika sedang Praktik Pembelajaran Jaringan Komputer',
    title: 'Praktik Jaringan & Komputasi',
    subtitle: 'Hands-on Pengkabelan & Konfigurasi Jaringan',
    meta: [
      { label: 'Fokus', value: 'Jaringan Komputer' },
      { label: 'Metode', value: 'Praktik Langsung' },
      { label: 'Ruang', value: 'Laboratorium TI' },
    ],
  },
  {
    src: '/gallery/pembelajaran-kuliah.webp',
    alt: 'Proses Pembelajaran Interaktif dan Kolaboratif Mahasiswa Teknik Informatika UMC',
    title: 'Suasana Perkuliahan Interaktif',
    subtitle: 'Proses Belajar Mengajar Teori & Diskusi Kelas',
    meta: [
      { label: 'Metode', value: 'Belajar Kolaboratif' },
      { label: 'Fasilitas', value: 'Ruang Perkuliahan' },
      { label: 'Atmosfer', value: 'Aktif & Dinamis' },
    ],
  },
  {
    src: '/gallery/praktik-mahasiswa-2.webp',
    alt: 'Praktikum Rekayasa Perangkat Lunak dan Pemrograman Web Mahasiswa TI UMC',
    title: 'Pengembangan Proyek Perangkat Lunak',
    subtitle: 'Implementasi Praktis Rekayasa Aplikasi Mahasiswa',
    meta: [
      { label: 'Aktivitas', value: 'Pengembangan Aplikasi' },
      { label: 'Metode', value: 'Praktikum Proyek' },
      { label: 'Peralatan', value: 'Workstation PC' },
    ],
  },
  {
    src: '/gallery/lab-komputer.webp',
    alt: 'Fasilitas Laboratorium Komputer Teknik Informatika UMC',
    title: 'Fasilitas Laboratorium Komputer',
    subtitle: 'Ruang Praktik & Eksplorasi Digital Mahasiswa',
    meta: [
      { label: 'Fasilitas', value: 'Laboratorium Terpadu' },
      { label: 'Akses', value: 'Praktikum & Riset' },
      { label: 'Perangkat', value: 'Workstation PC' },
    ],
  },
  {
    src: '/gallery/ujian-semester.webp',
    alt: 'Evaluasi dan Ujian Praktik Kompetensi Mahasiswa Teknik Informatika UMC',
    title: 'Evaluasi & Ujian Kompetensi',
    subtitle: 'Pengujian Pemahaman Teori & Keterampilan Praktik',
    meta: [
      { label: 'Kegiatan', value: 'Ujian Kompetensi' },
      { label: 'Standar', value: 'Mutu Akademik' },
      { label: 'Tujuan', value: 'Evaluasi Capaian' },
    ],
  },
];

const GALLERY_SLIDES_EN = [
  {
    src: '/gallery/praktik-mahasiswa-1.webp',
    alt: 'UMC Informatics Engineering Students Practicing Programming in the Computer Laboratory',
    title: 'Computer Programming Practicum',
    subtitle: 'Coding Activities & Software Logic',
    meta: [
      { label: 'Activity', value: 'Coding & Algorithms' },
      { label: 'Facility', value: 'IT Laboratory' },
      { label: 'Participants', value: 'IT Students' },
    ],
  },
  {
    src: '/gallery/pembelajaran-jaringan.webp',
    alt: 'Informatics Engineering Students Practicing Computer Network Learning',
    title: 'Network & Computing Practice',
    subtitle: 'Hands-on Cabling & Network Configuration',
    meta: [
      { label: 'Focus', value: 'Computer Networks' },
      { label: 'Method', value: 'Direct Practice' },
      { label: 'Space', value: 'IT Laboratory' },
    ],
  },
  {
    src: '/gallery/pembelajaran-kuliah.webp',
    alt: 'Interactive and Collaborative Learning Process of UMC Informatics Engineering Students',
    title: 'Interactive Lecture Atmosphere',
    subtitle: 'Teaching & Learning Process of Theory & Class Discussion',
    meta: [
      { label: 'Method', value: 'Collaborative Learning' },
      { label: 'Facility', value: 'Lecture Room' },
      { label: 'Atmosphere', value: 'Active & Dynamic' },
    ],
  },
  {
    src: '/gallery/praktik-mahasiswa-2.webp',
    alt: 'Software Engineering and Web Programming Practicum of UMC IT Students',
    title: 'Software Project Development',
    subtitle: 'Practical Implementation of Student Application Engineering',
    meta: [
      { label: 'Activity', value: 'Application Development' },
      { label: 'Method', value: 'Project Practicum' },
      { label: 'Equipment', value: 'PC Workstations' },
    ],
  },
  {
    src: '/gallery/lab-komputer.webp',
    alt: 'UMC Informatics Engineering Computer Laboratory Facilities',
    title: 'Computer Laboratory Facilities',
    subtitle: 'Student Digital Exploration & Practice Space',
    meta: [
      { label: 'Facility', value: 'Integrated Laboratory' },
      { label: 'Access', value: 'Practicum & Research' },
      { label: 'Equipment', value: 'PC Workstations' },
    ],
  },
  {
    src: '/gallery/ujian-semester.webp',
    alt: 'Evaluation and Competency Practice Exams of UMC Informatics Engineering Students',
    title: 'Competency Evaluation & Exams',
    subtitle: 'Testing of Theoretical Understanding & Practical Skills',
    meta: [
      { label: 'Activity', value: 'Competency Exam' },
      { label: 'Standard', value: 'Academic Quality' },
      { label: 'Objective', value: 'Achievement Evaluation' },
    ],
  },
];

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

  useGSAP(
    () => {
      // Subtle scroll reveal
      gsap.from('.gallery-header', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const slides = useMemo(() => lang === 'ID' ? GALLERY_SLIDES_ID : GALLERY_SLIDES_EN, [lang]);

  return (
    <section
      ref={containerRef}
      id="galeri"
      className="relative z-20 w-full bg-[#111111] text-[#FFFFFF] py-16 sm:py-24 md:py-32 lg:py-40 select-none font-['Mori',sans-serif] tracking-[-0.01em] border-t border-neutral-800/80 overflow-hidden"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Clear Architectural Grid with Smooth Seamless Bottom Fade */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black_20%,transparent_60%)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_60%)] sm:[mask-image:linear-gradient(to_bottom,black_30%,transparent_75%)] sm:[-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Soft Atmospheric Dissolve into 100% Solid #111111 (Zero Seam Cut) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-[#111111] via-[#111111] to-transparent -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-[120rem] mx-auto px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        
        {/* Section Header: Responsive Editorial Style */}
        <div className="gallery-header max-w-4xl xl:max-w-5xl mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2
            className="text-[26px] leading-[34px] sm:text-[44px] sm:leading-[54px] md:text-[58px] md:leading-[68px] lg:text-[72px] lg:leading-[86px] xl:text-[80.9999px] xl:leading-[97.1999px] font-normal tracking-[-0.01em] text-[#FFFFFF] font-['Mori',sans-serif]"
            style={{ fontFamily: "'Mori', sans-serif" }}
          >
            {lang === 'ID' ? 'Eksplorasi ruang praktikum, aktivitas, dan atmosfer belajar kami.' : 'Explore our practicum spaces, activities, and learning atmosphere.'}
          </h2>
        </div>

        {/* 21st.dev Coverflow Carousel Component */}
        <div className="w-full">
          <CoverflowCarousel
            slides={slides}
            rotate={38}
            depth={0.55}
            perspective={2.8}
            cardWidth="clamp(200px, min(30vw, 42vh), 380px)"
            gap={0.07}
            loop={true}
            showCaption={true}
            showPagination={false}
            showNavigation={true}
            cardClassName="rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10"
          />
        </div>

      </div>
    </section>
  );
}
