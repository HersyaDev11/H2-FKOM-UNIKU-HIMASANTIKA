'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, BrainCircuit, ShieldCheck, Cpu, Gamepad2, ArrowUpRight } from 'lucide-react';

interface PeminatanTrack {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  enTitle: string;
  accent: string;
  icon: typeof Code2;
  image: string;
  summary: string;
  topics: string[];
  careers: string[];
}

const PEMINATAN_TRACKS: PeminatanTrack[] = [
  {
    id: 'rpl',
    num: '01',
    title: 'Rekayasa Perangkat Lunak',
    subtitle: 'Software Engineering & Cloud Architecture',
    enTitle: 'Software Engineering',
    accent: '#DF1A22',
    icon: Code2,
    image: '/peminatan/software-engineering.webp',
    summary: 'Perancangan dan pengembangan perangkat lunak skala enterprise, aplikasi multiplatform, dan ekosistem komputasi awan modern.',
    topics: ['Arsitektur Cloud & Microservices', 'Web & Mobile Fullstack Development', 'DevOps & Continuous Integration (CI/CD)', 'Rekayasa Mutu & Software Testing'],
    careers: ['Fullstack Software Engineer', 'Mobile Application Developer', 'DevOps & Cloud Infrastructure Engineer'],
  },
  {
    id: 'ai',
    num: '02',
    title: 'Kecerdasan Buatan & Data',
    subtitle: 'Artificial Intelligence & Data Science',
    enTitle: 'AI & Data Science',
    accent: '#F2A900',
    icon: BrainCircuit,
    image: '/peminatan/ai-data-science.webp',
    summary: 'Eksplorasi algoritma cerdas, pemodelan data tingkat lanjut, machine learning, computer vision, dan automasi analitik skala besar.',
    topics: ['Machine Learning & Deep Neural Networks', 'Computer Vision & Image Processing', 'Natural Language Processing (NLP)', 'Pemrosesan Big Data & Analisis Prediktif'],
    careers: ['AI / Machine Learning Engineer', 'Data Scientist & Analyst', 'Computer Vision Specialist'],
  },
  {
    id: 'cyber',
    num: '03',
    title: 'Keamanan Siber & Jaringan',
    subtitle: 'Cyber Security & Network Infrastructure',
    enTitle: 'Cyber Security & Networks',
    accent: '#00853F',
    icon: ShieldCheck,
    image: '/peminatan/cyber-security.webp',
    summary: 'Pertahanan sistem informasi, audit keamanan digital, arsitektur jaringan terdistribusi, dan manajemen infrastruktur server.',
    topics: ['Infrastruktur Jaringan Enterprise', 'Penetration Testing & Security Audit', 'Cloud & Data Center Security', 'Administrasi Sistem & Linux Server'],
    careers: ['Cyber Security Analyst', 'Network Infrastructure Engineer', 'System & Security Administrator'],
  },
  {
    id: 'iot',
    num: '04',
    title: 'Internet of Things & Robotika',
    subtitle: 'IoT & Embedded Systems Automation',
    enTitle: 'IoT & Robotics Automation',
    accent: '#DF1A22',
    icon: Cpu,
    image: '/peminatan/iot-robotics.webp',
    summary: 'Integrasi perangkat keras pintar, sistem komputasi tertanam (embedded), jaringan sensor nirkabel, dan otomatisasi industri.',
    topics: ['Perancangan Sistem Tertanam (Embedded)', 'Jaringan Sensor & Komunikasi Nirkabel', 'Integrasi Mikrokontroler & Firmware', 'Automasi Industri & Edge Computing'],
    careers: ['IoT Solutions Architect', 'Embedded Systems Engineer', 'Automation & Robotics Specialist'],
  },
  {
    id: 'game',
    num: '05',
    title: 'Game Dev',
    subtitle: 'Game Technology',
    enTitle: 'Game Technology',
    accent: '#F2A900',
    icon: Gamepad2,
    image: '/peminatan/game-dev.webp',
    summary: 'Perancangan dan pengembangan game digital, arsitektur game engine, logika mekanika gameplay, grafika 3D, serta kecerdasan buatan dalam game.',
    topics: ['Arsitektur Game Engine & Scripting', 'Grafika Komputer & Shader Rendering', 'Pengembangan Game 2D/3D Multiplatform', 'Fisika Simulasi & Game Artificial Intelligence'],
    careers: ['Game Programmer / Developer', 'Game Engine & Mechanics Engineer', 'Technical Gameplay Designer'],
  },
];

