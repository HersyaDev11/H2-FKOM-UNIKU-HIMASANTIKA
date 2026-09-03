"use client";

import * as React from "react";

/* ----------------------------------------------------------------
 * ScrollReelTestimonials (Hierarchical Featured Scale)
 *
 * Enlarged center portrait photo (185px) flanked by compact,
 * subtle side accent columns (95px) for maximum focal impact.
 * ---------------------------------------------------------------- */

export interface ScrollReelTestimonial {
  quote: string;
  author: string;
  image: string;
  alt?: string;
}

export interface ScrollReelTestimonialsProps {
  testimonials: ScrollReelTestimonial[];
  charStaggerMs?: number;
  className?: string;
}

/* Sizing & Geometry */
const CENTER_CELL = 185;
const CENTER_GAP = 12;
const STEP = 3 * (CENTER_CELL + CENTER_GAP);

const SIDE_CELL = 95;
const SIDE_GAP = 10;
const SIDE_STEP = 3 * (SIDE_CELL + SIDE_GAP);

const EXIT_MS = 240;
const SLIDE_MS = 800;

const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const QUOTE_CLASSES =
  "m-0 text-[24.5px] sm:text-[28px] md:text-[33px] lg:text-[38px] xl:text-[42px] font-normal leading-[1.25] sm:leading-[1.26] tracking-[-0.018em] text-[#FFFFFF]";
const AUTHOR_CLASSES =
  "m-0 text-[14px] sm:text-[16px] lg:text-[19px] font-normal leading-[1.4] text-neutral-400";

const FEATURED_SHADOW =
  "0 20px 45px -8px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* Compact side placeholder cell */
function SideCell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      style={{ width: SIDE_CELL, height: SIDE_CELL }}
    />
  );
}

/* Middle column placeholder cell */
function CenterCell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-3xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      style={{ width: CENTER_CELL, height: CENTER_CELL }}
    />
  );
}

/* Large Featured portrait tile with natural organic frame */
function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-3xl bg-neutral-900 ring-1 ring-white/25"
      style={{ width: CENTER_CELL, height: CENTER_CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}

/* Per-character split text animation */
function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 4,
  className,
}: ScrollReelTestimonialsProps) {
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = testimonials.length;

  React.useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  /* Middle column: 3 leading cells, then featured + 2 cells between each, then 3 trailing */
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 8 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -(centerIdx - index) * SIDE_STEP;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = testimonials[displayIndex];

  /* Find longest testimonial to lock the stage height so controls NEVER jump */
  const longestTestimonial = React.useMemo(() => {
    return testimonials.reduce(
      (max, t) => (t.quote.length > max.quote.length ? t : max),
      testimonials[0]
    );
  }, [testimonials]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full flex-col items-center lg:items-stretch justify-between gap-12 lg:gap-20 xl:gap-28 outline-none lg:flex-row font-['Mori',sans-serif]",
        className
      )}
      style={{ fontFamily: "'Mori', sans-serif" }}
    >
      {/* Reel Section: Prominent Center Portrait + Compact Side Columns (Full Screen Width on Mobile) */}
      <div
        aria-hidden="true"
        className="relative h-64 sm:h-76 md:h-88 lg:h-[520px] xl:h-[560px] w-screen -mx-6 sm:mx-0 sm:w-full shrink-0 overflow-hidden lg:w-[480px] xl:w-[500px] sm:rounded-3xl border-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2.5 sm:gap-3.5 scale-[0.88] sm:scale-95 md:scale-100 lg:scale-100 transform-gpu origin-center">
          {/* Left Compact Column (Small 95px boxes) */}
          <div
            className="flex shrink-0 flex-col gap-2.5 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <SideCell key={i} />
            ))}
          </div>

          {/* Middle Main Column (Large 185px featured photos) */}
          <div
            className="flex shrink-0 flex-col gap-3 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured
                  key={i}
                  src={testimonials[item.i].image}
                  alt={testimonials[item.i].alt}
                />
              ) : (
                <CenterCell key={i} />
              )
            )}
          </div>

          {/* Right Compact Column (Small 95px boxes) */}
          <div
            className="flex shrink-0 flex-col gap-2.5 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <SideCell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section: Typographic Stage */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-2 lg:py-6">
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
          {/* Brand Red Quote Icon */}
          <svg
            className="block h-8 w-8 sm:h-11 sm:w-11 lg:h-16 lg:w-16 text-[#DF1A22]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          {/* Text Stage: Rock-solid spacious fixed height prevents any button shift or clipping */}
          <div
            className="relative w-full max-w-3xl"
            aria-live="polite"
          >
            {/* Invisible sizer anchored to the longest quote with ample vertical space */}
            <div
              aria-hidden="true"
              className="invisible pointer-events-none select-none flex min-h-[195px] sm:min-h-[235px] lg:min-h-[290px] flex-col gap-4 sm:gap-6"
            >
              <p className={QUOTE_CLASSES}>{longestTestimonial.quote}</p>
              <p className={AUTHOR_CLASSES}>{longestTestimonial.author}</p>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-4 sm:gap-6 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit"
              )}
            >
              <p className={QUOTE_CLASSES}>
                <Chars
                  text={current.quote}
                  startIndex={0}
                  staggerMs={charStaggerMs}
                />
              </p>
              <p className={AUTHOR_CLASSES}>
                <Chars
                  text={current.author}
                  startIndex={14}
                  staggerMs={charStaggerMs}
                />
              </p>
            </div>
          </div>
        </div>

        {/* Controls: Positioned further down with generous breathing room */}
        <div className="mt-6 sm:mt-12 lg:mt-20 flex items-center justify-between border-t border-white/10 pt-4 sm:pt-6 lg:pt-8">
          {/* Pill Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (!animating.current && i !== index) {
                    paginate((i > index ? 1 : -1) as 1 | -1);
                  }
                }}
                className={`h-1.5 sm:h-2 lg:h-2.5 shrink-0 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? "w-5 sm:w-7 lg:w-8 bg-[#DF1A22]"
                    : "w-1.5 sm:w-2 lg:w-2.5 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Lihat testimoni ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={index === 0}
              aria-label="Testimoni Sebelumnya"
              className="grid h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:enabled:bg-white/15 hover:enabled:scale-105 active:enabled:scale-95 disabled:cursor-default disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg
                className="h-3.5 w-3.5 lg:h-4 lg:w-4"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.5 2.5 3.5 6l4 3.5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={index === count - 1}
              aria-label="Testimoni Berikutnya"
              className="grid h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:enabled:bg-white/15 hover:enabled:scale-105 active:enabled:scale-95 disabled:cursor-default disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg
                className="h-3.5 w-3.5 lg:h-4 lg:w-4"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4.5 2.5 4 3.5-4 3.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
