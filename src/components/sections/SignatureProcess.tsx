import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../assets/images';
import { FoodImage } from '../common/FoodImage';
import { CrispyEdge } from '../common/CrispyEdge';

gsap.registerPlugin(ScrollTrigger);

export const SignatureProcess: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const dropletRef = useRef<SVGCircleElement>(null);

  const steps = [
    {
      num: '01',
      title: 'MARINATE',
      sub: 'THE INFUSION BATH',
      desc: 'Deep-soaked overnight in our proprietary spice blend. Garlic, toasted coriander, whole chilies, and tangy buttermilk break down fibers and tenderize every inch.',
      image: IMAGES.marinate,
      badge: '24-Hour Soak',
    },
    {
      num: '02',
      title: 'INJECT',
      sub: 'FLAVOR TO THE BONE',
      desc: 'Flavor injected straight to the bone. Not just on the surface. Our high-pressure needle array drives rich spice emulsion through the deepest cuts, ensuring juicy heat in every bite.',
      image: IMAGES.inject,
      badge: 'Deep Needle Array',
    },
    {
      num: '03',
      title: 'BROAST',
      sub: 'SEALED CRUNCH PERFECTION',
      desc: 'Pressure-cooked to a golden, shatteringly crisp finish. Broasting locks the natural moisture inside under intense pressure while transforming the skin into an ultra-crunchy crust.',
      image: IMAGES.crisp,
      badge: 'Pressure Cooked 360°',
    },
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Syringe Needle Drip Animation Loop
      if (needleRef.current && dropletRef.current) {
        gsap.to(needleRef.current, {
          y: 8,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut',
        });

        gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
          .fromTo(
            dropletRef.current,
            { y: 0, opacity: 1, scale: 0.8 },
            { y: 35, opacity: 0, scale: 1.2, duration: 1.2, ease: 'power2.in' }
          );
      }

      // Responsive Desktop vs Mobile ScrollTrigger
      ScrollTrigger.matchMedia({
        // Desktop horizontal scroll
        '(min-width: 1024px)': function () {
          if (prefersReducedMotion) return;

          const track = trackRef.current;
          if (!track) return;

          const panels = gsap.utils.toArray<HTMLElement>('.process-panel');
          const totalPanels = panels.length;

          // Horizontal scroll animation
          const hScroll = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              snap: {
                snapTo: 1 / (totalPanels - 1),
                duration: { min: 0.25, max: 0.6 },
                ease: 'power2.out',
              },
              end: () => `+=${track.scrollWidth}`,
              invalidateOnRefresh: true,
            },
          });

          // Progress bar scaleX scrub
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: () => `+=${track.scrollWidth}`,
                scrub: true,
              },
            });
          }

          // Background color morph across panels: ink (#0A0A0A) -> oxblood (#4A0A10) -> jumbo-red (#E01B24)
          gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${track.scrollWidth}`,
              scrub: 1,
            },
          })
            .to(containerRef.current, { backgroundColor: '#4A0A10', ease: 'none' }, 0.3)
            .to(containerRef.current, { backgroundColor: '#800D15', ease: 'none' }, 0.8);

          // Reveal animations for each panel's frame when it comes into view
          panels.forEach((panel) => {
            const frame = panel.querySelector('.panel-image-frame');
            if (frame) {
              gsap.fromTo(
                frame,
                { clipPath: 'inset(10% 10% 10% 10%)', scale: 0.92 },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  scale: 1,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: hScroll,
                    start: 'left 80%',
                    end: 'center center',
                    scrub: true,
                  },
                }
              );
            }
          });
        },

        // Mobile vertical degradation
        '(max-width: 1023px)': function () {
          // Simply animate panels on regular scroll
          gsap.utils.toArray<HTMLElement>('.process-panel').forEach((panel) => {
            gsap.fromTo(
              panel.querySelector('.panel-image-frame'),
              { opacity: 0.5, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 80%',
                },
              }
            );
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F6EEE1] overflow-hidden select-none transition-colors duration-700"
    >
      {/* Top Header */}
      <div className="absolute top-6 left-6 sm:left-12 z-30 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#E01B24]" />
        <span className="font-display uppercase text-xs tracking-widest text-[#F2B441]">
          THE THREE-STAGE INJECTION ARCHITECTURE
        </span>
      </div>

      {/* Horizontal Track (Desktop) / Vertical Stack (Mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row w-full lg:w-max min-h-screen pt-20 lg:pt-0"
      >
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="process-panel w-full lg:w-screen min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-20 relative shrink-0"
          >
            {/* Giant Faded Number in Anton at 30vw */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[35vw] text-outline-faint pointer-events-none select-none leading-none opacity-20 z-0"
              aria-hidden="true"
            >
              {step.num}
            </div>

            {/* Panel Grid Content */}
            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Text Info (6 cols) */}
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[#E01B24] text-xl">
                    STAGE {step.num}
                  </span>
                  <span className="text-[#8C857C] text-sm">/</span>
                  <span className="text-xs uppercase font-display tracking-widest text-[#8C857C]">
                    {step.sub}
                  </span>
                </div>

                <h3 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#F6EEE1] leading-[0.9]">
                  {step.title}
                </h3>

                <p className="font-body text-base sm:text-lg text-[#F6EEE1]/80 leading-relaxed max-w-lg">
                  {step.desc}
                </p>

                {/* Animated Needle on Step 02 */}
                {idx === 1 && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0A0A0A]/60 border border-[#F2B441]/30 backdrop-blur-md max-w-sm">
                    <svg
                      viewBox="0 0 40 60"
                      className="w-10 h-14 shrink-0 overflow-visible"
                    >
                      <g ref={needleRef}>
                        {/* Syringe barrel */}
                        <rect x="12" y="4" width="16" height="24" rx="2" fill="#E01B24" />
                        <rect x="15" y="0" width="10" height="4" fill="#F6EEE1" />
                        <line x1="16" y1="12" x2="24" y2="12" stroke="#FFFFFF" strokeWidth="2" />
                        <line x1="16" y1="18" x2="24" y2="18" stroke="#FFFFFF" strokeWidth="2" />
                        {/* Needle shaft */}
                        <line x1="20" y1="28" x2="20" y2="48" stroke="#F6EEE1" strokeWidth="2.5" />
                        {/* Tip point */}
                        <polygon points="19,48 21,48 20,52" fill="#F6EEE1" />
                      </g>
                      {/* Dripping gold spice droplet */}
                      <circle
                        ref={dropletRef}
                        cx="20"
                        cy="54"
                        r="3.5"
                        fill="#F2B441"
                      />
                    </svg>
                    <div>
                      <span className="font-display text-xs uppercase tracking-wider text-[#F2B441] block">
                        Precision Sub-Dermal Infusion
                      </span>
                      <span className="text-[11px] text-[#8C857C] font-body block mt-0.5">
                        Deep injection under 18 PSI pressure
                      </span>
                    </div>
                  </div>
                )}

                {/* Heat shimmer & intense embers indicator on Step 03 */}
                {idx === 2 && (
                  <div className="flex items-center gap-3 text-xs uppercase font-display tracking-widest text-[#FF5A1F]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] animate-ping" />
                    <span>Extreme Pressure Heat Sealed</span>
                  </div>
                )}
              </div>

              {/* Image Frame (6 cols) */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="panel-image-frame relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#F6EEE1]/15 bg-[#161413]">
                  <FoodImage
                    src={step.image.url}
                    alt={step.image.alt}
                    width={step.image.width}
                    height={step.image.height}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    containerClassName="w-full h-full"
                  />

                  {/* Heat shimmer overlay for step 03 */}
                  {idx === 2 && (
                    <div
                      className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#E01B24]/40 via-[#FF5A1F]/20 to-transparent mix-blend-color-dodge animate-pulse"
                      aria-hidden="true"
                    />
                  )}

                  {/* Badge */}
                  <div className="absolute top-5 right-5 z-25 bg-[#0A0A0A]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#F2B441]/30">
                    <span className="font-display text-xs uppercase tracking-wider text-[#F2B441]">
                      {step.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Progress Bar with Step Labels (Desktop) */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-md border-t border-[#F6EEE1]/10 px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-12 font-display text-xs uppercase tracking-widest text-[#8C857C]">
            {steps.map((s) => (
              <span key={s.num} className="hover:text-[#F6EEE1] transition-colors">
                {s.num}. {s.title}
              </span>
            ))}
          </div>

          {/* Red Progress Indicator */}
          <div className="relative flex-1 max-w-md h-[3px] bg-[#F6EEE1]/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-[#E01B24] origin-left scale-x-0"
            />
          </div>
        </div>
      </div>

      {/* Crispy edge bottom divider */}
      <CrispyEdge color="#0A0A0A" className="absolute bottom-0 left-0 right-0 z-30" />
    </section>
  );
};
