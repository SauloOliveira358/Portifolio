import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, MessageCircle, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Visão Geral', href: '#sobre' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Experiência', href: '#experiencia' },
    { name: 'Competências', href: '#habilidades' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-panel bg-[#090d16]/90 border border-slate-800/80 shadow-2xl py-2 px-4 sm:px-6'
            : 'bg-transparent py-3 px-2 sm:px-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo with Status Indicator */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 via-slate-800 to-slate-900 border border-emerald-500/30 group-hover:border-emerald-400 transition-colors">
              <span className="font-mono font-extrabold text-sm text-emerald-400">SO</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                Saulo Oliveira
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  FIND Soluções
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Analista de Sistemas & Dev</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors rounded-full hover:bg-slate-800/50"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Quick Actions (CV, WhatsApp, GitHub, LinkedIn) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/50 hover:text-white transition-all"
            >
              <FileText className="h-3.5 w-3.5 text-emerald-400" />
              <span>Ver CV</span>
            </button>

            <a
              href="https://github.com/SauloOliveira358"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Saulo Oliveira"
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Saulo Oliveira"
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-[#38bdf8] hover:border-sky-500/30 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 space-y-2 pb-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200"
              >
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>Visualizar Currículo Completo</span>
              </button>
              <a
                href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Conversar no WhatsApp ((37) 99916-5471)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
