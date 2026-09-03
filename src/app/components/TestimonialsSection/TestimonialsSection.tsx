'use client';

import React from 'react';
import { ScrollReelTestimonials, ScrollReelTestimonial } from './scroll-reel-testimonials';
import { useLanguage } from '../../context/LanguageContext';

const TESTIMONIALS_ID: ScrollReelTestimonial[] = [
  {
    quote:
      'Teknik Informatika UMC memberikan fondasi berpikir komputasi yang kuat dan ruang eksplorasi tanpa batas untuk terus berinovasi.',
    author: 'Rian Pratama, S.T.',
    image: '/testimonials/alumni-1.webp',
    alt: 'Portrait of Rian Pratama',
  },
  {
    quote:
      'Bimbingan intensif para dosen dan atmosfer belajar yang suportif membentuk kesiapan mental nyata menghadapi dinamika dunia kerja profesional.',
    author: 'Nadia Kirana, S.T.',
    image: '/testimonials/alumni-2.webp',
    alt: 'Portrait of Nadia Kirana',
  },
  {
    quote:
      'Kurikulum yang adaptif dan fasilitas praktikum modern memberi bekal pengalaman praktis yang sangat relevan dengan kebutuhan industri masa kini.',
    author: 'Fajar Hidayat, S.T.',
    image: '/testimonials/alumni-3.webp',
    alt: 'Portrait of Fajar Hidayat',
  },
  {
    quote:
      'Pengalaman berkolaborasi dalam berbagai proyek nyata dan komunitas kampus yang solid membuka banyak peluang karier yang luas.',
    author: 'Dimas Setiawan, S.T.',
    image: '/testimonials/alumni-4.webp',
    alt: 'Portrait of Dimas Setiawan',
  },
  {
    quote:
      'Belajar di sini bukan hanya tentang memahami teknologi, melainkan bagaimana menciptakan solusi nyata yang berdampak positif bagi masyarakat.',
    author: 'Sarah Azzahra, S.T.',
    image: '/testimonials/alumni-5.webp',
    alt: 'Portrait of Sarah Azzahra',
  },
];

const TESTIMONIALS_EN: ScrollReelTestimonial[] = [
  {
    quote:
      'UMC Informatics Engineering provides a strong computational thinking foundation and limitless exploration space to keep innovating.',
    author: 'Rian Pratama, S.T.',
    image: '/testimonials/alumni-1.webp',
    alt: 'Portrait of Rian Pratama',
  },
  {
    quote:
      'The intensive guidance of lecturers and supportive learning atmosphere build real mental readiness to face the dynamics of the professional work world.',
    author: 'Nadia Kirana, S.T.',
    image: '/testimonials/alumni-2.webp',
    alt: 'Portrait of Nadia Kirana',
  },
  {
    quote:
      'The adaptive curriculum and modern practicum facilities provide practical experience that is highly relevant to today’s industry needs.',
    author: 'Fajar Hidayat, S.T.',
    image: '/testimonials/alumni-3.webp',
    alt: 'Portrait of Fajar Hidayat',
  },
  {
    quote:
      'The experience of collaborating in various real projects and a solid campus community opens up many broad career opportunities.',
    author: 'Dimas Setiawan, S.T.',
    image: '/testimonials/alumni-4.webp',
    alt: 'Portrait of Dimas Setiawan',
  },
  {
    quote:
      'Learning here is not just about understanding technology, but how to create real solutions that have a positive impact on society.',
    author: 'Sarah Azzahra, S.T.',
    image: '/testimonials/alumni-5.webp',
    alt: 'Portrait of Sarah Azzahra',
  },
];

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  
  return (
    <section
      id="testimoni-alumni"
      className="relative z-30 w-full min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-28 bg-[#111111] text-[#FFFFFF] overflow-hidden font-['Mori',sans-serif]"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        {/* Full-Screen Seamless Scroll Reel Component */}
        <div className="w-full flex items-center justify-center">
          <ScrollReelTestimonials
            testimonials={lang === 'ID' ? TESTIMONIALS_ID : TESTIMONIALS_EN}
            charStaggerMs={4}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
