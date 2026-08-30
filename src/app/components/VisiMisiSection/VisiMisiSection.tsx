'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VisiMisiSection() {
  const containerRef = useRef<HTMLElement>(null);
  const visiTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      gsap.fromTo(
        '.vm-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.vm-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Interactive Text Hover (Magnetic Glow & Tilt) for Visi
      const textElement = visiTextRef.current;
      if (textElement) {
        const handleTextMouseMove = (e: MouseEvent) => {
          const rect = textElement.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(textElement, {
            x: x * 20,
            y: y * 20,
            rotationY: x * 10,
            rotationX: -y * 10,
            color: '#FFFFFF',
            textShadow: `${-x * 15}px ${-y * 15}px 20px rgba(255,255,255,0.3)`,
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
            textShadow: '0px 0px 0px rgba(255,255,255,0)',
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
          });
        };

        textElement.addEventListener('mousemove', handleTextMouseMove);
        textElement.addEventListener('mouseleave', handleTextMouseLeave);
      }

      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full bg-[#111111] border-b border-white/5 text-[#FFFFFF] py-20 sm:py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 overflow-hidden"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24 flex items-center justify-center">
          <h2 className="vm-title text-[40px] sm:text-[56px] md:text-[72px] font-normal tracking-[-0.02em] text-center">
            Visi <span className="text-[#DF1A22] italic font-medium">&</span> Misi
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 xl:gap-32">
          {/* Visi */}
          <div className="flex-1 flex flex-col items-start" style={{ perspective: '1000px' }}>
            <div className="vm-content inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] mb-8 backdrop-blur-md">
              <span className="text-[12px] sm:text-[14px] font-semibold tracking-widest text-[#DF1A22] uppercase">Visi Utama</span>
            </div>
            <h3 
              ref={visiTextRef}
              className="vm-content relative text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[56px] leading-[1.15] font-normal tracking-[-0.03em] text-neutral-300 cursor-crosshair transition-colors"
            >
              Menjadi Program Studi Teknik Informatika yang unggul, inovatif, dan terkemuka di tingkat nasional maupun global, berbasis nilai-nilai kecerdasan digital dan kewirausahaan.
            </h3>
          </div>

          {/* Misi */}
          <div className="flex-1 flex flex-col items-start mt-8 lg:mt-0">
            <div className="vm-content inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] mb-8 backdrop-blur-md">
              <span className="text-[12px] sm:text-[14px] font-semibold tracking-widest text-[#DF1A22] uppercase">Misi Kami</span>
            </div>
            <ul className="flex flex-col gap-4 sm:gap-6 w-full">
              {[
                "Menyelenggarakan pendidikan dan pengajaran berkualitas di bidang komputasi, AI, dan rekayasa perangkat lunak yang relevan dengan kebutuhan industri.",
                "Melaksanakan dan mengembangkan penelitian inovatif yang berkontribusi pada kemajuan sains dan teknologi masa depan.",
                "Melakukan pengabdian kepada masyarakat melalui solusi teknologi tepat guna yang memberikan dampak sosial dan ekonomi secara nyata."
              ].map((misi, index) => (
                <li key={index} className="vm-content group relative flex gap-5 sm:gap-6 items-start bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#DF1A22]/10 blur-[50px] -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
                  <span className="text-[#DF1A22] font-bold text-[24px] sm:text-[28px] mt-0.5 shrink-0 tabular-nums leading-none opacity-80 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-[#A3A3A3] group-hover:text-white transition-colors duration-500 relative z-10">
                    {misi}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
