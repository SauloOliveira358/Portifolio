import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, ExternalLink, User } from 'lucide-react';
import { fireEpicConfetti } from '../utils/confetti';

export default function FloatingWhatsApp({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual do Saulo. Como posso te ajudar a conhecer o trabalho dele hoje?',
      time: 'Agora',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    { label: '💼 O que faz na FIND Soluções?', query: 'find' },
    { label: '🎓 Período e Faculdade?', query: 'estudo' },
    { label: '⚡ Principais tecnologias?', query: 'stack' },
    { label: '📂 Projetos em destaque?', query: 'projetos' },
    { label: '📱 WhatsApp direto?', query: 'whatsapp' },
  ];

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

    // Generate intelligent instant reply
    setTimeout(() => {
      let botResponse = '';
      const lower = query.toLowerCase();

      if (lower.includes('find') || lower.includes('trabalho') || lower.includes('experiência') || lower.includes('cargo') || lower.includes('atuação')) {
        botResponse = 'Na FIND SOLUÇÕES (desde Agosto/2025), o Saulo atua como Analista de Sistemas! Ele é responsável pelo levantamento detalhado de requisitos, mapeamento e alinhamento com regras de negócio, treinamentos operacionais e suporte de missão crítica.';
      } else if (lower.includes('estudo') || lower.includes('faculdade') || lower.includes('periodo') || lower.includes('período') || lower.includes('formação')) {
        botResponse = 'O Saulo está no 8º período de Sistemas de Informação na Faculdade Anhanguera de Divinópolis - MG, com previsão de formatura para Dezembro de 2026.';
      } else if (lower.includes('stack') || lower.includes('tecnologia') || lower.includes('linguagem') || lower.includes('habilidade')) {
        botResponse = 'A stack técnica principal do Saulo engloba: Python (Flask, Automação), Java (Spring Boot, POO, JDBC), Bancos de Dados MySQL e PostgreSQL (com PLpgSQL e modelagem avançada), Redes de Computadores / Infraestrutura e Frontend moderno com React e Tailwind!';
      } else if (lower.includes('projeto') || lower.includes('github') || lower.includes('bela') || lower.includes('medflow') || lower.includes('salpay')) {
        botResponse = 'Entre os projetos reais no GitHub do Saulo (@SauloOliveira358) destacam-se: Bela Busca (ElaServices), MedFlow (sistema hospitalar com proteção contra Race Conditions), Dashboard Comercial Aurora (Python/Postgres), Salpay (controle de gastos em Java) e o jogo Indiana Jones 2D!';
      } else if (lower.includes('cv') || lower.includes('curriculo') || lower.includes('currículo') || lower.includes('pdf')) {
        botResponse = 'Você pode visualizar e imprimir o currículo completo de 1 página clicando no botão "Currículo Profissional" no topo do site!';
      } else if (lower.includes('whatsapp') || lower.includes('telefone') || lower.includes('contato') || lower.includes('numero') || lower.includes('número')) {
        botResponse = 'O WhatsApp direto do Saulo é (37) 99916-5471. Você pode clicar no botão verde abaixo para abrir a conversa instantaneamente!';
      } else if (lower.includes('olá') || lower.includes('oi') || lower.includes('boa') || lower.includes('opa')) {
        botResponse = 'Olá! Que bom ter você aqui! Fique à vontade para perguntar sobre as experiências, projetos, formação ou mandar uma mensagem no WhatsApp do Saulo!';
      } else {
        botResponse = `Legal! Para conversar diretamente sobre "${query}", que tal falarmos diretamente no WhatsApp do Saulo pelo número (37) 99916-5471? Ele responde com rapidez!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const openWhatsAppDirect = () => {
    fireEpicConfetti();
    window.open('https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20estava%20conversando%20com%20o%20assistente%20no%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20com%20voc%C3%AA!', '_blank');
  };

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
                <p className="text-[10px] text-slate-400">Assistente do Portfólio</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Flow Area */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-[#080d1a]/50 text-xs">
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
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-slate-900/70 text-right' : 'text-slate-500'
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
                onClick={() => handleSendMessage(q.label)}
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
                placeholder="Pergunte algo sobre o Saulo..."
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
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/20 to-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 py-1.5 text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>Chamar Saulo no WhatsApp ((37) 99916-5471)</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

        </div>
      </div>

      {/* Floating Trigger Button with Ping Effect */}
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
    </div>
  );
}
