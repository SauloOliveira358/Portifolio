import confetti from 'canvas-confetti';

/**
 * Epic full-screen celebration confetti
 * Fires dual cannons and fireworks across the entire viewport
 */
export function fireEpicConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#10b981', '#00dc82', '#38bdf8', '#fbbf24', '#a855f7', '#ffffff'];

  // Initial cannon bursts
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors,
  });

  // Continuous fireworks from both corners
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.8 },
      colors,
      zIndex: 9999,
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.8 },
      colors,
      zIndex: 9999,
    });
  }, 250);
}
