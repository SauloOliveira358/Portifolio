import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ExternalLink, ArrowRight, FolderGit2, Sparkles, Minus } from 'lucide-react';
import { fireEpicConfetti } from '../utils/confetti';

export const PLANET_DIALOGS = {
  jupiter: {
    id: 'jupiter',
    name: 'Júpiter',
    subtitle: 'O Núcleo / Backend',
    emoji: '🪐',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    botMessage: 'Bip, bip! 🪐 Você escaneou Júpiter. A gravidade aqui é forte, assim como o Backend do Saulo. É neste núcleo que ele constrói APIs robustas e seguras usando Python (FastAPI) e Java (Spring Boot). Qual motor você quer inspecionar primeiro?',
    options: [
      {
        id: 'belabusca_api',
        label: 'Ver API do BelaBusca',
        reply: 'O BelaBusca (projeto-ela) conta com arquitetura de serviços em Python e Node.js para intermediação e busca de serviços profissionais, busca filtrada dinâmica e autenticação segura.',
        github: 'https://github.com/SauloOliveira358/projeto-ela',
        githubLabel: 'Acessar API do BelaBusca no GitHub',
      },
      {
        id: 'vendas_bi_backend',
        label: 'Ver Backend do Projeto Vendas BI',
        reply: 'O backend do Projeto Vendas BI e Rede Aurora foi estruturado em Flask (Python) com PostgreSQL avançado (PLpgSQL, triggers e procedures de auditoria para KPIs de vendas e ticket médio).',
        github: 'https://github.com/SauloOliveira358/projeto-comercial',
        githubSecondary: 'https://github.com/SauloOliveira358/projeto_vendas',
        githubLabel: 'Ver Backend de Vendas BI no GitHub',
      },
      {
        id: 'close_jupiter',
        label: 'Voltar à Galáxia',
        isClose: true,
      },
    ],
  },
  saturn: {
    id: 'saturn',
    name: 'Saturno',
    subtitle: 'A Interface / Frontend',
    emoji: '🪐',
    badgeColor: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
    botMessage: 'Sinal captado! 🪐 Bem-vindo aos anéis de Saturno. Esta é a camada visual (Frontend), onde a mágica da interação acontece. O Saulo utiliza Angular 19 e React para criar interfaces bonitas e fluidas para os usuários. Quer explorar as telas que ele construiu?',
    options: [
      {
        id: 'medflow_ui',
        label: 'Ver Interface do MedFlow (React)',
        reply: 'O MedFlow possui uma interface moderna desenvolvida em React para gestão hospitalar e agendamento de consultas em tempo real, com prevenção visual de concorrência e design limpo.',
        github: 'https://github.com/SauloOliveira358/MedFlow',
        githubLabel: 'Ver UI do MedFlow no GitHub',
      },
      {
        id: 'jogo_senha_ui',
        label: 'Ver UI do Jogo da Senha',
        reply: 'O Jogo da Senha e os projetos de games do Saulo (como Indiana Jones 2D e Birdzin) utilizam Canvas a 60 FPS, gerenciamento de estado reativo, sons dinâmicos e design retrô moderno.',
        github: 'https://github.com/SauloOliveira358/idianajhones',
        githubSecondary: 'https://github.com/SauloOliveira358/Show-do-Android',
        githubLabel: 'Ver Projetos de Jogos & UI no GitHub',
      },
      {
        id: 'close_saturn',
        label: 'Continuar voo',
        isClose: true,
      },
    ],
  },
  mars: {
    id: 'mars',
    name: 'Marte',
    subtitle: 'Estrutura / Banco de Dados',
    emoji: '🔴',
    badgeColor: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    botMessage: 'Pouso em Marte autorizado! 🔴 Terreno denso e focado em Dados. Aqui o Saulo constrói fundações sólidas com PostgreSQL, MySQL e Supabase. Ele é especialista em modelagem relacional. Quer escavar as estruturas de dados dos projetos?',
    options: [
      {
        id: 'modelagem_projeto_vendas',
        label: 'Modelagem do Projeto Vendas (PLpgSQL)',
        reply: 'O Projeto Vendas explora modelagem relacional de alta performance no PostgreSQL, com estruturação de schemas normalizados, procedures em PLpgSQL, triggers de integridade e auditoria de transações comerciais.',
        github: 'https://github.com/SauloOliveira358/projeto_vendas',
        githubSecondary: 'https://github.com/SauloOliveira358/projeto-comercial',
        githubLabel: 'Ver Modelagem do Projeto Vendas no GitHub',
      },
      {
        id: 'banco_belabusca',
        label: 'Banco de Dados do BelaBusca',
        reply: 'Modelagem relacional com tabelas de usuários, prestadores de serviços, categorias, agendamentos com validação temporal e chaves estrangeiras com índices otimizados.',
        github: 'https://github.com/SauloOliveira358/projeto-ela',
        githubLabel: 'Ver Database do BelaBusca no GitHub',
      },
      {
        id: 'close_mars',
        label: 'Explorar outro planeta',
        isClose: true,
      },
    ],
  },
  earth: {
    id: 'earth',
    name: 'Terra',
    subtitle: 'O Hub / Sistemas Completos',
    emoji: '🌍',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    botMessage: 'Bem-vindo à Terra! 🌍 É aqui que o código vira solução para o mundo real. Neste planeta, você tem uma visão Full-Stack de sistemas completos que já estão gerando impacto. Qual ecossistema você quer abrir?',
    options: [
      {
        id: 'overview_belabusca',
        label: 'Visão Geral: BelaBusca',
        reply: 'O BelaBusca é uma plataforma Full-Stack completa: frontend moderno e responsivo em React integrado a APIs de agendamento e gerenciamento de prestadores de serviços especializados.',
        github: 'https://github.com/SauloOliveira358/projeto-ela',
        githubLabel: 'Acessar Repositório do BelaBusca',
      },
      {
        id: 'overview_medflow',
        label: 'Visão Geral: MedFlow (Hospitalar)',
        reply: 'O MedFlow é um sistema hospitalar Full-Stack robusto: frontend reativo em React conectado a backend em Spring Boot (Java) e PostgreSQL/Supabase, com proteção contra Race Condition e conflitos de agenda médica.',
        github: 'https://github.com/SauloOliveira358/MedFlow',
        githubLabel: 'Acessar Repositório do MedFlow',
      },
      {
        id: 'github_profile',
        label: 'Acessar o GitHub do Saulo',
        reply: 'Você pode acessar o perfil completo do Saulo no GitHub para explorar todos os repositórios públicos, projetos em Java, Python, React, SQL e games!',
        github: 'https://github.com/SauloOliveira358',
        githubLabel: 'Abrir GitHub de Saulo (@SauloOliveira358)',
      },
    ],
  },
  moon: {
    id: 'moon',
    name: 'Lua',
    subtitle: 'Suporte / Infra e Ferramentas',
    emoji: '🌙',
    badgeColor: 'border-sky-400/40 bg-sky-500/10 text-sky-300',
    botMessage: 'Explorando a superfície lunar! 🌙 A Lua orbita os planetas para dar suporte. Este é o ambiente de Infraestrutura e DevOps: Git, AWS, Linux e Terminais. Quer dar uma olhada nas ferramentas que mantêm tudo rodando nos bastidores?',
    options: [
      {
        id: 'stack_infra',
        label: 'Ver Stack de Infraestrutura',
        reply: 'Infraestrutura completa: 1) Controle de versão com Git & GitHub; 2) Servidores Linux (Debian/Ubuntu, comandos shell); 3) Nuvem AWS e Docker; 4) Redes de computadores, TCP/IP e cabeamento estruturado com experiência prática em hardware industrial.',
        github: 'https://github.com/SauloOliveira358',
        githubLabel: 'Ver Repositórios & Configurações',
      },
    ],
  },
};

