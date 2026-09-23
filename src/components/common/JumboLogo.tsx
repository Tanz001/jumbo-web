import React from 'react';

interface JumboLogoProps {
  className?: string;
  fill?: string;
  showSkewer?: boolean;
  withBackground?: boolean;
  idPrefix?: string;
  letterClassName?: string;
  skewerClassName?: string;
  animated?: boolean;
}

/**
 * Clean inline SVG representation of the official JUMBO logo:
 * Condensed blocky arched wordmark with the signature skewer and ring
 * piercing vertically through the letter "B".
 */
export const JumboLogo: React.FC<JumboLogoProps> = ({
  className = 'w-auto h-12',
  fill = '#FFFFFF',
  showSkewer = true,
  withBackground = false,
  idPrefix = 'jumbo-logo',
  letterClassName = '',
  skewerClassName = '',
}) => {
  return (
    <svg
      viewBox="0 0 460 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Jumbo Injected Broast Logo"
    >
      {withBackground && (
        <rect width="460" height="270" rx="16" fill="#E01B24" />
      )}

      {/* Letters Group */}
      <g id={`${idPrefix}-letters`} className="jumbo-letters">
        {/* Letter J */}
        <path
          id={`${idPrefix}-letter-j`}
          className={`jumbo-letter ${letterClassName}`}
          d="M26 150 C26 185 45 195 68 195 C75 195 80 193 84 191 L84 86 L56 86 L56 166 C53 167 49 168 45 168 C38 168 36 164 36 156 L36 150 Z"
          fill={fill}
        />
        {/* Letter J - refined blocky version matching logo */}
        <path
          id={`${idPrefix}-letter-j-block`}
          className={`jumbo-letter ${letterClassName}`}
          d="M25 152 C25 186 42 195 64 195 C74 195 81 192 85 190 L85 86 L57 86 L57 167 C54 168 50 169 46 169 C38 169 36 163 36 154 L36 152 Z"
          style={{ display: 'none' }}
          fill={fill}
        />

        {/* 
          Official JUMBO exact condensed path definitions with gentle arched top curve:
          J: 25 - 84
          U: 94 - 165
          M: 175 - 265
          B: 275 - 346
          O: 356 - 435
        */}

        {/* Letter J */}
        <path
          id={`${idPrefix}-char-j`}
          className={`jumbo-char ${letterClassName}`}
          d="M 28,155 C 28,188 44,196 66,196 C 77,196 83,193 86,190 L 86,88 L 56,88 L 56,168 C 53,169 49,170 45,170 C 37,170 35,164 35,155 L 35,155 Z"
          style={{ display: 'none' }}
          fill={fill}
        />

        {/* Solid precise geometry paths matching the attached logo */}
        {/* Letter J */}
        <g id={`${idPrefix}-letter-0`} className={`jumbo-letter-wrap ${letterClassName}`}>
          <path
            d="M 24,152 C 24,188 42,197 66,197 C 76,197 82,194 85,191 L 85,86 L 57,86 L 57,169 C 54,170 51,171 47,171 C 39,171 37,165 37,155 L 37,152 Z"
            fill={fill}
          />
        </g>

        {/* Letter U */}
        <g id={`${idPrefix}-letter-1`} className={`jumbo-letter-wrap ${letterClassName}`}>
          <path
            d="M 94,80 L 122,80 L 122,168 C 122,171 124,172 129,172 C 134,172 136,171 136,168 L 136,78 L 164,78 L 164,166 C 164,188 152,197 129,197 C 106,197 94,188 94,166 Z"
            fill={fill}
          />
        </g>

        {/* Letter M */}
        <g id={`${idPrefix}-letter-2`} className={`jumbo-letter-wrap ${letterClassName}`}>
          <path
            d="M 174,74 L 202,74 L 219,138 L 236,74 L 264,74 L 264,195 L 238,195 L 238,122 L 225,166 L 213,166 L 200,122 L 200,195 L 174,195 Z"
            fill={fill}
          />
        </g>

        {/* Letter B */}
        <g id={`${idPrefix}-letter-3`} className={`jumbo-letter-wrap ${letterClassName}`}>
          <path
            d="M 274,78 L 326,78 C 342,78 348,87 348,103 C 348,116 342,125 330,128 C 344,131 350,141 350,161 C 350,183 342,195 324,195 L 274,195 Z M 302,102 L 319,102 C 322,102 324,100 324,97 C 324,93 322,91 319,91 L 302,91 Z M 302,181 L 321,181 C 325,181 327,178 327,173 C 327,168 325,165 321,165 L 302,165 Z"
            fill={fill}
          />
        </g>

        {/* Letter O */}
        <g id={`${idPrefix}-letter-4`} className={`jumbo-letter-wrap ${letterClassName}`}>
          <path
            d="M 358,162 C 358,187 370,197 395,197 C 420,197 432,187 432,162 L 432,118 C 432,93 420,83 395,83 C 370,83 358,93 358,118 Z M 386,118 C 386,104 389,97 395,97 C 401,97 404,104 404,118 L 404,162 C 404,176 401,183 395,183 C 389,183 386,176 386,162 Z"
            fill={fill}
          />
        </g>
      </g>

      {/* Skewer pierced through the B */}
      {showSkewer && (
        <g id={`${idPrefix}-skewer`} className={`jumbo-skewer ${skewerClassName}`}>
          {/* Top Ring Handle */}
          <circle
            cx="312"
            cy="36"
            r="12"
            stroke={fill}
            strokeWidth="4"
            fill="none"
          />
          {/* Skewer Stem connecting ring to top of B */}
          <rect
            x="310"
            y="48"
            width="4"
            height="32"
            fill={fill}
          />
          {/* Vertical skewer line through B counter slot */}
          <rect
            x="310.5"
            y="102"
            width="3"
            height="64"
            fill={fill}
            opacity="0.9"
          />
          {/* Bottom Needle piercing out beneath B */}
          <path
            d="M 310,195 L 314,195 L 314,212 L 312,217 L 310,212 Z"
            fill={fill}
          />
        </g>
      )}
    </svg>
  );
};
