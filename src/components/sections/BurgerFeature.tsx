import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../assets/images';
import { MagneticButton } from '../common/MagneticButton';
import { CrispyEdge } from '../common/CrispyEdge';

gsap.registerPlugin(ScrollTrigger);

interface BurgerFeatureProps {
  onOpenOrder: (item?: string) => void;
}

export const BurgerFeature: React.FC<BurgerFeatureProps> = ({ onOpenOrder }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const blobWrapperRef = useRef<HTMLDivElement>(null);
  const burgerImgRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Floating sine loop (y 12px, duration 3s, yoyo)
      if (!prefersReducedMotion && burgerImgRef.current) {
        gsap.to(burgerImgRef.current, {
          y: -12,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // 2. Parallax rotation scrub (-4deg to 4deg)
      if (!prefersReducedMotion && blobWrapperRef.current) {
        gsap.fromTo(
          blobWrapperRef.current,
          { rotate: -4 },
          {
            rotate: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 3. Connective callout lines drawing in via strokeDashoffset
      const pathElements = gsap.utils.toArray<SVGPathElement>('.callout-line-path');
      pathElements.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 180;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        });
      });

      // Callout labels stagger in
      gsap.fromTo(
        '.callout-pill',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F6EEE1] text-[#0A0A0A] py-24 px-6 sm:px-12 flex items-center justify-center select-none overflow-hidden"
    >
      {/* Top transition crispy edge */}
      <CrispyEdge color="#0A0A0A" flip={true} className="absolute top-0 left-0 right-0 z-20" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Huge Type (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#E01B24]" />
            <span className="font-display uppercase text-xs tracking-widest text-[#E01B24]">
              BEYOND THE BROAST PIECE
            </span>
          </div>

          <h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] uppercase tracking-tight text-[#0A0A0A] leading-[0.88]">
            <span className="block">STACKED.</span>
            <span className="block font-accent lowercase italic text-[#E01B24] font-normal tracking-normal text-[0.95em]">
              crispy.
            </span>
            <span className="block text-[#0A0A0A]">SAUCY.</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-[#161413]/85 leading-relaxed max-w-lg">
            We apply our signature pressure-broasting mastery to artisanal brioche burgers.
            Extra-thick fried breast fillet, drenched in our house chili butter emulsion, crowned with
            crisp shredded greens and soft toasted brioche.
          </p>

          <div className="pt-2">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => onOpenOrder('Zinger Burger')}
            >
              Order The Stacker
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Floating Burger in Blob Mask + Interactive Callouts (6 cols) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div ref={blobWrapperRef} className="relative w-full max-w-lg aspect-square">
            {/* SVG Connecting Lines */}
            <svg
              ref={svgLinesRef}
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
            >
              {/* Line 1: Toasted Bun (top) */}
              <path
                className="callout-line-path"
                d="M 120,90 L 180,90 L 220,135"
                fill="none"
                stroke="#E01B24"
                strokeWidth="2"
              />
              <circle cx="220" cy="135" r="3.5" fill="#E01B24" />

              {/* Line 2: House Sauce (middle right) */}
              <path
                className="callout-line-path"
                d="M 380,240 L 320,240 L 285,260"
                fill="none"
                stroke="#E01B24"
                strokeWidth="2"
              />
              <circle cx="285" cy="260" r="3.5" fill="#E01B24" />

              {/* Line 3: Crispy Fillet (bottom left) */}
              <path
                className="callout-line-path"
                d="M 110,400 L 170,400 L 210,360"
                fill="none"
                stroke="#E01B24"
                strokeWidth="2"
              />
              <circle cx="210" cy="360" r="3.5" fill="#E01B24" />
            </svg>

            {/* Callout Label 1: Toasted Bun */}
            <div className="callout-pill absolute top-[14%] left-0 z-35 bg-[#0A0A0A] text-[#F6EEE1] px-3.5 py-1.5 rounded-full border border-[#E01B24]/40 shadow-xl">
              <span className="font-display text-[11px] uppercase tracking-wider text-[#F2B441]">
                Toasted Brioche Bun
              </span>
            </div>

            {/* Callout Label 2: House Sauce */}
            <div className="callout-pill absolute top-[44%] right-0 z-35 bg-[#0A0A0A] text-[#F6EEE1] px-3.5 py-1.5 rounded-full border border-[#E01B24]/40 shadow-xl">
              <span className="font-display text-[11px] uppercase tracking-wider text-[#FF5A1F]">
                House Garlic Emulsion
              </span>
            </div>

            {/* Callout Label 3: Crispy Fillet */}
            <div className="callout-pill absolute bottom-[16%] left-0 z-35 bg-[#0A0A0A] text-[#F6EEE1] px-3.5 py-1.5 rounded-full border border-[#E01B24]/40 shadow-xl">
              <span className="font-display text-[11px] uppercase tracking-wider text-[#F6EEE1]">
                Injected Crunch Fillet
              </span>
            </div>

            {/* Floating Burger Frame */}
            <div
              ref={burgerImgRef}
              className="relative w-full h-full rounded-[42%_58%_70%_30%/45%_45%_55%_55%] overflow-hidden shadow-2xl border-4 border-[#0A0A0A] bg-[#161413]"
            >
              <img
                src={IMAGES.burgerHero.url}
                alt={IMAGES.burgerHero.alt}
                width={IMAGES.burgerHero.width}
                height={IMAGES.burgerHero.height}
                loading="lazy"
                className="w-full h-full object-cover food-grade scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom crispy edge transitioning back to dark */}
      <CrispyEdge color="#0A0A0A" className="absolute bottom-0 left-0 right-0 z-20" />
    </section>
  );
};
