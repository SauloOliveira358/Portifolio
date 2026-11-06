import React from 'react';
import SpotlightCard from './SpotlightCard';
import { Cpu, Database, Network, Users, Code2, ShieldAlert, Check, Terminal, Sparkles } from 'lucide-react';

export default function SkillsMatrix() {
  const skillCategories = [
    {
      title: 'Análise de Sistemas & Requisitos',
      icon: Users,
      color: 'text-emerald-400',
      spotlight: 'rgba(16, 185, 129, 0.2)',
      description: 'Capacidade comprovada na FIND Soluções de conectar regras de negócio a soluções tecnológicas.',
      skills: [
        { name: 'Levantamento de Requisitos', level: 95 },
        { name: 'Alinhamento Negócio & TI', level: 92 },
        { name: 'Treinamento & Suporte a Usuários', level: 96 },
        { name: 'Mapeamento de Processos', level: 88 },
        { name: 'Otimização de Fluxos Operacionais', level: 90 },
      ],
    },
    {
      title: 'Programação & Backend',
      icon: Code2,
      color: 'text-sky-400',
      spotlight: 'rgba(56, 189, 248, 0.2)',
      description: 'Lógica estruturada e orientada a objetos com foco em sustentabilidade e eficiência de código.',
      skills: [
        { name: 'Python (Automação, Scripts & Lógica)', level: 88 },
        { name: 'Java (POO, Arquitetura & JDBC)', level: 82 },
        { name: 'JavaScript & Ecossistema Web', level: 80 },
        { name: 'Clean Code & Estruturas de Dados', level: 85 },
      ],
    },
    {
      title: 'Banco de Dados & Análise de Dados',
      icon: Database,
      color: 'text-amber-400',
      spotlight: 'rgba(245, 158, 11, 0.2)',
      description: 'Modelagem relacional, manipulação de dados e consultas de alta performance em MySQL.',
      skills: [
        { name: 'MySQL (Consultas Avançadas & Joins)', level: 90 },
        { name: 'Modelagem de Dados Relacional', level: 86 },
        { name: 'Integridade Referencial & Índices', level: 84 },
        { name: 'Análise de Informações para Decisão', level: 88 },
      ],
    },
    {
      title: 'Infraestrutura de TI & Redes',
      icon: Network,
      color: 'text-purple-400',
      spotlight: 'rgba(168, 85, 247, 0.2)',
      description: 'Fundamentos sólidos adquiridos na prática em ambientes corporativos e industriais.',
      skills: [
        { name: 'Redes de Computadores & TCP/IP', level: 85 },
        { name: 'Suporte Técnico N2/N3 & Hardware', level: 92 },
        { name: 'Configuração de Roteadores & Switches', level: 82 },
        { name: 'Segurança Operacional & Diagnóstico', level: 88 },
      ],
    },
  ];

  const softSkills = [
    'Comunicação clara e assertiva com stakeholders',
    'Trabalho em equipe e colaboração interdisciplinar',
    'Proatividade e velocidade de aprendizado em novas tecnologias',
    'Organização metódica e gestão de múltiplas tarefas',
    'Paciência e didática para conduzir capacitações',
    'Foco absoluto na entrega de valor e resolução de gargalos',
  ];

  return (
    <section id="habilidades" className="py-20 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>MATRIZ DE HABILIDADES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Competências Técnicas & Domínio
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Habilidades consolidadas no dia a dia como Analista de Sistemas e na formação contínua em TI.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <SpotlightCard
                key={idx}
                className="p-6 sm:p-8"
                spotlightColor={cat.spotlight}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-emerald-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Soft Skills & Destaques Comportamentais */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Competências Comportamentais & Postura Profissional
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {softSkills.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 rounded-xl bg-slate-800/40 p-3 border border-slate-700/40 text-xs sm:text-sm text-slate-300"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
