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

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans relative selection:bg-emerald-500 selection:text-slate-950">
      {/* Dynamic Interactive Particles Background */}
      <InteractiveBackground />

      {/* Floating Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection onOpenResume={() => setResumeOpen(true)} />

        {/* 2. Bento Grid Section */}
        <BentoGrid onOpenResume={() => setResumeOpen(true)} />

        {/* 3. Interactive Terminal Playground */}
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

        {/* 4. Projects Showcase */}
        <ProjectsSection />

        {/* 5. Career & Education Timeline */}
        <ExperienceTimeline onOpenResume={() => setResumeOpen(true)} />

        {/* 6. Technical Skills Matrix */}
        <SkillsMatrix />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating 1-Click WhatsApp Messenger */}
      <FloatingWhatsApp />

      {/* Complete Professional Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
