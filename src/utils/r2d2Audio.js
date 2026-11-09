/**
 * R2-D2 Authentic Audio Synthesizer (Web Audio API)
 * - Síntese analógica 100% nativa sem dependência de arquivos externos
 * - Modulação de frequência, sweeps de pitch e gorjeios arpejados clássicos de Star Wars
 * - Volume suave, sem estalos e com recuperação automática de contexto de áudio
 */

let audioCtx = null;
let lastPlayTime = 0;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Garante que o contexto de áudio seja ativado na primeira interação do usuário
if (typeof window !== 'undefined') {
  const resumeOnInteraction = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    window.removeEventListener('click', resumeOnInteraction);
    window.removeEventListener('keydown', resumeOnInteraction);
    window.removeEventListener('touchstart', resumeOnInteraction);
  };
  window.addEventListener('click', resumeOnInteraction, { passive: true });
  window.addEventListener('keydown', resumeOnInteraction, { passive: true });
  window.addEventListener('touchstart', resumeOnInteraction, { passive: true });
}

/**
 * Toca um som característico simples do R2-D2
 * @param {'random' | 'chirp' | 'whistle' | 'chatter' | 'alert'} soundType
 */
export function playR2D2Sound(soundType = 'random') {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = Date.now();
  // Evita sobreposição excessiva de sons caso múltiplos eventos disparem juntos
  if (now - lastPlayTime < 220) return;
  lastPlayTime = now;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const types = ['chirp', 'whistle', 'chatter'];
  const chosen = soundType === 'random' ? types[Math.floor(Math.random() * types.length)] : soundType;

  try {
    const startTime = ctx.currentTime + 0.02;

    if (chosen === 'whistle') {
      // 1. Apito melódico clássico ("wheee-ooo-bip") com vibrato
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Vibrato LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(14, startTime);
      lfoGain.gain.setValueAtTime(45, startTime);
      lfo.connect(osc.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, startTime);
      osc.frequency.exponentialRampToValueAtTime(2400, startTime + 0.16);
      osc.frequency.exponentialRampToValueAtTime(1600, startTime + 0.32);
      osc.frequency.exponentialRampToValueAtTime(2200, startTime + 0.44);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.setValueAtTime(0.12, startTime + 0.38);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.48);

      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(startTime);
      osc.start(startTime);
      lfo.stop(startTime + 0.5);
      osc.stop(startTime + 0.5);
    } else if (chosen === 'chatter') {
      // 2. Série de 4 pequenos bipes rápidos ("bip-bop-doo-bleep")
      const notes = [
        { freq: 1750, dur: 0.06, sweep: 2200 },
        { freq: 1300, dur: 0.05, sweep: 1550 },
        { freq: 2400, dur: 0.07, sweep: 2100 },
        { freq: 1650, dur: 0.08, sweep: 1850 },
      ];

      let t = startTime;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, t);
        osc.frequency.exponentialRampToValueAtTime(note.sweep, t + note.dur);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.11, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + note.dur + 0.01);

        t += note.dur + 0.025;
      });
    } else if (chosen === 'alert') {
      // 3. Bipe duplo agudo de alerta estelar
      [
        { f1: 2200, f2: 2800, delay: 0 },
        { f1: 2500, f2: 3200, delay: 0.09 },
      ].forEach(({ f1, f2, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const t = startTime + delay;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f1, t);
        osc.frequency.exponentialRampToValueAtTime(f2, t + 0.07);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.08);
      });
    } else {
      // 4. Chirp clássico padrão do R2-D2 (3 gorjeios amigáveis)
      const notes = [
        { f1: 1500, f2: 2100, dur: 0.07 },
        { f1: 2300, f2: 2700, dur: 0.08 },
        { f1: 1750, f2: 1250, dur: 0.09 },
      ];

      let t = startTime;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f1, t);
        osc.frequency.exponentialRampToValueAtTime(note.f2, t + note.dur);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + note.dur + 0.01);

        t += note.dur + 0.02;
      });
    }
  } catch {
    // Falha silenciosa em navegadores com restrições rígidas
  }
}

