import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { JumboLogo } from '../common/JumboLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Prepare initial states
      gsap.set('.preloader-letter', { yPercent: 120, opacity: 0 });
      gsap.set('.preloader-skewer', { y: '-120vh', opacity: 0 });
      gsap.set(containerRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });

      // Counter object to animate number 0 to 100
      const counterObj = { val: 0 };

      tl.to(counterObj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCount(Math.round(counterObj.val));
        },
      }, 0);

      // 1. Letters rise in from below mask one by one
      tl.to(
        '.preloader-letter',
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.1,
          ease: 'expo.out',
        },
        0.2
      );

      // 2. Skewer drops from top through the letters with back bounce
      tl.to(
        '.preloader-skewer',
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
        },
        0.9
      );

      // Ring bounce micro-accent
      tl.to(
        '.preloader-skewer circle',
        {
          scale: 1.15,
          transformOrigin: 'center center',
          duration: 0.3,
          ease: 'back.out(2)',
          yoyo: true,
          repeat: 1,
        },
        1.7
      );

      // Small pause at 100%
      tl.to({}, { duration: 0.2 });

      // 3. Exit wipe upward revealing the hero
      tl.to(
        containerRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.0,
          ease: 'power4.inOut',
        },
        '+=0.1'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const formattedCount = String(count).padStart(3, '0');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#E01B24] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none overflow-hidden"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Top Brand Mark Watermark / Status */}
      <div className="flex justify-between items-center text-[#F6EEE1]/70 font-display text-xs tracking-widest uppercase">
        <span>PAKISTANI INJECTED BROAST</span>
        <span>EST. LAHORE</span>
      </div>

      {/* Center Wordmark with Masked Letters */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-2xl mx-auto">
        <div className="overflow-hidden w-full max-w-xl px-4 py-8">
          <JumboLogo
            className="w-full h-auto drop-shadow-2xl"
            fill="#FFFFFF"
            showSkewer={true}
            idPrefix="preloader"
            letterClassName="preloader-letter"
            skewerClassName="preloader-skewer"
          />
        </div>
      </div>

      {/* Bottom Status & Counter */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="font-display text-sm tracking-wider uppercase text-[#F6EEE1]">
            Heating the oil
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#F6EEE1]/70 font-body">
            <span className="w-2 h-2 rounded-full bg-[#F2B441] animate-ping" />
            <span>Pressure infusion prep</span>
          </div>
        </div>

        {/* Counter in Anton */}
        <div
          ref={counterRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl text-[#F6EEE1] tracking-tighter leading-none"
        >
          {formattedCount}
        </div>
      </div>
    </div>
  );
};
