<div align="center">

<img src="./public/header-pinguim.png" alt="Mascote Huddle" width="150" />

# Huddle

### Conexões mais compatíveis, seguras e humanas para quem joga.

**FIAP — Enterprise Challenge 2026 | Palo Alto Networks**

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## Sobre o Huddle

O **Huddle** é uma plataforma web criada para aproximar pessoas que querem jogar, conversar e fazer parte de uma comunidade gamer mais saudável.

A proposta vai além de simplesmente encontrar alguém disponível para uma partida. O Huddle busca criar **conexões com afinidade**, considerando características como jogo preferido, estilo de gameplay, horários, plataforma e forma de comunicação.

O objetivo é reduzir o desgaste de entrar em partidas com pessoas incompatíveis e contribuir para um ambiente em que jogadores possam se conectar com mais confiança, respeito e identificação.

> **O Huddle não quer ser apenas um “match de jogadores”. Queremos construir uma comunidade em que as pessoas se sintam acolhidas para jogar, conhecer pessoas e se divertir sem julgamentos.**

---

## O problema

Encontrar pessoas para jogar online costuma depender de tentativa e erro.

Mesmo em grandes comunidades e plataformas de comunicação, normalmente o jogador não sabe antecipadamente:

- se a outra pessoa joga nos mesmos horários;
- se prefere partidas casuais ou competitivas;
- se utiliza a mesma plataforma;
- se gosta dos mesmos jogos;
- se utiliza comunicação por voz;
- se o estilo e o comportamento daquela pessoa combinam com o seu.

Além da incompatibilidade, ambientes online também podem envolver **toxicidade, assédio e interações negativas**, fazendo com que muitos jogadores evitem conhecer novas pessoas ou procurar grupos.

O Huddle nasce para reduzir esse atrito.

---

## A solução

A experiência do Huddle começa com as preferências do próprio usuário.

A partir dessas informações, a plataforma apresenta outros jogadores e calcula uma **afinidade entre os perfis**. O usuário pode então analisar a compatibilidade e decidir se deseja formar uma conexão.

### Fluxo principal

```text
Cadastro / Login
       ↓
Configuração do perfil gamer
       ↓
Preferências e disponibilidade
       ↓
Descoberta de jogadores
       ↓
Análise de afinidade
       ↓
Pular  ←  Huddle  →  Demonstrar interesse
                         ↓
                 Interesse recíproco
                         ↓
                    Novo Huddle
                         ↓
                     Mensagens
```

---

## Funcionalidades implementadas

### Cadastro e login

O projeto possui fluxo de cadastro e login com validações de formulário.

Entre as validações trabalhadas estão campos obrigatórios, e-mail, senha e **validação algorítmica de CPF**.

> O CPF é utilizado apenas para validação no fluxo atual e **não é persistido pelo protótipo**.

### Perfil gamer

O usuário pode registrar preferências utilizadas na experiência de descoberta, como:

- jogo;
- estilo de gameplay;
- horários;
- plataforma;
- disponibilidade de microfone.

### Descoberta de jogadores

A área de Huddle apresenta perfis de jogadores em uma interface interativa.

O usuário pode:

- arrastar para a esquerda para pular um perfil;
- arrastar para a direita para demonstrar interesse;
- utilizar os botões de ação;
- visualizar o próximo perfil da fila;
- acompanhar indicadores visuais durante o movimento do card.

### Afinidade entre perfis

Na versão atual, a afinidade é calculada por uma **lógica baseada em regras**, comparando dados do usuário com o perfil apresentado.

Os critérios considerados incluem:

- jogo preferido;
- estilo;
- horário;
- plataforma;
- microfone.

O resultado é apresentado visualmente como percentual de afinidade e também influencia a classificação de sinergia mostrada na interface.

> **Importante:** a versão atual não utiliza um modelo de Inteligência Artificial para calcular a afinidade. A IA faz parte da evolução planejada do produto.

### Huddle recíproco

Quando existe interesse dos dois lados, a interface pode representar a formação de um **novo Huddle**, permitindo seguir para a experiência de mensagens.

### Acessibilidade

A acessibilidade faz parte dos requisitos do projeto e não foi tratada apenas como acabamento visual.

Entre os recursos trabalhados estão:

- redimensionamento dinâmico de tipografia;
- tema claro e escuro;
- persistência de preferências visuais;
- responsividade em diferentes resoluções;
- preocupação com contraste e hierarquia visual;
- integração com o **VLibras**;
- revisão de usabilidade com referência às diretrizes WCAG.

---

## Segurança e privacidade

O Huddle é atualmente um **protótipo acadêmico front-end**. Por isso, é importante diferenciar os mecanismos já demonstrados das proteções necessárias para uma aplicação em produção.

### Presente no protótipo

