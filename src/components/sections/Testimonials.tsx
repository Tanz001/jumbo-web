import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  highlights: string[];
  caption: string;
  image: string;
  alt: string;
}

/** Portrait people photos for stacked polaroids */
const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ayesha Khan',
    role: 'Regular · Weekend Feast Crew',
    quote:
      'We stopped ordering anywhere else. The meat is juicy to the bone and the crust still snaps an hour later — Jumbo made our Friday nights legendary.',
    highlights: ['juicy to the bone', 'crust still snaps'],
    caption: 'Bone-deep',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of Ayesha Khan',
  },
  {
    id: 't2',
    name: 'Hassan Malik',
    role: 'Food Creator · Karachi Eats',
    quote:
      'Injected broast is not a gimmick here. Every quarter piece hits with heat, garlic, and crunch that films beautifully and tastes even better off-camera.',
    highlights: ['Injected broast', 'heat, garlic, and crunch'],
    caption: 'Camera-ready',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of Hassan Malik',
  },
  {
    id: 't3',
    name: 'Sara Rizvi',
    role: 'Office Lead · Midtown Team Lunches',
    quote:
      'For twenty people, Jumbo never misses. Buckets arrive hot, sauces are generous, and the Zinger stackers disappear before the meeting even starts.',
    highlights: ['never misses', 'arrive hot'],
    caption: 'Always hot',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of Sara Rizvi',
  },
  {
    id: 't4',
    name: 'Omar Farooq',
    role: 'Late-Night Regular · Delivery Loyalist',
    quote:
      'Midnight cravings met their match. Wings stay glossy, fries stay crisp, and the garlic dip alone is worth the order — flavor that goes all the way.',
    highlights: ['Wings stay glossy', 'garlic dip alone'],
    caption: 'After dark',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    alt: 'Portrait of Omar Farooq',
  },
];

function renderQuotedText(quote: string, highlights: string[]) {
  let remaining = quote;
  const nodes: React.ReactNode[] = [];
  let key = 0;

  highlights.forEach((phrase) => {
    const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase());
    if (idx === -1) return;
    if (idx > 0) {
      nodes.push(<React.Fragment key={key++}>{remaining.slice(0, idx)}</React.Fragment>);
    }
    nodes.push(
      <span
        key={key++}
        className="underline decoration-[#F2B441] decoration-2 underline-offset-4"
      >
        {remaining.slice(idx, idx + phrase.length)}
      </span>
    );
    remaining = remaining.slice(idx + phrase.length);
  });

  if (remaining) nodes.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
  return nodes;
}

const STACK_OFFSETS = [
  { rotate: -10, x: -18, y: 14, z: 1 },
  { rotate: 7, x: 16, y: 8, z: 2 },
  { rotate: -4, x: -8, y: -6, z: 3 },
  { rotate: 2, x: 4, y: 0, z: 4 },
];

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];
  const total = TESTIMONIALS.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.voice-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  /** Order stack so active is on top; others fan behind */
  const stackOrder = TESTIMONIALS.map((_, i) => (index + i) % total);

  return (
    <section
      id="voices"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A] text-[#F6EEE1] py-24 sm:py-28 px-6 sm:px-12 select-none"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(242,180,65,0.45) 0.7px, transparent 0.7px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(224,27,36,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0A_85%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="voice-reveal lg:col-span-3 space-y-8">
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[#F2B441]">
              Field Voices
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-tight leading-[0.9] text-[#F6EEE1]">
              Satisfied
              <br />
              <span className="text-[#E01B24]">Clients</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F2B441]/40 bg-[#F6EEE1] text-[#0A0A0A] transition hover:bg-[#E01B24] hover:text-[#F6EEE1] hover:border-[#E01B24] cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F2B441]/40 bg-[#E01B24] text-[#F6EEE1] transition hover:bg-[#FF5A1F] hover:border-[#FF5A1F] cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="font-display text-sm tracking-[0.18em] text-[#8C857C]">
            {String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
          </p>
        </div>

        {/* Stacked person portraits */}
        <div className="voice-reveal relative mx-auto flex h-[380px] w-full max-w-[300px] items-center justify-center lg:col-span-4 lg:h-[440px]">
          {stackOrder.map((personIdx, stackPos) => {
            const person = TESTIMONIALS[personIdx];
            const isTop = stackPos === 0;
            const offset = STACK_OFFSETS[Math.min(stackPos, STACK_OFFSETS.length - 1)];
            const depth = total - stackPos;

            return (
              <button
                key={person.id}
                type="button"
                onClick={() => setIndex(personIdx)}
                aria-label={`View ${person.name}'s review`}
                aria-current={isTop}
                className={`absolute w-[78%] overflow-hidden rounded-sm bg-[#F6EEE1] p-2.5 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-2 transition-all duration-500 ease-out cursor-pointer ${
                  isTop
                    ? 'border-[#E01B24] scale-100'
                    : 'border-[#F2B441]/35 scale-[0.96] hover:border-[#F2B441]'
                }`}
                style={{
                  zIndex: depth,
                  transform: isTop
                    ? 'rotate(0deg) translate(0, 0)'
                    : `rotate(${offset.rotate}deg) translate(${offset.x}px, ${offset.y}px)`,
                  opacity: isTop ? 1 : 0.88 - stackPos * 0.08,
                }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#161413] rounded-[2px]">
                  <img
                    src={person.image}
                    alt={person.alt}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <p className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-accent text-lg italic text-[#0A0A0A]">
                  <span>{person.caption}</span>
                  <span className="inline-block h-2 w-2 rounded-full bg-[#E01B24]" />
                </p>
              </button>
            );
          })}
        </div>

        <div className="voice-reveal lg:col-span-5 relative space-y-6 lg:pl-4">
          <p
            className="hidden lg:block absolute -left-2 top-0 font-display text-[11px] uppercase tracking-[0.32em] text-[#F2B441]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {active.name}
          </p>

          <p className="font-body text-base sm:text-lg leading-relaxed text-[#F6EEE1]/92 lg:pl-8">
            “{renderQuotedText(active.quote, active.highlights)}”
          </p>

          <div className="lg:pl-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#E01B24] shrink-0">
                <img
                  src={active.image}
                  alt={active.alt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-display text-lg uppercase tracking-tight text-[#F6EEE1]">
                  {active.name}
                </p>
                <p className="text-sm text-[#8C857C] font-body">{active.role}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E01B24] px-4 py-2 border border-[#F2B441]/40">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#F2B441] text-[#F2B441]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
