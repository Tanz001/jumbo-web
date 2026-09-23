import React from 'react';

interface SplitLinesProps {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
  maskClassName?: string;
}

/**
 * Splits text or elements into lines wrapped in overflow-hidden masks
 * for high-end staggered typography reveals.
 */
export const SplitLines: React.FC<SplitLinesProps> = ({
  children,
  className = '',
  lineClassName = 'split-line',
  maskClassName = 'overflow-hidden block',
}) => {
  if (typeof children === 'string') {
    const lines = children.split('\n').filter(line => line.trim().length > 0);
    return (
      <span className={`block ${className}`}>
        {lines.map((line, idx) => (
          <span key={idx} className={maskClassName}>
            <span className={`inline-block ${lineClassName}`}>
              {line}
            </span>
          </span>
        ))}
      </span>
    );
  }

  return <span className={className}>{children}</span>;
};

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  italicIndices?: number[];
  italicClassName?: string;
}

/**
 * Splits text into individual word spans for scrub-based reading animations.
 */
export const SplitWords: React.FC<SplitWordsProps> = ({
  text,
  className = '',
  wordClassName = 'split-word',
  italicIndices = [],
  italicClassName = 'font-accent text-[#F2B441]',
}) => {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={`inline ${className}`}>
      {words.map((word, idx) => {
        const isItalic = italicIndices.includes(idx) || word.startsWith('*') || word.endsWith('*');
        const cleanWord = word.replace(/\*/g, '');
        return (
          <span
            key={idx}
            className={`inline-block mr-[0.25em] ${wordClassName} ${
              isItalic ? italicClassName : ''
            }`}
          >
            {cleanWord}
          </span>
        );
      })}
    </span>
  );
};