- validações de cadastro e login;
- validação de CPF;
- validação de senha;
- proteção de rotas no fluxo da aplicação;
- armazenamento local de preferências e dados necessários à demonstração;
- termos de uso revisados durante a evolução do projeto;
- restrição conceitual da plataforma para público maior de 18 anos.

### Limitações atuais

Nesta versão:

- não existe backend próprio;
- não existe banco de dados;
- os dados utilizados pelo protótipo são mantidos no navegador por meio de `localStorage`;
- a proteção de rotas é feita no lado do cliente;
- não existe autenticação server-side;
- não existe criptografia ou persistência segura de credenciais em servidor.

Essas escolhas são adequadas ao **escopo acadêmico de demonstração**, mas não representam a arquitetura de segurança planejada para uma versão de produção.

---

## Inteligência Artificial — visão de evolução

A Inteligência Artificial **ainda não está implementada na versão atual do Huddle**.

Ela faz parte da evolução planejada do produto e deverá ampliar justamente os pontos que diferenciam a proposta da plataforma.

Entre as aplicações estudadas pelo grupo estão:

### Recomendação inteligente

Evoluir o sistema atual de regras para um mecanismo capaz de analisar múltiplos sinais do usuário e identificar padrões de compatibilidade de forma mais precisa.

### Combate à toxicidade

Utilizar análise de comportamento e conteúdo para auxiliar na identificação de:

- mensagens ofensivas;
- assédio;
- discurso de ódio;
- spam;
- padrões recorrentes de comportamento tóxico.

A proposta é utilizar IA como **apoio à moderação**, e não como substituição absoluta da análise humana.

### Personalização

Aprender com preferências, feedbacks e experiências anteriores para tornar as recomendações progressivamente mais relevantes para cada jogador.

### Assistência ao usuário

Uma futura camada de IA também poderá auxiliar usuários com dúvidas sobre a plataforma, recomendações e orientações relacionadas à experiência gamer.

### Princípios para uso responsável

A evolução de IA do Huddle deverá considerar:

- LGPD;
- consentimento;
- transparência;
- privacidade;
- risco de falsos positivos;
- viés algorítmico;
- supervisão humana;
- explicabilidade das recomendações.

---

## Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| **Next.js** | Estrutura da aplicação e roteamento |
| **React** | Construção dos componentes e estados da interface |
| **JavaScript** | Regras, validações e interações |
| **Tailwind CSS** | Estilização e responsividade |
| **shadcn/ui / Radix UI** | Componentes de interface |
| **Lucide React / React Icons** | Ícones |
| **Recharts** | Visualização de dados |
| **Framer Motion** | Interações e animações da experiência de Huddle |
| **react-imask** | Máscaras de campos |
| **cpf-cnpj-validator** | Apoio à validação de CPF |
| **LocalStorage** | Persistência local utilizada pelo protótipo |
| **Git / GitHub** | Versionamento e colaboração |

---

## Arquitetura atual

O Huddle utiliza uma arquitetura front-end baseada em componentes.

