import React, { useRef, useState } from 'react';

/**
 * SpotlightCard component inspired by vue-bits.dev & reactbits.dev
 * Dynamically tracks cursor coordinates to paint a glowing ambient spotlight effect
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(16, 185, 129, 0.18)',
  borderColor = 'rgba(16, 185, 129, 0.4)',
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 ${className}`}
      {...props}
    >
      {/* Background Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Border Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          border: `1px solid ${borderColor}`,
          maskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
