import React, { useRef, useState, useEffect } from 'react';

/**
 * SpotlightCard com Efeito Holograma e Transições de Aparecimento ao Rolar.
 * - Detecta quando o componente entra na tela durante o scroll.
 * - Efeito de Holograma Sci-Fi ao se materializar:
 *    • Feixe luminoso de escaneamento holográfico (scanline beam ciano).
 *    • Grade de varredura holográfica temporária.
 *    • Cantoneiras táticas holográficas (HUD sci-fi).
 *    • Perspectiva 3D suave com foco e assentamento fluído.
 * - Mantém o Spotlight dinâmico que segue o cursor do mouse perfeitamente.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(16, 185, 129, 0.18)',
  borderColor = 'rgba(16, 185, 129, 0.4)',
  delay = 0,
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [opacity, setOpacity] = useState(0);

  // Estados da transição holográfica ao rolar a página
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHoloBeamActive, setIsHoloBeamActive] = useState(false);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    // Se já estiver visível no topo da página ao carregar
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.90 && rect.bottom > 0) {
      setIsRevealed(true);
      setIsHoloBeamActive(true);
      const timer = setTimeout(() => setIsHoloBeamActive(false), 950);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          setIsHoloBeamActive(true);
          setTimeout(() => setIsHoloBeamActive(false), 950);
        } else {
          // Quando o elemento rolar para fora da parte inferior, reseta para reanimar ao descer
          if (entry.boundingClientRect.top > window.innerHeight * 0.98) {
            setIsRevealed(false);
            setIsHoloBeamActive(false);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative overflow-hidden rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 transform-gpu ${
        isRevealed
          ? 'opacity-100 translate-y-0 scale-100 blur-0 [transform:perspective(1000px)_rotateX(0deg)] border-slate-800/80 shadow-xl'
          : 'opacity-0 translate-y-8 scale-[0.96] blur-[2px] [transform:perspective(1000px)_rotateX(8deg)] border-cyan-500/30 pointer-events-none'
      } ${isHoloBeamActive ? 'holo-card-glow border-cyan-400/50' : ''} ${className}`}
      {...props}
    >
      {/* 1. FEIXE DE ESCANEAMENTO HOLOGRÁFICO (VARREDURA AO APARECER) */}
      {isHoloBeamActive && (
        <div
          className="pointer-events-none absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent animate-holo-scanline z-20"
          aria-hidden="true"
        />
      )}

      {/* 2. GRADE DE LINHAS DE VARREDURA HOLOGRÁFICA (DISSOLVE APÓS ESTABILIZAR) */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:100%_4px] transition-opacity duration-700 ${
          isHoloBeamActive ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* 3. TACTICAL HUD CORNERS (CANTORES HOLOGRÁFICOS SCI-FI) */}
      {isHoloBeamActive && (
        <>
          <span className="absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none z-20 transition-opacity duration-500" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none z-20 transition-opacity duration-500" />
          <span className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none z-20 transition-opacity duration-500" />
          <span className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none z-20 transition-opacity duration-500" />
        </>
      )}

      {/* 4. BACKGROUND SPOTLIGHT AO PASSAR O MOUSE */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* 5. BORDER SPOTLIGHT EFFECT */}
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

      {/* 6. CONTEÚDO DO CARD */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
