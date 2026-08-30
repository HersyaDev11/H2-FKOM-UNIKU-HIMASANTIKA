'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inisialisasi Lenis dengan konfigurasi Momentum Inertia Scroll (Melesat Halus)
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

    // Sinkronkan update posisi scroll Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Hubungkan loop render Lenis langsung ke GSAP Ticker untuk performa 120 FPS tanpa lag
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
