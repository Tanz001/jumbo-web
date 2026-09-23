import React from 'react';

interface CrispyEdgeProps {
  color?: string; // fill color
  flip?: boolean; // flip vertically
  className?: string;
}

/**
 * Jagged crumb-like crispy edge SVG divider between sections
 */
export const CrispyEdge: React.FC<CrispyEdgeProps> = ({
  color = '#0A0A0A',
  flip = false,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className} ${
        flip ? 'rotate-180 -mb-[1px]' : '-mt-[1px]'
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-12 block"
        fill={color}
      >
        <path d="M0,0 L0,18 Q30,34 65,14 T140,28 T215,8 T290,32 T365,12 T440,24 T515,6 T590,36 T665,14 T740,30 T815,10 T890,26 T965,8 T1040,34 T1115,12 T1200,20 L1200,48 L0,48 Z" />
      </svg>
    </div>
  );
};
