'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const admissionSteps = [
  {
    step: '01',
    title: 'Registrasi Akun',
    description: 'Buat akun pendaftaran melalui portal penerimaan mahasiswa baru UMC menggunakan email aktif.',
  },
  {
    step: '02',
    title: 'Lengkapi Berkas',
    description: 'Isi formulir pendaftaran dan unggah dokumen persyaratan seperti ijazah/SKL dan pas foto.',
  },
  {
    step: '03',
    title: 'Seleksi & Tes',
    description: 'Ikuti tahapan seleksi mandiri atau wawancara sesuai dengan jalur pendaftaran yang dipilih.',
  },
  {
    step: '04',
    title: 'Pengumuman',
    description: 'Cek hasil kelulusan melalui dashboard akun Anda dan lakukan daftar ulang jika diterima.',
  },
];

const scholarships = [
  {
    title: 'Beasiswa Prestasi Akademik',
    description: 'Diberikan kepada calon mahasiswa dengan nilai rapor atau prestasi akademik luar biasa di tingkat nasional/internasional.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    ),
    color: '#F2A900', // Yellow
  },
  {
    title: 'Beasiswa KIP-Kuliah',
    description: 'Program bantuan biaya pendidikan dari pemerintah untuk lulusan SMA/sederajat yang memiliki keterbatasan ekonomi.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
    color: '#00853F', // Green
  }
];

export default function AdmissionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Refresh ScrollTrigger to ensure accurate start positions
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Animate Section Title
      tl.fromTo(
        '.adm-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate Admission Steps
      tl.fromTo(
        '.adm-step',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      );

      // Animate Scholarship Cards
      tl.fromTo(
        '.adm-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.4'
      );

      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="pendaftaran"
      className="relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 bg-[#111111] text-[#FFFFFF] overflow-hidden border-t border-neutral-900"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="relative z-10 w-full max-w-[120rem] mx-auto flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="adm-header text-center max-w-3xl mx-auto">
          <h2 className="text-[40px] sm:text-[48px] md:text-[56px] leading-[1.1] font-normal tracking-[-0.02em] mb-6">
            Jalur <span className="text-[#DF1A22]">Pendaftaran</span> & Beasiswa
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#A3A3A3] leading-relaxed">
            Bergabunglah dengan Program Studi Teknik Informatika UMC. Kami menyediakan berbagai jalur pendaftaran dan kesempatan beasiswa untuk mewujudkan impian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Admission Steps */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <h3 className="adm-header text-[24px] sm:text-[28px] font-medium text-white mb-2">Langkah Pendaftaran</h3>
            
            <div className="flex flex-col gap-6 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-neutral-800 hidden sm:block"></div>
              
              {admissionSteps.map((item, index) => (
                <div key={index} className="adm-step flex flex-col sm:flex-row gap-5 sm:gap-8 group relative">
                  <div className="relative z-10 w-12 h-12 rounded-full border border-neutral-700 bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:border-[#DF1A22] group-hover:bg-[#DF1A22]/10 transition-colors duration-300">
                    <span className="text-[14px] font-bold text-neutral-400 group-hover:text-[#DF1A22] transition-colors duration-300">{item.step}</span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pb-6 border-b border-neutral-800/50 sm:border-b-0 sm:pb-0">
                    <h4 className="text-[18px] sm:text-[20px] font-medium text-neutral-100">{item.title}</h4>
                    <p className="text-[15px] sm:text-[16px] text-[#A3A3A3] leading-relaxed max-w-xl">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="adm-step pt-4">
               <a href="https://pmb.umc.ac.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-neutral-200 transition-colors">
                 Portal PMB UMC
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
               </a>
            </div>
          </div>

          {/* Right Column: Scholarships */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="adm-header text-[24px] sm:text-[28px] font-medium text-white mb-2">Peluang Beasiswa</h3>
            
            <div className="flex flex-col gap-5">
              {scholarships.map((scholarship, index) => (
                <div 
                  key={index} 
                  className="adm-card flex flex-col gap-4 p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-[#151515] hover:bg-[#1A1A1A] transition-colors duration-300 group"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-opacity-10"
                    style={{ backgroundColor: `${scholarship.color}15`, color: scholarship.color }}
                  >
                    {scholarship.icon}
                  </div>
                  <h4 className="text-[20px] font-medium text-neutral-100">{scholarship.title}</h4>
                  <p className="text-[15px] text-[#A3A3A3] leading-relaxed">{scholarship.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
