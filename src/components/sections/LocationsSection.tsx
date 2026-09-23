import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Utensils, ShoppingBag, Bike, MapPin, Clock, Phone } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface LocationsSectionProps {
  onOpenOrder: (item?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenOrder }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const headlineText = 'HUNGRY YET?';

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      headlineLettersRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - letterCenterX, e.clientY - letterCenterY);
        const maxDist = 200;

        if (dist < maxDist) {
          const power = 1 - dist / maxDist;
          gsap.to(span, {
            scale: 1 + power * 0.35,
            color: power > 0.4 ? '#E01B24' : '#0A0A0A',
            y: -power * 14,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.to(span, {
            scale: 1,
            color: '#0A0A0A',
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const serviceChannels = [
    {
      title: 'Dine In',
      icon: Utensils,
      line: 'Immersive sizzling broast experience with hot skillet sides and curated hospitality.',
      hours: '12:00 PM – 02:00 AM',
      branch: 'Gulberg & DHA Flagships [Add branch details]',
      phone: '+92 42 3578XXXX [Add branch details]',
      action: 'Reserve Table',
    },
    {
      title: 'Takeaway',
      icon: ShoppingBag,
      line: 'Freshly boxed right out of the broaster in heat-vented foil packaging to preserve crunch.',
      hours: '12:00 PM – 03:00 AM',
      branch: 'All Branches [Add branch details]',
      phone: '+92 42 3579XXXX [Add branch details]',
      action: 'Pickup Order',
    },
    {
      title: 'Direct Delivery',
      icon: Bike,
      line: 'Specially insulated thermal bags ensure your broast arrives hot, shatter-crisp, and juicy.',
      hours: '12:00 PM – 04:00 AM',
      branch: '30–40 Mins Delivery Radius [Add branch details]',
      phone: 'UAN: 111-JUMBO-1 [Add branch details]',
      action: 'Order Delivery',
    },
  ];

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F6EEE1] text-[#0A0A0A] py-28 px-6 sm:px-12 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E01B24]/08 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center space-y-16">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 text-xs uppercase font-display tracking-widest text-[#E01B24]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24]" />
            <span>Ready For The Crunch</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24]" />
          </div>

          <h2 className="font-display text-[clamp(4.5rem,14vw,12rem)] tracking-tighter uppercase leading-none select-none flex justify-center flex-wrap gap-x-3">
            {headlineText.split('').map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  headlineLettersRef.current[index] = el;
                }}
                className="inline-block transition-transform will-change-transform text-[#0A0A0A] cursor-default"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-base sm:text-lg text-[#5C564E] font-body max-w-lg mx-auto mt-4">
            Taste the bone-deep difference. Broasted to golden perfection in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {serviceChannels.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-8 border border-[#0A0A0A]/08 hover:border-[#E01B24]/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E01B24]/10 border border-[#E01B24]/25 flex items-center justify-center text-[#E01B24] group-hover:scale-110 group-hover:bg-[#E01B24] group-hover:text-[#F6EEE1] transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-3xl uppercase tracking-tight text-[#0A0A0A]">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C564E] font-body leading-relaxed">
                    {card.line}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#0A0A0A]/08 text-xs font-body text-[#5C564E]">
                  <div className="flex items-center gap-2 text-[#0A0A0A]">
                    <Clock className="w-3.5 h-3.5 text-[#E01B24] shrink-0" />
                    <span>{card.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#E01B24] shrink-0" />
                    <span className="truncate">{card.branch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                    <span>{card.phone}</span>
                  </div>
                </div>

                <MagneticButton
                  variant="outlineDark"
                  size="sm"
                  onClick={() => onOpenOrder()}
                  className="w-full"
                >
                  {card.action}
                </MagneticButton>
              </div>
            );
          })}
        </div>

        <div className="pt-6">
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => onOpenOrder()}
            className="text-lg px-12 py-5 shadow-2xl shadow-[#E01B24]/40"
          >
            Order Now Direct
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
