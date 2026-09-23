import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'button' | 'hidden'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // QuickTo for high performance 60fps tracking
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);

      // Check hovered target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      const buttonTarget = target.closest('button, a, [data-cursor="button"], input, select');

      if (viewTarget) {
        setCursorState('view');
      } else if (buttonTarget) {
        setCursorState('button');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setCursorState('hidden');
    };

    const handleMouseEnter = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (isTouchDevice || cursorState === 'hidden') return null;

  return (
    <>
      {/* 12px Cream Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[6px] -mt-[6px] w-3 h-3 rounded-full bg-[#F6EEE1] pointer-events-none z-[9999] transition-opacity duration-300 mix-blend-difference ${
          cursorState === 'view' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 44px Lagging Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9998] transition-all duration-300 rounded-full ${
          cursorState === 'view'
            ? 'w-[90px] h-[90px] -ml-[45px] -mt-[45px] bg-[#E01B24] text-[#F6EEE1] border border-[#F2B441]/40 shadow-2xl scale-100'
            : cursorState === 'button'
            ? 'w-[54px] h-[54px] -ml-[27px] -mt-[27px] bg-[#E01B24]/80 border border-[#E01B24] backdrop-blur-[1px] scale-110'
            : 'w-11 h-11 -ml-[22px] -mt-[22px] border border-[#F6EEE1]/50 bg-transparent'
        }`}
      >
        {cursorState === 'view' && (
          <span className="font-display uppercase tracking-widest text-xs font-bold select-none animate-in fade-in zoom-in-75 duration-200">
            VIEW
          </span>
        )}
      </div>
    </>
  );
};
