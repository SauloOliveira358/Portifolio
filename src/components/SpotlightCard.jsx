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
  borderColor = 'rgba(56, 189, 248, 0.65)',
  delay = 0,
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
    setIsHovered(true);

    // Efeito Holograma 3D suave ("bem pouco", sutil e refinado: max ~3.2 graus)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -3.2;
    const tiltY = ((x - centerX) / centerX) * 3.2;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = isRevealed
    ? isHovered
      ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-4px) translateZ(8px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)'
    : 'perspective(1000px) rotateX(8deg) translateY(32px) scale(0.96)';

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: isHovered ? '0ms' : `${delay}ms`,
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        ...props.style,
      }}
      className={`relative overflow-hidden rounded-2xl border bg-slate-900/70 p-6 backdrop-blur-xl transform-gpu border-slate-800/80 hover:border-cyan-400/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_18px_40px_-10px_rgba(0,0,0,0.7),0_0_25px_rgba(56,189,248,0.25)] ${
        isRevealed ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.96] blur-[2px] pointer-events-none'
      } ${isHoloBeamActive ? 'holo-card-glow border-cyan-400/70' : ''} ${className}`}
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

      {/* 5. BORDER SPOTLIGHT & HIGHLIGHT EFFECT */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1.5px solid ${borderColor}`,
          maskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black, transparent 75%)`,
          WebkitMaskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 6. FAINT HOLOGRAPHIC AMBIENT IRIDESCENCE ON HOVER */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-cyan-500/[0.04] via-emerald-500/[0.04] to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* 7. CONTEÚDO DO CARD */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
