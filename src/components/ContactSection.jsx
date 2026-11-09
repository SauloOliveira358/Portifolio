import React, { useState } from 'react';
import SpotlightCard from './SpotlightCard';
import { Mail, MessageCircle, Phone, Linkedin, Github, Copy, Check, MapPin, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { fireEpicConfetti, fireSupernova } from '../utils/confetti';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  return (
    <section id="contato" className="py-20 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 mb-3">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>VAMOS CONVERSAR?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Canais de Contato Direto
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Fale diretamente comigo pelo WhatsApp, e-mail ou redes profissionais. Respondo com rapidez!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* WhatsApp Direct Card (Destaque Principal) */}
          <SpotlightCard
            delay={0}
            className="p-6 sm:p-8 border-emerald-500/30 group flex flex-col justify-between"
            spotlightColor="rgba(16, 185, 129, 0.28)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">WhatsApp Direto</h3>
                    <p className="text-xs text-emerald-400 font-mono">Resposta ágil em minutos</p>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Ideal para contato imediato sobre vagas, oportunidades de projetos, consultoria ou networking.
              </p>

              <div className="mt-3 text-sm text-slate-300 font-mono">
                Número: <span className="text-white font-bold">{formattedPhone}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2 pt-4 border-t border-slate-800/80">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => fireSupernova({ origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } })}
                className="flex-1 text-center rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 px-4 py-3 text-xs font-extrabold text-slate-950 transition-all hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-emerald-200/90 hover:border-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4 fill-slate-950" />
                <span>Conversar no WhatsApp</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => copyToClipboard(phone, 'phone')}
                className="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700/80 px-3.5 py-3 text-slate-300 hover:text-white hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center"
                title="Copiar número de telefone"
              >
                {copiedPhone ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </SpotlightCard>

          {/* Email Card */}
          <SpotlightCard
            delay={120}
            className="p-6 sm:p-8 group flex flex-col justify-between"
            spotlightColor="rgba(56, 189, 248, 0.25)"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">E-mail Profissional</h3>
                  <p className="text-xs text-sky-400 font-mono truncate max-w-[220px] sm:max-w-none">{email}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Envie propostas formais, documentações técnicas ou convites para processos seletivos.
              </p>
            </div>

            <div className="mt-6 flex gap-2 pt-4 border-t border-slate-800/80">
              <a
                href={`mailto:${email}`}
                className="flex-1 text-center rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-sky-400 px-4 py-3 text-xs font-semibold text-white hover:text-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                <span>Enviar E-mail Agora</span>
              </a>

              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700/80 px-3.5 py-3 text-xs font-medium text-slate-300 hover:text-white hover:border-sky-400 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                title="Copiar endereço de e-mail"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </SpotlightCard>

          {/* LinkedIn Card */}
          <SpotlightCard
            delay={200}
            className="p-6 group flex flex-col justify-between"
            spotlightColor="rgba(56, 189, 248, 0.2)"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0077b5]/20 text-[#38bdf8] border border-[#0077b5]/30 group-hover:scale-110 transition-transform">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">LinkedIn Oficial</h3>
                <p className="text-xs text-slate-400">Rede profissional & conexões</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Acesse o histórico completo de recomendações, formação acadêmica e conexões no ecossistema de TI.
            </p>

            <a
              href="https://www.linkedin.com/in/saulo-oliveira-348a30356"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 rounded-xl border border-slate-700/90 bg-slate-800/90 hover:bg-slate-700/90 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 p-2.5 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Linkedin className="h-4 w-4 text-[#38bdf8]" />
              <span>Conectar no LinkedIn</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </SpotlightCard>

          {/* GitHub Card */}
          <SpotlightCard
            delay={280}
            className="p-6 group flex flex-col justify-between"
            spotlightColor="rgba(168, 85, 247, 0.2)"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">GitHub Repositórios</h3>
                <p className="text-xs text-slate-400 font-mono">@SauloOliveira358</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Explore os códigos-fonte reais dos projetos MedFlow, Bela Busca, Dashboard Comercial, Salpay e jogos 2D.
            </p>

            <a
              href="https://github.com/SauloOliveira358?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 rounded-xl border border-slate-700/90 bg-slate-800/90 hover:bg-slate-700/90 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 p-2.5 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Github className="h-4 w-4 text-purple-400" />
              <span>Ver Todos os Repositórios</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </SpotlightCard>

        </div>

        {/* Location & Availability Banner */}
        <div className="mt-8 rounded-2xl border border-slate-800 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 bg-slate-900/60 p-5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Divinópolis — Minas Gerais, Brasil</div>
              <div className="text-xs text-slate-400">Disponível para atuação Remota, Híbrida ou Presencial</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-emerald-400 font-medium">Pronto para novos desafios</span>
          </div>
        </div>

      </div>
    </section>
  );
}
