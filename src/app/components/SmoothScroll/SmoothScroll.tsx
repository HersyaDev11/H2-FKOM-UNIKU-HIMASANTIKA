'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Matikan scroll restoration otomatis browser saat refresh agar website selalu mulai dari atas (Hero Section)
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    // 2. Inisialisasi Lenis dengan konfigurasi Momentum Inertia Scroll (Melesat Halus)
    const lenis = new Lenis({
      duration: 1.2, // Durasi inersia meluncur (gliding duration)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Kurva eksponensial khas Awwwards: cepat di awal, melambat sangat halus di akhir
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Expose lenis instance globally for programmatic scroll
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Sinkronkan update posisi scroll Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Hubungkan loop render Lenis langsung ke GSAP Ticker untuk performa 120 FPS tanpa lag
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Intercept semua klik tautan anchor (#id) di Navbar, Footer, & Tombol agar meluncur halus dengan Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || !href.startsWith('#')) return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement as HTMLElement, {
          offset: -20, // Offset kompensasi tinggi fixed navbar
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Pastikan posisi scroll kembali ke 0 saat halaman ditutup atau di-refresh
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
