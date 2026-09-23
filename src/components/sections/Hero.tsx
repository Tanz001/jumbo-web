import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { MagneticButton } from '../common/MagneticButton';
import { getLenis } from '../../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenOrder: (item?: string) => void;
  preloaderFinished: boolean;
}

const SLIDES = [
  {
    id: 'broast',
    eyebrow: 'Signature Injection',
    headline: 'Crispy. Crunchy. Irresistible.',
    sub: 'Flavor that goes all the way to the bone.',
    cta: 'Order Quarter Broast',
    orderItem: 'Quarter Broast (Injected)',
    image: IMAGES.broastCombo.url,
    alt: IMAGES.broastCombo.alt,
  },
  {
    id: 'platter',
    eyebrow: 'Fresh Off the Broaster',
    headline: 'Shatter crust. Juicy bone.',
    sub: 'Hand-injected, pressure-fried, never held under lamps.',
    cta: 'Order Half Broast',
    orderItem: 'Half Broast',
    image: IMAGES.broastPlatter.url,
    alt: IMAGES.broastPlatter.alt,
  },
  {
    id: 'launch',
    eyebrow: 'Model Town · 24 Sep 2026',
    headline: 'Grand Launch Incoming.',
    sub: 'New flagship. Same injected crunch. Be there.',
    cta: 'See Events',
    orderItem: null as string | null,
    image: IMAGES.eventLaunch.url,
    alt: IMAGES.eventLaunch.alt,
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, preloaderFinished }) => {
  const heroRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const active = SLIDES[slide];

  useLayoutEffect(() => {
    if (!preloaderFinished) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      );
      if (!prefersReducedMotion) {
        gsap.to('.hero-slide-media', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, [preloaderFinished]);

  useLayoutEffect(() => {
    if (!preloaderFinished) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [preloaderFinished]);

  const goMenu = () => {
    const lenis = getLenis();
    const menuEl = document.querySelector('#menu');
    if (!menuEl) return;
    if (lenis) lenis.scrollTo(menuEl as HTMLElement, { offset: -10, duration: 1.35 });
    else menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  const goEvents = () => {
    const lenis = getLenis();
    const el = document.querySelector('#events');
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.35 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrimary = () => {
    if (active.orderItem) onOpenOrder(active.orderItem);
    else goEvents();
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-[#F6EEE1] pt-24 pb-6 sm:pt-28 sm:pb-8 select-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-10">
        {/* Framed slider — competitor clarity, Jumbo brand */}
        <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-[#0A0A0A] shadow-2xl border border-[#0A0A0A]/10">
          <div className="relative aspect-[16/11] min-h-[420px] sm:aspect-[16/9] sm:min-h-[480px] md:min-h-[560px]">
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className={`hero-slide-media absolute inset-0 transition-opacity duration-700 ${
                  i === slide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.alt}
                  className="h-full w-full object-cover food-grade scale-105"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/88 via-[#0A0A0A]/45 to-[#0A0A0A]/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
              </div>
            ))}

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:justify-center sm:p-10 md:p-14">
              <div className="max-w-xl">
                <div className="hero-copy mb-4 flex items-center gap-3">
                  <img
                    src={IMAGES.mascot.url}
                    alt=""
                    className="h-12 w-12 object-contain drop-shadow-lg sm:h-14 sm:w-14"
                  />
                  <span className="font-display text-[11px] uppercase tracking-[0.22em] text-[#F2B441]">
                    {active.eyebrow}
                  </span>
                </div>

                <p className="hero-copy font-display text-[11px] uppercase tracking-[0.28em] text-[#E01B24]">
                  Jumbo Broast
                </p>
                <h1 className="hero-copy mt-2 font-display text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-[0.88] tracking-tight text-[#F6EEE1]">
                  {active.headline}
                </h1>
                <p className="hero-copy mt-4 max-w-md font-body text-sm leading-relaxed text-[#F6EEE1]/85 sm:text-base">
                  {active.sub}
                </p>

                <div className="hero-copy mt-7 flex flex-wrap items-center gap-3">
                  <MagneticButton variant="primary" size="lg" onClick={handlePrimary}>
                    {active.cta}
                  </MagneticButton>
                  <MagneticButton variant="cream" size="lg" onClick={goMenu}>
                    Full Menu
                  </MagneticButton>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0A0A0A] shadow-md transition hover:bg-[#E01B24] hover:text-white sm:left-5 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0A0A0A] shadow-md transition hover:bg-[#E01B24] hover:text-white sm:right-5 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === slide ? 'w-7 bg-[#E01B24]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