```text
Huddle/
├── public/                 # imagens e recursos públicos
│
├── src/
│   ├── app/                # páginas e rotas da aplicação
│   │   ├── match/          # descoberta e afinidade entre jogadores
│   │   └── ...
│   │
│   └── components/         # componentes reutilizáveis
│       └── ui/             # elementos de interface e layout
│
├── components.json
├── jsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

A aplicação utiliza o **App Router do Next.js** e organiza elementos de interface em componentes reutilizáveis.

---

# 🚀 Como executar o projeto

Esta seção explica, passo a passo, como instalar e executar o Huddle localmente em um computador.

> **Importante:** todos os comandos apresentados abaixo devem ser executados em um terminal, como o **Terminal do Visual Studio Code**, **PowerShell**, **Prompt de Comando (CMD)** ou outro terminal de sua preferência.

## Pré-requisitos

Antes de iniciar, é necessário ter instalado no computador:

- **Node.js 20.9 ou superior**
- **npm** — instalado juntamente com o Node.js
- **Git**

Caso alguma dessas ferramentas ainda não esteja instalada, realize a instalação antes de continuar.

Após a instalação, recomenda-se fechar e abrir novamente o terminal.

Para conferir se as ferramentas estão disponíveis, abra um terminal e execute:

```bash
node -v
```

Depois:

```bash
npm -v
```

E:

```bash
git --version
```

Se os comandos retornarem os números das versões instaladas, o computador está pronto para executar o projeto.

---

## 1. Clonar o repositório

Abra um terminal na pasta onde deseja salvar o projeto.

No Windows, também é possível abrir o **Visual Studio Code**, acessar **Terminal > New Terminal** e utilizar o terminal integrado.

No terminal, execute:

```bash
git clone https://github.com/Luanvsds/Huddle.git
```

Esse comando fará o download de uma cópia do projeto para o computador.

Depois, ainda no terminal, entre na pasta do projeto:

```bash
cd Huddle
```

---

## 2. Instalar as dependências

Com o terminal aberto dentro da pasta `Huddle`, execute:

```bash
npm install
```

Esse comando instalará automaticamente as bibliotecas e dependências necessárias para executar a aplicação.

Aguarde até que o processo seja concluído.

---

## 3. Iniciar o projeto

Ainda no terminal, dentro da pasta do projeto, execute:

```bash
npm run dev
```

Após alguns segundos, o terminal deverá indicar que o servidor de desenvolvimento foi iniciado.

Normalmente será exibido um endereço semelhante a:

```text
http://localhost:3000
```

---

## 4. Abrir a aplicação

Abra um navegador, como Google Chrome, Microsoft Edge ou Firefox.

Na barra de endereço, digite:

```text
http://localhost:3000
```

A aplicação Huddle deverá ser carregada.

---

## 5. Encerrar a aplicação

Quando quiser interromper o servidor local, volte ao terminal onde o projeto está sendo executado e pressione:

```text
Ctrl + C
```

O servidor será encerrado.

---

## 🔄 Executando novamente depois

Depois que o projeto já estiver instalado no computador, não é necessário repetir o processo de clonagem.

Abra um terminal dentro da pasta `Huddle` e execute:

```bash
npm run dev
```

Depois acesse novamente:

```text
http://localhost:3000
```

---

## 🔄 Atualizar o projeto

Caso o repositório já esteja no computador e você queira baixar as alterações mais recentes disponíveis no GitHub, abra o terminal dentro da pasta `Huddle` e execute:

```bash
git pull
```

Caso tenham sido adicionadas ou alteradas dependências, execute também:

```bash
npm install
```

Depois inicie normalmente:

```bash
npm run dev
```

---

## Observação sobre os dados

A versão acadêmica atual do Huddle não exige configuração de banco de dados, servidor externo ou arquivo de variáveis de ambiente para executar a demonstração principal.

Os dados necessários ao funcionamento do protótipo são armazenados localmente no navegador utilizando `localStorage`.

---

## Scripts disponíveis

| Comando | Função |
|---|---|
| `npm run dev` | inicia o ambiente de desenvolvimento |
| `npm run build` | gera a build da aplicação |
| `npm start` | executa a build em modo de produção |
| `npm run lint` | executa as verificações de lint |

---

## Build local

Para validar a versão final da aplicação:

```bash
npm run build
```

Depois:

```bash
npm start
```

---

## Estado atual do projeto

O Huddle encontra-se em fase de **protótipo acadêmico funcional**, desenvolvido para demonstrar a proposta completa de experiência da plataforma dentro do Enterprise Challenge.

### Implementado

- [x] interface responsiva;
- [x] cadastro e login;
- [x] validações de formulário;
- [x] validação de CPF;
- [x] perfil gamer;
- [x] preferências do usuário;
- [x] descoberta de jogadores;
- [x] cálculo de afinidade baseado em regras;
- [x] interação por swipe;
- [x] representação de Huddle recíproco;
- [x] fluxo para mensagens;
- [x] tema claro e escuro;
- [x] controle de tamanho da fonte;
- [x] integração com VLibras.

### Evolução planejada

- [ ] backend e API próprios;
- [ ] banco de dados persistente;
- [ ] autenticação e autorização server-side;
- [ ] chat persistente em tempo real;
- [ ] recomendação de jogadores baseada em IA;
- [ ] análise de toxicidade e apoio à moderação;
- [ ] sistema de feedback entre usuários;
- [ ] modelos de segurança e privacidade adequados a produção;
- [ ] expansão das comunidades e recursos sociais.

---

## Equipe

| Integrante | RM |
|---|---:|
| **Carlos Eduardo Vasconcelos** | 573761 |
| **Gabriela Miranda** | 573267 |
| **Giovana Sophia** | 569627 |
| **Luan Vitor Silveira** | 569601 |
| **Marcela Marques** | 571815 |

---

## Contexto acadêmico

O Huddle é um projeto desenvolvido por estudantes da **FIAP** para o **Enterprise Challenge 2026**, associado ao desafio proposto pela **Palo Alto Networks**.

Ao longo das fases do projeto, a equipe trabalhou aspectos de:

- desenvolvimento front-end;
- experiência do usuário;
- acessibilidade;
- engenharia e organização de software;
- cibersegurança;
- privacidade e LGPD;
- Inteligência Artificial;
- ESG;
- ética digital;
- modelagem de negócio;
- documentação e governança do projeto.

A proposta desta entrega é apresentar o Huddle não apenas como uma coleção de telas, mas como um **produto acadêmico funcional, documentado e demonstrável**.

---

<div align="center">

### Huddle

**Jogar junto começa por encontrar as pessoas certas.**

FIAP · Enterprise Challenge 2026 · Palo Alto Networks

</div>
