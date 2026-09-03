'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown, MapPin, Phone, Mail, Send } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    id: 1,
    questionId: 'Kapan pendaftaran mahasiswa baru dibuka?',
    questionEn: 'When does new student registration open?',
    answerId: 'Pendaftaran Mahasiswa Baru (PMB) Universitas Muhammadiyah Cirebon biasanya dibuka dalam beberapa gelombang mulai dari bulan Desember hingga Agustus setiap tahunnya. Anda dapat mengecek jadwal pastinya di website pmb.umc.ac.id.',
    answerEn: 'New Student Registration (PMB) at Universitas Muhammadiyah Cirebon usually opens in several batches from December to August each year. You can check the exact schedule on the pmb.umc.ac.id website.'
  },
  {
    id: 2,
    questionId: 'Apakah tersedia program beasiswa?',
    questionEn: 'Are scholarship programs available?',
    answerId: 'Tentu! Kami menyediakan berbagai jalur beasiswa, di antaranya Beasiswa KIP-Kuliah, Beasiswa Kader Persyarikatan, Beasiswa Prestasi, dan Beasiswa Tahfidz Qur\'an.',
    answerEn: 'Absolutely! We provide various scholarship tracks, including KIP-Kuliah Scholarships, Association Cadre Scholarships, Achievement Scholarships, and Tahfidz Qur\'an Scholarships.'
  },
  {
    id: 3,
    questionId: 'Apa saja fasilitas pendukung perkuliahan di Teknik Informatika?',
    questionEn: 'What are the supporting facilities for studying Informatics Engineering?',
    answerId: 'Mahasiswa difasilitasi dengan Laboratorium Komputer Terpadu, Laboratorium Jaringan & Keamanan Siber, perpustakaan digital, ruang kelas ber-AC, dan akses internet berkecepatan tinggi.',
    answerEn: 'Students are provided with an Integrated Computer Laboratory, Network & Cyber Security Laboratory, digital library, air-conditioned classrooms, and high-speed internet access.'
  },
  {
    id: 4,
    questionId: 'Apakah lulusan SMA jurusan IPS atau SMK non-IT bisa mendaftar?',
    questionEn: 'Can Social Sciences high school graduates or non-IT vocational graduates apply?',
    answerId: 'Bisa. Lulusan dari berbagai jurusan (IPA, IPS, atau SMK jurusan apa pun) diperbolehkan mendaftar. Kami menyediakan program matrikulasi dasar bagi mahasiswa yang membutuhkan penyesuaian di semester awal.',
    answerEn: 'Yes. Graduates from various majors (Science, Social, or any vocational major) are allowed to apply. We provide basic matriculation programs for students who need adjustment in their first semester.'
  }
];

