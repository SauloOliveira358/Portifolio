import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Sparkles, Check, Copy } from 'lucide-react';
import { fireEpicConfetti } from '../utils/confetti';

export default function TerminalPlayground({ onOpenResume, onOpenContact }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '⚡ Saulo DevOS v2.4 (x86_64-sistemas-info). Digite "help" para ver os comandos disponíveis.',
    },
    {
      type: 'command',
      cmd: 'whoami',
    },
    {
      type: 'output',
      text: 'Saulo Oliveira Moreira | Analista de Sistemas @ FIND Soluções & 8º Período de Sistemas de Informação.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBodyRef = useRef(null);
  const terminalRef = useRef(null);
  const [isHoloActive, setIsHoloActive] = useState(false);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHoloActive(true);
          setTimeout(() => setIsHoloActive(false), 950);
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.98) {
          setIsHoloActive(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll ONLY within the terminal container, NOT the browser window!
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (cmdStr) => {
    const rawCmd = (cmdStr || inputVal).trim();
    if (!rawCmd) return;

    const lower = rawCmd.toLowerCase();
    const newItems = [{ type: 'command', cmd: rawCmd }];

    switch (lower) {
      case 'help':
        newItems.push({
          type: 'output',
          text: `Comandos disponíveis:
  • about       - Resumo profissional e formação (8º período)
  • skills      - Habilidades técnicas e competências
  • sql         - Executar query de simulação no MySQL/Postgres
  • experience  - Histórico na FIND Soluções & Ferlig
  • projects    - Principais projetos (MedFlow, Bela Busca, Salpay, etc.)
  • whatsapp    - Iniciar conversa direta no WhatsApp (+55 37 99916-5471)
  • cv          - Ver currículo profissional completo com foto
  • clear       - Limpar o terminal
  • confetti    - Celebrar e disparar confetes no site inteiro! 🎉`,
        });
        break;

      case 'about':
        newItems.push({
          type: 'output',
          text: `Saulo Oliveira Moreira
----------------------------------------
Cargo: Analista de Sistemas na FIND SOLUÇÕES
Formação: Sistemas de Informação (8º Período - Conclusão em 2026)
Instituição: Faculdade Anhanguera de Divinópolis
Foco: Análise de Requisitos, Eficiência Operacional, Integração de Dados & Código Limpo.`,
        });
        break;

      case 'skills':
        newItems.push({
          type: 'output',
          text: `[STACK TÉCNICA PRINCIPAL]:
  ✓ Linguagens: Python (Flask, Automação), Java (Spring Boot, POO, JDBC), JavaScript/TypeScript
  ✓ Bancos de Dados: MySQL & PostgreSQL (Modelagem relacional, PLpgSQL, Joins, Triggers, ACID)
  ✓ Análise de Sistemas: Levantamento minucioso de requisitos, diagramas UML, BPMN, suporte & treinamentos
  ✓ Infraestrutura: Redes de computadores, TCP/IP, cabeamento, hardware e segurança
  ✓ Frontend: React, Tailwind CSS, Vite, HTML5 Canvas`,
        });
        break;

      case 'sql':
      case 'query':
        newItems.push({
          type: 'output',
          text: `mysql> SELECT skill, level, area FROM developer_skills WHERE developer_id = 'saulo';
+---------------------------+-------------+---------------------+
| skill                     | level       | area                |
+---------------------------+-------------+---------------------+
| Levantamento de Requisitos| Senior      | Análise de Sistemas |
| Python (Flask & Scripts)  | Avançado    | Backend / Dados     |
| MySQL & PostgreSQL        | Avançado    | Banco de Dados      |
| Java & Spring Boot        | Sólido      | Backend / POO       |
| Suporte & Treinamentos    | Especialista| Operações / Usuários|
| Redes & Infraestrutura    | Sólido      | Infra & Hardware    |
+---------------------------+-------------+---------------------+
6 rows in set (0.002 sec)`,
        });
        break;

      case 'experience':
      case 'exp':
        newItems.push({
          type: 'output',
          text: `[HISTÓRICO PROFISSIONAL]:
1. FIND SOLUÇÕES (08/2025 - Presente)
   - Cargo: Analista de Sistemas
   - Atividades: Requisitos para novos sistemas e melhorias, alinhamento técnico/negócio, condução de treinamentos e suporte de missão crítica.

2. FERLIG FERRO LIGA LTDA (12/2022 - 08/2025)
   - Cargo: Eletricista com atuação em Informática & TI
   - Atividades: Manutenção elétrica predial/comercial, infraestrutura de redes, suporte técnico a equipamentos de TI.`,
        });
        break;

      case 'projects':
        newItems.push({
          type: 'output',
          text: `GitHub: https://github.com/SauloOliveira358
Repositórios oficiais:
  1. Bela Busca (projeto-ela) - Plataforma de serviços profissionais
  2. MedFlow - Sistema médico com controle estrito de concorrência
  3. Dashboard Comercial Aurora - Flask, Python, Postgres & Chart.js
  4. Projeto Vendas - PLpgSQL avançado, triggers e modelagem
  5. Salpay - Gestão de gastos e finanças pessoais/empresariais em Java
  6. Indiana Jones - Jogo 2D retrô com física em JavaScript puro`,
        });
        break;

      case 'whatsapp':
        newItems.push({
          type: 'output',
          text: 'Abrindo WhatsApp direto para (37) 99916-5471...',
        });
        window.open('https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20vi%20seu%20terminal%20interativo%20no%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!', '_blank');
        break;

      case 'cv':
        newItems.push({
          type: 'output',
          text: 'Abrindo visualizador de Currículo com foto...',
        });
        if (onOpenResume) onOpenResume();
        break;

      case 'confetti':
        fireEpicConfetti();
        newItems.push({
          type: 'output',
          text: '🎉 Sucesso! Efeito épico de confetes disparado pelo site inteiro!',
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newItems.push({
          type: 'output',
          text: `Comando não reconhecido: "${rawCmd}". Digite "help" para ver as opções.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newItems]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand();
    }
  };

  const quickCommands = ['help', 'sql', 'skills', 'projects', 'confetti'];

  return (
    <div
      ref={terminalRef}
      className={`relative overflow-hidden rounded-2xl border bg-[#0b0f19] shadow-2xl backdrop-blur-xl transition-all duration-500 ${
        isHoloActive ? 'holo-card-glow border-cyan-400/50' : 'border-slate-800'
      }`}
    >
      {/* Feixe de escaneamento holográfico ao descer a tela */}
      {isHoloActive && (
        <div
          className="pointer-events-none absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent animate-holo-scanline z-30"
          aria-hidden="true"
        />
      )}

      {/* Grade de varredura holográfica */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100%_4px] transition-opacity duration-700 ${
          isHoloActive ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Cantoneiras HUD Sci-Fi */}
      {isHoloActive && (
        <>
          <span className="absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-cyan-400/90 pointer-events-none z-30" />
          <span className="absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-cyan-400/90 pointer-events-none z-30" />
          <span className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-cyan-400/90 pointer-events-none z-30" />
          <span className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-cyan-400/90 pointer-events-none z-30" />
        </>
      )}
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80 hover:opacity-100 transition-opacity" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          <div className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span>saulo@divinopolis-devbox:~ (bash)</span>
          </div>
        </div>

        {/* Quick shortcut pills */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 mr-1">Cliques rápidos:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="rounded bg-slate-800/80 px-2 py-0.5 font-mono text-[11px] text-emerald-400 hover:bg-slate-700 hover:text-emerald-300 transition-colors"
            >
              ${cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body with strict isolated internal scroll */}
      <div
        ref={terminalBodyRef}
        className="h-80 overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2 selection:bg-emerald-500 selection:text-slate-950 scroll-smooth"
      >
        {history.map((item, idx) => (
          <div key={idx} className="break-words">
            {item.type === 'system' && (
              <div className="text-emerald-400/90 font-medium">{item.text}</div>
            )}
            {item.type === 'command' && (
              <div className="flex items-center gap-2 text-slate-200">
                <span className="text-emerald-400 font-bold">saulo@dev:~$</span>
                <span className="text-white font-semibold">{item.cmd}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="whitespace-pre-wrap text-slate-400 pl-4 border-l-2 border-slate-800/80 my-1 font-mono">
                {item.text}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Terminal Input Bar */}
      <div className="flex items-center gap-2 border-t border-slate-800 bg-slate-900/60 px-4 py-2.5">
        <span className="font-mono text-xs sm:text-sm text-emerald-400 font-bold">saulo@dev:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite um comando (ex: help, sql, projects, confetti)..."
          className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder-slate-400 outline-none"
        />
        <button
          onClick={() => runCommand()}
          className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
        >
          <Play className="h-3 w-3 fill-current" />
          <span className="hidden sm:inline">Executar</span>
        </button>
      </div>
    </div>
  );
}
