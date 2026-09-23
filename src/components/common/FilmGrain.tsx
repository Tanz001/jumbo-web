import React from 'react';

/**
 * Fixed SVG film grain noise overlay
 */
export const FilmGrain: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden"
      aria-hidden="true"
    >
      <svg className="w-full h-full opacity-[0.06] brightness-125 contrast-150">
        <filter id="jumbo-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#jumbo-film-grain)" />
      </svg>
    </div>
  );
};
