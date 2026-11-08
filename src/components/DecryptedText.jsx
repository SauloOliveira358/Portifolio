import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * DecryptedText - Efeito Cyberpunk de Bits Descriptando.
 * - Ao abrir o site ou subir (voltar ao topo), roda a animação de letras trocando tipo bits (0 e 1).
 * - O texto vai descriptografando caractere por caractere da esquerda para a direita até revelar o nome completo.
 * - Caracteres resolvidos em gradiente esmeralda e bits ativos em ciano neon com brilho pulsante.
 */
export default function DecryptedText({
  text = 'Saulo Oliveira Moreira',
  speed = 36,
  className = '',
  revealDelay = 180,
  characters = '0101010101010101010101010101010101010101ABCDEF0123456789_#@$&*!?/',
}) {
  const [displayText, setDisplayText] = useState(text);
  const [currentResolvedIndex, setCurrentResolvedIndex] = useState(text.length);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const lastTriggerTimeRef = useRef(0);
  const hasScrolledDownRef = useRef(false);

  const triggerAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsDecrypting(true);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      iteration += 0.55;
      const resolvedCount = Math.floor(iteration);
      setCurrentResolvedIndex(resolvedCount);

      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < resolvedCount) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCurrentResolvedIndex(text.length);
        setDisplayText(text);
        setIsDecrypting(false);
      }
    }, speed);
  }, [text, speed, characters]);

  // 1. DISPARA AO ABRIR O SITE (com leve delay estético)
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAnimation();
    }, revealDelay);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerAnimation, revealDelay]);

  // 2. DISPARA TODA VEZ QUE A PESSOA SUBIR A PÁGINA (VOLTAR AO TOPO)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // O usuário desceu pelo menos 140px na página
      if (scrollY > 140) {
        hasScrolledDownRef.current = true;
      }
      // O usuário subiu e voltou ao topo da página!
      else if (hasScrolledDownRef.current && scrollY <= 25) {
        const now = Date.now();
        if (now - lastTriggerTimeRef.current > 1200) {
          lastTriggerTimeRef.current = now;
          hasScrolledDownRef.current = false;
          triggerAnimation();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerAnimation]);

  // 3. OBSERVER: SE O ELEMENTO REAPARECER NA TELA VINDO DE BAIXO, TAMBÉM REANIMA
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wasOutOfView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          wasOutOfView = true;
        } else if (wasOutOfView) {
          const now = Date.now();
          if (now - lastTriggerTimeRef.current > 1200) {
            lastTriggerTimeRef.current = now;
            wasOutOfView = false;
            triggerAnimation();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerAnimation]);

  const handleMouseEnter = () => {
    if (!isDecrypting) {
      triggerAnimation();
    }
  };

  const resolvedPart = displayText.slice(0, currentResolvedIndex);
  const scramblingPart = displayText.slice(currentResolvedIndex);

  return (
    <span
      ref={containerRef}
      className={`inline-block cursor-default font-mono select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      title="Passe o mouse ou role a página para descriptar"
    >
      {/* Parte já resolvida (com o gradiente oficial esmeralda) */}
      <span className="text-gradient-emerald">
        {resolvedPart}
      </span>

      {/* Parte em processo de descriptografia (trocando bits em ciano neon pulsante) */}
      {isDecrypting && scramblingPart.length > 0 && (
        <span className="font-mono text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.85)] tracking-wider">
          {scramblingPart}
        </span>
      )}
    </span>
  );
}
