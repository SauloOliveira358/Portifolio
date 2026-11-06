import React from 'react';
import SpotlightCard from './SpotlightCard';
import { Briefcase, GraduationCap, Cpu, Layers, Users, Zap, CheckCircle, Database, GitBranch, ArrowUpRight } from 'lucide-react';

export default function BentoGrid({ onOpenResume }) {
  return (
    <section id="sobre" className="py-20 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>ARQUITETURA & EXPERIÊNCIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visão Geral em Formato Bento Grid
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Estrutura modular inspirada nos melhores componentes modernos do Vue-Bits e Netlify.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Bento Item 1: FIND Soluções (Col-span 2) */}
          <SpotlightCard
            className="md:col-span-2 lg:col-span-2 flex flex-col justify-between group"
            spotlightColor="rgba(16, 185, 129, 0.22)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                  <Briefcase className="h-3.5 w-3.5" />
                  Cargo Atual
                </span>
                <span className="text-xs font-mono text-slate-400">08/2025 — Atual</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                FIND SOLUÇÕES
              </h3>
              <p className="text-sm font-semibold text-emerald-400 mt-1">Analista de Sistemas</p>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Responsável pelo levantamento aprofundado de requisitos para implementação de novos módulos e melhorias operacionais. Alinhamento direto entre as dores do negócio e as entregas técnicas de engenharia, além de conduzir capacitações e suporte de alto impacto para os usuários.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono">
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Levantamento de Requisitos
                </span>
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Modelagem de Processos
                </span>
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Treinamentos Operacionais
                </span>
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Suporte Crítico
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle className="h-3.5 w-3.5" /> Foco em Eficiência Operacional
              </span>
              <button
                onClick={onOpenResume}
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                Ver detalhes no CV <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </SpotlightCard>

          {/* Bento Item 2: Formação Acadêmica (Col-span 1 ou 2) */}
          <SpotlightCard
            className="md:col-span-1 lg:col-span-2 flex flex-col justify-between"
            spotlightColor="rgba(56, 189, 248, 0.22)"
            borderColor="rgba(56, 189, 248, 0.4)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 rounded-lg bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 border border-sky-500/20">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Graduação em Andamento
                </span>
                <span className="text-xs font-mono text-slate-400">Formatura: 12/2026</span>
              </div>

              <h3 className="text-xl font-bold text-white">Sistemas de Informação</h3>
              <p className="text-sm font-semibold text-sky-400 mt-1">Faculdade Anhanguera de Divinópolis</p>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                8º período em andamento com foco em engenharia de software, modelagem de banco de dados, arquitetura de sistemas corporativos, redes e governança de tecnologia da informação.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-800/50 p-2.5 border border-slate-700/40">
                  <div className="text-white font-semibold">8º Período</div>
                  <div className="text-slate-400 text-[11px]">Formatura: Dez/2026</div>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-2.5 border border-slate-700/40">
                  <div className="text-white font-semibold">Divinópolis - MG</div>
                  <div className="text-slate-400 text-[11px]">Polo tecnológico</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
              <span>Anhanguera Educacional</span>
              <span className="font-mono text-sky-400">Bacharelado</span>
            </div>
          </SpotlightCard>

          {/* Bento Item 3: Core Tech Stack (Col-span 1 ou 2) */}
          <SpotlightCard
            className="md:col-span-1 lg:col-span-2 flex flex-col justify-between"
            spotlightColor="rgba(168, 85, 247, 0.22)"
            borderColor="rgba(168, 85, 247, 0.4)"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20">
                  <Cpu className="h-3.5 w-3.5" />
                  Stack Tecnológica
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">Linguagens & Bancos de Dados</h3>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-mono">Python (Automação & Lógica)</span>
                    <span className="text-emerald-400 font-mono">Avançado</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-mono">MySQL (Modelagem, Joins & Queries)</span>
                    <span className="text-sky-400 font-mono">Avançado</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-mono">Java (POO, Estruturas & Backend)</span>
                    <span className="text-purple-400 font-mono">Sólido</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-sky-400 w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-mono">Web Moderno (React, Vue, Tailwind)</span>
                    <span className="text-emerald-400 font-mono">Prático</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>SQL Queries • Clean Code</span>
              <span className="text-purple-400 font-mono">POO & Data</span>
            </div>
          </SpotlightCard>

          {/* Bento Item 4: Ferlig & Hardware / Redes (Col-span 1 ou 2) */}
          <SpotlightCard
            className="md:col-span-2 lg:col-span-2 flex flex-col justify-between"
            spotlightColor="rgba(245, 158, 11, 0.22)"
            borderColor="rgba(245, 158, 11, 0.4)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 border border-amber-500/20">
                  <Zap className="h-3.5 w-3.5" />
                  Infraestrutura & TI
                </span>
                <span className="text-xs font-mono text-slate-400">12/2022 — 08/2025</span>
              </div>

              <h3 className="text-xl font-bold text-white">Ferlig Ferro Liga Ltda</h3>
              <p className="text-sm font-semibold text-amber-400 mt-1">Eletricista & Suporte em Informática</p>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Vivência multidisciplinar combinando manutenção elétrica de precisão com suporte em informática, configuração de roteadores, switches, cabeamento estruturado e manutenção preventiva em equipamentos computacionais.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono">
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Redes & Roteamento
                </span>
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Infraestrutura de TI
                </span>
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Hardware & Manutenção
                </span>
                <span className="rounded bg-slate-800/90 px-2.5 py-1 text-slate-300 border border-slate-700/60">
                  Segurança Operacional
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
              <span>Resolução rápida de problemas</span>
              <span className="text-amber-400 font-mono">Hardware + Software</span>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
