import React, { useState } from 'react';
import { JumboLogo } from './JumboLogo';

interface FoodImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  cursorView?: boolean;
  withGradientOverlay?: boolean;
  priority?: boolean;
  dataSpeed?: number | string;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  containerClassName = '',
  cursorView = true,
  withGradientOverlay = true,
  priority = false,
  dataSpeed,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#161413] select-none ${containerClassName}`}
      data-cursor={cursorView ? 'view' : undefined}
      data-speed={dataSpeed}
    >
      {/* Background Fallback Frame with Jumbo Branding */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#161413] via-[#4A0A10]/60 to-[#0A0A0A] z-0"
        aria-hidden="true"
      >
        <JumboLogo
          className="w-32 h-auto opacity-15 filter blur-[0.5px]"
          fill="#F6EEE1"
          showSkewer={true}
        />
        <span className="mt-3 text-[11px] font-display uppercase tracking-widest text-[#F2B441]/40">
          Jumbo Broast
        </span>
      </div>

      {/* Main Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 food-grade ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}

      {/* Subtle Warm Scrim Overlay (ink at 0.7 to transparent) */}
      {withGradientOverlay && (
        <div
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
