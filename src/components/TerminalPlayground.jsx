import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Play, Sparkles, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

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
      text: 'Saulo Oliveira Moreira | Analista de Sistemas @ FIND Soluções & Dev Python/Java/MySQL.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  • about       - Resumo profissional e formação
  • skills      - Habilidades técnicas e competências
  • sql         - Executar query de simulação no MySQL
  • experience  - Histórico na FIND Soluções & Ferlig
  • projects    - Principais projetos e repositórios
  • whatsapp    - Iniciar conversa direta no WhatsApp (+55 37 99916-5471)
  • cv          - Ver currículo profissional completo
  • clear       - Limpar o terminal
  • confetti    - Celebrar e disparar confetes! 🎉`,
        });
        break;

      case 'about':
        newItems.push({
          type: 'output',
          text: `Saulo Oliveira Moreira
----------------------------------------
Cargo: Analista de Sistemas na FIND SOLUÇÕES
Formação: Sistemas de Informação (6º Período - Formatura 12/2026)
Instituição: Faculdade Anhanguera de Divinópolis
Foco: Análise de Requisitos, Eficiência Operacional, Integração de Dados & Código Limpo.`,
        });
        break;

      case 'skills':
        newItems.push({
          type: 'output',
          text: `[STACK TÉCNICA PRINCIPAL]:
  ✓ Linguagens: Python (Automação, Scripts, FastAPI), Java (POO, MVC, JPA), JavaScript, TypeScript
  ✓ Banco de Dados: MySQL (Modelagem relacional, consultas avançadas, integridade, stored procedures)
  ✓ Análise de Sistemas: Levantamento de requisitos, diagramas UML, modelagem de processos, suporte e treinamento
  ✓ Infraestrutura: Redes de computadores, TCP/IP, cabeamento, manutenção elétrica e hardware
  ✓ Frontend: React, Vue.js, Tailwind CSS, Vite`,
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
| Python & Automação        | Avançado    | Backend / Dados     |
| MySQL & Modelagem         | Avançado    | Banco de Dados      |
| Java (POO & Lógica)       | Sólido      | Backend             |
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
Repositórios e projetos em destaque na seção de Projetos abaixo:
1. Requisitos & ERP Ops System (FIND Soluções Architecture)
2. Python Data Integrator & SQL Pipeline
3. Java Core Enterprise Suite (POO & JDBC)
4. Infra & Network Connectivity Monitor`,
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
          text: 'Abrindo visualizador de Currículo...',
        });
        if (onOpenResume) onOpenResume();
        break;

      case 'confetti':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        newItems.push({
          type: 'output',
          text: '🎉 Sucesso! Parabéns pelo bom gosto ao visitar o portfólio de Saulo!',
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
      runCommand();
    }
  };

  const quickCommands = ['help', 'sql', 'skills', 'about', 'confetti'];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19] shadow-2xl backdrop-blur-xl">
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

      {/* Terminal Body */}
      <div className="h-80 overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2 selection:bg-emerald-500 selection:text-slate-950">
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
              <pre className="whitespace-pre-wrap text-slate-400 pl-4 border-l-2 border-slate-800/80 my-1">
                {item.text}
              </pre>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Bar */}
      <div className="flex items-center gap-2 border-t border-slate-800 bg-slate-900/60 px-4 py-2.5">
        <span className="font-mono text-xs sm:text-sm text-emerald-400 font-bold">saulo@dev:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite um comando (ex: help, sql, skills, confetti)..."
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
