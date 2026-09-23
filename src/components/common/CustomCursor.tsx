import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'button' | 'hidden'>('default');

  // Enable only on fine pointers (desktop)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-on');
    return () => document.documentElement.classList.remove('custom-cursor-on');
  }, []);

  // Attach tracking after cursor nodes mount
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { x: -100, y: -100 });

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else if (target.closest('button, a, [data-cursor="button"], input, select, label')) {
        setCursorState('button');
      } else {
        setCursorState('default');
      }
    };

    const handleLeave = () => setCursorState('hidden');
    const handleEnter = () => setCursorState('default');

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    document.documentElement.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.removeEventListener('mouseenter', handleEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const visible = cursorState !== 'hidden';

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={`fixed top-0 left-0 z-[99999] h-3 w-3 -ml-1.5 -mt-1.5 rounded-full bg-[#E01B24] pointer-events-none transition-opacity duration-200 ${
          visible && cursorState !== 'view' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`fixed top-0 left-0 z-[99998] flex items-center justify-center rounded-full pointer-events-none transition-[width,height,background-color,border-color,opacity,margin] duration-200 ${
          !visible
            ? 'h-11 w-11 -ml-[22px] -mt-[22px] opacity-0 border border-[#E01B24]/40'
            : cursorState === 'view'
              ? 'h-[88px] w-[88px] -ml-11 -mt-11 bg-[#E01B24] text-[#F6EEE1] border-2 border-[#F2B441] opacity-100'
              : cursorState === 'button'
                ? 'h-14 w-14 -ml-7 -mt-7 border-2 border-[#E01B24] bg-[#E01B24]/15 opacity-100'
                : 'h-11 w-11 -ml-[22px] -mt-[22px] border-2 border-[#E01B24]/55 bg-transparent opacity-100'
        }`}
      >
        {cursorState === 'view' && (
          <span className="select-none font-display text-xs font-bold uppercase tracking-widest">
            VIEW
          </span>
        )}
      </div>
    </>
  );
};
