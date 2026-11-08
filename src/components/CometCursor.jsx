import React, { useEffect, useRef } from 'react';

/**
 * CometCursor - Efeito cinematográfico de cometa cósmico integrado ao cursor.
 * - Núcleo de gelo estelar e coma ionizado aninhado dentro do corpo da seta do mouse (offset nativo).
 * - Sem aros geométricos artificiais: visual 100% orgânico de cometa espacial (núcleo diamante + coma gasoso).
 * - Cauda de plasma aerodinâmica e poeira estelar (micro-faíscas) gerada dinamicamente com a velocidade.
 * - Dissipação suave no vácuo espacial ao parar ou desacelerar.
 * - Totalmente compatível com cliques e interações (pointer-events: none, 60-120 FPS).
 */
export default function CometCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // DPI scaling (limitado a 2 para alta nitidez e performance fluida)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);

    // Estado do mouse
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let isMouseOnScreen = false;
    let smoothedSpeed = 0;
    let lastMoveAngle = 0;
    let lastTime = performance.now();

    // Deslocamento milimétrico para aninhar o cometa exatamente dentro da seta do mouse
    const CURSOR_INSET_X = 3.5;
    const CURSOR_INSET_Y = 5.5;

    // Rastro da cauda do cometa (pontos interpolados)
    const trail = [];
    const MAX_TRAIL_LIFE = 0.42; // segundos de vida da cauda

    // Partículas de poeira estelar / faíscas
    const sparks = [];
    const MAX_SPARKS = 120;

    // Cores de íons e poeira cósmica
    const sparkColors = [
      '#ffffff', // Branco estelar
      '#67e8f9', // Ciano neon
      '#38bdf8', // Azul celeste
      '#a5f3fc', // Ciano brilhante
      '#34d399', // Verde esmeralda suave
      '#818cf8', // Índigo cósmico
    ];

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isMouseOnScreen || mouseX < 0) {
        mouseX = x;
        mouseY = y;
        prevMouseX = x;
        prevMouseY = y;
        isMouseOnScreen = true;
        return;
      }

      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.4) {
        lastMoveAngle = Math.atan2(dy, dx);
      }

      // Interpolação de pontos ao longo da trajetória para cauda sólida e sem vácuos
      const steps = Math.min(Math.max(1, Math.floor(dist / 5)), 18);
      for (let i = 1; i <= steps; i++) {
        const interpX = mouseX + (dx * i) / steps + CURSOR_INSET_X;
        const interpY = mouseY + (dy * i) / steps + CURSOR_INSET_Y;
        trail.push({
          x: interpX,
          y: interpY,
          age: 0,
          maxLife: MAX_TRAIL_LIFE,
          speed: dist,
          size: Math.min(8.5, Math.max(2.2, dist * 0.14)),
        });
      }

      // Quando rápido, ejeta micro-fagulhas estelares para trás
      if (dist > 6) {
        const sparkCount = Math.min(5, Math.floor(dist / 12) + 1);
        for (let i = 0; i < sparkCount; i++) {
          if (sparks.length >= MAX_SPARKS) sparks.shift();

          // Ângulo cônico oposto ao vetor de velocidade
          const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 1.1;
          const speed = (Math.random() * 0.6 + 0.3) * Math.min(dist * 0.25, 7.5);
          const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];

          sparks.push({
            x: x + CURSOR_INSET_X + (Math.random() - 0.5) * 4,
            y: y + CURSOR_INSET_Y + (Math.random() - 0.5) * 4,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 1.9 + 0.7,
            color,
            alpha: 1.0,
            age: 0,
            maxLife: Math.random() * 0.32 + 0.22,
          });
        }
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = x;
      mouseY = y;
      isMouseOnScreen = true;
    };

    const onMouseEnter = (e) => {
      isMouseOnScreen = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    const onMouseLeave = () => {
      isMouseOnScreen = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Loop de renderização contínuo
    const render = (time) => {
      animId = requestAnimationFrame(render);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Suavização da velocidade do mouse
      const rawDist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      smoothedSpeed = smoothedSpeed * 0.8 + rawDist * 0.2;
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Modo de iluminação cósmica (plasma e emissão aditiva)
      ctx.globalCompositeOperation = 'lighter';

      // 1. CAUDA DE PLASMA CONTÍNUA (TRAIL)
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age += dt;
        if (p.age >= p.maxLife) {
          trail.splice(i, 1);
          continue;
        }

        const lifeRatio = 1 - p.age / p.maxLife; // 1 -> 0
        const currentRadius = p.size * lifeRatio;
        const alpha = lifeRatio * 0.6;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, currentRadius * 2.2));
        grad.addColorStop(0, `rgba(224, 242, 254, ${alpha * 0.95})`); // Centro branco-ciano
        grad.addColorStop(0.35, `rgba(56, 189, 248, ${alpha * 0.55})`); // Ciano
        grad.addColorStop(0.7, `rgba(14, 165, 233, ${alpha * 0.2})`); // Azul celeste
        grad.addColorStop(1, 'rgba(3, 105, 161, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentRadius * 2.2), 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. FAÍSCAS / POEIRA ESTELAR (SPARKS)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;

        const lifeRatio = 1 - s.age / s.maxLife;
        const currentRadius = s.radius * lifeRatio;
        const currentAlpha = lifeRatio * 0.85;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;

      // 3. CABEÇA / NÚCLEO DO COMETA (ANINHADO DENTRO DO MOUSE)
      if (isMouseOnScreen && mouseX > -100 && mouseY > -100) {
        const cometX = mouseX + CURSOR_INSET_X;
        const cometY = mouseY + CURSOR_INSET_Y;

        const speedBoost = Math.min(1.0, smoothedSpeed / 22);

        // 3.1 Coma difuso de gás e poeira sublimada (Aspecto de cometa astronômico real)
        const comaRadius = 10 + speedBoost * 9;
        const comaGrad = ctx.createRadialGradient(cometX, cometY, 0, cometX, cometY, comaRadius);
        comaGrad.addColorStop(0, `rgba(165, 243, 252, ${0.5 + speedBoost * 0.35})`);
        comaGrad.addColorStop(0.28, `rgba(56, 189, 248, ${0.32 + speedBoost * 0.25})`);
        comaGrad.addColorStop(0.65, `rgba(14, 165, 233, ${0.1 + speedBoost * 0.15})`);
        comaGrad.addColorStop(1, 'rgba(3, 105, 161, 0)');

        ctx.fillStyle = comaGrad;
        ctx.beginPath();
        ctx.arc(cometX, cometY, comaRadius, 0, Math.PI * 2);
        ctx.fill();

        // 3.2 Alongamento dinâmico do coma na direção oposta ao movimento (Cúpula de vento solar)
        if (smoothedSpeed > 1.8) {
          const tailAngle = lastMoveAngle + Math.PI;
          const jetLength = 7 + speedBoost * 8;
          const jetGrad = ctx.createRadialGradient(
            cometX,
            cometY,
            0,
            cometX + Math.cos(tailAngle) * (jetLength * 0.5),
            cometY + Math.sin(tailAngle) * (jetLength * 0.5),
            jetLength
          );
          jetGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
          jetGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.45)');
          jetGrad.addColorStop(0.7, 'rgba(14, 165, 233, 0.18)');
          jetGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

          ctx.fillStyle = jetGrad;
          ctx.beginPath();
          ctx.ellipse(
            cometX + Math.cos(tailAngle) * (jetLength * 0.3),
            cometY + Math.sin(tailAngle) * (jetLength * 0.3),
            jetLength * 0.6,
            3.2 + speedBoost * 2.2,
            tailAngle,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // 3.3 Núcleo denso de gelo estelar incandescente (Branco puro diamante no centro)
        const coreRadius = 3.0 + speedBoost * 1.8;
        const coreGrad = ctx.createRadialGradient(cometX, cometY, 0, cometX, cometY, coreRadius);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.42, 'rgba(240, 249, 255, 0.95)');
        coreGrad.addColorStop(0.8, 'rgba(103, 232, 249, 0.7)');
        coreGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cometX, cometY, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // 3.4 Ponto cintilante estelar no centro do núcleo
        const glintAlpha = 0.55 + Math.sin(time * 0.008) * 0.35;
        ctx.fillStyle = `rgba(255, 255, 255, ${glintAlpha})`;
        ctx.beginPath();
        ctx.arc(cometX, cometY, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
