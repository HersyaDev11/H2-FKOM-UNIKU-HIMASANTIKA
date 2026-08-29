'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QuotesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wordMembimbingRef = useRef<HTMLSpanElement>(null);
  const wordInovasiRef = useRef<HTMLSpanElement>(null);
  const wordTalentaRef = useRef<HTMLSpanElement>(null);

  // Helper to render interactive words with character splitting
  const renderInteractiveWord = (
    phrase: string,
    ref: React.RefObject<HTMLSpanElement | null>,
    hasFlowerFlair: boolean = false
  ) => {
    return (
      <span
        ref={ref}
        className={`relative cursor-pointer group ${hasFlowerFlair ? 'inline-block' : 'inline'}`}
      >
        {/* Authentic GSAP Flower & Stem Flair Constellation */}
        {hasFlowerFlair && (
          <span
            className="flair-constellation pointer-events-none absolute left-[50%] sm:left-[55%] md:left-[60%] -top-14 sm:-top-24 md:-top-32 w-[130px] sm:w-[190px] md:w-[230px] h-[85px] sm:h-[130px] md:h-[160px] z-30 select-none overflow-visible block"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 250 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible drop-shadow-[0_0_18px_rgba(30,144,255,0.7)]"
            >
              {/* 1. Stem line curve ending at coordinates (200, 20) */}
              <path
                className="flair-stem"
                d="M 20 115 C 38 108, 68 92, 85 64 C 108 34, 150 25, 172 48 C 185 64, 172 88, 150 82 C 130 76, 140 46, 172 28 L 200 20"
                stroke="#1E90FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="470"
                strokeDashoffset="470"
                style={{ strokeDasharray: 470, strokeDashoffset: 470 }}
              />

              {/* 2. Extra-Large 8-Petal Flower with translate(170, -20) */}
              <g
                className="flair-flower-wrapper"
                transform="translate(170, -20)"
              >
                <g
                  className="flair-flower"
                  style={{
                    transformOrigin: '0px 0px',
                    transform: 'scale(0)',
                    opacity: 0,
                  }}
                >
                  {/* Horizontal & Vertical Petals */}
                  <rect x="-38" y="-12" width="76" height="24" rx="12" fill="#00e64f" />
                  <rect x="-12" y="-38" width="24" height="76" rx="12" fill="#00e64f" />
                  {/* Diagonal Petals */}
                  <rect x="-38" y="-12" width="76" height="24" rx="12" transform="rotate(45)" fill="#00e64f" />
                  <rect x="-12" y="-38" width="24" height="76" rx="12" transform="rotate(45)" fill="#00e64f" />
                  {/* Center Core Dot */}
                  <circle cx="0" cy="0" r="10" fill="#fffce1" />
                </g>
              </g>

              {/* 3. Satellite Element A: Sparkle Diamond */}
              <g
                className="flair-diamond"
                style={{
                  transformOrigin: '150px 4px',
                  transform: 'scale(0)',
                  opacity: 0,
                }}
              >
                <rect
                  x="143"
                  y="-3"
                  width="14"
                  height="14"
                  rx="3"
                  transform="rotate(45 150 4)"
                  fill="#4169E1"
                />
              </g>

              {/* 4. Satellite Element B: Luminous Orbiting Dot */}
              <g
                className="flair-dot"
                style={{
                  transformOrigin: '90px 95px',
                  transform: 'scale(0)',
                  opacity: 0,
                }}
              >
                <circle cx="90" cy="95" r="5" fill="#fffce1" />
                <circle cx="90" cy="95" r="8" stroke="#1E90FF" strokeWidth="1.5" opacity="0.6" />
              </g>

              {/* 5. Satellite Element C: Mini Star Accent */}
              <g
                className="flair-mini-star"
                style={{
                  transformOrigin: '50px 45px',
                  transform: 'scale(0)',
                  opacity: 0,
                }}
              >
                <path
                  d="M 50 37 L 52 43 L 58 45 L 52 47 L 50 53 L 48 47 L 42 45 L 48 43 Z"
                  fill="#1E90FF"
                />
              </g>
            </svg>
          </span>
        )}

        {/* Fluid word-by-word wrapping to avoid premature line breaks on mobile */}
        {phrase.split(' ').map((singleWord, wIndex, wordArr) => (
          <span key={wIndex} className="inline-block whitespace-nowrap">
            {singleWord.split('').map((char, cIndex) => (
              <span
                key={cIndex}
                className="highlight-char inline-block will-change-transform text-[#fffce1]"
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
            {wIndex < wordArr.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    );
  };

  useGSAP(
    () => {
      if (!wordMembimbingRef.current || !wordInovasiRef.current || !wordTalentaRef.current) return;

      const membimbingChars = wordMembimbingRef.current.querySelectorAll('.highlight-char');
      const inovasiChars = wordInovasiRef.current.querySelectorAll('.highlight-char');
      const talentaChars = wordTalentaRef.current.querySelectorAll('.highlight-char');

      const satelliteElements = ['.flair-diamond', '.flair-dot', '.flair-mini-star'];

      // Initial GSAP setup
      gsap.set('.flair-stem', { strokeDasharray: 470, strokeDashoffset: 470 });
      gsap.set('.flair-flower', { scale: 0, opacity: 0, transformOrigin: '0px 0px' });
      gsap.set(satelliteElements, { scale: 0, opacity: 0, rotate: -45 });
      gsap.set([membimbingChars, inovasiChars, talentaChars], { color: '#fffce1', y: 0 });

      // Word 1 (membimbing) with stem & flower drawing
      const createMembimbingFlairTimeline = () => {
        const tl = gsap.timeline();

        // Clean reset
        tl.set('.flair-stem', { strokeDasharray: 470, strokeDashoffset: 470 }, 0);
        tl.set('.flair-flower', { scale: 0, opacity: 0, rotateZ: -45, transformOrigin: '0px 0px' }, 0);
        tl.set(satelliteElements, { scale: 0, opacity: 0, rotate: -45 }, 0);
        tl.set(membimbingChars, { color: '#fffce1', y: 0 }, 0);

        // 1. Stem draws smoothly
        tl.to(
          '.flair-stem',
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0
        );

        // 2. Extra-large flower blooms boldly
        tl.to(
          '.flair-flower',
          {
            scale: 1,
            opacity: 1,
            rotateZ: 0,
            duration: 0.65,
            ease: 'back.out(1.8)',
          },
          0.7
        );

        // 3. Satellites bloom in sync
        tl.to(
          satelliteElements,
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'back.out(1.6)',
          },
          0.7
        );

        // 4. Flowing color wave on letters: flows into #1E90FF then returns to #fffce1
        tl.to(
          membimbingChars,
          {
            keyframes: [
              { color: '#1E90FF', duration: 0.5, ease: 'power2.inOut' },
              { color: '#fffce1', duration: 0.5, ease: 'power2.inOut', delay: 0.3 },
            ],
            stagger: {
              each: 0.04,
              from: 'start',
            },
          },
          0.2
        );

        // 5. Flower & satellites gracefully close with a spin
        tl.to(
          '.flair-flower',
          {
            scale: 0,
            rotateZ: 90,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          2.0
        );

        tl.to(
          satelliteElements,
          {
            scale: 0,
            opacity: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power2.in',
          },
          2.0
        );

        // 6. Stem retracts smoothly back to base
        tl.to(
          '.flair-stem',
          {
            strokeDashoffset: -470,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          2.1
        );

        return tl;
      };

      // Flowing color wave that returns back to #fffce1 for secondary keywords
      const createWordColorTimeline = (chars: NodeListOf<Element>, targetColor: string) => {
        const tl = gsap.timeline();

        tl.set(chars, { color: '#fffce1', y: 0 }, 0);

        tl.to(
          chars,
          {
            keyframes: [
              { color: targetColor, duration: 0.5, ease: 'power2.inOut' },
              { color: '#fffce1', duration: 0.5, ease: 'power2.inOut', delay: 0.3 },
            ],
            stagger: {
              each: 0.035,
              from: 'start',
            },
          },
          0
        );

        return tl;
      };

      // Master Timeline: STRICTLY SEQUENTIAL
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'restart none none none',
        },
      });

      masterTl
        // 1. First: "membimbing" with stem and flower
        .add(createMembimbingFlairTimeline())
        // 2. Second: "menciptakan inovasi" (after first finishes)
        .add(createWordColorTimeline(inovasiChars, '#1E90FF'), '+=0.2')
        // 3. Third: "talenta digital masa depan" (after second finishes)
        .add(createWordColorTimeline(talentaChars, '#4169E1'), '+=0.2');

      // Interactive hover triggers
      const elMembimbing = wordMembimbingRef.current;
      const elInovasi = wordInovasiRef.current;
      const elTalenta = wordTalentaRef.current;

      const handleHoverMembimbing = () => {
        gsap.killTweensOf(['.flair-stem', '.flair-flower', ...satelliteElements, membimbingChars]);
        createMembimbingFlairTimeline();
      };

      const handleHoverInovasi = () => {
        gsap.killTweensOf(inovasiChars);
        createWordColorTimeline(inovasiChars, '#1E90FF');
      };

      const handleHoverTalenta = () => {
        gsap.killTweensOf(talentaChars);
        createWordColorTimeline(talentaChars, '#4169E1');
      };

      elMembimbing?.addEventListener('mouseenter', handleHoverMembimbing);
      elInovasi?.addEventListener('mouseenter', handleHoverInovasi);
      elTalenta?.addEventListener('mouseenter', handleHoverTalenta);

      return () => {
        elMembimbing?.removeEventListener('mouseenter', handleHoverMembimbing);
        elInovasi?.removeEventListener('mouseenter', handleHoverInovasi);
        elTalenta?.removeEventListener('mouseenter', handleHoverTalenta);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="quotes-section"
      className="sticky top-0 z-10 w-full min-h-screen flex flex-col items-center justify-center bg-[#0e100f] text-[#fffce1] overflow-hidden select-none"
    >
      {/* Wide container that centers the entire block in the screen */}
      <div className="w-full max-w-[120rem] mx-auto px-5 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-6 sm:py-8 md:py-10 flex flex-col items-center justify-center">
        
        {/* Centered bounding box with internal left-aligned content lifted slightly upward */}
        <div className="w-full max-w-fit text-left flex flex-col items-start -translate-y-6 sm:-translate-y-10 md:-translate-y-12 lg:-translate-y-16">
          
          {/* Subtitle with bright #fffce1 and enlarged high-profile SVG Braces */}
          <div className="relative inline-flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 -mt-6 sm:-mt-8 md:-mt-10">
            {/* Left SVG Brace - Height enlarged across all screen sizes */}
            <div className="text-[#fffce1] flex items-center h-10 sm:h-14 md:h-16 lg:h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 27 78"
                className="h-full w-auto"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
                />
              </svg>
            </div>

            {/* Subtitle Label in bright #fffce1 - Text size preserved untouched */}
            <p className="text-[16px] sm:text-[21px] md:text-[24px] lg:text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-[#fffce1]">
              Teknik Informatika UMC
            </p>

            {/* Right SVG Brace - Height enlarged across all screen sizes */}
            <div className="text-[#fffce1] flex items-center h-10 sm:h-14 md:h-16 lg:h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 27 78"
                className="h-full w-auto scale-x-[-1]"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
                />
              </svg>
            </div>
          </div>

          {/* GSAP Body-XL Headline Typography: Rata Kiri */}
          <h2 className="text-[33px] leading-[43px] sm:text-[48px] sm:leading-[58px] md:text-[60px] md:leading-[72px] lg:text-[72px] lg:leading-[86px] xl:text-[80.9999px] xl:leading-[97.1999px] font-normal tracking-[-0.01em] text-[#fffce1] text-left">
            <span className="inline lg:block">
              Teknik Informatika UMC{' '}
              {renderInteractiveWord('membimbing', wordMembimbingRef, true)}{' '}
              Anda{' '}
            </span>
            <span className="inline lg:block">
              {renderInteractiveWord('menciptakan inovasi', wordInovasiRef, false)}{' '}
              teknologi cerdas.{' '}
            </span>
            <span className="inline lg:block">
              Menghadirkan kurikulum berstandar global{' '}
            </span>
            <span className="inline lg:block">
              untuk mencetak{' '}
              {renderInteractiveWord('talenta digital masa depan', wordTalentaRef, false)}
              .
            </span>
          </h2>

        </div>

      </div>
    </section>
  );
}
