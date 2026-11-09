import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#060a12] py-12 px-4 sm:px-6 relative z-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white text-base">Saulo Oliveira Moreira</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              v2.0
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Analista de Sistemas na FIND SOLUÇÕES. Transformando processos de negócio em software de alto impacto.
          </p>

          {/* Status Pill */}
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] text-emerald-300 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Disponível para novos projetos e oportunidades</span>
          </div>
        </div>

        {/* Social Icons & Contact */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/SauloOliveira358"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_14px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-[#38bdf8] hover:border-sky-400 hover:shadow-[0_0_14px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <a
            href="https://wa.me/5537999165471"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_14px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <a
            href="mailto:saulooliveiram358@gmail.com"
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_14px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 transition-all duration-200 ml-2"
            title="Voltar ao Topo"
            aria-label="Voltar ao Topo"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between mx-auto max-w-7xl">
        <span>© {new Date().getFullYear()} Saulo Oliveira Moreira. Todos os direitos reservados.</span>
        <span className="mt-2 sm:mt-0">Construído com React, Tailwind CSS e alta performance.</span>
      </div>
    </footer>
  );
}
