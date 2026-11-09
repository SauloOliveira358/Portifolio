import React, { useState } from 'react';
import SpotlightCard from './SpotlightCard';
import { ExternalLink, Github, FolderGit2, Gamepad2, Database, Code2, LineChart, ShieldAlert, HeartPulse, Wallet, Search, MessageCircle } from 'lucide-react';
import { fireEpicConfetti, fireSupernova } from '../utils/confetti';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'fullstack', label: 'Fullstack & Sistemas' },
    { id: 'comercial', label: 'Comercial & Dados' },
    { id: 'financeiro', label: 'Controle de Gastos' },
    { id: 'games', label: 'Jogos & Lógica' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Bela Busca (Projeto Ela)',
      category: 'fullstack',
      tag: 'Plataforma Web',
      badge: 'Destaque Principal',
      icon: Search,
      logo: '/projects/bela-busca.png',
      logoContainerStyle: 'h-10 px-2 rounded-xl bg-[#FBF8F3] border border-amber-200/70 shadow-sm',
      logoImgStyle: 'h-8 w-auto max-w-[110px] object-contain',
      description:
        'Plataforma moderna de intermediação e busca de serviços profissionais especializados. Desenvolvida para conectar prestadores e clientes com facilidade de agendamento e transparência.',
      tech: ['React', 'JavaScript', 'Node.js / API', 'Tailwind CSS', 'Arquitetura Web'],
      github: 'https://github.com/SauloOliveira358/projeto-ela',
      spotlight: 'rgba(236, 72, 153, 0.25)',
      highlights: [
        'Busca e filtragem dinâmica de serviços',
        'Interface limpa, moderna e responsiva',
        'Foco total na experiência e usabilidade do usuário',
      ],
    },
    {
      id: 2,
      title: 'MedFlow · Cuidado que Conecta',
      category: 'fullstack',
      tag: 'Saúde & Concorrência',
      badge: 'Arquitetura Robusta',
      icon: HeartPulse,
      logo: '/projects/medflow.png',
      logoContainerStyle: 'h-10 px-2.5 rounded-xl bg-[#0A120F] border border-emerald-500/40 shadow-emerald-500/10',
      description:
        'Sistema hospitalar e clínico completo. Frontend React conectado ao backend Spring Boot com PostgreSQL / Supabase, com controle estrito de concorrência e proteção contra Race Condition (Double Booking) em agendas médicas.',
      tech: ['React', 'Spring Boot (Java)', 'PostgreSQL / Supabase', 'Controle de Concorrência', 'Docker'],
      github: 'https://github.com/SauloOliveira358/MedFlow',
      spotlight: 'rgba(16, 185, 129, 0.28)',
      highlights: [
        'Proteção contra agendamentos simultâneos concorrentes',
        'Isolamento transacional ACID rigoroso',
        'Backend desacoplado com arquitetura limpa',
      ],
    },
    {
      id: 3,
      title: 'Dashboard Comercial (Rede Comercial Aurora)',
      category: 'comercial',
      tag: 'BI & Analytics',
      badge: 'Python & KPIs',
      icon: LineChart,
      logo: '/projects/dash-comercial.png',
      logoContainerStyle: 'h-10 px-2.5 rounded-xl bg-[#0f172a] border border-blue-500/40 shadow-blue-500/10',
      description:
        'Aplicação web completa para análise de indicadores comerciais da simulação Rede Aurora. Desenvolvida com Flask, PostgreSQL e Chart.js para consulta e visualização de vendas, faturamento e ticket médio.',
      tech: ['Python (Flask)', 'PostgreSQL', 'Chart.js', 'Análise de Vendas', 'KPIs'],
      github: 'https://github.com/SauloOliveira358/projeto-comercial',
      spotlight: 'rgba(56, 189, 248, 0.25)',
      highlights: [
        'Gráficos analíticos e telemetria comercial em tempo real',
        'Filtros por período, produto e desempenho de vendas',
        'Base relacional com queries de alto desempenho',
      ],
    },
    {
      id: 4,
      title: 'Projeto Vendas & Banco de Dados Avançado',
      category: 'comercial',
      tag: 'Banco de Dados',
      badge: 'PLpgSQL / SQL',
      icon: Database,
      description:
        'Camada de inteligência e modelagem relacional avançada para gestão de vendas. Estruturação de schemas com PLpgSQL, triggers de integridade, procedures analíticas e otimização de consultas.',
      tech: ['PLpgSQL', 'PostgreSQL', 'Modelagem Relacional', 'Triggers', 'Auditoria'],
      github: 'https://github.com/SauloOliveira358/projeto_vendas',
      spotlight: 'rgba(245, 158, 11, 0.25)',
      highlights: [
        'Triggers automáticos para consistência de estoque e vendas',
        'Procedures para consolidação de faturamento',
        'Modelagem normalizada com alto nível de integridade',
      ],
    },
    {
      id: 5,
      title: 'Salpay — Controle de Gastos & Finanças',
      category: 'financeiro',
      tag: 'Gestão Financeira',
      badge: 'Controle de Gastos',
      icon: Wallet,
      logo: '/projects/salpay.png',
      logoContainerStyle: 'h-10 px-2.5 rounded-xl bg-white border border-sky-300/60 shadow-sky-500/10',
      description:
        'Sistema completo de controle financeiro pessoal e operacional (Salpay). Gerenciamento detalhado de receitas, despesas categorizadas, balanço mensal e fluxo de caixa com backend em Java.',
      tech: ['Java', 'POO', 'Spring Boot / JDBC', 'Frontend Interativo', 'Gestão Financeira'],
      github: 'https://github.com/SauloOliveira358/Controle-Gastos',
      spotlight: 'rgba(16, 185, 129, 0.25)',
      highlights: [
        'Categorização inteligente de despesas e receitas',
        'Visão analítica de saldo e metas financeiras',
        'Persistência segura e validação de regras contábeis',
      ],
    },
    {
      id: 6,
      title: 'Jogo Indiana Jones (Plataforma 2D)',
      category: 'games',
      tag: 'Game Dev',
      badge: 'Física & Interatividade',
      icon: Gamepad2,
      logo: '/projects/indiana.png',
      logoContainerStyle: 'h-10 px-2.5 rounded-xl bg-[#040A0D] border border-amber-500/40 shadow-amber-500/10',
      description:
        'Jogo retrô de plataforma 2D interativo com trilha sonora dinâmica, alavancas mecânicas, plataformas móveis, armadilhas de lava/água, coletáveis e física fluida desenvolvido em JavaScript puro.',
      tech: ['JavaScript Puro', 'HTML5 Canvas/DOM', 'CSS3 Animations', 'Web Audio API', 'Física 2D'],
      github: 'https://github.com/SauloOliveira358/idianajhones',
      spotlight: 'rgba(234, 179, 8, 0.25)',
      highlights: [
        'Lógica completa de colisão de plataformas e obstáculos',
        'Sons e efeitos acionados dinamicamente por eventos',
        'Múltiplas fases e puzzles com alavancas interativas',
      ],
    },
    {
      id: 7,
      title: 'Show do Android (Game de Perguntas)',
      category: 'games',
      tag: 'Mobile / Java',
      badge: 'Quiz & Android',
      icon: Code2,
      description:
        'Jogo temático de perguntas e respostas desenvolvido em Java para o ecossistema Android. Gerenciamento do ciclo de vida das activities, placar persistente e lógica de eliminação de opções.',
      tech: ['Java', 'Android SDK', 'XML Layouts', 'Persistência Local', 'Lógica de Jogo'],
      github: 'https://github.com/SauloOliveira358/Show-do-Android',
      spotlight: 'rgba(56, 189, 248, 0.25)',
      highlights: [
        'Interface adaptativa para diferentes resoluções',
        'Banco de perguntas categorizado com pontuação',
        'Regras estritas de jogo e tempo de resposta',
      ],
    },
    {
      id: 8,
      title: 'ET: Fuga dos Céus',
      category: 'games',
      tag: 'JavaScript Game',
      badge: 'Arcade',
      icon: Gamepad2,
      logo: '/projects/birdzin.jpg',
      logoContainerStyle: 'h-8 rounded-lg overflow-hidden border-0 shadow-none bg-transparent',
      logoImgStyle: 'h-8 w-auto max-w-[125px] object-cover rounded-lg border-0',
      description:
        'Jogo arcade veloz e responsivo no navegador, simulando gravidade, impulsão física e detecção contínua de barreiras e pontuação dinâmica.',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Game Loop'],
      github: 'https://github.com/SauloOliveira358/birdzin',
      spotlight: 'rgba(168, 85, 247, 0.25)',
      highlights: [
        'Loop de renderização constante a 60 FPS',
        'Detecção de colisão bounding-box',
        'Leve, sem dependências externas',
      ],
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
            <span>REPOSITÓRIOS GITHUB REAIS & PROJETOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projetos Selecionados do GitHub
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Aplicações reais desenvolvidas por Saulo Oliveira, explorando regras de negócio, dados, concorrência e interatividade.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 scale-105 border-2 border-emerald-300'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-400/80 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:-translate-y-0.5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <SpotlightCard
                key={project.id}
                delay={(idx % 3) * 120}
                className="flex flex-col justify-between group"
                spotlightColor={project.spotlight}
              >
                <div>
                  {/* Card Top Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {project.logo ? (
                        <div
                          className={`flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
                            project.logoContainerStyle || 'h-10 px-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-sm'
                          }`}
                          title={`Logo: ${project.title}`}
                        >
                          <img
                            src={project.logo}
                            alt={`Logo ${project.title}`}
                            className={project.logoImgStyle || 'h-7 w-auto max-w-[110px] object-contain rounded'}
                          />
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 text-emerald-400 group-hover:border-emerald-400/60 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                      )}
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-400/70 hover:shadow-[0_0_10px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-default truncate">
                        {project.tag}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider shrink-0">
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

                {/* Bottom Tech & Highly Visible Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-400/80 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* HIGH VISIBILITY ACTION BUTTONS (GITHUB & CONVERSAR) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => fireSupernova({ origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } })}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.55),0_0_15px_rgba(56,189,248,0.4)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 border-2 border-emerald-200/90 hover:border-white group/btn"
                      title={`Acessar código fonte de ${project.title} no GitHub`}
                    >
                      <Github className="h-4 w-4 shrink-0 fill-slate-950 group-hover/btn:rotate-12 transition-transform" />
                      <span className="tracking-wide">Ver no GitHub</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    </a>

                    <a
                      href={`https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20gostei%20muito%20do%20projeto%20${encodeURIComponent(project.title)}!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-emerald-300 px-3.5 py-2.5 text-xs font-semibold border border-slate-700/80 hover:border-emerald-400/80 hover:shadow-[0_0_14px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                      title="Conversar sobre este projeto"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Conversar</span>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* GitHub Repos CTA Banner */}
        <div className="mt-14 rounded-2xl border border-slate-800 hover:border-cyan-400/60 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all duration-300 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7),0_0_24px_rgba(56,189,248,0.2)] hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 shrink-0">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Gostaria de ver todos os repositórios no GitHub?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Acesse o perfil oficial de Saulo Oliveira para inspecionar commits, forks e projetos ativos.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/SauloOliveira358?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => fireSupernova({ origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } })}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 px-5 py-2.5 text-xs font-extrabold text-slate-950 transition-all hover:scale-105 hover:-translate-y-0.5 shrink-0 shadow-lg shadow-emerald-500/25 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-emerald-200/80 hover:border-white flex items-center gap-2"
          >
            <Github className="h-4 w-4 fill-slate-950" />
            <span>Acessar @SauloOliveira358</span>
          </a>
        </div>

      </div>
    </section>
  );
}
