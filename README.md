# TATEC

Site institucional da TATEC, empresa de desenvolvimento de sites, sistemas, identidade visual e consultoria em TI.

Versão publicada: https://planctor.github.io/TATEC/

## Como rodar localmente

O site é estático (HTML, CSS e JavaScript puros), sem etapa de build. Os scripts usam ES modules, então é preciso abrir por um servidor; abrir o `index.html` direto no navegador (`file://`) não executa o JavaScript.

```bash
python -m http.server 5174
```

Depois abra http://localhost:5174.

## Estrutura

```
index.html            Página única com todas as seções
privacidade.html      Política de Privacidade e de Cookies (LGPD)
time/                 Uma página de perfil por membro (marcos, lucas-fernandes, lucas-martins)
style.css             Todo o CSS, um arquivo só, dividido por blocos comentados
                      (FONTES, INDEX, HEADER, APRESENTACAO, SERVICOS, EQUIPE,
                      FOOTER, BOTAO, COOKIES, PRIVACIDADE, ANIMACOES)
script.js             Ponto de entrada do JS (importa os módulos de scripts/)
enviar_email.php      Recebe o formulário de contato e envia por e-mail

scripts/
  menuMobile.js       Abre e fecha o menu no celular (Esc e clique fora também fecham)
  showButton.js       Fixa o menu e mostra o "voltar ao topo" quando o topo sai da tela
  cookies.js          Aviso e preferências de cookies
  contato.js          Envia o formulário sem sair da página (enviando / enviado / erro)

fonts/                Nunito (400 e 700), só os subconjuntos latin e latin-ext
img/
  LOGO/               Logotipos e favicon (favicon.svg, apple-touch-icon.png)
  SVG_DESENHO/        Ilustrações das seções
  FORMAS/             Formas da marca (triângulo, círculo, estrela, quadrado) e ondas
  EQUIPE/             Imagens da equipe
```

## Seções da página

| Âncora | Seção | Conteúdo |
| --- | --- | --- |
| `#topo` | Cabeçalho | Menu, chamada principal e botão para o contato |
| `#quemsomos` | Bem-vindos ao TATEC | Apresentação da empresa |
| `#servicos` | Nossos serviços | Quatro grupos: sites, sistemas, design e consultoria |
| `#processo` | Como trabalhamos | Quatro etapas (conversa, proposta, construção, entrega) em cena escura |
| `#equipe` | Time | Card de perfil de cada integrante |
| `#contato` | Contatos | Formulário e links de contato |

## Identidade visual

As cores ficam como variáveis CSS no bloco INDEX do `style.css`; use sempre as variáveis em vez de repetir os valores.

| Variável | Cor | Uso |
| --- | --- | --- |
| `--teal` | `#0c8a9b` | Cor principal, card do time, botão "voltar ao topo" |
| `--menta` | `#66ccbf` | Gradiente do card do time |
| `--rosa` | `#dd1374` | Gradiente do topo e do rodapé |
| `--vermelho` | `#c51340` | Destaque do segundo grupo de serviços |
| `--sol` | `#ffd17f` | Destaques sobre fundo escuro (palavra "informática", botão do hero, foco) |
| `--noite` | `#3f3d56` | Botões e detalhes escuros |
| `--tinta` / `--tinta-suave` | `#33323a` / `#5a5866` | Títulos e textos |

- **Fonte:** Nunito, pesos 400 e 700.
- **Formas da marca:** cada título de seção leva uma forma de `img/FORMAS/` (triângulo, círculo, estrela, quadrado).
- **Contraste:** o topo e o rodapé usam tons profundos do gradiente para o texto branco ficar legível. Ao mudar essas cores, mantenha contraste mínimo de 4.5:1 para texto normal.

## Responsividade

O layout se ajusta de 320px até telas largas, com o conteúdo limitado a 1120px. Tamanhos de fonte e espaçamentos usam `clamp()`, então mudam de forma contínua. Pontos de quebra principais:

| Largura | O que muda |
| --- | --- |
| até 1000px | Serviços passam de 4 para 2 colunas |
| até 860px | Menu vira botão (hambúrguer); hero e apresentação ficam em uma coluna; rodapé empilha |
| até 720px | Card do time empilha foto e biografia |
| até 560px | Serviços em 1 coluna |
| até 480px | Botão do hero ocupa a largura toda |

## Animações

O site tem **um momento focal** e **uma leitura guiada pela rolagem**; o resto fica parado de propósito:

- **Textura de filme:** o topo e o manifesto têm vinheta e granulado estático (SVG embutido no `style.css`).
- **Hero:** abre do preto; fundo escuro (`--palco`) com luzes nas cores da marca que derivam devagar (e pausam quando o topo sai da tela). O título sobe palavra por palavra de trás de máscaras, e as quatro formas da marca flutuam em volta dele (também pausam fora da tela); ao rolar, o título recua e as formas se espalham.
- **Manifesto** (entre "Bem-vindos" e "Serviços"): cena presa na tela. A seção tem ~1,7 tela de altura; o texto fica parado no meio enquanto "Sites. Sistemas. Design. Consultoria." acendem um por um, com as linhas entrando de lados alternados. Os trechos de cada linha ficam em `--de`/`--ate` no `style.css`.
- **Textos e cards** (apresentação, serviços, etapas, time) sobem e aparecem ao entrar na tela, em cascata.
- **Como trabalhamos:** a linha nas cores da marca que liga as etapas se desenha da esquerda para a direita com a rolagem.
- **Títulos das seções** abrem da esquerda para a direita, como uma cartela de cinema.
- **Ilustrações** das seções se revelam de baixo para cima ao entrar na tela.

As animações ligadas à rolagem usam CSS nativo (`animation-timeline: scroll()` / `view()`), sem JavaScript. Navegadores sem suporte (como o Firefox atual) mostram tudo pronto e parado.

Ao adicionar novas animações, mantenha estas regras:

- Anime só `transform`, `opacity` e `clip-path`, nunca `width`, `height` ou `margin`.
- Use as curvas `--ease-out` e `--ease-in-out` definidas no `:root` do `style.css`, com interações entre 150 e 300ms.
- Efeitos de hover ficam dentro de `@media (hover: hover) and (pointer: fine)`, para não "grudar" no celular.
- Botões têm `scale(0.97)` no `:active`.
- Tudo respeita `prefers-reduced-motion`: com a opção de reduzir movimento ativada no sistema, sobram só transições de opacidade.

## Time e páginas de perfil

Cada membro tem um card no `index.html` (seção `#equipe`) e uma página própria em `time/<nome>.html`.

**Padrão de conteúdo** (vale para todos):

- Textos em **3ª pessoa** ("Graduado em…", "Responsável por…").
- Card: foto, nome, cargo, um resumo de 1 frase, link "Ver perfil completo" e redes.
- Página de perfil, sempre com os mesmos blocos e nesta ordem: **Sobre**, **Experiência** (todas, da mais recente para a mais antiga, com cargo, empresa, período e 1–2 frases), **Formação** (curso, instituição, ano ou "em andamento"), **Habilidades** (etiquetas) e **Certificações** (nome, emissor, ano).
- Informação que ainda não temos fica marcada com `<mark class="preencher">[...]</mark>` (aparece em amarelo). Nada é inventado.
- Todo card mostra as mesmas 4 redes (Facebook, LinkedIn, GitHub, WhatsApp), nesta ordem. Redes sem link ainda aparecem esmaecidas (`span.rede-inativa`); ao receber o link, troque por `<a href="...">` como no card do Marcos, no `index.html` e na página de perfil.

**Para adicionar alguém:** copie um `<article class="card">` dentro de `.cards`, copie uma página de `time/` com o nome da pessoa, troque o conteúdo e crie o personagem em `img/EQUIPE/` (os atuais são variações de cor e acessório do mesmo desenho).

## Formulário de contato

O formulário envia para `enviar_email.php`, que usa a função `mail()` do PHP. O `scripts/contato.js` envia sem recarregar a página e mostra "Enviando…", sucesso ou erro; em erro, o texto digitado continua no formulário e aparece o link do WhatsApp. O PHP responde com status 500 quando o envio falha.

**Atenção:** o GitHub Pages só hospeda arquivos estáticos e não executa PHP, então o formulário não funciona na versão publicada. Para funcionar é preciso uma hospedagem com PHP e envio de e-mail configurado, ou trocar por um serviço de formulários (como Formspree ou Netlify Forms).

## Cookies e privacidade

Um aviso aparece na primeira visita com **Aceitar todos**, **Recusar** e **Personalizar**. A escolha fica salva no navegador (`localStorage`, chave `tatec-consentimento`) e pode ser mudada pelo link "Gerenciar cookies" no rodapé. Qualquer elemento com o atributo `data-cookies` abre as preferências.

Hoje o site não usa cookies de estatística ou marketing. Ao adicionar um (Google Analytics, pixel do Facebook etc.), carregue-o só depois do consentimento:

```js
document.addEventListener('tatec:consentimento', (e) => {
  if (e.detail.estatisticas) carregarAnalytics();
});
```

Se mudar as categorias, aumente `VERSAO` em `scripts/cookies.js` para pedir o consentimento de novo, e atualize a seção 4 da `privacidade.html`.

A `privacidade.html` é um modelo baseado na LGPD. **Antes de publicar**, preencha os campos marcados em amarelo (CNPJ, endereço, encarregado de dados, e-mail de privacidade e prazo de guarda) e peça revisão jurídica.

## Pendências conhecidas

- A página do Facebook da empresa saiu do rodapé até existir um link real.
- Não há email da empresa nem cidade no rodapé, e não há projetos ou clientes na página: incluir quando houver dados reais.
- Os ícones vêm do Font Awesome via CDN (cdnjs), que recebe dados técnicos da conexão de quem visita.
