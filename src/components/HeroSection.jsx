import React from 'react';
import { ArrowRight, MessageCircle, FileText, Github, Linkedin, ShieldCheck, Database, Code, Terminal, Sparkles, GraduationCap } from 'lucide-react';
import DecryptedText from './DecryptedText';
import { fireEpicConfetti } from '../utils/confetti';

export default function HeroSection({ onOpenResume }) {
  const triggerCelebration = () => {
    fireEpicConfetti();
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text, Bio, CTAs (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Availability Pill / Status */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-300">
                Analista de Sistemas @ FIND Soluções • 8º Período Sistemas de Informação
              </span>
            </div>

            {/* Hero Title with Cyber Scramble Reveal */}
            <div className="space-y-2">
              <span className="block text-slate-400 text-sm sm:text-lg font-mono font-medium">
                Olá, seja muito bem-vindo! Eu sou
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                <span className="text-gradient-emerald">
                  <DecryptedText text="Saulo Oliveira Moreira" speed={30} />
                </span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed pt-2">
                Especialista em unir <span className="text-white font-semibold">regras de negócio</span> com <span className="text-emerald-400 font-medium">engenharia de software e análise de dados</span>. Experiência sólida em levantamento de requisitos, arquitetura em Python, Java, MySQL e resolução de problemas operacionais críticos.
              </p>
            </div>

            {/* Quick CTA Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerCelebration}
                className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:scale-105 shadow-xl shadow-emerald-500/25"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Chamar no WhatsApp Direto</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Ver CV */}
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:border-emerald-500/50 hover:scale-105"
              >
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>Currículo Profissional</span>
              </button>

              {/* GitHub Repos */}
              <a
                href="https://github.com/SauloOliveira358?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all hover:text-white hover:border-slate-700"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repos</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all hover:text-[#38bdf8] hover:border-sky-500/30"
              >
                <Linkedin className="h-4 w-4 text-[#38bdf8]" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Análise de Requisitos
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                <Code className="h-3.5 w-3.5 text-sky-400" />
                Python & Java
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                <Database className="h-3.5 w-3.5 text-amber-400" />
                MySQL & PostgreSQL
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
                8º Período Anhanguera
              </span>
            </div>

          </div>

          {/* Right Column: Top Profile Photo with Cyber Glow Effects (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative group max-w-sm w-full mx-auto">
              
              {/* Pulsing Ambient Glow Underlay */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-purple-600/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow" />

              {/* Animated rotating border frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-400 via-cyan-500 to-slate-800 shadow-2xl overflow-hidden">
                
                {/* Photo container with zoom & hover effect */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[4/5]">
                  <img
                    src="/profile.jpg"
                    alt="Saulo Oliveira Moreira"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient overlay on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Cyber grid scanline highlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Info Pill Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        Saulo Oliveira
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono">
                        Analista @ FIND SOLUÇÕES
                      </div>
                    </div>
                    <button
                      onClick={triggerCelebration}
                      className="rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 p-2 border border-emerald-500/30 transition-colors"
                      title="Clique para celebrar!"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-3 -right-3 z-20 rounded-xl bg-slate-900/90 border border-emerald-500/40 px-3 py-1.5 text-[11px] font-mono text-emerald-300 shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-float">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>8º Período SI</span>
              </div>

            </div>
          </div>

        </div>

        {/* Live Metrics Grid Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-12 border-t border-slate-800/80 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Atual</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">FIND SOLUÇÕES</div>
            <div className="text-[11px] text-slate-400">Analista de Sistemas</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">8º Período</div>
            <div className="text-xs text-sky-400 font-medium mt-1">Sistemas de Informação</div>
            <div className="text-[11px] text-slate-400">Faculdade Anhanguera (Conclusão 2026)</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+4 Anos</div>
            <div className="text-xs text-purple-400 font-medium mt-1">Trajetória Técnica</div>
            <div className="text-[11px] text-slate-400">Eletricidade, TI & Sistemas</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Foco Operacional</div>
            <div className="text-[11px] text-slate-400">Requisitos & Código Limpo</div>
          </div>
        </div>

      </div>
    </section>
  );
}
