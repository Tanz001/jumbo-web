import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { MagneticButton } from '../common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface EventsSectionProps {
  onOpenOrder: (item?: string) => void;
}

const EVENTS = [
  {
    id: 'launch',
    eyebrow: 'Upcoming',
    title: 'Grand Launch',
    place: 'Jumbo Model Town',
    date: '24 September, 2026',
    blurb:
      'Doors open on our newest flagship. Expect injected broast, live energy, and the first crunch of Model Town.',
    image: IMAGES.eventLaunch.url,
    alt: IMAGES.eventLaunch.alt,
    badge: 'New Branch',
  },
  {
    id: 'celebration',
    eyebrow: 'Inside Jumbo',
    title: 'Team Celebration',
    place: 'Order Floor · Pickup Counter',
    date: 'Launch Week',
    blurb:
      'The crew behind the crunch — celebrating The Next Big Thing with cake, roses, and fire-red shirts.',
    image: IMAGES.eventCelebration.url,
    alt: IMAGES.eventCelebration.alt,
    badge: 'The Next Big Thing',
  },
];

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenOrder }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.event-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F6EEE1] text-[#0A0A0A] py-24 sm:py-28 px-6 sm:px-12 select-none"
    >
      <img
        src={IMAGES.mascot.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 bottom-0 hidden w-44 opacity-[0.12] lg:block xl:w-56"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12">
        <div className="event-reveal flex flex-col gap-6 border-b border-[#0A0A0A]/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#E01B24]" />
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#E01B24]">
                Happenings
              </span>
            </div>
            <h2 className="font-display text-5xl uppercase tracking-tight leading-[0.9] sm:text-6xl md:text-7xl">
              Jumbo <span className="font-accent lowercase italic text-[#E01B24]">events</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-sm text-[#5C564E]">
              Openings, celebrations, and the moments that taste like brand history.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#0A0A0A]/10 bg-white px-4 py-3 shadow-sm">
            <img
              src={IMAGES.mascot.url}
              alt={IMAGES.mascot.alt}
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="font-display text-xs uppercase tracking-wider text-[#E01B24]">
                Official Mascot
              </p>
              <p className="font-body text-sm text-[#5C564E]">The crunch has a face.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {EVENTS.map((event) => (
            <article
              key={event.id}
              className="event-reveal group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#0A0A0A]/08 bg-white shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE4D6] sm:aspect-[5/4]">
                <img
                  src={event.image}
                  alt={event.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/55 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#F2B441]/40 bg-[#0A0A0A]/80 px-3 py-1.5 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#F2B441]" />
                  <span className="font-display text-[10px] uppercase tracking-wider text-[#F2B441]">
                    {event.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-[11px] uppercase tracking-[0.2em] text-[#F2B441]">
                    {event.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-3xl uppercase tracking-tight text-[#F6EEE1] sm:text-4xl">
                    {event.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <p className="font-body text-sm leading-relaxed text-[#5C564E]">{event.blurb}</p>

                <div className="space-y-2 text-xs font-body text-[#5C564E]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E01B24]" />
                    <span>{event.place}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#F2B441]" />
                    <span className="font-display uppercase tracking-wider text-[#0A0A0A]">
                      {event.date}
                    </span>
                  </div>
                </div>

                <MagneticButton
                  variant="primary"
                  size="sm"
                  className="mt-auto w-full sm:w-auto"
                  onClick={() => onOpenOrder('Quarter Broast (Injected)')}
                >
                  Order for the Event
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
