import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (msg) => {
    const textToSend = msg || customMsg || 'Olá Saulo, vi seu portfólio profissional e gostaria de conversar!';
    window.open(`https://wa.me/5537999165471?text=${encodeURIComponent(textToSend)}`, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Drawer / Bubble */}
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-4 backdrop-blur-xl animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <MessageCircle className="h-4 w-4 fill-current" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Saulo Oliveira</h4>
                <p className="text-[10px] text-emerald-400 font-mono">Online para contato</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Balloon */}
          <div className="my-3 rounded-xl bg-slate-800/80 p-3 text-xs text-slate-200 leading-relaxed border border-slate-700/50">
            Olá! 👋 Como posso te ajudar hoje? Clique abaixo para abrir o chat diretamente no WhatsApp.
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5 mb-3">
            <button
              onClick={() => sendWhatsApp('Olá Saulo! Tenho uma proposta para Analista de Sistemas.')}
              className="w-full text-left rounded-lg bg-slate-800/40 hover:bg-slate-800 px-2.5 py-1.5 text-[11px] text-slate-300 transition-colors border border-slate-700/30 truncate"
            >
              💼 Oportunidade profissional
            </button>
            <button
              onClick={() => sendWhatsApp('Olá Saulo! Gostaria de tirar dúvidas sobre seus projetos.')}
              className="w-full text-left rounded-lg bg-slate-800/40 hover:bg-slate-800 px-2.5 py-1.5 text-[11px] text-slate-300 transition-colors border border-slate-700/30 truncate"
            >
              🚀 Dúvidas sobre projetos
            </button>
          </div>

          {/* Input & Send */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              onClick={() => sendWhatsApp()}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-400 p-2 text-slate-950 transition-colors"
              title="Enviar via WhatsApp"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 hover:bg-emerald-400 transition-all duration-300 focus:outline-none"
        aria-label="Abrir conversa no WhatsApp"
      >
        {/* Unread indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
          1
        </span>

        {/* Ambient Ring */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-60 animate-ping pointer-events-none" />

        <MessageCircle className="h-7 w-7 fill-current" />
      </button>
    </div>
  );
}