export default function PeminatanSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="peminatan"
      className="relative z-30 w-full bg-[#FFFFFF] text-[#111111] py-24 sm:py-32 md:py-40 select-none font-['Mori',sans-serif] tracking-[-0.01em] border-t border-neutral-200 overflow-hidden shadow-[0_-40px_90px_rgba(0,0,0,0.7)]"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      <div className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        
        {/* Dynamic Architectural Header */}
        <div className="mb-14 sm:mb-18 md:mb-20">
          {/* Staggered Duotone Headline */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
            <div className="max-w-4xl xl:max-w-5xl">
              <h2 className="text-[33px] leading-[43px] sm:text-[48px] sm:leading-[58px] md:text-[60px] md:leading-[72px] lg:text-[72px] lg:leading-[86px] xl:text-[80.9999px] xl:leading-[97.1999px] font-normal tracking-[-0.01em] text-[#111111]">
                Pilihan Spesialisasi <span className="italic text-neutral-400 font-light">&</span>
                <br className="hidden sm:inline" />
                <span className="text-[#DF1A22] font-medium"> Domain Keahlian.</span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-1">
              <p className="text-[15px] sm:text-[16px] text-neutral-500 font-light leading-relaxed">
                Pilih jalur minat komputasi untuk membangun portofolio nyata dan kompetensi mendalam selama masa studi.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop & Tablet: Standby All Visual Previews -> Expand on Hover (>= 768px - Optimized GPU) */}
        <div
          onMouseLeave={() => setActiveIndex(null)}
          className="hidden md:flex gap-3 lg:gap-4 h-[520px] lg:h-[550px] w-full"
        >
          {PEMINATAN_TRACKS.map((track, index) => {
            const isExpanded = activeIndex === index;
            const Icon = track.icon;

            return (
              <motion.div
                key={track.id}
                layout
                onClick={() => setActiveIndex(isExpanded ? null : index)}
                onMouseEnter={() => setActiveIndex(index)}
                transition={{
                  layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative rounded-2xl cursor-pointer border flex flex-col justify-between overflow-hidden group transform-gpu ${
                  isExpanded
                    ? 'flex-[3.5] lg:flex-[4] p-8 lg:p-9 bg-white border-neutral-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]'
                    : 'flex-1 p-6 lg:p-7 border-neutral-200'
                }`}
              >
                {/* Inactive Card: Full Rich Visual Preview Image Before Hover */}
                {!isExpanded && (
                  <>
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      quality={80}
                      loading="lazy"
                      decoding="async"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                      sizes="(max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Natural Vignette Overlay for High Contrast & Vibrant Center */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-0" />
                  </>
                )}

                {/* Top Row: Index Number & Icon */}
                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-[28px] lg:text-[34px] font-bold tracking-tighter tabular-nums leading-none transition-colors duration-300 ${
                        isExpanded ? '' : 'text-white'
                      }`}
                      style={{ color: isExpanded ? track.accent : undefined }}
                    >
                      {track.num}
                    </span>
                    {isExpanded && (
                      <span className="text-[12px] uppercase tracking-wider text-neutral-400 font-medium">
                        {track.enTitle}
                      </span>
                    )}
                  </div>

                  <Icon
                    className={`size-6 transition-colors duration-300 ${
                      isExpanded ? 'text-[#111111]' : 'text-white drop-shadow-md'
                    }`}
                  />
                </div>

                {/* Expanded Content Area: Pure Editorial Text & Specs (NO IMAGE INSIDE) */}
                {isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                    className="flex flex-col justify-between flex-1 mt-6 relative z-10"
                  >
                    <div>
                      <h3 className="text-[28px] lg:text-[34px] font-normal tracking-[-0.015em] text-[#111111] leading-tight mb-3">
                        {track.title}
                      </h3>
                      <p className="text-neutral-600 text-[15px] lg:text-[16px] leading-relaxed max-w-2xl font-light">
                        {track.summary}
                      </p>
                    </div>

                    {/* Editorial 2-Column Specs: Full Width */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pt-6 border-t border-neutral-100 mt-6">
                      {/* Left Column: Ruang Lingkup */}
                      <div>
                        <span className="text-[12px] uppercase tracking-wide text-neutral-400 block mb-2.5 font-medium">
                          Ruang Lingkup Kajian
                        </span>
                        <ul className="space-y-2">
                          {track.topics.map((topic) => (
                            <li key={topic} className="text-[13px] lg:text-[14px] text-neutral-700 font-light flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: track.accent }} />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: Prospek Karier */}
                      <div>
                        <span className="text-[12px] uppercase tracking-wide text-neutral-400 block mb-2.5 font-medium">
                          Prospek Lulusan
                        </span>
                        <ul className="space-y-2">
                          {track.careers.map((career) => (
                            <li key={career} className="text-[13px] lg:text-[14px] text-neutral-800 font-normal flex items-center gap-2.5">
                              <ArrowUpRight className="size-4 text-neutral-400 shrink-0" />
                              <span>{career}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Collapsed State: Crisp White Typography over Preview Photo */
                  <div className="flex flex-col items-start justify-end flex-1 pb-1 relative z-10">
                    <span className="text-[17px] lg:text-[19px] font-medium text-white tracking-tight leading-snug drop-shadow-sm">
                      {track.title}
                    </span>
                    <span className="text-[12px] text-white/70 font-light mt-1">
                      {track.enTitle}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Consistent & Locked-Position Accordion (< 768px - Optimized GPU) */}
        <div className="flex md:hidden flex-col gap-4">
          {PEMINATAN_TRACKS.map((track, index) => {
            const isExpanded = activeIndex === index;
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                onClick={() => setActiveIndex(isExpanded ? null : index)}
                className={`rounded-2xl border cursor-pointer overflow-hidden relative p-6 sm:p-7 transition-colors duration-300 transform-gpu ${
                  isExpanded
                    ? 'bg-white border-neutral-300 shadow-lg'
                    : 'bg-[#161616] border-neutral-800 shadow-sm'
                }`}
              >
                {/* Persistent Background Photo with Smooth Synchronized Opacity Transition */}
                <div
                  className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ease-out ${
                    isExpanded ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    quality={80}
                    loading="lazy"
                    decoding="async"
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35" />
                </div>

                {/* Top Row: Number & Icon (Locked in Place, Never Jumps) */}
                <div className="flex items-center justify-between relative z-10 w-full mb-3.5">
                  <span
                    className={`text-[28px] sm:text-[32px] font-bold tracking-tighter tabular-nums leading-none transition-colors duration-300 ${
                      isExpanded ? '' : 'text-white'
                    }`}
                    style={{ color: isExpanded ? track.accent : undefined }}
                  >
                    {track.num}
                  </span>

                  <Icon
                    className={`size-6 sm:size-7 transition-colors duration-300 ${
                      isExpanded ? 'text-[#111111]' : 'text-white drop-shadow-md'
                    }`}
                  />
                </div>

                {/* Unified Title & Subtitle (Locked in Place, Never Jumps) */}
                <div className="relative z-10">
                  <h3
                    className={`text-[21px] sm:text-[23px] font-normal leading-snug transition-colors duration-300 ${
                      isExpanded ? 'text-[#111111] font-medium' : 'text-white'
                    }`}
                  >
                    {track.title}
                  </h3>
                  <span
                    className={`text-[12.5px] sm:text-[13px] block mt-1 transition-colors duration-300 ${
                      isExpanded ? 'text-neutral-500 font-normal' : 'text-neutral-200'
                    }`}
                  >
                    {track.subtitle}
                  </span>
                </div>

                {/* Expandable Details Drawer (Smooth Concurrent Open/Close) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25, ease: 'easeOut' },
                      }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="pt-4 mt-4 border-t border-neutral-100">
                        <p className="text-neutral-700 text-[14px] sm:text-[14.5px] leading-relaxed font-normal mb-4">
                          {track.summary}
                        </p>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[12px] uppercase tracking-wide text-neutral-500 block mb-2 font-medium">
                              Ruang Lingkup Kajian
                            </span>
                            <ul className="space-y-2">
                              {track.topics.map((topic) => (
                                <li key={topic} className="text-[13.5px] text-neutral-800 font-normal flex items-center gap-2">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: track.accent }}
                                  />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-[12px] uppercase tracking-wide text-neutral-500 block mb-2 font-medium">
                              Prospek Lulusan
                            </span>
                            <ul className="space-y-2">
                              {track.careers.map((career) => (
                                <li key={career} className="text-[13.5px] text-neutral-900 font-medium flex items-center gap-2">
                                  <ArrowUpRight className="size-3.5 text-neutral-500 shrink-0" />
                                  <span>{career}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
