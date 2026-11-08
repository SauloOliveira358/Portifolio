import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal - Animações de transição variadas e dinâmicas ao descer a página do portfólio.
 * Suporta múltiplos estilos cósmicos/tecnológicos:
 *  - 'slide-left': Desliza suavemente da esquerda com desfoque cósmico.
 *  - 'slide-right': Desliza da direita com desfoque e foco progressivo.
 *  - 'tilt-3d': Perspectiva 3D holográfica com inclinação vertical que se assenta na tela.
 *  - 'zoom-in': Expansão a partir do centro com foco holográfico.
 *  - 'gravitational-rise': Elevação gravitacional a partir do fundo do espaço.
 *  - 'quantum-flip': Rotação quântica suave em perspectiva.
 *  - 'fade-up': Aparição suave com leve subida.
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se o usuário já tiver o elemento na tela inicial, mostra logo
    const initialRect = el.getBoundingClientRect();
    if (initialRect.top < window.innerHeight * 0.95 && initialRect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Quando o elemento rolar para fora da parte inferior da tela, reseta para reanimar ao descer
          if (entry.boundingClientRect.top > window.innerHeight * 1.05) {
            setIsVisible(false);
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

  // Classes de transição dinâmicas para cada estilo
  const getStyleClasses = () => {
    switch (animation) {
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0 blur-0 scale-100'
          : 'opacity-0 -translate-x-16 blur-sm scale-[0.98] pointer-events-none';

      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0 blur-0 scale-100'
          : 'opacity-0 translate-x-16 blur-sm scale-[0.98] pointer-events-none';

      case 'tilt-3d':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0 [transform:perspective(1200px)_rotateX(0deg)]'
          : 'opacity-0 translate-y-16 scale-95 blur-xs [transform:perspective(1200px)_rotateX(12deg)] pointer-events-none';

      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100 blur-0'
          : 'opacity-0 scale-90 blur-md pointer-events-none';

      case 'gravitational-rise':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-20 scale-90 blur-xs pointer-events-none';

      case 'quantum-flip':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100 [transform:perspective(1000px)_rotateY(0deg)]'
          : 'opacity-0 translate-y-16 scale-95 [transform:perspective(1000px)_rotateY(6deg)] pointer-events-none';

      case 'fade-up':
      default:
        return isVisible
          ? 'opacity-100 translate-y-0 blur-0 scale-100'
          : 'opacity-0 translate-y-12 blur-xs scale-[0.99] pointer-events-none';
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
      className={`transition-all transform-gpu ${getStyleClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

