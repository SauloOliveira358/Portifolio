# ⚡ Portfólio Profissional de Saulo Oliveira Moreira

> **Analista de Sistemas @ FIND SOLUÇÕES • Desenvolvedor Python, Java, MySQL & Web**  
> Graduando em Sistemas de Informação (Faculdade Anhanguera de Divinópolis - 2026)

Este projeto é um portfólio de alta fidelidade visual e técnica, inspirado nos melhores componentes modernos do [Vue Bits](https://vue-bits.dev/), [React Bits](https://reactbits.dev/) e na estética high-tech da [Netlify](https://www.netlify.com/).

---

## 🚀 Destaques & Recursos Implementados

1. **Partículas & Malha Interativa em Canvas 2D (`InteractiveBackground.jsx`)**:
   - Rede de nós e constelações reativas ao movimento do mouse com taxa de 60 FPS e baixo consumo de CPU.
2. **Spotlight Cards com Tracking de Cursor (`SpotlightCard.jsx`)**:
   - Componente assinatura do Vue-Bits / React-Bits: ilumina bordas e interior do card acompanhando as coordenadas exatas do cursor do visitante.
3. **Efeito Cyber Decrypted Text (`DecryptedText.jsx`)**:
   - Decodificação animada estilo Matrix ao carregar o título e reativada ao passar o mouse.
4. **Terminal CLI Interativo (`TerminalPlayground.jsx`)**:
   - Console de desenvolvedor funcional no navegador (`saulo@divinopolis-devbox:~`).
   - Comandos interativos: `help`, `skills`, `sql`, `experience`, `projects`, `whatsapp`, `cv`, `confetti`, `clear`.
5. **Bento Grid Modular (`BentoGrid.jsx`)**:
   - Layout modular que apresenta a atuação na **FIND SOLUÇÕES**, graduação na **Anhanguera**, domínio técnico e base sólida em infraestrutura.
6. **Showcase de Projetos com Filtros (`ProjectsSection.jsx`)**:
   - Filtros por categoria (Sistemas, Python, Java/MySQL, Infraestrutura) com links diretos para o GitHub de Saulo (`SauloOliveira358`).
7. **Linha do Tempo de Carreira (`ExperienceTimeline.jsx`)**:
   - Trajetória com marcos profissionais reais (FIND SOLUÇÕES, Ferlig Ferro Liga Ltda e Faculdade Anhanguera).
8. **Matriz de Habilidades & Radar de Domínio (`SkillsMatrix.jsx`)**:
   - Barras graduadas para Análise de Requisitos, Backend Python/Java, Banco de Dados MySQL e Redes de Computadores.
9. **Integração Direta com WhatsApp & Formulário Dinâmico (`ContactSection.jsx` e `FloatingWhatsApp.jsx`)**:
   - Botão flutuante de WhatsApp com badge de notificação.
   - Disparo direto para `+55 (37) 99916-5471` com mensagens pré-formatadas.
   - Cópia com 1 clique do e-mail (`saulooliveiram358@gmail.com`) com feedback visual.
10. **Currículo Completo Modal (`ResumeModal.jsx`)**:
    - Visualizador interativo em tela cheia com botão para **Imprimir ou Salvar em PDF** formatado para RHs e recrutadores.
11. **Configuração Pronta para Deploy no Netlify (`netlify.toml`)**:
    - Regras de build e redirecionamento SPA para colocar no ar em 1 clique.

---

## 🛠️ Tecnologias Utilizadas

- **React 18**
- **Vite 6** (Build ultrarrápido)
- **Tailwind CSS 3** (Design system customizado em tons de esmeralda, ciano e grafite espacial)
- **Lucide Icons**
- **Canvas API 2D** (Efeitos de partículas fluidas)
- **Canvas Confetti** (Microinterações comemorativas)

---

## 💻 Como Rodar Localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. **Gerar build de produção**:
   ```bash
   npm run build
   ```
   Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 🌐 Como Publicar no Netlify (Passo a Passo)

### Opção 1: Conectar com o GitHub (Recomendado)
1. Crie um novo repositório no seu GitHub: [github.com/new](https://github.com/new) com o nome `portfolio`.
2. No terminal desta pasta, inicialize o git e envie o código:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio profissional completo com componentes vue-bits e netlify ready"
   git branch -M main
   git remote add origin https://github.com/SauloOliveira358/portfolio.git
   git push -u origin main
   ```
3. Acesse [app.netlify.com](https://app.netlify.com/) e faça login.
4. Clique em **"Add new site"** ➔ **"Import an existing project"** ➔ Selecione **GitHub**.
5. Escolha o repositório `portfolio`. O Netlify já lerá automaticamente o arquivo `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Clique em **"Deploy site"**! Em menos de 1 minuto seu portfólio estará online com certificado SSL (HTTPS) gratuito.

### Opção 2: Deploy Direto (Arrastar e Soltar)
1. Execute `npm run build` no seu computador.
2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arraste a pasta `dist` gerada diretamente para a tela do navegador. Pronto!

---

## 📞 Contatos de Saulo Oliveira Moreira
- **WhatsApp:** [(37) 99916-5471](https://wa.me/5537999165471)
- **E-mail:** [saulooliveiram358@gmail.com](mailto:saulooliveiram358@gmail.com)
- **LinkedIn:** [linkedin.com/in/saulo-oliveira-348a30356](https://www.linkedin.com/in/saulo-oliveira-348a30356)
- **GitHub:** [github.com/SauloOliveira358](https://github.com/SauloOliveira358)
