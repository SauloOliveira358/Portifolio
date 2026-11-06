import React, { useState } from 'react';
import SpotlightCard from './SpotlightCard';
import { ExternalLink, Github, FolderGit2, Database, Code, Terminal, Layers, Sparkles, Filter } from 'lucide-react';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'sistemas', label: 'Sistemas & Requisitos' },
    { id: 'python', label: 'Python & Automação' },
    { id: 'java-sql', label: 'Java & MySQL' },
    { id: 'infra', label: 'Infra & Redes' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Sistema de Requisitos & Gestão de Demandas',
      category: 'sistemas',
      tag: 'Análise de Sistemas',
      badge: 'Solução Corporativa',
      description:
        'Arquitetura de sistema para levantamento de requisitos, mapeamento de melhorias de negócio e alinhamento operacional. Possui fluxos de validação com stakeholders e relatórios de conformidade.',
      tech: ['Python', 'MySQL', 'Análise de Requisitos', 'UML', 'FastAPI'],
      github: 'https://github.com/SauloOliveira358',
      spotlight: 'rgba(16, 185, 129, 0.25)',
      highlights: ['Redução de retrabalho em sprints', 'Validação funcional precisa', 'Treinamento integrado'],
    },
    {
      id: 2,
      title: 'Pipeline Analítico & Gestor MySQL',
      category: 'java-sql',
      tag: 'Banco de Dados',
      badge: 'Data & Performance',
      description:
        'Motor de processamento de dados e relatórios gerenciais sobre MySQL. Otimização de queries relacionais com índices compostos, integridade referencial e triggers para auditoria.',
      tech: ['MySQL', 'Python', 'Consultas Avançadas', 'Modelagem Relacional', 'ETL'],
      github: 'https://github.com/SauloOliveira358',
      spotlight: 'rgba(56, 189, 248, 0.25)',
      highlights: ['Queries otimizadas em milissegundos', 'Modelagem normalizada', 'Integridade transacional ACID'],
    },
    {
      id: 3,
      title: 'Java Core Enterprise Suite',
      category: 'java-sql',
      tag: 'Backend Java',
      badge: 'Arquitetura POO',
      description:
        'Aplicação desktop e backend construída com padrões de projeto sólidos em Java (MVC, DAO, Factory). Conexão robusta via JDBC com MySQL e testes unitários estruturados.',
      tech: ['Java', 'JDBC', 'MySQL', 'POO', 'JUnit'],
      github: 'https://github.com/SauloOliveira358',
      spotlight: 'rgba(168, 85, 247, 0.25)',
      highlights: ['Padrões de projeto consolidados', 'Separação clara de responsabilidades', 'Tratamento de exceções'],
    },
    {
      id: 4,
      title: 'Auditor & Monitor de Conectividade de Redes',
      category: 'infra',
      tag: 'Infraestrutura',
      badge: 'Diagnóstico TI',
      description:
        'Script de monitoramento ativo de redes corporativas. Realiza testes de latência, verificação de portas abertas (Socket/TCP), mapeamento de subredes e emissão de alertas.',
      tech: ['Python', 'Socket', 'TCP/IP', 'Linux Shell', 'Hardware'],
      github: 'https://github.com/SauloOliveira358',
      spotlight: 'rgba(245, 158, 11, 0.25)',
      highlights: ['Telemetria de conectividade', 'Detecção instantânea de quedas', 'Logs detalhados'],
    },
    {
      id: 5,
      title: 'Automação de Rotinas & Backup Automatizado',
      category: 'python',
      tag: 'Automação',
      badge: 'Scripts & Dados',
      description:
        'Solução de script em Python para execução de rotinas administrativas, backup automático e versionado de bases MySQL com compressão e notificação.',
      tech: ['Python', 'MySQL Dump', 'Crontab/Task Scheduler', 'Segurança'],
      github: 'https://github.com/SauloOliveira358',
      spotlight: 'rgba(16, 185, 129, 0.25)',
      highlights: ['Zero intervenção manual', 'Histórico versionado', 'Tratamento de integridade'],
    },
    {
      id: 6,
      title: 'Portfólio Interativo Vue-Bits & Netlify Ready',
      category: 'sistemas',
      tag: 'Fullstack / UI',
      badge: 'Destaque Atual',
      description:
        'Ecossistema moderno de apresentação profissional, inspirado nos componentes interativos de alta fidelidade do vue-bits.dev, com terminal interativo, bento grid e deploy Netlify.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Canvas API', 'Netlify'],
      github: 'https://github.com/SauloOliveira358',
      spotlight: 'rgba(0, 220, 130, 0.25)',
      highlights: ['Spotlight dinâmico', 'Terminal CLI integrado', '100% responsivo e veloz'],
    },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>PORTFÓLIO DE PROJETOS & REPOSITÓRIOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projetos em Destaque
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Aplicações focadas em resolver problemas reais de negócio, estabilidade de dados e eficiência técnica.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="flex flex-col justify-between group hover:border-slate-700"
              spotlightColor={project.spotlight}
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {project.tag}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    {project.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights List */}
                <ul className="mt-4 space-y-1.5 border-l-2 border-slate-800 pl-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-400">
                      • {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tech & Links */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-800/80 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Ver no GitHub</span>
                  </a>

                  <a
                    href="https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20gostei%20do%20projeto%20no%20seu%20portf%C3%B3lio!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Conversar</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* GitHub Repos CTA Banner */}
        <div className="mt-14 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 shrink-0">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Deseja explorar todos os repositórios de código?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Acesse o perfil oficial no GitHub para acompanhar commits, estruturas e novos desenvolvimentos.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/SauloOliveira358?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all hover:scale-105 shrink-0 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            <span>Acessar Repositórios GitHub</span>
          </a>
        </div>

      </div>
    </section>
  );
}
