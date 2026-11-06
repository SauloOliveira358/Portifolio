import React from 'react';
import { X, Printer, Mail, Phone, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:static print:inset-auto">
      
      {/* Print-specific style tag to force 1 clean single page layout */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: #1e293b !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 11px !important;
            line-height: 1.35 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          .print-compact-gap {
            gap: 4px !important;
          }
          .print-text-dark {
            color: #0f172a !important;
          }
          .print-text-muted {
            color: #475569 !important;
          }
          .print-border {
            border-color: #cbd5e1 !important;
          }
          .print-pill {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl print:max-h-none print:overflow-visible print:border-none print:shadow-none print:bg-white">
        
        {/* Modal Top Actions (Hidden on Print) */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-3.5 backdrop-blur-md no-print">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white text-sm sm:text-base">Currículo Profissional — Saulo Oliveira Moreira</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all"
              title="Imprimir em 1 página ou Salvar em PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir / Salvar PDF (1 Página)</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div
          id="printable-resume"
          className="p-6 sm:p-8 space-y-5 text-slate-300 font-sans print:p-0 print:text-slate-800"
        >
          {/* Header with Photo */}
          <div className="border-b border-slate-800 pb-4 print:border-slate-300 print:pb-3 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight print:text-slate-900">
                Saulo Oliveira Moreira
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-400 print:text-emerald-700">
                Analista de Sistemas & Desenvolvedor de Software (8º Período SI)
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-slate-400 print:text-slate-600 font-mono">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-emerald-400 print:text-emerald-700" />
                  (37) 99916-5471
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-emerald-400 print:text-emerald-700" />
                  saulooliveiram358@gmail.com
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 print:text-emerald-700" />
                  Divinópolis - MG
                </span>
                <span className="flex items-center gap-1">
                  github.com/SauloOliveira358
                </span>
              </div>
            </div>

            {/* Candidate Photo */}
            <div className="shrink-0">
              <div className="h-20 w-18 sm:h-24 sm:w-20 rounded-xl overflow-hidden border-2 border-emerald-500/50 print:border-slate-400 shadow-md">
                <img
                  src="/profile.jpg"
                  alt="Saulo Oliveira Moreira"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Objetivo */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800">
              Objetivo
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-700">
              Atuação nas áreas de <strong>Análise de Sistemas, Programação e Análise de Dados</strong>. Experiência consolidada em levantamento de requisitos operacionais, desenvolvimento de soluções de software e integração de dados relacionais para otimização de processos e eficiência corporativa.
            </p>
          </div>

          {/* Experiências Profissionais */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800">
              Experiências Profissionais
            </h2>
            
            <div className="space-y-3.5">
              {/* FIND SOLUÇÕES */}
              <div className="border-l-2 border-emerald-500/60 pl-3.5 print:border-emerald-600">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white print:text-slate-900">FIND SOLUÇÕES</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                    Agosto de 2025 — Atual
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-400 print:text-emerald-700">Analista de Sistemas</p>
                <ul className="mt-1 space-y-0.5 text-xs text-slate-300 print:text-slate-700 list-disc list-inside">
                  <li>Levantamento minucioso de requisitos de negócio para novas funcionalidades e sustentação de sistemas.</li>
                  <li>Alinhamento direto entre os objetivos do cliente/negócio e a arquitetura técnica de engenharia.</li>
                  <li>Condução de treinamentos operacionais e suporte de missão crítica aos usuários para aumento de eficiência.</li>
                </ul>
              </div>

              {/* Ferlig Ferro Liga Ltda */}
              <div className="border-l-2 border-slate-700 pl-3.5 print:border-slate-400">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white print:text-slate-900">Ferlig Ferro Liga Ltda</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                    Dezembro de 2022 — Agosto de 2025
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-300 print:text-slate-700">Eletricista com atuação em Informática & TI</p>
                <ul className="mt-1 space-y-0.5 text-xs text-slate-300 print:text-slate-700 list-disc list-inside">
                  <li>Manutenção elétrica predial e industrial com conformidade técnica e segurança operacional.</li>
                  <li>Suporte técnico a microinformática, reparo de computadores e configuração de infraestrutura básica de rede.</li>
                  <li>Integração de raciocínio lógico e eletricidade para diagnósticos rápidos de falhas e conectividade.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800">
              Formação Acadêmica
            </h2>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 print:border-slate-300 print:bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white print:text-slate-900">Sistemas de Informação (Bacharelado)</h3>
                <p className="text-xs text-slate-400 print:text-slate-600">Faculdade Anhanguera de Divinópolis</p>
              </div>
              <span className="text-xs font-semibold font-mono text-emerald-400 print:text-emerald-700">
                8º Período (Previsão: Dezembro/2026)
              </span>
            </div>
          </div>

          {/* Competências */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800">
              Competências Técnicas
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs print:text-slate-700">
              <div><strong>Análise de Sistemas:</strong> Requisitos, UML, BPMN, Suporte N3</div>
              <div><strong>Bancos de Dados:</strong> MySQL, PostgreSQL, PLpgSQL, Triggers</div>
              <div><strong>Programação:</strong> Python (Flask/Scripts), Java (Spring/POO/JDBC)</div>
              <div><strong>Infraestrutura:</strong> Redes de Computadores, TCP/IP, Hardware</div>
              <div><strong>Web:</strong> React, JavaScript, HTML5/CSS3, Tailwind CSS</div>
              <div><strong>Idiomas:</strong> Inglês Básico (leitura de documentação técnica)</div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden on Print) */}
        <div className="border-t border-slate-800 bg-slate-900/95 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <p className="text-xs text-slate-400">Currículo atualizado com atuação na FIND Soluções e 8º período.</p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Imprimir
            </button>
            <a
              href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20analisei%20seu%20curr%C3%ADculo%20e%20gostaria%20de%20agendar%20uma%20conversa!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial text-center rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Falar no WhatsApp
            </a>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
