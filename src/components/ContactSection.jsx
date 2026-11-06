import React, { useState } from 'react';
import SpotlightCard from './SpotlightCard';
import { Mail, MessageCircle, Phone, Linkedin, Github, Send, Copy, Check, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { fireEpicConfetti } from '../utils/confetti';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'saulooliveiram358@gmail.com';
  const phone = '37999165471';
  const formattedPhone = '(37) 99916-5471';
  const whatsappUrl = `https://wa.me/5537999165471?text=Ol%C3%A1%20Saulo,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger epic celebration
    fireEpicConfetti();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Auto open WhatsApp with the customized form message if user wishes
      const msg = encodeURIComponent(
        `Olá Saulo! Meu nome é ${formData.name} (${formData.email}).\nAssunto: ${formData.subject}\nMensagem: ${formData.message}`
      );
      window.open(`https://wa.me/5537999165471?text=${msg}`, '_blank');
    }, 800);
  };

  return (
    <section id="contato" className="py-20 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>VAMOS CONVERSAR?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Entre em Contato Direto
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Estou sempre aberto a propostas desafiadoras, networking e novos projetos de tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Fast Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <SpotlightCard
              className="p-6 border-emerald-500/30 group"
              spotlightColor="rgba(16, 185, 129, 0.25)"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">WhatsApp Direto</h3>
                    <p className="text-xs text-slate-400">Resposta ágil em minutos</p>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-300">
                Número:{' '}
                <span className="font-mono text-white font-semibold">{formattedPhone}</span>
              </p>

              <div className="mt-4 flex gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Chamar no WhatsApp</span>
                </a>
                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Copiar número de telefone"
                >
                  {copiedPhone ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </SpotlightCard>

            {/* Email Card */}
            <SpotlightCard
              className="p-6 group"
              spotlightColor="rgba(56, 189, 248, 0.25)"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-base font-bold text-white">E-mail Profissional</h3>
                  <p className="text-xs text-slate-400 truncate">{email}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${email}`}
                  className="flex-1 text-center rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-medium text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-sky-400" />
                  <span>Enviar E-mail</span>
                </a>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                  title="Copiar endereço de e-mail"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-xs">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </SpotlightCard>

            {/* LinkedIn & GitHub Horizontal Split */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500/40 hover:bg-slate-800/60 transition-all flex flex-col items-center justify-center text-center group"
              >
                <Linkedin className="h-6 w-6 text-[#38bdf8] group-hover:scale-110 transition-transform mb-2" />
                <span className="text-xs font-bold text-white">LinkedIn</span>
                <span className="text-[10px] text-slate-400">Conectar perfil</span>
              </a>

              <a
                href="https://github.com/SauloOliveira358"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-600 hover:bg-slate-800/60 transition-all flex flex-col items-center justify-center text-center group"
              >
                <Github className="h-6 w-6 text-slate-300 group-hover:scale-110 transition-transform mb-2" />
                <span className="text-xs font-bold text-white">GitHub</span>
                <span className="text-[10px] text-slate-400">Ver códigos</span>
              </a>
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-400 font-mono">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Divinópolis - Minas Gerais, Brasil • Disponível Remoto / Híbrido</span>
            </div>

          </div>

          {/* Right Column: Interactive Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard
              className="p-6 sm:p-8"
              spotlightColor="rgba(16, 185, 129, 0.18)"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Envie uma Mensagem</h3>
                  <p className="text-xs text-slate-400">Preencha os campos para iniciar o contato diretamente comigo.</p>
                </div>
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>

              {submitted ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3 animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Mensagem Preparada com Sucesso!</h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    O WhatsApp foi inicializado com os dados preenchidos para envio imediato. Obrigado pelo contato, responderei o mais breve possível!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Seu Nome *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: João da Silva"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Seu E-mail *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: joao@empresa.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Assunto</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex: Oportunidade para Analista de Sistemas / Projeto"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Mensagem *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descreva detalhes sobre sua proposta, projeto ou dúvida..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3.5 text-xs sm:text-sm font-bold text-slate-950 transition-all hover:scale-[1.01] shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Enviando dados...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Enviar Mensagem & Abrir WhatsApp</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
}
