import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Award, GraduationCap } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function ExperienceTimeline({ onOpenResume }) {
  const experiences = [
    {
      company: 'FIND SOLUÇÕES',
      role: 'Analista de Sistemas',
      period: 'Agosto de 2025 — Presente',
      location: 'Divinópolis - MG',
      current: true,
      tag: 'Atuação Atual',
      description:
        'Atuação estratégica como Analista de Sistemas na concepção, evolução e sustentação de plataformas de software empresariais.',
      achievements: [
        'Levantamento aprofundado de requisitos com clientes e áreas de negócio, traduzindo necessidades em especificações funcionais claras.',
        'Garantia de alinhamento contínuo entre regras de negócio complexas e soluções tecnológicas eficientes.',
        'Liderança na condução de treinamentos técnicos e operacionais para equipes e clientes finais.',
        'Suporte técnico consultivo de missão crítica aos usuários, elevando a satisfação e usabilidade dos sistemas.',
        'Atuação decisiva na identificação e eliminação de gargalos processuais, aumentando a eficiência operacional.',
      ],
      skills: ['Análise de Requisitos', 'Alinhamento Negócio/TI', 'Treinamento de Usuários', 'Suporte Técnico N3', 'BPMN / UML'],
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      company: 'Ferlig Ferro Liga Ltda',
      role: 'Eletricista & Suporte em Informática/TI',
      period: 'Dezembro de 2022 — Agosto de 2025 (2 anos e 9 meses)',
      location: 'Minas Gerais',
      current: false,
      tag: 'Infraestrutura & TI',
      description:
        'Atuação técnica em manutenção elétrica, automação predial/comercial e infraestrutura de informática e conectividade de redes.',
      achievements: [
        'Manutenção preventiva e corretiva em instalações e painéis elétricos industriais e prediais com rigorosas normas de segurança.',
        'Suporte técnico a usuários em microinformática, reparo de computadores, configuração de periféricos e sistemas operacionais.',
        'Implementação e estruturação básica de redes locais (LAN, cabeamento estruturado, roteadores e switches).',
        'Integração contínua entre hardware, comandos elétricos e tecnologia para garantir disponibilidade operacional ininterrupta.',
      ],
      skills: ['Redes TCP/IP', 'Manutenção de Hardware', 'Infraestrutura Física', 'Diagnóstico Lógico', 'Segurança Operacional'],
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      company: 'Faculdade Anhanguera de Divinópolis',
      role: 'Bacharelado em Sistemas de Informação',
      period: 'Previsão de Conclusão: Dezembro de 2026',
      location: 'Divinópolis - MG',
      current: false,
      tag: 'Graduação',
      isEducation: true,
      description:
        'Formação acadêmica sólida voltada para a gestão estratégica de TI, engenharia de software e banco de dados.',
      achievements: [
        '8º período em andamento com foco em engenharia de software, arquitetura de microsserviços e banco de dados relacional.',
        'Estudos avançados de engenharia de software, modelagem de banco de dados MySQL e PostgreSQL, concorrência e redes.',
        'Participação ativa em projetos práticos de desenvolvimento corporativo e análise de viabilidade técnica.',
      ],
      skills: ['Sistemas de Informação', 'Engenharia de Software', 'Banco de Dados Relacional', 'Estruturas de Dados'],
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    },
  ];

  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
            <Briefcase className="h-3.5 w-3.5" />
            <span>TRAJETÓRIA & EXPERIÊNCIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experiência Profissional & Formação
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Uma jornada de comprometimento prático com tecnologia, análise crítica e suporte operacional.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 sm:pl-10 space-y-10 border-l-2 border-slate-800">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-slate-950 ${
                  exp.current
                    ? 'border-emerald-400 shadow-lg shadow-emerald-500/50'
                    : 'border-slate-700 group-hover:border-slate-500'
                }`}
              >
                {exp.current ? (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                )}
              </div>

              {/* Card Container */}
              <SpotlightCard
                delay={idx * 140}
                className={`p-6 sm:p-8 ${exp.current ? 'border-emerald-500/40 bg-slate-900/80' : ''}`}
                spotlightColor={exp.current ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.15)'}
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${exp.badgeColor}`}>
                        {exp.tag}
                      </span>
                      {exp.current && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ativo
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements Bullet Points */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Principais Atribuições & Contribuições:
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-lg bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 font-mono text-[11px] text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-400/80 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        {/* View full CV action */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:border-emerald-500/50 hover:bg-slate-800 transition-all shadow-lg"
          >
            <span>Ver Currículo Detalhado em Tela Cheia</span>
            <ChevronRight className="h-4 w-4 text-emerald-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
