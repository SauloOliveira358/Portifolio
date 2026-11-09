import confetti from 'canvas-confetti';

/**
 * Supernova Cosmic Explosion & Stardust Blast
 * Triggers an omnidirectional 360° stellar particle explosion with low gravity,
 * an expanding visual shockwave ring, a photon core flash, and notifies SauloBot
 * through a window event.
 *
 * @param {Object} [options]
 * @param {Object} [options.origin] Viewport coordinates { x: 0..1, y: 0..1 }
 */
export function fireSupernova(options = {}) {
  // Determine origin coordinates (default to center screen if not provided)
  let originX = 0.5;
  let originY = 0.5;

  if (options && options.origin) {
    if (typeof options.origin.x === 'number') originX = Math.max(0.08, Math.min(0.92, options.origin.x));
    if (typeof options.origin.y === 'number') originY = Math.max(0.08, Math.min(0.92, options.origin.y));
  } else if (typeof options.x === 'number' && typeof options.y === 'number') {
    originX = Math.max(0.08, Math.min(0.92, options.x));
    originY = Math.max(0.08, Math.min(0.92, options.y));
  }

  // 1. Create visual DOM shockwave and core photon flash
  if (typeof document !== 'undefined') {
    try {
      const px = originX * window.innerWidth;
      const py = originY * window.innerHeight;

      // Expanding Shockwave Ring
      const shockwave = document.createElement('div');
      shockwave.className = 'supernova-shockwave';
      shockwave.style.left = `${px}px`;
      shockwave.style.top = `${py}px`;
      shockwave.style.width = '720px';
      shockwave.style.height = '720px';
      document.body.appendChild(shockwave);

      // Instant Photon Core Flash
      const flash = document.createElement('div');
      flash.className = 'supernova-flash';
      flash.style.left = `${px}px`;
      flash.style.top = `${py}px`;
      flash.style.width = '240px';
      flash.style.height = '240px';
      document.body.appendChild(flash);

      // Clean up DOM elements after animation completes
      setTimeout(() => {
        shockwave.remove();
        flash.remove();
      }, 850);
    } catch {
      // Fallback gracefully if DOM is unavailable
    }
  }

  // 2. Multi-stage 360° Zero-G Cosmic Remnant Explosions (canvas-confetti)
  // Stage 1: Ultra-fast Photon Core Blast (Instant)
  confetti({
    particleCount: 75,
    spread: 360,
    startVelocity: 50,
    decay: 0.91,
    gravity: 0.12,
    ticks: 180,
    origin: { x: originX, y: originY },
    colors: ['#ffffff', '#e0f2fe', '#38bdf8', '#00f0ff', '#a5f3fc'],
    shapes: ['star', 'circle'],
    scalar: 1.15,
    zIndex: 99999,
  });

  // Stage 2: Thermonuclear Plasma Shell Expansion (+80ms)
  setTimeout(() => {
    confetti({
      particleCount: 95,
      spread: 360,
      startVelocity: 38,
      decay: 0.93,
      gravity: 0.1,
      ticks: 220,
      origin: { x: originX, y: originY },
      colors: ['#10b981', '#00dc82', '#38bdf8', '#fbbf24', '#f59e0b', '#c084fc', '#ffffff'],
      shapes: ['circle', 'star'],
      scalar: 0.95,
      zIndex: 99999,
    });
  }, 80);

  // Stage 3: Drifting Cosmic Stardust & Micro-Embers (+180ms)
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 360,
      startVelocity: 24,
      decay: 0.95,
      gravity: 0.06,
      ticks: 260,
      origin: { x: originX, y: originY },
      colors: ['#ffffff', '#38bdf8', '#34d399', '#fef08a', '#e9d5ff'],
      shapes: ['circle'],
      scalar: 0.7,
      zIndex: 99999,
    });
  }, 180);

  // 3. Dispatch global custom event for the SauloBot assistant
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('supernova_explosion', {
          detail: {
            origin: { x: originX, y: originY },
            timestamp: Date.now(),
          },
        })
      );
    } catch {
      // Ignore if event dispatch fails
    }
  }
}

/**
 * Backwards compatibility alias for existing code calling fireEpicConfetti
 */
export const fireEpicConfetti = fireSupernova;

export default fireSupernova;
