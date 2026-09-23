import React, { useRef, useState } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    // Check touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pull up to 0.3 of the cursor offset
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    const btn = btnRef.current;
    const circle = circleRef.current;
    if (!btn || !circle) return;

    const rect = btn.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    gsap.set(circle, {
      left: relX,
      top: relY,
      scale: 0,
      opacity: 1,
    });

    gsap.to(circle, {
      scale: 2.8,
      duration: 0.6,
      ease: 'expo.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    const btn = btnRef.current;
    const circle = circleRef.current;

    if (btn) {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    }

    if (circle) {
      const rect = btn?.getBoundingClientRect();
      if (rect) {
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        gsap.to(circle, {
          left: relX,
          top: relY,
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
        });
      }
    }
  };

  const variantStyles = {
    primary:
      'bg-[#E01B24] text-[#F6EEE1] border border-[#E01B24] shadow-lg shadow-[#E01B24]/20 hover:shadow-[#E01B24]/40',
    outline:
      'bg-transparent text-[#F6EEE1] border border-[#F6EEE1]/40 hover:border-[#E01B24] hover:text-[#F6EEE1]',
    ghost:
      'bg-transparent text-[#F6EEE1] hover:text-[#FF5A1F]',
    cream:
      'bg-[#F6EEE1] text-[#0A0A0A] border border-[#F6EEE1] hover:bg-[#E01B24] hover:text-[#F6EEE1] hover:border-[#E01B24]',
  };

  const circleFills = {
    primary: 'bg-[#FF5A1F]',
    outline: 'bg-[#E01B24]',
    ghost: 'bg-[#E01B24]/20',
    cream: 'bg-[#E01B24]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-bold uppercase tracking-wider',
    md: 'px-7 py-3.5 text-sm font-bold uppercase tracking-wider',
    lg: 'px-9 py-4.5 text-base font-bold uppercase tracking-widest',
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden transition-colors cursor-pointer select-none font-display ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {/* Inner expanding circle */}
      <span
        ref={circleRef}
        aria-hidden="true"
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none ${circleFills[variant]}`}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
