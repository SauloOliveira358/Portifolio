import React, { useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BentoGrid from './components/BentoGrid';
import TerminalPlayground from './components/TerminalPlayground';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsMatrix from './components/SkillsMatrix';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ResumeModal from './components/ResumeModal';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cleanModeState, setCleanModeState] = useState('NORMAL'); // 'NORMAL', 'SUCKING', 'CLEAN', 'RESTORING'

  // Helper to get staggered animation classes per section depth
  const getStaggerClass = (tier) => {
    if (cleanModeState === 'SUCKING') {
      return `animate-suck-stagger-${tier}`;
    }
    if (cleanModeState === 'RESTORING') {
      return `animate-restore-stagger-${tier}`;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans relative selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Dynamic Interactive Particles, 360° Rotating Cosmos & Gargantua Black Hole Simulator */}
      <InteractiveBackground
        onStartSuction={() => setCleanModeState('SUCKING')}
        onCompleteSuction={() => setCleanModeState('CLEAN')}
        onStartRestore={() => setCleanModeState('RESTORING')}
        onCompleteRestore={() => setCleanModeState('NORMAL')}
      />

      {/* Main Website Content Wrapper - Desaparece 100% no Modo Limpo para liberar a tela inteira */}
      {cleanModeState !== 'CLEAN' && (
        <div className={`relative z-10 ${cleanModeState === 'SUCKING' ? 'pointer-events-none' : ''}`}>
          {/* Floating Header (Tier 3 - Sucked last, restored first) */}
          <div className={getStaggerClass(3)}>
            <Navbar onOpenResume={() => setResumeOpen(true)} />
          </div>

          {/* Main Content Sections */}
          <main className="relative z-10">
            {/* 1. Hero Section (Tier 3) */}
            <div className={getStaggerClass(3)}>
              <HeroSection onOpenResume={() => setResumeOpen(true)} />
            </div>

            {/* 2. Bento Grid Section (Tier 2) */}
            <div className={getStaggerClass(2)}>
              <BentoGrid onOpenResume={() => setResumeOpen(true)} />
            </div>

            {/* 3. Interactive Terminal Playground (Tier 2) */}
            <section id="terminal" className={`py-16 px-4 sm:px-6 relative ${getStaggerClass(2)}`}>
              <div className="mx-auto max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
                    <TerminalIcon className="h-3.5 w-3.5" />
                    <span>TERMINAL CLI INTERATIVO</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Experimente o Console de Desenvolvedor
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-400">
                    Execute comandos em tempo real, consulte o schema SQL simulado, explore as habilidades ou lance confetes.
                  </p>
                </div>

                <TerminalPlayground
                  onOpenResume={() => setResumeOpen(true)}
                  onOpenContact={() => {
                    const el = document.getElementById('contato');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </section>

            {/* 4. Projects Showcase (Tier 1) */}
            <div className={getStaggerClass(1)}>
              <ProjectsSection />
            </div>

            {/* 5. Career & Education Timeline (Tier 1) */}
            <div className={getStaggerClass(1)}>
              <ExperienceTimeline onOpenResume={() => setResumeOpen(true)} />
            </div>

            {/* 6. Technical Skills Matrix (Tier 0 - Sucked early) */}
            <div className={getStaggerClass(0)}>
              <SkillsMatrix />
            </div>

            {/* 7. Contact Section (Tier 0) */}
            <div className={getStaggerClass(0)}>
              <ContactSection />
            </div>
          </main>

          {/* Footer (Tier 0) */}
          <div className={getStaggerClass(0)}>
            <Footer />
          </div>

          {/* Floating 1-Click WhatsApp Messenger & Assistant Bot (Tier 0) */}
          <div className={getStaggerClass(0)}>
            <FloatingWhatsApp onOpenResume={() => setResumeOpen(true)} />
          </div>
        </div>
      )}

      {/* Complete Professional Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
