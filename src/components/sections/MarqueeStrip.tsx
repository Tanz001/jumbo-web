import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getLenis } from '../../hooks/useLenis';

export const MarqueeStrip: React.FC = () => {
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = marqueeInnerRef.current;
    if (!el) return;

    // Base infinite ticker
    const tween = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 18,
      ease: 'none',
    });
    tweenRef.current = tween;

    // React to Lenis scroll velocity
    const lenis = getLenis();
    if (lenis) {
      const handleScroll = (e: any) => {
        const velocity = e.velocity || 0;
        // Direction and speed multiplier
        const targetTimeScale = velocity < 0 ? -1 * (1 + Math.abs(velocity) * 0.4) : (1 + Math.abs(velocity) * 0.4);
        
        gsap.to(tween, {
          timeScale: Math.max(-4, Math.min(4, targetTimeScale)),
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            // Gradually return to base forward speed
            gsap.to(tween, { timeScale: 1, duration: 1.2, ease: 'power2.out' });
          },
        });
      };

      lenis.on('scroll', handleScroll);
      return () => {
        lenis.off('scroll', handleScroll);
        tween.kill();
      };
    }

    return () => {
      tween.kill();
    };
  }, []);

  const marqueeItem = (
    <div className="flex items-center gap-6 whitespace-nowrap shrink-0">
      <span className="font-display uppercase text-2xl sm:text-3xl md:text-4xl text-[#F6EEE1] tracking-tight">
        INJECTED BROAST
      </span>
      <svg className="w-5 h-5 fill-[#F2B441]" viewBox="0 0 24 24">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>

      <span className="font-display uppercase text-2xl sm:text-3xl md:text-4xl text-[#F6EEE1] tracking-tight">
        CRISPY BURGERS
      </span>
      <svg className="w-5 h-5 fill-[#F2B441]" viewBox="0 0 24 24">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>

      <span className="font-display uppercase text-2xl sm:text-3xl md:text-4xl text-[#F6EEE1] tracking-tight">
        HOT WINGS
      </span>
      <svg className="w-5 h-5 fill-[#F2B441]" viewBox="0 0 24 24">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>

      <span className="font-display uppercase text-2xl sm:text-3xl md:text-4xl text-[#F6EEE1] tracking-tight">
        GOLDEN FRIES
      </span>
      <svg className="w-5 h-5 fill-[#F2B441]" viewBox="0 0 24 24">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>
    </div>
  );

  return (
    <div className="relative z-30 py-6 overflow-hidden bg-[#F6EEE1] select-none pointer-events-none">
      <div className="-rotate-2 scale-105 bg-[#E01B24] py-4 sm:py-5 shadow-2xl border-y border-[#F2B441]/30">
        <div ref={marqueeInnerRef} className="flex gap-6 w-max">
          {marqueeItem}
          {marqueeItem}
          {marqueeItem}
          {marqueeItem}
        </div>
      </div>
    </div>
  );
};
