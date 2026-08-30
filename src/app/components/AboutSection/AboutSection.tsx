'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.about-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
      )
      .fromTo(
        '.about-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        '.about-stat',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      );
    },
    { scope: sectionRef }
  );

  const titleContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const container = titleContainerRef.current;
    const textElement = textRef.current;

    // 1. Title Interactive Animation
    if (container) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to('.about-title', {
          x: x * 40,
          y: y * 40,
          rotationY: x * 15,
          rotationX: -y * 15,
          textShadow: `${-x * 20}px ${-y * 20}px 30px rgba(255,255,255,0.4)`,
          color: '#FFFFFF', // Menyala menjadi putih
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.05
        });
      };

      const handleMouseLeave = () => {
        gsap.to('.about-title', {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          textShadow: '0px 0px 0px rgba(255,255,255,0)',
          clearProps: 'color',
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
          stagger: 0.05
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // 2. Text Interactive Animation
    if (textElement) {
      const handleTextMouseMove = (e: MouseEvent) => {
        const rect = textElement.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(textElement, {
          x: x * 15,
          y: y * 15,
          rotationY: x * 5,
          rotationX: -y * 5,
          color: '#FFFFFF', // Menyala saat dihover
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      const handleTextMouseLeave = () => {
        gsap.to(textElement, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          clearProps: 'color',
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      textElement.addEventListener('mousemove', handleTextMouseMove);
      textElement.addEventListener('mouseleave', handleTextMouseLeave);
    }

    return () => {
      // Cleanup is automatically handled by useGSAP scope reverting, 
      // but manual cleanup of event listeners is good practice if component unmounts
    };
  }, { scope: sectionRef });

  return (
    <section 
      id="profil" 
      ref={sectionRef} 
      className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-[#0A0A0A] border-b border-white/5"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Side: Massive Typography */}
        <div 
          ref={titleContainerRef}
          className="flex flex-col justify-center" 
          style={{ perspective: '1000px' }}
        >
          <h2 className="text-[44px] sm:text-[56px] md:text-[64px] xl:text-[80px] leading-[1.05] font-normal tracking-[-0.03em] text-white cursor-crosshair">
            <span className="about-title block text-neutral-500">Membangun</span>
            <span className="about-title block">Fondasi.</span>
            <span className="about-title block text-neutral-500 mt-2 sm:mt-4">Menciptakan</span>
            <span className="about-title block text-[#DF1A22]">Masa Depan.</span>
          </h2>
        </div>

        {/* Right Side: Description & Metrics */}
        <div className="flex flex-col justify-center" style={{ perspective: '1000px' }}>
          <div className="w-12 h-1 bg-[#DF1A22] mb-8 about-text origin-left rounded-full"></div>
          <p 
            ref={textRef}
            className="about-text text-[16px] sm:text-[18px] md:text-[20px] text-neutral-400 leading-relaxed font-light mb-12 cursor-crosshair transition-colors"
          >
            Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon tidak hanya mengajarkan cara menulis kode, tetapi juga membentuk cara 
            berpikir komputasional untuk memecahkan masalah nyata. Kami mengintegrasikan teknologi terkini, nilai-nilai etika Islami, dan semangat kewirausahaan global.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-4">
            
            <div className="about-stat bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DF1A22]/10 blur-[50px] -mr-10 -mt-10 transition-opacity duration-500 opacity-30 group-hover:opacity-100"></div>
              <h3 className="text-[40px] sm:text-[56px] text-white font-medium mb-1 leading-none tracking-tight relative z-10">95<span className="text-[#DF1A22]">%</span></h3>
              <p className="text-[11px] sm:text-[13px] text-neutral-400 font-medium tracking-widest uppercase mt-3 relative z-10">Serapan Kerja</p>
            </div>

            <div className="about-stat bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DF1A22]/10 blur-[50px] -mr-10 -mt-10 transition-opacity duration-500 opacity-30 group-hover:opacity-100"></div>
              <h3 className="text-[40px] sm:text-[56px] text-white font-medium mb-1 leading-none tracking-tight relative z-10">15<span className="text-[#DF1A22]">+</span></h3>
              <p className="text-[11px] sm:text-[13px] text-neutral-400 font-medium tracking-widest uppercase mt-3 relative z-10">Dosen Praktisi</p>
            </div>

            <div className="about-stat bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DF1A22]/10 blur-[50px] -mr-10 -mt-10 transition-opacity duration-500 opacity-30 group-hover:opacity-100"></div>
              <h3 className="text-[40px] sm:text-[56px] text-white font-medium mb-1 leading-none tracking-tight relative z-10">3</h3>
              <p className="text-[11px] sm:text-[13px] text-neutral-400 font-medium tracking-widest uppercase mt-3 relative z-10">Konsentrasi Studi</p>
            </div>

            <div className="about-stat bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DF1A22]/10 blur-[50px] -mr-10 -mt-10 transition-opacity duration-500 opacity-30 group-hover:opacity-100"></div>
              <h3 className="text-[40px] sm:text-[56px] text-white font-medium mb-1 leading-none tracking-tight relative z-10">A</h3>
              <p className="text-[11px] sm:text-[13px] text-neutral-400 font-medium tracking-widest uppercase mt-3 relative z-10">Akreditasi</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
