import React, { useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BentoGrid from './components/BentoGrid';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsMatrix from './components/SkillsMatrix';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ResumeModal from './components/ResumeModal';
import CometCursor from './components/CometCursor';
import ScrollReveal from './components/ScrollReveal';

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
              <ScrollReveal animation="fade-up" duration={700}>
                <HeroSection onOpenResume={() => setResumeOpen(true)} />
              </ScrollReveal>
            </div>

            {/* 2. Bento Grid Section */}
            <div className={getFlyClass('bento')}>
              <ScrollReveal animation="slide-left" duration={950}>
                <BentoGrid onOpenResume={() => setResumeOpen(true)} />
              </ScrollReveal>
            </div>

            {/* 3. Projects Showcase */}
            <div className={getFlyClass('projects')}>
              <ScrollReveal animation="slide-right" duration={950}>
                <ProjectsSection />
              </ScrollReveal>
            </div>

            {/* 5. Career & Education Timeline */}
            <div className={getFlyClass('experience')}>
              <ScrollReveal animation="gravitational-rise" duration={1000}>
                <ExperienceTimeline onOpenResume={() => setResumeOpen(true)} />
              </ScrollReveal>
            </div>

            {/* 6. Technical Skills Matrix */}
            <div className={getFlyClass('skills')}>
              <ScrollReveal animation="zoom-in" duration={900}>
                <SkillsMatrix />
              </ScrollReveal>
            </div>

            {/* 7. Contact Section */}
            <div className={getFlyClass('contact')}>
              <ScrollReveal animation="quantum-flip" duration={1000}>
                <ContactSection />
              </ScrollReveal>
            </div>
          </main>

          {/* Footer */}
          <div className={getFlyClass('footer')}>
            <ScrollReveal animation="fade-up" duration={800}>
              <Footer />
            </ScrollReveal>
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

      {/* Cosmic Comet Cursor Trail */}
      <CometCursor />
    </div>
  );
}
