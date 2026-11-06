import React, { useState, useEffect } from 'react';

/**
 * DecryptedText component inspired by reactbits.dev & vue-bits.dev
 * Cyberpunk/Matrix style text scramble reveal animation
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$&*!?/',
  className = '',
  revealDelay = 150
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  const triggerAnimation = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);

    return interval;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAnimation();
    }, revealDelay);

    return () => clearTimeout(timer);
  }, [text]);

  const handleMouseEnter = () => {
    if (!isHovered) {
      setIsHovered(true);
      triggerAnimation();
      setTimeout(() => setIsHovered(false), (text.length * 2 * speed));
    }
  };

  return (
    <span
      className={`inline-block cursor-default font-mono transition-colors duration-200 ${className}`}
      onMouseEnter={handleMouseEnter}
      title="Passe o mouse para reanimar"
    >
      {displayText}
    </span>
  );
}
