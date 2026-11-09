import React from 'react';
import { ArrowRight, MessageCircle, FileText, Github, Linkedin, ShieldCheck, Database, Code, Terminal, Sparkles, GraduationCap, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import DecryptedText from './DecryptedText';
import { fireEpicConfetti, fireSupernova } from '../utils/confetti';
import TiltedPhotoCard from './TiltedPhotoCard';

export default function HeroSection({ onOpenResume }) {
  const triggerCelebration = (e) => {
    if (e && typeof e.clientX === 'number' && typeof e.clientY === 'number') {
      fireSupernova({
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
      });
    } else {
      fireSupernova();
    }
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
                Analista de Sistemas & Desenvolvedor de Software • 8º Período SI
              </span>
            </div>

            {/* Hero Title */}
            <div className="space-y-2">
              <span className="block text-slate-400 text-sm sm:text-lg font-mono font-medium">
                Olá, seja muito bem-vindo! Eu sou
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight min-h-[1.2em]">
                <DecryptedText text="Saulo Oliveira Moreira" />
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
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition-all duration-300 hover:from-emerald-400 hover:to-teal-300 hover:scale-105 hover:-translate-y-0.5 shadow-[0_6px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.6),0_0_20px_rgba(56,189,248,0.4)] border-2 border-emerald-200/90 hover:border-white"
              >
                <MessageCircle className="h-4 w-4 fill-slate-950" />
                <span>Chamar no WhatsApp Direto</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Ver CV */}
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-105 hover:-translate-y-0.5"
              >
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>Currículo Profissional</span>
              </button>

              {/* GitHub Repos */}
              <a
                href="https://github.com/SauloOliveira358?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)] hover:scale-105 hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" />
                <span>Repositórios no GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:text-[#38bdf8] hover:border-sky-400 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)] hover:scale-105 hover:-translate-y-0.5"
              >
                <Linkedin className="h-4 w-4 text-[#38bdf8]" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-400/70 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all duration-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Análise de Requisitos
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-sky-400/70 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 transition-all duration-200">
                <Code className="h-3.5 w-3.5 text-sky-400" />
                Python & Java
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-400/70 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 transition-all duration-200">
                <Database className="h-3.5 w-3.5 text-amber-400" />
                MySQL & PostgreSQL
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-purple-400/70 hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:-translate-y-0.5 transition-all duration-200">
                <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
                8º Período Anhanguera
              </span>
            </div>

          </div>

          {/* Right Column: React Bits / Vue Bits 3D Tilted Photo with Glare, Parallax & Cyber Reticle */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <TiltedPhotoCard onCelebrate={triggerCelebration} />
          </div>

        </div>

        {/* Live Metrics Grid Bottom (Carreira, 8º Período, +4 Anos, 100%) com Bordas Holográficas e Efeito 3D */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-12 border-t border-slate-800/80 max-w-5xl mx-auto">
          {/* Card 1: Carreira */}
          <div className="group relative p-4 rounded-2xl border border-slate-800/80 hover:border-emerald-400 bg-slate-900/60 backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_25px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] cursor-default overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Briefcase className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-emerald-300 transition-colors">Carreira</span>
            </div>
            <div className="text-xs text-emerald-400 font-bold mt-0.5">Analista de Sistemas</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Requisitos & Engenharia de Software</div>
          </div>

          {/* Card 2: 8º Período */}
          <div className="group relative p-4 rounded-2xl border border-slate-800/80 hover:border-sky-400 bg-slate-900/60 backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_25px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] cursor-default overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <GraduationCap className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-sky-300 transition-colors">8º Período</span>
            </div>
            <div className="text-xs text-sky-400 font-bold mt-0.5">Sistemas de Informação</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Faculdade Anhanguera (Conclusão 2026)</div>
          </div>

          {/* Card 3: +4 Anos */}
          <div className="group relative p-4 rounded-2xl border border-slate-800/80 hover:border-purple-400 bg-slate-900/60 backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_25px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] cursor-default overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Zap className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-purple-300 transition-colors">+4 Anos</span>
            </div>
            <div className="text-xs text-purple-400 font-bold mt-0.5">Trajetória Técnica</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Eletricidade, TI & Sistemas</div>
          </div>

          {/* Card 4: 100% */}
          <div className="group relative p-4 rounded-2xl border border-slate-800/80 hover:border-teal-400 bg-slate-900/60 backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_25px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(20,184,166,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] cursor-default overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-teal-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <CheckCircle2 className="h-4 w-4 text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-teal-300 transition-colors">100%</span>
            </div>
            <div className="text-xs text-teal-400 font-bold mt-0.5">Foco Operacional</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Requisitos & Código Limpo</div>
          </div>
        </div>

      </div>
    </section>
  );
}
