import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal - Animações de transição variadas e dinâmicas ao descer a página do portfólio.
 * Suporta múltiplos estilos cósmicos/tecnológicos:
 *  - 'slide-left': Desliza suavemente da esquerda com perspectiva e desfoque holográfico.
 *  - 'slide-right': Desliza da direita com perspectiva e desfoque holográfico.
 *  - 'tilt-3d': Perspectiva 3D holográfica com inclinação vertical que se assenta na tela.
 *  - 'zoom-in': Expansão a partir do centro com foco holográfico.
 *  - 'gravitational-rise': Elevação gravitacional a partir do fundo do espaço.
 *  - 'quantum-flip': Rotação quântica suave em perspectiva.
 *  - 'fade-up': Aparição suave com leve subida e assentamento.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 900,
  className = '',
  threshold = 0.05,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoloBeamActive, setIsHoloBeamActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se o usuário já tiver o elemento na tela inicial, mostra logo
    const initialRect = el.getBoundingClientRect();
    if (initialRect.top < window.innerHeight * 0.95 && initialRect.bottom > 0) {
      setIsVisible(true);
      setIsHoloBeamActive(true);
      const timer = setTimeout(() => setIsHoloBeamActive(false), 950);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsHoloBeamActive(true);
          setTimeout(() => setIsHoloBeamActive(false), 950);
        } else {
          // Quando o elemento rolar para fora da parte inferior da tela, reseta para reanimar ao descer
          if (entry.boundingClientRect.top > window.innerHeight * 1.05) {
            setIsVisible(false);
            setIsHoloBeamActive(false);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px 40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Classes de transição dinâmicas holográficas para cada estilo
  const getStyleClasses = () => {
    switch (animation) {
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0 blur-0 scale-100 [transform:perspective(1200px)_rotateY(0deg)]'
          : 'opacity-0 -translate-x-12 blur-xs scale-[0.98] [transform:perspective(1200px)_rotateY(-5deg)] pointer-events-none';

      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0 blur-0 scale-100 [transform:perspective(1200px)_rotateY(0deg)]'
          : 'opacity-0 translate-x-12 blur-xs scale-[0.98] [transform:perspective(1200px)_rotateY(5deg)] pointer-events-none';

      case 'tilt-3d':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0 [transform:perspective(1200px)_rotateX(0deg)]'
          : 'opacity-0 translate-y-12 scale-[0.97] blur-[2px] [transform:perspective(1200px)_rotateX(8deg)] pointer-events-none';

      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100 blur-0 [transform:perspective(1200px)_translateZ(0px)]'
          : 'opacity-0 scale-[0.94] blur-xs [transform:perspective(1200px)_translateZ(-40px)] pointer-events-none';

      case 'gravitational-rise':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0 [transform:perspective(1200px)_rotateX(0deg)]'
          : 'opacity-0 translate-y-16 scale-[0.97] blur-xs [transform:perspective(1200px)_rotateX(6deg)] pointer-events-none';

      case 'quantum-flip':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100 [transform:perspective(1200px)_rotateY(0deg)]'
          : 'opacity-0 translate-y-10 scale-[0.98] [transform:perspective(1200px)_rotateY(8deg)] pointer-events-none';

      case 'fade-up':
      default:
        return isVisible
          ? 'opacity-100 translate-y-0 blur-0 scale-100 [transform:perspective(1200px)_rotateX(0deg)]'
          : 'opacity-0 translate-y-10 blur-xs scale-[0.98] [transform:perspective(1200px)_rotateX(4deg)] pointer-events-none';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
      }}
      className={`relative transition-all transform-gpu ${getStyleClasses()} ${
        isHoloBeamActive ? 'drop-shadow-[0_0_20px_rgba(6,182,212,0.25)]' : ''
      } ${className}`}
    >
      {/* Feixe laser holográfico de materialização ao rolar a página */}
      {isHoloBeamActive && (
        <div className="pointer-events-none absolute inset-x-0 animate-hologram-beam z-30 overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
          <div className="h-16 w-full bg-gradient-to-b from-cyan-400/15 via-cyan-500/5 to-transparent" />
        </div>
      )}

      {children}
    </div>
  );
}
