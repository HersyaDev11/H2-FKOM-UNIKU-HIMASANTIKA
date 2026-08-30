'use client';

import React from 'react';
import { ScrollReelTestimonials, ScrollReelTestimonial } from './scroll-reel-testimonials';

const TESTIMONIALS: ScrollReelTestimonial[] = [
  {
    quote:
      'Teknik Informatika UMC memberikan fondasi berpikir komputasi yang kuat dan ruang eksplorasi tanpa batas untuk terus berinovasi.',
    author: 'Rian Pratama, S.Kom.',
    image: '/testimonials/alumni-1.webp',
    alt: 'Portrait of Rian Pratama',
  },
  {
    quote:
      'Bimbingan intensif para dosen dan atmosfer belajar yang suportif membentuk kesiapan mental nyata menghadapi dinamika dunia kerja profesional.',
    author: 'Nadia Kirana, S.Kom.',
    image: '/testimonials/alumni-2.webp',
    alt: 'Portrait of Nadia Kirana',
  },
  {
    quote:
      'Kurikulum yang adaptif dan fasilitas praktikum modern memberi bekal pengalaman praktis yang sangat relevan dengan kebutuhan industri masa kini.',
    author: 'Fajar Hidayat, S.Kom.',
    image: '/testimonials/alumni-3.webp',
    alt: 'Portrait of Fajar Hidayat',
  },
  {
    quote:
      'Pengalaman berkolaborasi dalam berbagai proyek nyata dan komunitas kampus yang solid membuka banyak peluang karier yang luas.',
    author: 'Dimas Setiawan, S.Kom.',
    image: '/testimonials/alumni-4.webp',
    alt: 'Portrait of Dimas Setiawan',
  },
  {
    quote:
      'Belajar di sini bukan hanya tentang memahami teknologi, melainkan bagaimana menciptakan solusi nyata yang berdampak positif bagi masyarakat.',
    author: 'Sarah Azzahra, S.Kom.',
    image: '/testimonials/alumni-5.webp',
    alt: 'Portrait of Sarah Azzahra',
  },
];

export default function TestimonialsSection() {
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
            testimonials={TESTIMONIALS}
            charStaggerMs={4}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