export default function FloatingWhatsApp({
  onOpenResume,
  isCleanMode = false,
  planetTrigger = null,
  onClosePlanet = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual do Saulo. Pergunte qualquer coisa sobre as experiências dele, projetos do GitHub, faculdade ou clique nos planetas para uma jornada cósmica!',
      time: 'Agora',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const messagesEndRef = useRef(null);
  const lastHandledTriggerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle incoming planet click triggers
  useEffect(() => {
    if (!planetTrigger || !planetTrigger.id) return;

    // Previne repetição do mesmo clique
    if (
      lastHandledTriggerRef.current &&
      lastHandledTriggerRef.current.id === planetTrigger.id &&
      lastHandledTriggerRef.current.timestamp === planetTrigger.timestamp
    ) {
      return;
    }
    lastHandledTriggerRef.current = planetTrigger;

    const dialog = PLANET_DIALOGS[planetTrigger.id];
    if (!dialog) return;

    setIsOpen(true);
    setMessages((prev) => {
      // Se a última mensagem já for a introdução desse mesmo planeta, não adiciona novamente
      const last = prev[prev.length - 1];
      if (last && last.isPlanetIntro && last.planet?.id === dialog.id) {
        return prev;
      }
      return [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          isPlanetIntro: true,
          planet: dialog,
          text: dialog.botMessage,
          options: dialog.options,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ];
    });
  }, [planetTrigger]);

  const quickQuestions = [
    { label: '💼 Experiência & Dia a dia', query: 'experiência' },
    { label: '🚀 Emprego & Contratação', query: 'emprego' },
    { label: '📂 Projetos Reais no GitHub', query: 'projetos' },
    { label: '⚡ Stack & Tecnologias', query: 'stack' },
    { label: '🎓 Faculdade & Formação', query: 'faculdade' },
    { label: '📄 Currículo Profissional', query: 'currículo' },
    { label: '📱 WhatsApp Direto', query: 'whatsapp' },
  ];

  // Varied, natural invitations to WhatsApp
  const whatsappInvites = [
    'O Saulo responde rapidinho no WhatsApp pelo (37) 99916-5471. Que tal dar um alô por lá agora?',
    'Se quiser alinhar detalhes mais a fundo, uma mensagem direta no WhatsApp dele ((37) 99916-5471) é o caminho mais rápido!',
    'Para trocar uma ideia sobre oportunidades ou projetos, você pode chamar o Saulo no WhatsApp clicando no botão abaixo.',
    'O Saulo adora bater um papo sobre tecnologia e novos desafios. Mande um "oi" para ele no WhatsApp!',
    'Caso queira agendar uma entrevista ou tirar dúvidas técnicas, o canal mais direto é o WhatsApp dele: (37) 99916-5471.',
    'Muito bacana! O Saulo está 100% aberto a novas oportunidades profissionais. Você pode chamá-lo no WhatsApp a qualquer momento.',
  ];

  const getInvite = (index) => {
    return whatsappInvites[index % whatsappInvites.length];
  };

  const handleOptionClick = (option, planet) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: option.label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    if (option.isClose) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: '🚀 Retornando à exploração da galáxia! Clique em outro planeta quando quiser inspecioná-lo.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsTyping(false);
        setTimeout(() => {
          setIsOpen(false);
          if (onClosePlanet) onClosePlanet();
        }, 700);
      }, 350);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          isProjectResponse: true,
          text: option.reply,
          github: option.github,
          githubSecondary: option.githubSecondary,
          githubLabel: option.githubLabel,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    const currentCount = interactionCount;
    setInteractionCount((prev) => prev + 1);

    setTimeout(() => {
      let mainText = '';
      const lower = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const invite = getInvite(currentCount);

      // 1. Emprego, contratação, vagas, pretensão, regime
      if (
        lower.includes('emprego') || lower.includes('vaga') || lower.includes('contrat') ||
        lower.includes('salario') || lower.includes('pretensao') || lower.includes('proposta') ||
        lower.includes('oportunidade') || lower.includes('trabalhar') || lower.includes('entrevista') ||
        lower.includes('rh') || lower.includes('recrutad') || lower.includes('remoto') ||
        lower.includes('hibrido') || lower.includes('presencial') || lower.includes('clt') ||
        lower.includes('pj') || lower.includes('estagio') || lower.includes('junior') ||
        lower.includes('pleno') || lower.includes('disponibilidade')
      ) {
        mainText = `O Saulo está totalmente disponível e aberto a oportunidades profissionais presenciais, híbridas ou 100% remotas para posições de Analista de Sistemas, Desenvolvedor Backend (Python/Java) ou Fullstack. Ele tem perfil proativo, facilidade ágil de aprendizado e compromisso com entregas de alto valor. Para tratar de propostas, pretensão salarial e agendamento de entrevistas: ${invite}`;
      }

      // 2. Experiência na FIND Soluções, rotina, requisitos, suporte
      else if (
        lower.includes('find') || lower.includes('experiencia') || lower.includes('trabalho') ||
        lower.includes('cargo') || lower.includes('atua') || lower.includes('rotina') ||
        lower.includes('dia a dia') || lower.includes('requisito') || lower.includes('levantamento') ||
        lower.includes('suporte') || lower.includes('treinamento') || lower.includes('processo') ||
        lower.includes('eficiencia')
      ) {
        mainText = `Atualmente, o Saulo é Analista de Sistemas na FIND SOLUÇÕES (desde Agosto/2025). O trabalho dele é focado em: 1) Levantamento minucioso de requisitos com clientes e stakeholders; 2) Alinhamento direto das regras de negócio com as entregas de software; 3) Condução de treinamentos técnicos e operacionais; 4) Suporte consultivo N3 para eliminação de gargalos e melhoria contínua dos sistemas. ${invite}`;
      }

      // 3. Ferlig, Elétrica, Hardware e Redes anteriores
      else if (
        lower.includes('ferlig') || lower.includes('eletric') || lower.includes('hardware') ||
        lower.includes('rede') || lower.includes('infra') || lower.includes('manutencao') ||
        lower.includes('anterior') || lower.includes('antigo')
      ) {
        mainText = `Antes da FIND Soluções, o Saulo atuou na Ferlig Ferro Liga Ltda (2022 a 2025) como Eletricista com forte atuação em Informática e TI. Ele cuidava de manutenção elétrica industrial/predial, infraestrutura de redes locais (switches, roteadores, cabeamento) e suporte em microinformática. Isso deu a ele uma base lógica e prática excepcional para entender hardware, conectividade e sistemas de ponta a ponta. ${invite}`;
      }

      // 4. Bela Busca / Projeto Ela
      else if (
        lower.includes('bela busca') || lower.includes('bela') || lower.includes('projeto ela') ||
        lower.includes('projeto-ela') || lower.includes('ela') || lower.includes('elaservices')
      ) {
        mainText = `O projeto "Bela Busca (projeto-ela)" é uma plataforma moderna desenvolvida para busca e agendamento de serviços profissionais especializados. Possui interface moderna em React, busca filtrada dinâmica e arquitetura voltada para facilitar a conexão entre prestadores e clientes. Você pode ver o código no GitHub: github.com/SauloOliveira358/projeto-ela. ${invite}`;
      }

      // 5. MedFlow
      else if (
        lower.includes('medflow') || lower.includes('med') || lower.includes('hospital') ||
        lower.includes('clinica') || lower.includes('concorrencia') || lower.includes('race condition') ||
        lower.includes('double booking')
      ) {
        mainText = `O MedFlow é um dos projetos mais técnicos do Saulo! Trata-se de um sistema hospitalar em React + Spring Boot (Java) e PostgreSQL/Supabase, com foco em resolver o desafio crítico de concorrência simultânea na marcação de consultas (prevenção contra Race Condition e Double Booking de horários). Repositório: github.com/SauloOliveira358/MedFlow. ${invite}`;
      }

      // 6. Dashboard Comercial / Vendas / Rede Aurora
      else if (
        lower.includes('comercial') || lower.includes('venda') || lower.includes('dashboard') ||
        lower.includes('aurora') || lower.includes('plpgsql') || lower.includes('kpi')
      ) {
        mainText = `O Dashboard Comercial (Rede Comercial Aurora) é uma solução web construída em Flask (Python), PostgreSQL e Chart.js para telemetria de vendas, análise de ticket médio e relatórios gerenciais. Além disso, o Saulo desenvolveu o "projeto_vendas" explorando PLpgSQL avançado, triggers e procedures de auditoria. Repositório: github.com/SauloOliveira358/projeto-comercial. ${invite}`;
      }

      // 7. Salpay / Controle de Gastos
      else if (
        lower.includes('salpay') || lower.includes('gasto') || lower.includes('finance') ||
        lower.includes('money')
      ) {
        mainText = `O Salpay é um sistema de controle financeiro e gestão de despesas pessoais/empresariais construído em Java (Spring Boot/POO/JDBC). Ele categoriza gastos, projeta fluxo de caixa mensal e aplica validações contábeis seguras. Código disponível em: github.com/SauloOliveira358/Controle-Gastos. ${invite}`;
      }

      // 8. Indiana Jones / Games
      else if (
        lower.includes('indiana') || lower.includes('jones') || lower.includes('jogo') ||
        lower.includes('game') || lower.includes('birdzin') || lower.includes('android')
      ) {
        mainText = `Na parte de jogos e lógica pura, o Saulo desenvolveu o "Indiana Jones 2D" (jogo de plataforma retrô com física de colisões, alavancas mecânicas e puzzles em JavaScript puro), o "Birdzin" (arcade Canvas a 60 FPS) e o "Show do Android" (game de perguntas e respostas em Java). Dá para testar e ver os códigos no GitHub dele! ${invite}`;
      }

      // 9. Todos os Projetos / GitHub em geral
      else if (lower.includes('projeto') || lower.includes('github') || lower.includes('repo')) {
        mainText = `O Saulo possui diversos projetos no GitHub (@SauloOliveira358). Os principais são: Bela Busca (projeto-ela), MedFlow (controle de concorrência médica), Dashboard Comercial Aurora (Python/Postgres), Salpay (controle financeiro em Java) e o jogo Indiana Jones 2D. Todos com código limpo e arquitetura bem definida. ${invite}`;
      }

      // 10. Faculdade / Período / Formação
      else if (
        lower.includes('faculdade') || lower.includes('facul') || lower.includes('estudo') ||
        lower.includes('periodo') || lower.includes('semestre') || lower.includes('anhanguera') ||
        lower.includes('curso') || lower.includes('formar') || lower.includes('formatura') ||
        lower.includes('si')
      ) {
        mainText = `O Saulo está no 8º período do curso de Bacharelado em Sistemas de Informação na Faculdade Anhanguera de Divinópolis - MG. A formatura está prevista para Dezembro de 2026. Ele estuda tópicos avançados de engenharia de software, modelagem de banco de dados, redes e arquitetura corporativa. ${invite}`;
      }

      // 11. Stack técnica / Linguagens
      else if (
        lower.includes('stack') || lower.includes('tecnologia') || lower.includes('linguagem') ||
        lower.includes('python') || lower.includes('java') || lower.includes('sql') ||
        lower.includes('mysql') || lower.includes('postgres') || lower.includes('react')
      ) {
        mainText = `A stack técnica central do Saulo é muito versátil: 1) Backend: Python (Flask, automação, scripts) e Java (Spring Boot, POO, JDBC); 2) Bancos de Dados: MySQL e PostgreSQL (modelagem relacional, PLpgSQL, queries avançadas e triggers); 3) Infra & Redes: Fundamentos sólidos de TCP/IP e hardware; 4) Frontend: React, JavaScript moderno e Tailwind CSS. ${invite}`;
      }

      // 12. Currículo / CV / PDF
      else if (
        lower.includes('cv') || lower.includes('curriculo') || lower.includes('pdf') ||
        lower.includes('imprimir') || lower.includes('baixar')
      ) {
        mainText = `O currículo profissional completo do Saulo (com foto ampliada, histórico profissional, 8º período da faculdade e links clicáveis) está pronto para download ou impressão em 1 página A4. Basta clicar no botão "Currículo Profissional" no topo do site! ${invite}`;
      }

      // 13. Contato direto / WhatsApp / Telefone
      else if (
        lower.includes('whatsapp') || lower.includes('zap') || lower.includes('telefone') ||
        lower.includes('contato') || lower.includes('numero') || lower.includes('email') ||
        lower.includes('ligar')
      ) {
        mainText = `O canal mais direto e rápido para falar com o Saulo é o WhatsApp dele: (37) 99916-5471. O e-mail profissional é saulooliveiram358@gmail.com. Você pode clicar no botão verde no rodapé deste chat para iniciar uma conversa no WhatsApp agora mesmo!`;
      }

      // 14. Quem é o Saulo / Apresentação
      else if (
        lower.includes('quem e') || lower.includes('quem') || lower.includes('sobre') ||
        lower.includes('perfil') || lower.includes('saulo') || lower.includes('apresenta')
      ) {
        mainText = `Saulo Oliveira Moreira é Analista de Sistemas na FIND SOLUÇÕES e graduando no 8º período de Sistemas de Informação na Anhanguera. Ele combina experiência prática em análise de requisitos de negócio com desenvolvimento em Python, Java e bancos de dados relacionais (MySQL/PostgreSQL), além de excelente comunicação interpessoal. ${invite}`;
      }

      // 15. Saudações
      else if (
        lower.includes('ola') || lower.includes('oi') || lower.includes('bom dia') ||
        lower.includes('boa tarde') || lower.includes('boa noite') || lower.includes('opa') ||
        lower.includes('salve') || lower.includes('tudo bem') || lower.includes('blz')
      ) {
        mainText = `Olá! Tudo ótimo por aqui! Estou à disposição para tirar qualquer dúvida sobre a carreira do Saulo, os projetos reais do GitHub dele, a formação no 8º período ou oportunidades de vagas. ${invite}`;
      }

      // 16. Fallbacks dinâmicos inteligentes
      else {
        const fallbacks = [
          `Entendido perfeitamente! Para falar mais a fundo sobre "${query}" ou agendar uma conversa, você pode mandar uma mensagem rápida no WhatsApp do Saulo pelo (37) 99916-5471.`,
          `Excelente ponto! O Saulo tem facilidade em discutir esse assunto e alinhar expectativas técnicas. Que tal dar um toque no WhatsApp dele no (37) 99916-5471?`,
          `Muito bom você ter perguntado isso! O Saulo costuma responder os contatos do portfólio no WhatsApp em questão de minutos. O número direto é (37) 99916-5471!`,
        ];
        mainText = fallbacks[currentCount % fallbacks.length];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: mainText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const openWhatsAppDirect = () => {
    fireEpicConfetti();
    window.open('https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20estava%20conversando%20com%20o%20assistente%20no%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20com%20voc%C3%AA!', '_blank');
  };

  // Se estiver em modo limpo e o bot estiver fechado, NÃO renderiza nada na tela (fica 100% limpo)!
  if (isCleanMode && !isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Chat Window with Smooth Transitions */}
      <div
        className={`transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none absolute'
        }`}
      >
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-sky-500/20 text-emerald-400 border border-emerald-500/30">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  SauloBot
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">
                    Online
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Assistente Virtual Inteligente</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onClosePlanet) onClosePlanet();
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                title="Fechar ou minimizar o chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#080d1a]/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  {/* Planet Header Badge if intro */}
                  {msg.isPlanetIntro && msg.planet && (
                    <div className="mb-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wide ${msg.planet.badgeColor}`}>
                        <span>{msg.planet.emoji}</span>
                        <span>{msg.planet.name.toUpperCase()}</span>
                        <span className="opacity-60">•</span>
                        <span>{msg.planet.subtitle}</span>
                      </span>
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Interactive Response Buttons for Planets */}
                  {msg.options && (
                    <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-700/60">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/90 mb-1">
                        Opções de resposta:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {msg.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionClick(opt, msg.planet)}
                            className={`w-full text-left rounded-xl px-3 py-2 text-xs font-medium transition-all flex items-center justify-between gap-2 border shadow-sm ${
                              opt.isClose
                                ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700/50'
                                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 border-emerald-500/30 hover:border-emerald-500/60'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {opt.isClose ? (
                              <X className="h-3 w-3 shrink-0 opacity-60" />
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct GitHub Link Card */}
                  {msg.github && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 space-y-1.5">
                      <a
                        href={msg.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => fireEpicConfetti()}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/20"
                      >
                        <FolderGit2 className="h-4 w-4" />
                        <span>{msg.githubLabel || 'Ver Repositório no GitHub'}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {msg.githubSecondary && (
                        <a
                          href={msg.githubSecondary}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => fireEpicConfetti()}
                          className="block text-center text-[10px] font-mono text-emerald-400 hover:underline"
                        >
                          🔗 Ver também repositório secundário
                        </a>
                      )}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-slate-900/70 text-right font-medium' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-slate-800/90 px-3 py-2 border border-slate-700/60 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="p-2 border-t border-slate-800 bg-slate-950/60 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.query)}
                className="whitespace-nowrap rounded-lg bg-slate-800/70 hover:bg-slate-800 px-2.5 py-1 text-[10px] text-slate-300 border border-slate-700/50 hover:text-emerald-300 transition-colors shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input & WhatsApp Action Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-900 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte ou clique nos botões acima..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 p-2 text-slate-950 transition-colors"
                title="Enviar pergunta"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Direct WhatsApp Callout */}
            <button
              onClick={openWhatsAppDirect}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/20 to-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 py-2 text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>Chamar Saulo no WhatsApp ((37) 99916-5471)</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

        </div>
      </div>

      {/* Floating Trigger Button (Apenas visível quando NÃO estiver no modo limpo com o chat fechado) */}
      {!isCleanMode && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 hover:bg-emerald-400 transition-all duration-300 focus:outline-none"
          aria-label="Abrir assistente e WhatsApp"
        >
          {/* Unread indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
            1
          </span>

          {/* Ambient Ring */}
          <span className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-60 animate-ping pointer-events-none" />

          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7 fill-current" />}
        </button>
      )}
    </div>
  );
}
