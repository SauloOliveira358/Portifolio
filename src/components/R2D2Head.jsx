import React from 'react';

/**
 * R2D2Head Component
 * - Droide astromecânico R2-D2 clássico de Star Wars olhando de frente ("olhando de frente")
 * - Vetor SVG ultra-detalhado com domo metálico prateado e painéis azul-cobalto originais
 * - Grande fotorreceptor preto central com lente refletiva
 * - Projetor holográfico animado emitindo feixes de luz
 * - Visores lógicos piscantes (Logic Function Display) em vermelho e azul/ciano
 * - Ranhuras acústicas frontais e pernas laterais icônicas
 * - Animação expressiva de fala/bipes ("faz o R2-D2 mexer"):
 *    • O R2-D2 balança/vibra animadamente com giros e inclinações típicas dos filmes
 *    • Projetor holográfico pisca feixes de luz ciano
 *    • Luzes lógicas piscam em alta frequência simulando os bipes ("bip-bop-whistle")
 */
export default function R2D2Head({
  isSpeaking = false,
  isChatOpen = false,
  onClick = () => {},
  size = 'md',
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-12 h-14',
    md: 'w-16 h-20 sm:w-20 sm:h-24',
    lg: 'w-24 h-28',
  }[size] || 'w-16 h-20 sm:w-20 sm:h-24';

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative cursor-pointer select-none focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 ${sizeClasses} ${className}`}
      title="R2-D2 • Assistente Astromecânico (Clique para abrir o chat)"
      aria-label="R2-D2 Assistente Virtual"
    >
      {/* Halo / Aura Holográfica Cósmica (Apenas no botão principal fora do chat para não cobrir o R2-D2) */}
      {size !== 'sm' && (
        <div
          className={`absolute inset-0 -m-2 rounded-full transition-all duration-500 pointer-events-none ${
            isSpeaking
              ? 'bg-cyan-500/30 blur-xl scale-125 animate-pulse'
              : isChatOpen
              ? 'bg-blue-500/25 blur-lg scale-110'
              : 'group-hover:bg-cyan-500/25 group-hover:blur-md scale-100'
          }`}
        />
      )}

      {/* Feixe Holográfico Emitido pelo Projetor quando o R2-D2 estiver falando */}
      {isSpeaking && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center animate-r2d2-holo-pulse">
          <span className="w-8 h-2 bg-gradient-to-t from-cyan-400/80 to-transparent blur-sm rounded-full" />
          <span className="text-[9px] font-mono font-bold text-cyan-300 tracking-wider animate-bounce">
            BEEP! ⚡
          </span>
        </div>
      )}

      {/* SVG de Alta Fidelidade do R2-D2 Olhando de Frente */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)] transition-transform ${
          isSpeaking
            ? 'animate-r2d2-talk-wobble'
            : 'animate-r2d2-idle-float group-hover:scale-105'
        }`}
      >
        <defs>
          {/* Domo Metálico Prateado / Alumínio Escovado */}
          <linearGradient id="r2DomeSilver" x1="15%" y1="0%" x2="90%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="25%" stopColor="#f1f5f9" />
            <stop offset="55%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Azul Cobalto Autêntico R2-D2 */}
          <linearGradient id="r2CobaltBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="40%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Chassi Branco Metálico do Corpo */}
          <linearGradient id="r2BodyWhite" x1="15%" y1="0%" x2="85%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Lente Negra do Fotorreceptor Principal */}
          <radialGradient id="r2EyeLens" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Projetor Holográfico */}
          <radialGradient id="r2HoloLens" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>

          {/* Sombra de Profundidade */}
          <linearGradient id="r2ShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020617" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. OMBROS E PERNAS LATERAIS (SILHUETA CLÁSSICA) */}
        <g id="r2-legs-shoulders">
          {/* Perna Esquerda */}
          <path
            d="M 12 55 L 20 52 L 20 108 L 12 110 Z"
            fill="#cbd5e1"
            stroke="#1e293b"
            strokeWidth="1.8"
          />
          {/* Articulação do Ombro Esquerdo */}
          <circle cx="16" cy="56" r="4.5" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="16" cy="56" r="2" fill="url(#r2CobaltBlue)" />

          {/* Perna Direita */}
          <path
            d="M 88 55 L 80 52 L 80 108 L 88 110 Z"
            fill="#94a3b8"
            stroke="#1e293b"
            strokeWidth="1.8"
          />
          {/* Articulação do Ombro Direito */}
          <circle cx="84" cy="56" r="4.5" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="84" cy="56" r="2" fill="url(#r2CobaltBlue)" />
        </g>

        {/* 2. CHASSI / CORPO CILÍNDRICO (BRANCO COM DETALHES AZUIS) */}
        <g id="r2-body">
          {/* Corpo Central Branco */}
          <rect
            x="20"
            y="52"
            width="60"
            height="56"
            rx="4"
            fill="url(#r2BodyWhite)"
            stroke="#1e293b"
            strokeWidth="2.4"
          />

          {/* Sombra Superior do Domo sobre o Corpo */}
          <rect x="20" y="52" width="60" height="4" fill="url(#r2ShadowGrad)" />

          {/* Ranhuras de Ventilação / Alto-falante Acústico Frontal */}
          <rect x="42" y="66" width="16" height="32" rx="2" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.5" />
          {/* Linhas Horizontais da Grade Acústica */}
          <line x1="44" y1="71" x2="56" y2="71" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="44" y1="76" x2="56" y2="76" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="44" y1="81" x2="56" y2="81" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="44" y1="86" x2="56" y2="86" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="44" y1="91" x2="56" y2="91" stroke="#1e293b" strokeWidth="1.5" />

          {/* Painéis Laterais Azul Cobalto no Corpo */}
          <rect x="24" y="60" width="12" height="14" rx="1.5" fill="url(#r2CobaltBlue)" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="24" y="80" width="12" height="18" rx="1.5" fill="url(#r2CobaltBlue)" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="64" y="60" width="12" height="14" rx="1.5" fill="url(#r2CobaltBlue)" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="64" y="80" width="12" height="18" rx="1.5" fill="url(#r2CobaltBlue)" stroke="#1e293b" strokeWidth="1.2" />

          {/* Detalhe Metálico Prateado no Centro Superior do Corpo */}
          <rect x="44" y="56" width="12" height="6" rx="1" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.2" />

          {/* Base Inferior do Chassi */}
          <path
            d="M 23 108 L 77 108 L 75 113 L 25 113 Z"
            fill="#64748b"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
        </g>

        {/* 3. DOMO METÁLICO SEMICIRCULAR PRATEADO */}
        <g id="r2-dome">
          {/* Semicírculo Perfeito do Domo */}
          <path
            d="M 20 52 
               C 20 22, 33 13, 50 13 
               C 67 13, 80 22, 80 52 
               Z"
            fill="url(#r2DomeSilver)"
            stroke="#1e293b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* Faixa / Anel Divisório Inferior do Domo */}
          <line x1="20" y1="50" x2="80" y2="50" stroke="#1e293b" strokeWidth="2" />
          <rect x="20" y="47" width="60" height="3" fill="url(#r2CobaltBlue)" />

          {/* PAINÉIS AZUL COBALTO NO DOMO */}
          {/* Painel Esquerdo Superior */}
          <path
            d="M 24 44 L 32 44 L 31 34 L 25 38 Z"
            fill="url(#r2CobaltBlue)"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          {/* Painel Direito Superior */}
          <path
            d="M 76 44 L 68 44 L 69 34 L 75 38 Z"
            fill="url(#r2CobaltBlue)"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          {/* Faixa Central Azul Acima do Fotorreceptor */}
          <rect
            x="44"
            y="17"
            width="12"
            height="8"
            rx="1"
            fill="url(#r2CobaltBlue)"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          {/* Painel Azul Atrás do Olho */}
          <rect
            x="41"
            y="26"
            width="18"
            height="18"
            rx="2"
            fill="url(#r2CobaltBlue)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* 4. GRANDE FOTORRECEPTOR PRINCIPAL / OLHO PRETO DO R2-D2 */}
          <g id="r2-main-eye">
            {/* Moldura Circular Metálica */}
            <circle cx="50" cy="35" r="7.5" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            {/* Lente Negra Profunda */}
            <circle cx="50" cy="35" r="6" fill="url(#r2EyeLens)" />
            {/* Reflexo de Vidro Especular */}
            <ellipse cx="48" cy="33" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.65" />
          </g>

          {/* 5. PROJETOR HOLOGRÁFICO (RECEPTOR DIREITO) */}
          <g id="r2-holo-projector">
            <circle cx="68" cy="27" r="4.5" fill="#64748b" stroke="#1e293b" strokeWidth="1.2" />
            <circle
              cx="68"
              cy="27"
              r="3.2"
              fill="url(#r2HoloLens)"
              stroke="#0284c7"
              strokeWidth="0.8"
              className={isSpeaking ? 'animate-r2d2-projector-flash' : ''}
            />
            {/* Feixe Pulsante quando Fala */}
            {isSpeaking && (
              <circle cx="68" cy="27" r="5" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" opacity="0.8" />
            )}
          </g>

          {/* 6. LOGIC FUNCTION DISPLAY (LUZ LÓGICA RETANGULAR ESQUERDA) */}
          <g id="r2-logic-display">
            <rect
              x="29"
              y="25"
              width="8"
              height="5"
              rx="1"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1"
            />
            {/* Indicador Luminoso que Pisca Vermelho/Azul na Fala */}
            <rect
              x="30"
              y="26"
              width="6"
              height="3"
              rx="0.5"
              fill={isSpeaking ? '#ef4444' : '#0284c7'}
              className={isSpeaking ? 'animate-r2d2-logic-blink' : ''}
            />
          </g>

          {/* 7. PROCESSOR STATUS LIGHT (LUZ INDICADORA VERDE/AMARELA INFERIOR) */}
          <g id="r2-status-light">
            <circle cx="50" cy="46.5" r="2" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
            <circle
              cx="50"
              cy="46.5"
              r="1.4"
              fill={isSpeaking ? '#22c55e' : '#eab308'}
              className={isSpeaking ? 'animate-pulse' : ''}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
