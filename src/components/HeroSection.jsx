import React from 'react';
import { ArrowRight, MessageCircle, FileText, Github, Linkedin, ShieldCheck, Database, Code, Terminal, Sparkles } from 'lucide-react';
import DecryptedText from './DecryptedText';
import confetti from 'canvas-confetti';

export default function HeroSection({ onOpenResume }) {
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl text-center space-y-8 relative z-10">
        
        {/* Availability Pill / Status */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-300">
            Atuando como Analista de Sistemas @ FIND Soluções • Aberto a conexões
          </span>
        </div>

        {/* Hero Title with Cyber Scramble Reveal */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            <span className="block text-slate-400 text-lg sm:text-2xl font-mono font-medium mb-2">
              Olá, eu me chamo
            </span>
            <span className="text-gradient-emerald">
              <DecryptedText text="Saulo Oliveira Moreira" speed={30} />
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
            Especialista em transformar necessidades de negócio em{' '}
            <span className="text-white font-semibold">soluções de software eficientes</span>, com sólido domínio em{' '}
            <span className="text-emerald-400 font-medium">levantamento de requisitos</span>,{' '}
            <span className="text-sky-400 font-medium">Python, Java e MySQL</span>, e suporte técnico de missão crítica.
          </p>
        </div>

        {/* Quick CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerCelebration}
            className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:scale-105 shadow-xl shadow-emerald-500/25"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Falar no WhatsApp Direto</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Ver CV */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:border-emerald-500/50 hover:scale-105"
          >
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>Currículo Profissional</span>
          </button>

          {/* GitHub Repos */}
          <a
            href="https://github.com/SauloOliveira358"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-sm font-medium text-slate-300 transition-all hover:text-white hover:border-slate-700"
          >
            <Github className="h-4 w-4" />
            <span>GitHub Repos</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-5 py-3.5 text-sm font-medium text-slate-300 transition-all hover:text-[#38bdf8] hover:border-sky-500/30"
          >
            <Linkedin className="h-4 w-4 text-[#38bdf8]" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Tech Badges Row */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-400">
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
            MySQL & Modelagem
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            Infraestrutura & Redes
          </span>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Atual</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">FIND SOLUÇÕES</div>
            <div className="text-[11px] text-slate-400">Analista de Sistemas</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">6º P.</div>
            <div className="text-xs text-sky-400 font-medium mt-1">Sistemas de Informação</div>
            <div className="text-[11px] text-slate-400">Faculdade Anhanguera</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+4 Anos</div>
            <div className="text-xs text-purple-400 font-medium mt-1">Trajetória Técnica</div>
            <div className="text-[11px] text-slate-400">Eletricidade, TI & Sistemas</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Foco Operacional</div>
            <div className="text-[11px] text-slate-400">Requisitos & Treinamentos</div>
          </div>
        </div>

      </div>
    </section>
  );
}
