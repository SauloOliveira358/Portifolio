import React, { useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * TiltedPhotoCard - Inspirado nos melhores componentes do React Bits (reactbits.dev) e Vue Bits (vue-bits.dev):
 * - Rotação 3D interativa guiada pela física do cursor do mouse (Tilted Card com Spring Physics)
 * - Camada de Glare / Brilho Especular Dinâmico (efeito vidro e reflexo solar realista que segue o mouse)
 * - Iridescência Holográfica (varredura de gradiente prismático ciano/esmeralda/púrpura estilo Sci-Fi)
 * - Efeito de Varredura Laser Biométrico ao passar o mouse
 * - Cantoneiras Táticas HUD Sci-Fi (retículo holográfico)
 * - Parallax Multi-Plano em 3D: a foto, o badge "8º Período" e o card de identificação flutuam em eixos Z diferentes
 */
export default function TiltedPhotoCard({
  src = '/profile.jpg',
  alt = 'Saulo Oliveira Moreira',
  onCelebrate,
}) {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // React Bits TiltedCard formula (max ~8 graus para efeito 3D elegante e natural)
    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rX, y: rY });

    // Glare position em porcentagem com brilho suave e calibrado
    const gX = (x / rect.width) * 100;
    const gY = (y / rect.height) * 100;
    setGlare({ x: gX, y: gY, opacity: 0.35 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 950);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group max-w-sm w-full mx-auto cursor-pointer [perspective:1200px]"
    >
      {/* 1. PULSING AMBIENT NEON GLOW UNDERLAY (SUAVE E ELEGANTE) */}
      <div
        className="absolute -inset-2 rounded-3xl blur-xl transition-all duration-500 opacity-35 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(56, 189, 248, 0.22), rgba(16, 185, 129, 0.18), rgba(168, 85, 247, 0.12))`,
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        }}
      />

      {/* 2. 3D TILTED CARD WRAPPER */}
      <div
        style={{
          transform: isHovered
            ? `perspective(1200px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
            : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        }}
        className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/50 via-cyan-500/40 to-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.15)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(56,189,248,0.25)] border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all"
      >
        {/* 3. PHOTO INNER CONTAINER COM CORTE ARREDONDADO */}
        <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[4/5] [transform-style:preserve-3d]">
          {/* Main Photo com leve profundidade Z */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out [transform:translateZ(12px)_scale(1.04)]"
          />

          {/* Sombra de Vinheta Inferior Cinematográfica */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-85 pointer-events-none" />

          {/* 4. REACT BITS DYNAMIC GLARE / SPECULAR SHINE LAYER (BRILHO SUAVE E DISCRETO) */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[22px]"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(56, 189, 248, 0.1) 35%, transparent 65%)`,
              mixBlendMode: 'screen',
            }}
          />

          {/* 5. HOLOGRAPHIC IRIDESCENT COLOR SHEEN (SUTIL, SEM OFUSCAR A IMAGEM) */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 rounded-[22px]"
            style={{
              opacity: isHovered ? 0.2 : 0,
              background: `linear-gradient(${120 + rotate.y * 3.5}deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.18) 30%, rgba(168, 85, 247, 0.2) 65%, rgba(244, 63, 94, 0.15) 100%)`,
              mixBlendMode: 'screen',
            }}
          />

          {/* 6. BIOMETRIC LASER SCANLINE SWEEP */}
          {isScanning && (
            <div
              className="pointer-events-none absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-laser-sweep z-30"
              aria-hidden="true"
            />
          )}

          {/* 7. CANTONEIRAS TÁTICAS HUD SCI-FI (REACT BITS CYBER HUD) */}
          <span
            className={`absolute top-3 left-3 h-3.5 w-3.5 border-t-2 border-l-2 border-cyan-300 z-30 transition-all duration-300 ${
              isHovered ? 'opacity-90 scale-105 drop-shadow-[0_0_5px_rgba(56,189,248,0.7)]' : 'opacity-40 scale-100'
            }`}
          />
          <span
            className={`absolute top-3 right-3 h-3.5 w-3.5 border-t-2 border-r-2 border-cyan-300 z-30 transition-all duration-300 ${
              isHovered ? 'opacity-90 scale-105 drop-shadow-[0_0_5px_rgba(56,189,248,0.7)]' : 'opacity-40 scale-100'
            }`}
          />
          <span
            className={`absolute bottom-3 left-3 h-3.5 w-3.5 border-b-2 border-l-2 border-cyan-300 z-30 transition-all duration-300 ${
              isHovered ? 'opacity-90 scale-105 drop-shadow-[0_0_5px_rgba(56,189,248,0.7)]' : 'opacity-40 scale-100'
            }`}
          />
          <span
            className={`absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-cyan-300 z-30 transition-all duration-300 ${
              isHovered ? 'opacity-90 scale-105 drop-shadow-[0_0_5px_rgba(56,189,248,0.7)]' : 'opacity-40 scale-100'
            }`}
          />

          {/* 8. FLOATING INFO PILL BOTTOM (PARALLAX Z-OFFSET = 38px) */}
          <div
            style={{
              transform: isHovered ? 'translateZ(38px)' : 'translateZ(15px)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-between z-30 transition-all"
          >
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Saulo Oliveira Moreira
              </div>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <span>Analista de Sistemas & Dev</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onCelebrate) onCelebrate(e);
              }}
              className="rounded-lg bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 p-2 border border-emerald-400/50 hover:border-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all"
              title="Disparar Supernova Cósmica! 💥"
            >
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 9. TOP FLOATING BADGE (PARALLAX Z-OFFSET = 48px) */}
        <div
          style={{
            transform: isHovered ? 'translateZ(48px)' : 'translateZ(20px)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute -top-3.5 -right-3.5 z-40 rounded-xl bg-slate-900/95 border-2 border-emerald-400/80 group-hover:border-emerald-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] px-3.5 py-1.5 text-[11px] font-mono text-emerald-300 shadow-2xl backdrop-blur-md flex items-center gap-1.5 transition-all"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">8º Período SI</span>
        </div>
      </div>
    </div>
  );
}

