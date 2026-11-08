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
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [dismissPlanetTrigger, setDismissPlanetTrigger] = useState(0);

  // Helper leve para animação individual de cada componente para o buraco negro
  const getFlyClass = (zone) => {
    if (cleanModeState === 'SUCKING') {
      return `animate-suck-${zone}`;
    }
    if (cleanModeState === 'RESTORING') {
      return `animate-restore-${zone}`;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans relative selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Dynamic Interactive Particles, 360° Rotating Cosmos & Gargantua Black Hole Simulator */}
      <InteractiveBackground
        onStartSuction={() => setCleanModeState('SUCKING')}
        onCompleteSuction={() => setCleanModeState('CLEAN')}
        onStartRestore={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setCleanModeState('RESTORING');
        }}
        onCompleteRestore={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setCleanModeState('NORMAL');
        }}
        onPlanetClick={(planetId) => setSelectedPlanet({ id: planetId, timestamp: Date.now() })}
        dismissTrigger={dismissPlanetTrigger}
      />

      {/* Main Website Content Wrapper - Desaparece 100% no Modo Limpo para liberar a tela inteira */}
      {cleanModeState !== 'CLEAN' && (
        <div className={`relative z-10 ${cleanModeState === 'SUCKING' ? 'pointer-events-none' : ''}`}>
          {/* Floating Header */}
          <div className={getFlyClass('nav')}>
            <Navbar onOpenResume={() => setResumeOpen(true)} />
          </div>

          {/* Main Content Sections */}
          <main className="relative z-10">
            {/* 1. Hero Section */}
            <div className={getFlyClass('hero')}>
              <HeroSection onOpenResume={() => setResumeOpen(true)} />
            </div>

            {/* 2. Bento Grid Section */}
            <div className={getFlyClass('bento')}>
              <BentoGrid onOpenResume={() => setResumeOpen(true)} />
            </div>

            {/* 3. Interactive Terminal Playground */}
            <div className={getFlyClass('terminal')}>
              <section id="terminal" className="py-16 px-4 sm:px-6 relative">
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
            </div>

            {/* 4. Projects Showcase */}
            <div className={getFlyClass('projects')}>
              <ProjectsSection />
            </div>

            {/* 5. Career & Education Timeline */}
            <div className={getFlyClass('experience')}>
              <ExperienceTimeline onOpenResume={() => setResumeOpen(true)} />
            </div>

            {/* 6. Technical Skills Matrix */}
            <div className={getFlyClass('skills')}>
              <SkillsMatrix />
            </div>

            {/* 7. Contact Section */}
            <div className={getFlyClass('contact')}>
              <ContactSection />
            </div>
          </main>

          {/* Footer */}
          <div className={getFlyClass('footer')}>
            <Footer />
          </div>
        </div>
      )}

      {/* Floating 1-Click WhatsApp Messenger & Assistant Bot */}
      <div className={`relative z-40 ${cleanModeState === 'SUCKING' ? getFlyClass('whatsapp') : cleanModeState === 'RESTORING' ? getFlyClass('whatsapp') : ''}`}>
        <FloatingWhatsApp
          onOpenResume={() => setResumeOpen(true)}
          isCleanMode={cleanModeState === 'CLEAN'}
          planetTrigger={selectedPlanet}
          onClosePlanet={() => {
            setSelectedPlanet(null);
            setDismissPlanetTrigger(Date.now());
          }}
        />
      </div>

      {/* Complete Professional Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
