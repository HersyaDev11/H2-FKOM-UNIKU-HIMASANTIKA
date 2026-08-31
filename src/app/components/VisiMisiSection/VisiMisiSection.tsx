'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VISI_TEXT = 'Menjadi Program Studi Teknik Informatika yang unggul, inovatif, dan terkemuka di tingkat nasional maupun global, berbasis nilai-nilai kecerdasan digital dan kewirausahaan.';

const MISI = [
  "Menyelenggarakan pendidikan dan pengajaran berkualitas di bidang komputasi, AI, dan rekayasa perangkat lunak yang relevan dengan kebutuhan industri.", 
  "Melaksanakan dan mengembangkan penelitian inovatif yang berkontribusi pada kemajuan sains dan teknologi masa depan.", 
  "Melakukan pengabdian kepada masyarakat melalui solusi teknologi tepat guna yang memberikan dampak sosial dan ekonomi secara nyata."
];

export default function VisiMisiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Small timeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (isDesktop && trackRef.current && sectionRef.current) {
        const panels = gsap.utils.toArray('.hz-panel');
        
        // Horizontal Scroll Animation
        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none", // important for smooth scrub
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (trackRef.current?.scrollWidth || 0),
          }
        });

        // Intro animation for the first panel (Vision)
        gsap.fromTo(
          '.visi-reveal',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );

        // Animate the mission numbers when they enter the screen
        panels.forEach((panel: any, i: number) => {
          if (i > 0) { // Skip the first panel (Vision)
            gsap.fromTo(
              panel.querySelector('.misi-number'),
              { scale: 0.5, opacity: 0, rotate: -15 },
              {
                scale: 1,
                opacity: 0.1,
                rotate: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween, // bind to horizontal scroll
                  start: "left center", // when left of panel hits center of viewport
                  toggleActions: "play none none reverse"
                }
              }
            );

            gsap.fromTo(
              panel.querySelector('.misi-text'),
              { opacity: 0, x: 50 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left center",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      } else {
        // Fallback vertical animations for Mobile/Tablet
        gsap.fromTo(
          '.visi-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
          }
        );
        gsap.fromTo(
          '.hz-panel',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: trackRef.current, start: "top 70%" }
          }
        );
      }

      return () => clearTimeout(timer);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="visi-misi"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#050505] text-[#FFFFFF] overflow-hidden lg:h-screen flex items-center"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#DF1A22] rounded-full blur-[300px] opacity-[0.03] pointer-events-none mix-blend-screen"></div>

      {/* 
        The Track: 
        On mobile, it's a normal flex column.
        On desktop, it's a massive horizontal flex container (width = 400vw) 
      */}
      <div 
        ref={trackRef} 
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-auto lg:h-full py-20 lg:py-0"
      >
        
        {/* PANEL 1: VISION (Full viewport width on desktop) */}
        <div className="hz-panel w-full lg:w-screen h-auto lg:h-full flex flex-col justify-center items-center px-6 sm:px-12 md:px-24 lg:px-32 relative mb-24 lg:mb-0">
          <div className="max-w-[100rem] w-full relative z-10 flex flex-col items-center text-center">
            
            <div className="visi-reveal inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/10 bg-white/[0.03] mb-12 backdrop-blur-md">
              <span className="text-[12px] sm:text-[14px] font-bold tracking-[0.2em] text-[#DF1A22] uppercase">
                Visi Utama
              </span>
            </div>
            
            <h2 className="visi-reveal text-[36px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] leading-[1.1] font-normal tracking-[-0.02em] text-white">
              "{VISI_TEXT}"
            </h2>
            
            <div className="visi-reveal mt-16 hidden lg:flex items-center gap-4 text-neutral-500 opacity-60">
              <span className="text-[14px] uppercase tracking-widest">Geser untuk Misi</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>

        {/* PANEL 2: MISSION 1 */}
        <div className="hz-panel w-full lg:w-screen h-auto lg:h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-40 relative border-l-0 lg:border-l border-white/10 mb-16 lg:mb-0 bg-[#0a0a0a]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <span className="misi-number text-[250px] sm:text-[400px] font-bold text-white/[0.02] leading-none select-none">01</span>
          </div>
          <div className="misi-text relative z-10 max-w-4xl">
            <span className="text-[14px] font-bold tracking-[0.2em] text-[#DF1A22] uppercase block mb-8">
              Misi Pertama
            </span>
            <p className="text-[28px] sm:text-[40px] md:text-[50px] leading-[1.3] text-neutral-200 font-light">
              {MISI[0]}
            </p>
          </div>
        </div>

        {/* PANEL 3: MISSION 2 */}
        <div className="hz-panel w-full lg:w-screen h-auto lg:h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-40 relative border-l-0 lg:border-l border-white/10 mb-16 lg:mb-0 bg-[#111111]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <span className="misi-number text-[250px] sm:text-[400px] font-bold text-white/[0.02] leading-none select-none">02</span>
          </div>
          <div className="misi-text relative z-10 max-w-4xl">
            <span className="text-[14px] font-bold tracking-[0.2em] text-[#DF1A22] uppercase block mb-8">
              Misi Kedua
            </span>
            <p className="text-[28px] sm:text-[40px] md:text-[50px] leading-[1.3] text-neutral-200 font-light">
              {MISI[1]}
            </p>
          </div>
        </div>

        {/* PANEL 4: MISSION 3 */}
        <div className="hz-panel w-full lg:w-screen h-auto lg:h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-40 relative border-l-0 lg:border-l border-white/10 bg-[#050505]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <span className="misi-number text-[250px] sm:text-[400px] font-bold text-[#DF1A22]/[0.03] leading-none select-none">03</span>
          </div>
          <div className="misi-text relative z-10 max-w-4xl">
            <span className="text-[14px] font-bold tracking-[0.2em] text-[#DF1A22] uppercase block mb-8">
              Misi Ketiga
            </span>
            <p className="text-[28px] sm:text-[40px] md:text-[50px] leading-[1.3] text-neutral-200 font-light">
              {MISI[2]}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

