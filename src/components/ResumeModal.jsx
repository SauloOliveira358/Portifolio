import React from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Building, GraduationCap, Award, CheckCircle2, ExternalLink } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Modal Top Actions */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white text-sm sm:text-base">Currículo Profissional — Saulo Oliveira Moreira</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-300 font-sans" id="printable-resume">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Saulo Oliveira Moreira</h1>
            <p className="mt-1 text-lg font-medium text-emerald-400">Analista de Sistemas & Desenvolvedor de Software</p>
            
            <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-emerald-400" />
                <a href="https://wa.me/5537999165471" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  (37) 99916-5471
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-400" />
                <a href="mailto:saulooliveiram358@gmail.com" className="hover:text-emerald-400 transition-colors">
                  saulooliveiram358@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>Divinópolis - MG</span>
              </div>
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Objetivo</h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              Busco atuar nas áreas de <strong>Análise de Sistemas, Programação e Análise de Dados</strong>, onde possa aplicar e expandir meus conhecimentos em tecnologia. Forte interesse e experiência em contribuir com levantamento de requisitos, desenvolvimento e sustentação de soluções de software e análise aprofundada de dados relacionais, visando otimização de processos, melhoria contínua da eficiência operacional e apoio estratégico à tomada de decisão.
            </p>
          </div>

          {/* Experiências Profissionais */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">Experiências Profissionais</h2>
            
            <div className="space-y-6">
              {/* FIND SOLUÇÕES */}
              <div className="relative pl-6 border-l-2 border-emerald-500/60">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-900 border-2 border-emerald-400" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-base font-bold text-white">FIND SOLUÇÕES</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                    Agosto de 2025 — Atual
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-300 mt-0.5">Analista de Sistemas</p>
                <ul className="mt-2.5 space-y-2 text-sm text-slate-400 list-disc list-inside">
                  <li>Atuação direta como Analista de Sistemas, conduzindo levantamento minucioso de requisitos de negócio para implementação e melhorias contínuas em sistemas corporativos.</li>
                  <li>Garantia do alinhamento preciso entre as necessidades estratégicas do negócio e as soluções tecnológicas desenvolvidas.</li>
                  <li>Responsável por conduzir treinamentos técnicos e operacionais, prestando suporte de missão crítica aos usuários finais.</li>
                  <li>Assegurar a correta usabilidade dos sistemas, atuando ativamente na redução de gargalos e aumento da eficiência operacional.</li>
                </ul>
              </div>

              {/* Ferlig Ferro Liga Ltda */}
              <div className="relative pl-6 border-l-2 border-slate-700">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-base font-bold text-white">Ferlig Ferro Liga Ltda</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 w-fit">
                    Dezembro de 2022 — Agosto de 2025
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-300 mt-0.5">Eletricista com atuação em Informática & TI</p>
                <ul className="mt-2.5 space-y-2 text-sm text-slate-400 list-disc list-inside">
                  <li>Atuação em manutenção elétrica industrial, residencial e comercial, reparos e inspeções com foco em conformidade e segurança.</li>
                  <li>Aplicação de conhecimentos em informática e tecnologia da informação, atuando em suporte técnico, configuração de equipamentos e soluções de infraestrutura básica de redes.</li>
                  <li>Integração de habilidades técnicas e lógicas, contribuindo com precisão técnica em projetos que uniram eletricidade, instrumentação e TI.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Formação Acadêmica</h2>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white">Sistemas de Informação</h3>
                  <p className="text-sm text-slate-400">Faculdade Anhanguera de Divinópolis</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 w-fit">
                  6º Período (Previsão de Formatura: Dezembro/2026)
                </span>
              </div>
            </div>
          </div>

          {/* Competências */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Competências & Habilidades Técnicas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Análise de Requisitos:</strong> Levantamento, validação e especificação funcional de sistemas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Programação:</strong> Python e Java (lógica, estruturas de dados, POO e desenvolvimento)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Banco de Dados:</strong> MySQL (consultas, manipulação de dados, modelagem e integridade relacional)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Infraestrutura & Redes:</strong> Fundamentos de redes de computadores, TCP/IP e TI</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Suporte & Treinamentos:</strong> Condução de capacitação de usuários e suporte técnico em sistemas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Comunicação & Gestão:</strong> Trabalho em equipe, organização multitarefas e proatividade</span>
              </div>
            </div>
          </div>

          {/* Idiomas */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Idiomas</h2>
            <p className="text-sm text-slate-300">Inglês — Básico (leitura técnica e documentação)</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-slate-900/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">Disponível para oportunidades presenciais e remotas.</p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20analisei%20seu%20curr%C3%ADculo%20e%20gostaria%20de%20agendar%20uma%20conversa!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial text-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Contatar no WhatsApp
            </a>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
