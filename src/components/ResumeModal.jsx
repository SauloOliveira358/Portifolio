import React from 'react';
import { X, Printer, Mail, Phone, MapPin, CheckCircle2, ExternalLink, Download, FileText } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Function that opens an isolated, ultra-clean print window where all links remain 100% clickable in PDF
  const handlePrintClean = () => {
    const printWindow = window.open('', '_blank', 'width=850,height=1000');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Curriculo - Saulo Oliveira Moreira</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background: #ffffff;
      color: #1e293b;
      font-size: 11.5px;
      line-height: 1.4;
      padding: 10px 15px;
    }
    a {
      color: #047857;
      text-decoration: none;
      font-weight: 600;
    }
    a:hover {
      text-decoration: underline;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    .header-info h1 {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .header-info h2 {
      font-size: 13px;
      font-weight: 700;
      color: #059669;
      margin-bottom: 8px;
    }
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 11px;
      color: #475569;
    }
    .photo-container {
      width: 105px;
      height: 125px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #059669;
      flex-shrink: 0;
    }
    .photo-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .section {
      margin-bottom: 11px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #059669;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 6px;
    }
    .exp-item {
      margin-bottom: 8px;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      color: #0f172a;
      font-size: 12px;
    }
    .exp-role {
      font-size: 11.5px;
      font-weight: 600;
      color: #047857;
      margin-bottom: 2px;
    }
    .exp-period {
      font-size: 10.5px;
      color: #64748b;
      font-weight: 500;
    }
    ul {
      list-style-type: square;
      padding-left: 16px;
      margin-top: 3px;
      color: #334155;
    }
    li {
      margin-bottom: 2px;
      font-size: 11px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 14px;
      font-size: 11px;
      color: #334155;
    }
    .skills-grid strong {
      color: #0f172a;
    }
    .project-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 10.5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-info">
      <h1>Saulo Oliveira Moreira</h1>
      <h2>Analista de Sistemas & Desenvolvedor de Software</h2>
      <div class="contact-row">
        <span>📱 WhatsApp: <a href="https://wa.me/5537999165471" target="_blank">(37) 99916-5471</a></span>
        <span>✉️ E-mail: <a href="mailto:saulooliveiram358@gmail.com">saulooliveiram358@gmail.com</a></span>
        <span>📍 Divinópolis - MG</span>
      </div>
      <div class="contact-row" style="margin-top: 4px;">
        <span>🌐 LinkedIn: <a href="https://www.linkedin.com/in/saulo-oliveira-348a30356" target="_blank">linkedin.com/in/saulo-oliveira-348a30356</a></span>
        <span>🐙 GitHub: <a href="https://github.com/SauloOliveira358" target="_blank">github.com/SauloOliveira358</a></span>
      </div>
    </div>
    <div class="photo-container">
      <img src="${window.location.origin}/profile.jpg" alt="Saulo Oliveira Moreira" />
    </div>
  </div>

  <div class="section">
    <div class="section-title">Objetivo Profissional</div>
    <p style="color: #334155; font-size: 11px;">
      Atuação nas áreas de <strong>Análise de Sistemas, Engenharia de Software e Banco de Dados</strong>. Experiência consolidada em levantamento de requisitos de negócio, integração de arquiteturas em Python, Java e MySQL/Postgres, condução de treinamentos técnicos e apoio estratégico na eficiência operacional.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Experiências Profissionais</div>

    <div class="exp-item">
      <div class="exp-header">
        <span>FIND SOLUÇÕES</span>
        <span class="exp-period">Agosto de 2025 — Atual</span>
      </div>
      <div class="exp-role">Analista de Sistemas</div>
      <ul>
        <li>Levantamento e especificação minuciosa de requisitos para implementação e melhorias em sistemas corporativos.</li>
        <li>Garantia do alinhamento entre as necessidades do negócio e a entrega técnica de engenharia.</li>
        <li>Condução de treinamentos técnicos e suporte de missão crítica aos usuários para aumento da eficiência operacional.</li>
      </ul>
    </div>

    <div class="exp-item" style="margin-bottom: 0;">
      <div class="exp-header">
        <span>Ferlig Ferro Liga Ltda</span>
        <span class="exp-period">Dezembro de 2022 — Agosto de 2025</span>
      </div>
      <div class="exp-role">Eletricista com atuação em Informática & TI</div>
      <ul>
        <li>Atuação em manutenção elétrica industrial e predial aliada ao suporte em informática, computadores e periféricos.</li>
        <li>Configuração e manutenção de infraestrutura básica de redes locais (cabeamento estruturado, roteadores e switches).</li>
        <li>Diagnóstico lógico rápido e integração técnica entre elétrica, segurança operacional e TI.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Formação Acadêmica</div>
    <div class="exp-header">
      <span>Faculdade Anhanguera de Divinópolis</span>
      <span class="exp-period">Formatura Prevista: Dezembro de 2026</span>
    </div>
    <div class="exp-role" style="color: #334155;">
      Bacharelado em Sistemas de Informação — <strong>8º Período em Andamento</strong>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Competências Técnicas & Ferramentas</div>
    <div class="skills-grid">
      <div><strong>Análise de Requisitos:</strong> Levantamento, UML, BPMN, Suporte N3</div>
      <div><strong>Bancos de Dados:</strong> MySQL, PostgreSQL, PLpgSQL, Triggers</div>
      <div><strong>Programação:</strong> Python (Flask/Scripts), Java (Spring Boot/POO)</div>
      <div><strong>Web & Frontend:</strong> React, JavaScript, HTML5/CSS3, Tailwind</div>
      <div><strong>Infraestrutura:</strong> Redes de Computadores, TCP/IP, Hardware</div>
      <div><strong>Idiomas:</strong> Inglês Básico (leitura de documentação técnica)</div>
    </div>
  </div>

  <div class="section" style="margin-bottom: 0;">
    <div class="section-title">Projetos Reais em Destaque (Links Clicáveis)</div>
    <div class="project-links">
      <span>• <strong>Bela Busca (Projeto Ela):</strong> <a href="https://github.com/SauloOliveira358/projeto-ela" target="_blank">github.com/SauloOliveira358/projeto-ela</a></span>
      <span>• <strong>MedFlow:</strong> <a href="https://github.com/SauloOliveira358/MedFlow" target="_blank">github.com/SauloOliveira358/MedFlow</a></span>
      <span>• <strong>Dashboard Comercial:</strong> <a href="https://github.com/SauloOliveira358/projeto-comercial" target="_blank">github.com/SauloOliveira358/projeto-comercial</a></span>
      <span>• <strong>Salpay (Gastos):</strong> <a href="https://github.com/SauloOliveira358/Controle-Gastos" target="_blank">github.com/SauloOliveira358/Controle-Gastos</a></span>
      <span>• <strong>Indiana Jones Game:</strong> <a href="https://github.com/SauloOliveira358/idianajhones" target="_blank">github.com/SauloOliveira358/idianajhones</a></span>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        
        {/* Modal Top Actions */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white text-sm sm:text-base">
              Currículo Profissional — Saulo Oliveira Moreira
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintClean}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-md shadow-emerald-500/20"
              title="Abre tela de impressão calibrada em 1 página com todos os links clicáveis no PDF gerado"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Salvar PDF / Imprimir (1 Página A4)</span>
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
        <div className="p-6 sm:p-8 space-y-5 text-slate-300 font-sans">
          
          {/* Header with Photo (enlarged as requested) */}
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Saulo Oliveira Moreira
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-400">
                Analista de Sistemas & Desenvolvedor de Software • 8º Período SI
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 pt-2 text-xs text-slate-300 font-mono">
                <a
                  href="https://wa.me/5537999165471"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-400 hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" />
                  (37) 99916-5471
                </a>
                <a
                  href="mailto:saulooliveiram358@gmail.com"
                  className="flex items-center gap-1 text-sky-400 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  saulooliveiram358@gmail.com
                </a>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  Divinópolis - MG
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 pt-1 text-xs text-slate-400 font-mono">
                <a
                  href="https://github.com/SauloOliveira358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white hover:underline flex items-center gap-1"
                >
                  <span>github.com/SauloOliveira358</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline flex items-center gap-1"
                >
                  <span>linkedin.com/in/saulo-oliveira-348a30356</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Candidate Photo (slightly larger: 105px x 125px) */}
            <div className="shrink-0">
              <div className="h-28 w-24 sm:h-32 sm:w-28 rounded-xl overflow-hidden border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/10">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Objetivo Profissional
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Atuação nas áreas de <strong>Análise de Sistemas, Programação e Engenharia de Software</strong>. Experiência em levantamento de requisitos de negócio, integração de arquiteturas em Python, Java e MySQL/Postgres, condução de treinamentos técnicos e suporte na melhoria da eficiência operacional.
            </p>
          </div>

          {/* Experiências Profissionais */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Experiências Profissionais
            </h2>
            
            <div className="space-y-3.5">
              {/* FIND SOLUÇÕES */}
              <div className="border-l-2 border-emerald-500/60 pl-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">FIND SOLUÇÕES</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Agosto de 2025 — Atual
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-400">Analista de Sistemas</p>
                <ul className="mt-1 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  <li>Levantamento minucioso de requisitos de negócio para novas funcionalidades e melhorias em sistemas.</li>
                  <li>Alinhamento direto entre os objetivos do cliente/negócio e a arquitetura técnica de engenharia.</li>
                  <li>Condução de treinamentos operacionais e suporte de missão crítica aos usuários para aumento de eficiência.</li>
                </ul>
              </div>

              {/* Ferlig Ferro Liga Ltda */}
              <div className="border-l-2 border-slate-700 pl-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Ferlig Ferro Liga Ltda</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Dezembro de 2022 — Agosto de 2025
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-300">Eletricista com atuação em Informática & TI</p>
                <ul className="mt-1 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  <li>Manutenção elétrica predial e industrial com rigorosa conformidade técnica e segurança operacional.</li>
                  <li>Suporte técnico a microinformática, reparo de computadores e configuração de infraestrutura básica de rede.</li>
                  <li>Integração de raciocínio lógico e eletricidade para diagnósticos rápidos de falhas e conectividade.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Formação Acadêmica
            </h2>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">Sistemas de Informação (Bacharelado)</h3>
                <p className="text-xs text-slate-400">Faculdade Anhanguera de Divinópolis</p>
              </div>
              <span className="text-xs font-semibold font-mono text-emerald-400">
                8º Período (Formatura Prevista: Dezembro/2026)
              </span>
            </div>
          </div>

          {/* Competências */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Competências Técnicas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div><strong>Análise de Sistemas:</strong> Requisitos, UML, BPMN, Suporte N3</div>
              <div><strong>Bancos de Dados:</strong> MySQL, PostgreSQL, PLpgSQL, Triggers</div>
              <div><strong>Programação:</strong> Python (Flask/Scripts), Java (Spring Boot/POO)</div>
              <div><strong>Web & Frontend:</strong> React, JavaScript, HTML5/CSS3, Tailwind</div>
              <div><strong>Infraestrutura:</strong> Redes de Computadores, TCP/IP, Hardware</div>
              <div><strong>Idiomas:</strong> Inglês Básico (leitura de documentação técnica)</div>
            </div>
          </div>

          {/* Links para Repositórios Reais */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Projetos no GitHub (Links Clicáveis)
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <a href="https://github.com/SauloOliveira358/projeto-ela" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                • Bela Busca (projeto-ela)
              </a>
              <a href="https://github.com/SauloOliveira358/MedFlow" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                • MedFlow
              </a>
              <a href="https://github.com/SauloOliveira358/projeto-comercial" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                • Dashboard Comercial
              </a>
              <a href="https://github.com/SauloOliveira358/Controle-Gastos" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                • Salpay (Controle de Gastos)
              </a>
              <a href="https://github.com/SauloOliveira358/idianajhones" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                • Indiana Jones Game
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-slate-900/95 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">Documento pronto para impressão em 1 página com links ativos.</p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrintClean}
              className="flex-1 sm:flex-initial rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
            >
              <Printer className="h-4 w-4" />
              <span>Salvar PDF / Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