export default function FaqContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        '.fc-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // FAQ Items Staggered Animation
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 85%',
          }
        }
      );

      // Contact Form Animation
      gsap.fromTo(
        '.contact-element',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
          }
        }
      );
    },
    { scope: containerRef }
  );

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section
      id="faq-kontak"
      ref={containerRef}
      className="relative z-10 w-full bg-[#0a0a0a] text-[#FFFFFF] py-20 lg:py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 overflow-hidden font-['Mori',sans-serif]"
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DF1A22] rounded-full blur-[200px] opacity-[0.03] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.02] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[120rem] mx-auto">
        
        {/* Section Header */}
        <div className="fc-header text-center mb-16 lg:mb-24 will-change-transform transform-gpu">
          <span className="text-[14px] font-bold tracking-[0.2em] text-[#DF1A22] uppercase block mb-4">
            {lang === 'ID' ? 'Pusat Informasi' : 'Information Center'}
          </span>
          <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-normal tracking-tight text-white mb-6">
            {lang === 'ID' ? 'Pertanyaan & Kontak' : 'FAQ & Contact Us'}
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-[15px] sm:text-[17px] leading-relaxed font-light">
            {lang === 'ID' 
              ? 'Temukan jawaban atas pertanyaan umum seputar program studi kami, atau hubungi kami secara langsung untuk informasi lebih lanjut.'
              : 'Find answers to frequently asked questions about our study program, or contact us directly for more information.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* FAQ Column */}
          <div ref={faqRef} className="flex flex-col gap-4">
            <h3 className="fc-header text-[24px] font-medium mb-6 flex items-center gap-3 will-change-transform transform-gpu">
              <span className="w-8 h-8 rounded-full bg-[#DF1A22]/10 flex items-center justify-center text-[#DF1A22]">?</span>
              {lang === 'ID' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
            </h3>
            
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`faq-item will-change-transform transform-gpu border ${isOpen ? 'border-[#DF1A22]/50 bg-[#DF1A22]/5' : 'border-white/10 bg-[#111111]/50'} rounded-2xl overflow-hidden transition-all duration-300`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <span className={`text-[16px] sm:text-[17px] font-medium pr-8 transition-colors ${isOpen ? 'text-white' : 'text-neutral-200'}`}>
                      {lang === 'ID' ? faq.questionId : faq.questionEn}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#DF1A22]' : 'text-neutral-500'}`} />
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="px-6 pb-6 text-[15px] text-neutral-400 leading-relaxed font-light">
                      {lang === 'ID' ? faq.answerId : faq.answerEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Column */}
          <div ref={contactRef} className="flex flex-col gap-10">
            <div>
              <h3 className="contact-element text-[24px] font-medium mb-6 flex items-center gap-3 will-change-transform transform-gpu">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <Mail className="w-4 h-4" />
                </span>
                {lang === 'ID' ? 'Hubungi Kami' : 'Get in Touch'}
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="contact-element will-change-transform transform-gpu flex items-start gap-4 p-5 rounded-2xl bg-[#111111]/50 border border-white/5">
                  <MapPin className="w-6 h-6 text-[#DF1A22] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[15px] font-medium text-white mb-1">{lang === 'ID' ? 'Alamat Kampus' : 'Campus Address'}</h4>
                    <p className="text-[14px] text-neutral-400 leading-relaxed">
                      Jl. Tuparev No.70, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153
                    </p>
                  </div>
                </div>
                
                <div className="contact-element will-change-transform transform-gpu flex items-start gap-4 p-5 rounded-2xl bg-[#111111]/50 border border-white/5">
                  <Phone className="w-6 h-6 text-[#DF1A22] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[15px] font-medium text-white mb-1">{lang === 'ID' ? 'Telepon / WhatsApp' : 'Phone / WhatsApp'}</h4>
                    <p className="text-[14px] text-neutral-400">
                      +62 822-1400-0585 (Admin PMB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Contact Form */}
            <form className="flex flex-col gap-4 mt-2" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="contact-element will-change-transform transform-gpu">
                  <input 
                    type="text" 
                    placeholder={lang === 'ID' ? "Nama Lengkap" : "Full Name"} 
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#DF1A22] transition-colors placeholder:text-neutral-600"
                  />
                </div>
                <div className="contact-element will-change-transform transform-gpu">
                  <input 
                    type="email" 
                    placeholder={lang === 'ID' ? "Alamat Email" : "Email Address"} 
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#DF1A22] transition-colors placeholder:text-neutral-600"
                  />
                </div>
              </div>
              <div className="contact-element will-change-transform transform-gpu">
                <textarea 
                  rows={4}
                  placeholder={lang === 'ID' ? "Pesan Anda..." : "Your Message..."} 
                  className="w-full bg-[#111111] border border-white/10 rounded-xl px-5 py-3.5 text-[15px] text-white focus:outline-none focus:border-[#DF1A22] transition-colors placeholder:text-neutral-600 resize-none"
                ></textarea>
              </div>
              <button className="contact-element will-change-transform transform-gpu mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black hover:bg-[#DF1A22] hover:text-white text-[15px] font-medium transition-all duration-300 w-full sm:w-auto self-start group cursor-pointer">
                <span>{lang === 'ID' ? 'Kirim Pesan' : 'Send Message'}</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
