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
        {/* Exact GSAP Flower & Stem Flair Constellation from reference */}
        {hasFlowerFlair && (
          <span
            className="flair-constellation pointer-events-none absolute left-[50%] sm:left-[55%] md:left-[60%] -top-14 sm:-top-24 md:-top-32 w-[130px] sm:w-[190px] md:w-[230px] h-[85px] sm:h-[130px] md:h-[160px] z-30 select-none overflow-visible block"
            style={{
              top: 'clamp(-110px, -12vh, -50px)',
              width: 'clamp(120px, 14vw, 230px)',
              height: 'clamp(80px, 10vh, 160px)',
            }}
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
                  {/* Glowing Center Core */}
                  <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
                </g>
              </g>

              {/* 3. Diamond satellite accent */}
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

              {/* 4. Dot satellite accent */}
              <g
                className="flair-dot"
                style={{
                  transformOrigin: '90px 95px',
                  transform: 'scale(0)',
                  opacity: 0,
                }}
              >
                <circle cx="90" cy="95" r="5" fill="#FFFFFF" />
                <circle cx="90" cy="95" r="8" stroke="#1E90FF" strokeWidth="1.5" opacity="0.6" />
              </g>

              {/* 5. Mini Star satellite accent */}
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

        {/* Word split into interactive characters */}
        {phrase.split('').map((char, index) => {
          const isSpace = char === ' ';
          return (
            <span
              key={index}
              className="interactive-char inline-block"
              style={{
                color: '#FFFFFF',
                transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: isSpace ? 'inline' : 'inline-block',
                whiteSpace: isSpace ? 'pre' : 'normal',
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  useGSAP(
    () => {
      const membimbingChars = wordMembimbingRef.current?.querySelectorAll('.interactive-char') || [];
      const inovasiChars = wordInovasiRef.current?.querySelectorAll('.interactive-char') || [];
      const talentaChars = wordTalentaRef.current?.querySelectorAll('.interactive-char') || [];
      const satelliteElements = ['.flair-diamond', '.flair-dot', '.flair-mini-star'];

      // Initial static setup
      gsap.set('.flair-stem', { strokeDasharray: 470, strokeDashoffset: 470 });
      gsap.set('.flair-flower', { scale: 0, opacity: 0, transformOrigin: '0px 0px' });
      gsap.set(satelliteElements, { scale: 0, opacity: 0, rotate: -45 });
      gsap.set([membimbingChars, inovasiChars, talentaChars], { color: '#FFFFFF', y: 0 });

      // Helper to create the Membimbing Stem + Flower Flair Timeline
      const createMembimbingFlairTimeline = () => {
        const tl = gsap.timeline();

        // Initial setup for the flair elements
        tl.set('.flair-stem', { strokeDasharray: 470, strokeDashoffset: 470 }, 0);
        tl.set('.flair-flower', { scale: 0, opacity: 0, rotateZ: -45, transformOrigin: '0px 0px' }, 0);
        tl.set(satelliteElements, { scale: 0, opacity: 0, rotate: -45 }, 0);
        tl.set(membimbingChars, { color: '#FFFFFF', y: 0 }, 0);

        // 1. Stem draws smoothly from bottom-left to top-right
        tl.to(
          '.flair-stem',
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0
        );

        // 2. 8-Petal Flower bursts open in place
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

        // 3. Satellites pop outward with stagger
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

        // 4. Flowing color wave on letters: flows into #1E90FF then returns to #FFFFFF
        tl.to(
          membimbingChars,
          {
            keyframes: [
              { color: '#1E90FF', duration: 0.5, ease: 'power2.inOut' },
              { color: '#FFFFFF', duration: 0.5, ease: 'power2.inOut', delay: 0.3 },
            ],
            stagger: {
              each: 0.04,
              from: 'start',
            },
          },
          0.2
        );

        // 5. Flower gracefully closes with a spin
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

        // 6. Satellites close
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

        // 7. Stem retracts smoothly back to base
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

      // Flowing color wave that returns back to #FFFFFF for secondary keywords
      const createWordColorTimeline = (chars: NodeListOf<Element> | Element[] | any, targetColor: string) => {
        const tl = gsap.timeline();

        tl.set(chars, { color: '#FFFFFF', y: 0 }, 0);

        tl.to(
          chars,
          {
            keyframes: [
              { color: targetColor, duration: 0.5, ease: 'power2.inOut' },
              { color: '#FFFFFF', duration: 0.5, ease: 'power2.inOut', delay: 0.3 },
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

      // Interactive hover & touch triggers
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
      elMembimbing?.addEventListener('click', handleHoverMembimbing);
      elInovasi?.addEventListener('mouseenter', handleHoverInovasi);
      elInovasi?.addEventListener('click', handleHoverInovasi);
      elTalenta?.addEventListener('mouseenter', handleHoverTalenta);
      elTalenta?.addEventListener('click', handleHoverTalenta);

      return () => {
        elMembimbing?.removeEventListener('mouseenter', handleHoverMembimbing);
        elMembimbing?.removeEventListener('click', handleHoverMembimbing);
        elInovasi?.removeEventListener('mouseenter', handleHoverInovasi);
        elInovasi?.removeEventListener('click', handleHoverInovasi);
        elTalenta?.removeEventListener('mouseenter', handleHoverTalenta);
        elTalenta?.removeEventListener('click', handleHoverTalenta);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="quotes-section"
      className="sticky top-0 z-10 w-full min-h-screen flex flex-col items-center justify-center bg-[#0e100f] text-[#FFFFFF] select-none font-['Mori',sans-serif] tracking-[-0.01em] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-x-clip py-8 sm:py-12 lg:py-16"
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Wide container that centers the entire block in the screen */}
      <div className="w-full max-w-[120rem] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center justify-center my-auto">
        
        {/* Centered bounding box with internal left-aligned content */}
        <div 
          className="w-full max-w-fit text-left flex flex-col items-start transition-transform"
          style={{
            transform: 'translateY(clamp(-40px, -4vh, 0px))',
          }}
        >
          
          {/* Subtitle with bright #FFFFFF and high-profile SVG Braces */}
          <div 
            className="relative inline-flex items-center gap-3 sm:gap-4"
            style={{
              marginBottom: 'clamp(32px, 6vh, 80px)',
            }}
          >
            {/* Left SVG Brace */}
            <div 
              className="text-[#FFFFFF] flex items-center"
              style={{
                height: 'clamp(40px, 8vh, 80px)',
              }}
            >
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

            {/* Subtitle Label in bright #FFFFFF */}
            <p 
              className="font-medium tracking-[-0.01em] text-[#FFFFFF]"
              style={{
                fontSize: 'clamp(16px, 2.8vh, 26px)',
                lineHeight: 1.2,
              }}
            >
              Teknik Informatika UMC
            </p>

            {/* Right SVG Brace */}
            <div 
              className="text-[#FFFFFF] flex items-center"
              style={{
                height: 'clamp(40px, 8vh, 80px)',
              }}
            >
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

          {/* GSAP Body-XL Headline Typography: Pristine 4-line left alignment across all zoom levels */}
          <h2 
            className="font-normal tracking-[-0.01em] text-[#FFFFFF] text-left leading-[1.5] sm:leading-[1.38] lg:leading-[1.2]"
            style={{
              fontSize: 'clamp(26px, min(4.35vw, 8.4vh), 80.9999px)',
            }}
          >
            <span className="inline lg:block lg:whitespace-nowrap">
              Teknik Informatika UMC{' '}
              {renderInteractiveWord('membimbing', wordMembimbingRef, true)}{' '}
              Anda{' '}
            </span>
            <span className="inline lg:block lg:whitespace-nowrap">
              {renderInteractiveWord('menciptakan inovasi', wordInovasiRef, false)}{' '}
              teknologi cerdas.{' '}
            </span>
            <span className="inline lg:block lg:whitespace-nowrap">
              Menghadirkan kurikulum berstandar global{' '}
            </span>
            <span className="inline lg:block lg:whitespace-nowrap">
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
