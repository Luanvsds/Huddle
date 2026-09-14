"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFontSize } from "@/components/ui/layout/font-size";
import { JetBrains_Mono } from "next/font/google";
import {
  Check,
  Clock3,
  Compass,
  Gamepad2,
  Hexagon,
  Mic,
  MicOff,
  MessageCircle,
  Monitor,
  Shield,
  Sparkles,
  Swords,
  X,
  Zap,
  Globe,
} from "lucide-react";
import { useAuth } from "@/components/hook/useAuth";

// Fonte usada somente no número da afinidade, igual à proposta do Figma.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const perfis = [
  {
    nome: "LunaFPS",
    jogo: "The Legend of Zelda",
    microfone: "Disponível",
    gameplay: "Tryhard",
    horario: "Noite",
    plataforma: "PC",
    idioma: "PT",
    huddleReciproco: true,
    mensagemInicial: "Oi! Tudo bem? Vi que nossos horários combinam. Bora jogar qualquer hora?",
    banner:
    "/The Legend of Zelda.jpg",
  },
  {
    nome: "MiraGG",
    jogo: "Valorant",
    microfone: "Não disponível",
    gameplay: "Casual",
    horario: "Tarde",
    idioma: "ES",
    plataforma: "Console",
    huddleReciproco: true,
    mensagemInicial: "Opa! Tranquilo? Quer jogar alguma coisa qualquer hora?",
    banner:
    "/Valorant.jpg",
  },
  {
    nome: "Nexusbr",
    jogo: "God of War",
    microfone: "Disponível",
    gameplay: "Competitivo",
    horario: "Manhã",
    idioma: "PT",
    plataforma: "PC",
    huddleReciproco: true,
    mensagemInicial: "Fala! Vi que você também curte jogar mais competitivo. Bora marcar uma?",
    banner:
    "/God of War.jpg",
  },
  {
    nome: "PixelRush",
    jogo: "League of Legends",
    microfone: "Disponível",
    gameplay: "Casual",
    idioma: "PT",
    horario: "Fins de semana",
    plataforma: "PC",
    huddleReciproco: true,
    mensagemInicial: "Hi, I really liked your profile, lets play?",
    banner:
    "/League of Legends.jpg",
  },
];


// ===== CONFIGURAÇÃO DO CÁLCULO DE AFINIDADE =====
// Sinergia base de 15%, e os outros 85% divididos igualmente
// entre as 5 características comparadas (15 + 5 × 17 = 100).
const SINERGIA_BASE = 10;
const PESO_POR_CARACTERISTICA = 15;

// Perfis mockados usam rótulos em texto (ex: "Noite", "PC"); o localStorage
// guarda objetos com chaves em minúsculo. Este mapa faz a ponte entre os dois.
const CHAVE_HORARIO_LOCALSTORAGE = {
  "Manhã": "manha",
  "Tarde": "tarde",
  "Noite": "noite",
  "Fins de semana": "fimDeSemana",
};

const CHAVE_PLATAFORMA_LOCALSTORAGE = {
  PC: "pc",
  Console: "console",
  Mobile: "mobile",
};

const CHAVE_IDIOMA_LOCALSTORAGE = {
  PT: "PT",
  EN: "EN",
  ES: "ES",
};

const HORARIOS_PADRAO = { manha: false, tarde: false, noite: false, fimDeSemana: false };
const PLATAFORMAS_PADRAO = { pc: false, console: false, mobile: false };
const IDIOMAS_PADRAO = { PT: false, EN: false, ES: false };

const CHAVES_LOCALSTORAGE_USUARIO = {
  jogo: "user_jogo",
  gameplay: "user_estilo",
  microfone: "user_microfone",
  horarios: "user_horarios",
  plataformas: "user_plataformas",
  idiomas: "user_idiomas",
};

// Remove acentos/maiúsculas para não depender de digitação idêntica.
function normalizarTexto(valor) {
  return (valor ?? "")
  .toString()
  .trim()
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
}

// ATENÇÃO: ainda não confirmamos o formato exato salvo em `user_microfone`
// (o campo veio vazio no seu exemplo). Esta função aceita os formatos mais
// prováveis. Ajuste a lista abaixo se o valor real salvo for diferente.
function usuarioTemMicrofone(valorBruto) {
  
  console.log(normalizarTexto(valorBruto));
  return normalizarTexto(valorBruto) === "disponivel";
}

function lerObjetoDoLocalStorage(chave, valorPadrao) {
  if (typeof window === "undefined") return valorPadrao;
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? { ...valorPadrao, ...JSON.parse(bruto) } : valorPadrao;
  } catch {
    return valorPadrao;
  }
}

// ===== CARREGA O PERFIL DO USUÁRIO LOGADO =====
function carregarPerfilUsuarioLogado() {
  if (typeof window === "undefined") return null;
  
  return {
    jogo: localStorage.getItem(CHAVES_LOCALSTORAGE_USUARIO.jogo) || "",
    gameplay: localStorage.getItem(CHAVES_LOCALSTORAGE_USUARIO.gameplay) || "",
    microfone: localStorage.getItem(CHAVES_LOCALSTORAGE_USUARIO.microfone) || "",
    horarios: lerObjetoDoLocalStorage(CHAVES_LOCALSTORAGE_USUARIO.horarios, HORARIOS_PADRAO),
    plataformas: lerObjetoDoLocalStorage(CHAVES_LOCALSTORAGE_USUARIO.plataformas, PLATAFORMAS_PADRAO),
    idiomas: lerObjetoDoLocalStorage(CHAVES_LOCALSTORAGE_USUARIO.idiomas, IDIOMAS_PADRAO),
  };
}

// ===== CALCULA A AFINIDADE ENTRE O USUÁRIO LOGADO E UM PERFIL =====
function calcularAfinidade(perfilUsuario, perfil) {
  if (!perfilUsuario || !perfil) return 0;
  
  let pontos = SINERGIA_BASE;
  
  if (perfilUsuario.jogo && normalizarTexto(perfilUsuario.jogo) === normalizarTexto(perfil.jogo)) {
    pontos += PESO_POR_CARACTERISTICA;
  }
  
  if (perfilUsuario.gameplay && normalizarTexto(perfilUsuario.gameplay) === normalizarTexto(perfil.gameplay)) {
    pontos += PESO_POR_CARACTERISTICA;
  }
  
  const chaveHorario = CHAVE_HORARIO_LOCALSTORAGE[perfil.horario];
  if (chaveHorario && perfilUsuario.horarios?.[chaveHorario]) {
    pontos += PESO_POR_CARACTERISTICA;
  }
  
  const chavePlataforma = CHAVE_PLATAFORMA_LOCALSTORAGE[perfil.plataforma];
  if (chavePlataforma && perfilUsuario.plataformas?.[chavePlataforma]) {
    pontos += PESO_POR_CARACTERISTICA;
  }
  const chaveIdioma = CHAVE_IDIOMA_LOCALSTORAGE[perfil.idioma];
  if (chaveIdioma && perfilUsuario.idiomas?.[chaveIdioma]) {
    pontos += PESO_POR_CARACTERISTICA;
  }
  
  if (usuarioTemMicrofone(perfilUsuario.microfone) === usuarioTemMicrofone(perfil.microfone)) {
    console.log(perfil.nome)
    pontos += PESO_POR_CARACTERISTICA;
  }
  
  return Math.min(100, pontos);
}

export function MatchContent() {
  const autorizado = useAuth()
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const {
    level,
    XsfontClass,
    smfontClass,
    lgfontClass,
    XlfontClass,
    Xl3fontClass,
  } = useFontSize();
  
  const router = useRouter();
  
  useEffect(() => {
    setPerfilUsuario(carregarPerfilUsuarioLogado());
  }, []);
  
  const [perfilAtual, setPerfilAtual] = useState(0);
  const [swipeEmAndamento, setSwipeEmAndamento] = useState(false);
  const [huddleFormado, setHuddleFormado] = useState(null);
  
  // ===== Movimento do card de Match =====
  // Começa no centro: x = 0
  const x = useMotionValue(0);
  
  // Conforme o card vai para esquerda/direita,
  const rotacao = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  
  // ===== Indicadores visuais do swipe =====
  // Conforme o card se desloca, os indicadores aparecem.
  const opacidadeConectar = useTransform(x, [40, 120], [0, 1]);
  const escalaConectar = useTransform(x, [40, 120], [0.9, 1]);
  const opacidadePular = useTransform(x, [-120, -40], [1, 0]);
  const escalaPular = useTransform(x, [-120, -40], [1, 0.9]);
  
  // ===== RASTROS VISUAIS DO SWIPE =====
  // Os traços aparecem progressivamente conforme o card sai do centro.
  const opacidadeRastroDireita = useTransform(x, [25, 150], [0, 1]);
  const opacidadeRastroEsquerda = useTransform(x, [-150, -25], [1, 0]);
  
  // ===== CARD SEGUINTE / EFEITO DE PILHA =====
  // O próximo perfil fica discretamente atrás do atual e cresce
  // enquanto o card da frente é arrastado para qualquer lado.
  const escalaProximoCard = useTransform(
    x,
    [-320, 0, 320],
    [1, 0.965, 1],
  );
  
  const yProximoCard = useTransform(
    x,
    [-320, 0, 320],
    [0, 18, 0],
  );
  
  const opacidadeProximoCard = useTransform(
    x,
    [-320, 0, 320],
    [1, 0.78, 1],
  );
  
  // ===== PERFIL ATUAL / FIM DA FILA =====
  // Não existe mais loop: quando o índice passa do último perfil,
  // a tela entra no estado "sem novos perfis".
  const acabaramPerfis = perfilAtual >= perfis.length;
  const perfilSelecionado = acabaramPerfis ? null : perfis[perfilAtual];
  const proximoPerfilSelecionado =
  perfilAtual + 1 < perfis.length ? perfis[perfilAtual + 1] : null;
  
  // Afinidade temporariamente mockada para a apresentação.
  const afinidade = useMemo(
    () => calcularAfinidade(perfilUsuario, perfilSelecionado),
    [perfilUsuario, perfilSelecionado],
  );
  if(!autorizado) return null;
  // ===== CÍRCULO DE AFINIDADE =====
  const tamanhoCirculo = [92, 108, 124][level] ?? 108;
  const numeroAfinidade = [20, 24, 28][level] ?? 24;
  const legendaAfinidade = [7, 8, 9][level] ?? 8;
  const espessuraCirculo = [8, 9, 10][level] ?? 9;
  const raioCirculo = 42;
  const circunferencia = 2 * Math.PI * raioCirculo;
  const progressoCirculo = circunferencia - (afinidade / 100) * circunferencia;
  
  // ===== COMPARAÇÕES DO PERFIL =====
  const mesmoGameplay =
  perfilSelecionado &&
  Boolean(perfilUsuario?.gameplay) &&
  normalizarTexto(perfilUsuario.gameplay) === normalizarTexto(perfilSelecionado.gameplay);
  
  const mesmoHorario =
  perfilSelecionado &&
  Boolean(perfilUsuario?.horarios?.[CHAVE_HORARIO_LOCALSTORAGE[perfilSelecionado.horario]]);
  
  const mesmoMicrofone =
  perfilSelecionado &&
  usuarioTemMicrofone(perfilUsuario?.microfone) === usuarioTemMicrofone(perfilSelecionado.microfone);
  
  const mesmaPlataforma =
  perfilSelecionado &&
  Boolean(perfilUsuario?.plataformas?.[CHAVE_PLATAFORMA_LOCALSTORAGE[perfilSelecionado.plataforma]]);
  
  const mesmoIdioma = perfilSelecionado && Boolean(perfilUsuario?.idiomas?.[CHAVE_IDIOMA_LOCALSTORAGE[perfilSelecionado.idioma]]);
  
  // ===== SELO DE SINERGIA =====
  // Cada tier usa uma família de cores diferente para a qualidade
  // da sinergia ficar evidente só de bater o olho.
  const tierInfo =
  afinidade >= 85
  ? {
    titulo: "SINERGIA TIER S",
    subtitulo: "ESQUADRÃO DE ELITE",
    borda:
    "border-amber-500/30 bg-amber-50/80 dark:border-amber-400/25 dark:bg-amber-500/5",
    brilho:
    "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.22),transparent_62%)]",
    hexagono: "text-amber-600/30 dark:text-amber-400/25",
    mascote: "text-amber-700 dark:text-amber-300",
    tituloCor:
    "from-amber-800 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-200",
    subtituloCor: "text-amber-800/70 dark:text-amber-400/70",
    fill: "fill-amber-600"
  }
  : afinidade >= 70
  ? {
    titulo: "SINERGIA TIER A",
    subtitulo: "CONEXÃO MUITO FORTE",
    borda:
    "border-violet-500/30 bg-violet-50/80 dark:border-violet-400/25 dark:bg-violet-500/5",
    brilho:
    "bg-[radial-gradient(ellipse_at_top,rgba(139,124,246,0.20),transparent_62%)]",
    hexagono: "text-violet-600/30 dark:text-violet-300/25",
    mascote: "text-violet-700 dark:text-violet-300",
    tituloCor:
    "from-violet-800 via-fuchsia-blue-600 to-violet-700 dark:from-violet-200 dark:via-fuchsia-blue-300 dark:to-violet-200",
    subtituloCor: "text-violet-800/70 dark:text-violet-300/70",
    fill: "fill-violet-600"
  }
  : afinidade >= 55
  ? {
    titulo: "SINERGIA TIER B",
    subtitulo: "BOA SINCRONIA",
    borda:
    "border-cyan-500/30 bg-cyan-50/80 dark:border-cyan-400/25 dark:bg-cyan-500/5",
    brilho:
    "bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.20),transparent_62%)]",
    hexagono: "text-cyan-600/30 dark:text-cyan-300/25",
    mascote: "text-cyan-700 dark:text-cyan-300",
    tituloCor:
    "from-cyan-800 via-sky-500 to-cyan-700 dark:from-cyan-200 dark:via-sky-300 dark:to-cyan-200",
    subtituloCor: "text-cyan-800/70 dark:text-cyan-300/70",
    fill: "fill-cyan-600"
  }
  : {
    titulo: "SINERGIA TIER C",
    subtitulo: "EM EVOLUÇÃO",
    borda:
    "border-slate-400/35 bg-slate-100/80 dark:border-slate-500/25 dark:bg-slate-400/5",
    brilho:
    "bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.18),transparent_62%)]",
    hexagono: "text-slate-500/35 dark:text-slate-400/25",
    mascote: "text-slate-700 dark:text-slate-300",
    tituloCor:
    "from-slate-800 via-slate-500 to-slate-700 dark:from-slate-200 dark:via-slate-300 dark:to-slate-200",
    subtituloCor: "text-slate-700/70 dark:text-slate-400/70",
    fill: "fill-slate-400"
  };
  
  const microfoneDisponivel = perfilSelecionado?.microfone === "Disponível";
  
  function proximoPerfil() {
    // Não volta ao começo: cada card é tratado uma única vez.
    setPerfilAtual((indiceAtual) => indiceAtual + 1);
  }
  
  // ===== REGISTRA UM HUDDLE PARA A PÁGINA DE MENSAGENS =====
  function salvarHuddleParaMensagens(perfil) {
    if (typeof window === "undefined") return;
    
    localStorage.setItem(`huddle_horario_${perfil.nome}`, new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }));
    
    const nomesSalvos= JSON.parse(
      localStorage.getItem("huddle_nomes") ?? "[]"
    );
    
    localStorage.setItem(
      "huddle_nomes",
      JSON.stringify([...nomesSalvos, perfil.nome])
    );
  }
  
  // ===== Finaliza o swipe =====
  // esquerda = pular
  // direita = demonstrar interesse
  async function finalizarSwipe(direcao) {
    if (swipeEmAndamento || !perfilSelecionado) return;
    
    setSwipeEmAndamento(true);
    
    // Guardamos o perfil antes de avançar o índice.
    const perfilDaAcao = perfilSelecionado;
    
    // O destino é calculado pelo tamanho da tela,
    // então funciona também no monitor ultrawide.
    const distanciaSaida = Math.max(window.innerWidth * 0.75, 900);
    const destino = direcao === "direita" ? distanciaSaida : -distanciaSaida;
    
    // Saída suave, mantendo o comportamento aprovado do swipe.
    await animate(x, destino, {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    });
    
    // Para qualquer animação anterior.
    x.stop();
    
    // Próximo card nasce exatamente no centro.
    if (typeof x.jump === "function") {
      x.jump(0);
    } else {
      x.set(0);
    }
    
    proximoPerfil();
    
    if (direcao === "direita" && perfilDaAcao.huddleReciproco) {
      salvarHuddleParaMensagens(perfilDaAcao);
      setHuddleFormado(perfilDaAcao);
    }
    
    setSwipeEmAndamento(false);
  }
  
  // ===== Decide o resultado ao soltar o card =====
  function aoSoltarCard() {
    if (swipeEmAndamento) return;
    
    const posicaoAtual = x.get();
    
    // Direita = conectar
    if (posicaoAtual >= 110) {
      finalizarSwipe("direita");
      return;
    }
    
    // Esquerda = pular
    if (posicaoAtual <= -110) {
      finalizarSwipe("esquerda");
      return;
    }
    
    // Não chegou ao limite:
    // volta suavemente para o centro.
    animate(x, 0, {
      type: "spring",
      stiffness: 230,
      damping: 24,
      mass: 0.9,
    });
  }
  
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
      <section className="mx-auto w-full max-w-[1720px] px-4 pb-8 pt-10 sm:px-8 sm:pt-14">
        {/* ===== TÍTULO DA EXPERIÊNCIA ===== */}
        {/* Agora ele funciona como título da tela e não como etiqueta no canto. */}
        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-3 text-center">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-fuchsia-blue-500/15 bg-fuchsia-blue-600/10 text-fuchsia-blue-800 shadow-sm dark:border-fuchsia-blue-300/10 dark:bg-fuchsia-blue-500/15 dark:text-fuchsia-blue-300">
            <Compass className="size-5" />
          </span>

          <div>
            <h1
              className={`${XlfontClass} font-black leading-tight text-fuchsia-blue-950 dark:text-white`}
            >
              Encontre seu próximo Huddle
            </h1>

            <p
              className={`${smfontClass} mt-1 leading-relaxed text-fuchsia-blue-950/60 dark:text-white/55`}
            >
              Arraste para encontrar alguém que combine com seu jeito de jogar.
            </p>
          </div>
        </div>
        <div className="grid cursor-grab touch-pan-y items-start justify-center gap-20 xl:grid-cols-[minmax(600px,680px)_minmax(500px,580px)] xl:gap-40 2xl:gap-52">
          {/* ===== COLUNA ESQUERDA / CARD DO JOGADOR ===== */}
          <div className="min-w-0">
            {/* ===== PILHA DE CARDS / DECK DO MATCH ===== */}
            <div className="relative min-h-200">
              {/* ===== RASTRO PARA PULAR ===== */}
              <motion.div
                style={{ opacity: opacidadeRastroEsquerda }}
                className="pointer-events-none absolute -left-16 top-1/2 z-0 flex -translate-y-1/2 flex-col gap-3"
                aria-hidden="true"
              >
                <span className="h-0.75 w-14 -rotate-6 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.18)]" />
                <span className="ml-4 h-0.75 w-20 -rotate-6 rounded-full bg-white/40" />
                <span className="ml-8 h-0.75 w-12 -rotate-6 rounded-full bg-white/25" />
                <span className="ml-3 h-0.75 w-9 -rotate-6 rounded-full bg-white/15" />
              </motion.div>

              {/* ===== RASTRO PARA CONECTAR ===== */}
              <motion.div
                style={{ opacity: opacidadeRastroDireita }}
                className="pointer-events-none absolute -right-16 top-1/2 z-0 flex -translate-y-1/2 flex-col items-end gap-3"
                aria-hidden="true"
              >
                <span className="h-0.75 w-14 rotate-6 rounded-full bg-cyan-300/85 shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
                <span className="mr-4 h-0.75 w-20 rotate-6 rounded-full bg-cyan-300/55" />
                <span className="mr-8 h-0.75 w-12 rotate-6 rounded-full bg-cyan-300/30" />
                <span className="mr-3 h-0.75 w-9 rotate-6 rounded-full bg-cyan-300/20" />
              </motion.div>

              {/* ===== PRÓXIMO PERFIL ATRÁS ===== */}
              {proximoPerfilSelecionado && (
                <motion.article
                  style={{
                    scale: escalaProximoCard,
                    y: yProximoCard,
                    opacity: opacidadeProximoCard,
                  }}
                  className="pointer-events-none absolute inset-0 z-10 min-h-200 overflow-hidden rounded-3xl border border-fuchsia-blue-300/50 bg-fuchsia-blue-50/90 text-fuchsia-blue-950 shadow-[0_18px_50px_-28px_rgba(15,12,26,0.55)] dark:border-fuchsia-blue-400/20 dark:bg-card dark:text-card-foreground"
                  aria-hidden="true"
                >
                  {/* Banner do próximo jogador */}
                  <div className="relative h-75 overflow-hidden bg-muted">
                    <img
                      src={proximoPerfilSelecionado.banner}
                      alt=""
                      className="h-full w-full object-cover opacity-75"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />

                    <div className="absolute left-4 top-4 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-white/85 backdrop-blur-md">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      <span className={XsfontClass}>Próximo jogador</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-6">
                      <div
                        className={`flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/15 bg-white/10 ${XlfontClass} font-black text-white/90 backdrop-blur`}
                      >
                        {proximoPerfilSelecionado.nome.slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <h2 className={`${XlfontClass} font-black text-white/95`}>
                          {proximoPerfilSelecionado.nome}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Prévia das informações do próximo jogador */}
                  <div className="p-7 opacity-80">
                    <div>
                      <div
                        className={`${XsfontClass} mb-2 flex items-center gap-1.5 font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        <Gamepad2 className="size-4" />
                        Jogo preferido
                      </div>

                      <span
                        className={`${smfontClass} inline-flex rounded-xl border border-fuchsia-blue-500/25 bg-fuchsia-blue-500/10 px-3 py-1.5 font-semibold text-foreground`}
                      >
                        {proximoPerfilSelecionado.jogo}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
                        <Swords className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />
                        <div>
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Gameplay
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {proximoPerfilSelecionado.gameplay}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
                        {proximoPerfilSelecionado.microfone === "Disponível" ? (
                          <Mic className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />
                        ) : (
                          <MicOff className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />
                        )}
                        <div>
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Microfone
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {proximoPerfilSelecionado.microfone}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
                        <Clock3 className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />
                        <div>
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Horário
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {proximoPerfilSelecionado.horario}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
                        <Monitor className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />
                        <div>
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Plataforma
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {proximoPerfilSelecionado.plataforma}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
                        <Globe className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />
                        <div>
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Idioma
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {proximoPerfilSelecionado.idioma}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* ===== CARD ATUAL / ARRASTÁVEL ===== */}
              {perfilSelecionado ? (
                <motion.article
                  drag="x"
                  dragMomentum={false}
                  onDragEnd={aoSoltarCard}
                  style={{
                    x,
                    rotate: rotacao,
                  }}
                  whileDrag={{
                    cursor: "grabbing",
                  }}
                  className="relative z-20 min-h-200 cursor-grab touch-pan-y overflow-hidden rounded-3xl border border-fuchsia-blue-200/80 bg-fuchsia-blue-50/90 text-fuchsia-blue-950 shadow-xl dark:border-fuchsia-blue-400/20 dark:bg-card dark:text-card-foreground"
                >
                  {/* ===== Indicador: PULAR ===== */}
                  <motion.div
                    style={{
                      opacity: opacidadePular,
                      scale: escalaPular,
                    }}
                    className="
    pointer-events-none
    absolute
    left-5
    top-5
    z-40
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-white/50
    bg-black/40
    px-4
    py-2
    font-black
    tracking-wider
    text-white
    shadow-lg
    backdrop-blur-md
  "
                  >
                    <X className="size-5" />
                    PULAR
                  </motion.div>

                  {/* ===== Indicador: CONECTAR ===== */}
                  <motion.div
                    style={{
                      opacity: opacidadeConectar,
                      scale: escalaConectar,
                    }}
                    className="
    pointer-events-none
    absolute
    right-5
    top-5
    z-40
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-cyan-300/80
    bg-cyan-400/20
    px-4
    py-2
    font-black
    tracking-wider
    text-cyan-300
    shadow-[0_0_24px_rgba(34,211,238,0.25)]
    backdrop-blur-md
  "
                  >
                    <Zap className="size-5" />
                    CONECTAR
                  </motion.div>
                  {/* Banner gamer */}
                  <div className="relative h-75 overflow-hidden bg-muted">
                    <img
                      src={perfilSelecionado.banner}
                      alt={`Ambiente de jogo de ${perfilSelecionado.nome}`}
                      className="h-full w-full object-cover opacity-90"
                    />

                    {/* Sobreposições escuras somente em cima da imagem */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/35 to-transparent" />

                    {/* Status online */}
                    <div
                      className={`absolute left-4 top-4 z-10 flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-black/45 px-3 py-1.5 ${XsfontClass} font-medium text-white backdrop-blur-md`}
                    >
                      <span className="relative flex size-2 shrink-0">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                      </span>
                      Online agora
                    </div>

                    {/* Plataforma */}
                    <div
                      className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-black/45 px-3 py-1.5 ${XsfontClass} font-semibold text-white backdrop-blur-md`}
                    >
                      <Monitor className="size-3.5 text-cyan-300" />
                      {perfilSelecionado.plataforma}
                    </div>

                    {/* Identidade do jogador */}
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 p-6">
                      <div
                        className={`flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 ${XlfontClass} font-black text-white shadow-lg backdrop-blur`}
                      >
                        {perfilSelecionado.nome.slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <h2 className={`${XlfontClass} font-black text-white`}>
                          {perfilSelecionado.nome}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Informações do jogador */}
                  <div className="p-7">
                    {/* Jogo preferido em destaque */}
                    <div>
                      <div
                        className={`${XsfontClass} mb-2 flex items-center gap-1.5 font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        <Gamepad2 className="size-4" />
                        Jogo preferido
                      </div>

                      <span
                        className={`${smfontClass} inline-flex rounded-xl border border-fuchsia-blue-500/30 bg-fuchsia-blue-500/10 px-3 py-1.5 font-semibold text-foreground`}
                      >
                        {perfilSelecionado.jogo}
                      </span>
                    </div>

                    {/* Grade principal com ícones */}
                    <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                          <Swords className="size-4" />
                        </span>

                        <div className="min-w-0">
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Gameplay
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {perfilSelecionado.gameplay}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                          {microfoneDisponivel ? (
                            <Mic className="size-4" />
                          ) : (
                            <MicOff className="size-4" />
                          )}
                        </span>

                        <div className="min-w-0">
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Microfone
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {perfilSelecionado.microfone}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                          <Clock3 className="size-4" />
                        </span>

                        <div className="min-w-0">
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Horário
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {perfilSelecionado.horario}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                          <Monitor className="size-4" />
                        </span>

                        <div className="min-w-0">
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Plataforma
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {perfilSelecionado.plataforma}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-h-19 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                          <Globe className="size-4" />
                        </span>
                        <div>
                          <p className={`${XsfontClass} text-muted-foreground`}>
                            Idioma
                          </p>
                          <p className={`${smfontClass} mt-0.5 font-bold`}>
                            {perfilSelecionado.idioma}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chips adicionais usando apenas dados que já existem no cadastro */}
                    {/* ===== Detalhe visual inferior do card ===== */}
                    {/* Fica centralizado na área vazia criada pelo aumento da altura do card */}
                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 ">
                      <div className="flex size-10 items-center justify-center rounded-full border border-fuchsia-blue-400/20 bg-fuchsia-blue-600/10 text-fuchsia-blue-300">
                        <Swords className="size-5" />
                      </div>

                      <div className="flex size-12 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.10)]">
                        <Shield className="size-6" />
                      </div>

                      <div className="flex size-10 items-center justify-center rounded-full border border-fuchsia-blue-400/20 bg-fuchsia-blue-600/10 text-fuchsia-blue-300">
                        <Gamepad2 className="size-5" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ) : (
                <div className="relative z-20 flex min-h-200 flex-col items-center justify-center overflow-hidden rounded-3xl border border-fuchsia-blue-200/80 bg-fuchsia-blue-50/90 px-8 text-center text-fuchsia-blue-950 shadow-xl dark:border-fuchsia-blue-400/20 dark:bg-card dark:text-card-foreground">
                  <div className="grid size-16 place-items-center rounded-2xl border border-fuchsia-blue-500/20 bg-fuchsia-blue-600/10 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                    <Sparkles className="size-8" />
                  </div>

                  <h2 className={`${XlfontClass} mt-6 font-black`}>
                    Você viu todos os perfis por agora
                  </h2>

                  <p className={`${smfontClass} mt-3 max-w-md text-muted-foreground`}>
                    Novos jogadores podem aparecer depois. Por enquanto, sua fila de Huddles terminou.
                  </p>
                </div>
              )}
            </div>

            {/* ===== AÇÕES DO HUDDLE ===== */}
            {perfilSelecionado && (
              <div className="mt-7 flex items-center justify-center gap-4">
                {/* Pular */}
                <button
                  type="button"
                  aria-label="Pular jogador"
                  title="Pular"
                  onClick={() => finalizarSwipe("esquerda")}
                  disabled={swipeEmAndamento}
                  className="grid size-14 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-lg transition hover:border-slate-400 hover:bg-muted"
                >
                  <X className="size-6" strokeWidth={2.4} />
                </button>

                {/* Conectar */}
                <button
                  type="button"
                  aria-label="Enviar pedido de conexão"
                  title="Conectar"
                  onClick={() => finalizarSwipe("direita")}
                  disabled={swipeEmAndamento}
                  className="grid size-16 place-items-center rounded-full border border-transparent bg-linear-to-br from-[#8b7cf6] to-[#22d3ee] text-[#0f0c1a] shadow-[0_10px_30px_-8px_rgba(34,211,238,0.55)] transition hover:scale-105 hover:brightness-110"
                >
                  <Zap className="size-7" strokeWidth={2.4} fill="currentColor" />
                </button>
              </div>
            )}

            {perfilSelecionado && (
              <p
                className={`${XsfontClass} mt-3 text-center text-muted-foreground`}
              >
                Arraste para a{" "}
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  esquerda para pular
                </span>{" "}
                ou para a{" "}
                <span className="font-semibold text-cyan-700 dark:text-cyan-300">
                  direita para conectar
                </span>
              </p>
            )}
          </div>

          {/* ===== COLUNA DIREITA / COMPATIBILIDADE ===== */}
          {perfilSelecionado ? (
            <aside className="flex min-h-179 flex-col rounded-3xl border border-fuchsia-blue-200/80 bg-fuchsia-blue-50/92 p-7 text-fuchsia-blue-950 shadow-xl backdrop-blur dark:border-fuchsia-blue-400/20 dark:bg-card/95 dark:text-card-foreground">
              {/* Título */}
              <div className="flex items-center gap-2 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                <Sparkles className="size-4" />
                <span
                  className={`${XsfontClass} font-semibold uppercase tracking-widest`}
                >
                  Compatibilidade de gameplay
                </span>
              </div>

              {/* ===== CÍRCULO + TEXTO ===== */}
              <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                {/*
                O círculo cresce conforme level = 0, 1 ou 2.
                O número usa XlfontClass e a legenda usa XsfontClass,
                então a legenda permanece claramente menor.
              */}
                <div
                  className="relative grid shrink-0 place-items-center"
                  style={{
                    width: tamanhoCirculo,
                    height: tamanhoCirculo,
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="size-full -rotate-90"
                    aria-hidden="true"
                  >
                    {/* Trilha do círculo - adapta ao tema */}
                    <circle
                      cx="50"
                      cy="50"
                      r={raioCirculo}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={espessuraCirculo}
                      className="text-foreground/10"
                    />

                    {/* Progresso colorido */}
                    <circle
                      cx="50"
                      cy="50"
                      r={raioCirculo}
                      fill="none"
                      stroke="url(#afinidadeGradient)"
                      strokeWidth={espessuraCirculo}
                      strokeLinecap="round"
                      strokeDasharray={circunferencia}
                      strokeDashoffset={progressoCirculo}
                      style={{
                        transition:
                          "stroke-dashoffset 0.7s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />

                    <defs>
                      <linearGradient
                        id="afinidadeGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#8b7cf6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Texto central.
                    Número e legenda escalam junto com o anel.
                    A legenda permanece bem menor, como no Figma. */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span
                      className={`${jetBrainsMono.className} whitespace-nowrap font-bold text-foreground tabular-nums`}
                      style={{
                        fontSize: numeroAfinidade,
                        lineHeight: 1,
                      }}
                    >
                      {afinidade}%
                    </span>

                    <span
                      className="mt-1 whitespace-nowrap font-medium uppercase text-muted-foreground"
                      style={{
                        fontSize: legendaAfinidade,
                        lineHeight: 1,
                        letterSpacing: "0.16em",
                      }}
                    >
                      afinidade
                    </span>
                  </div>
                </div>

                {/* Explicação */}
                <div className="min-w-0">
                  <p
                    className={`${smfontClass} leading-relaxed text-foreground/85`}
                  >
                    Vocês têm{" "}
                    <span className="font-semibold text-foreground">
                      {afinidade > 80 ? "ótima compatibilidade" : afinidade > 60 ? "alta compatibilidade" : afinidade < 40 ? "compatibilidade baixa" : "compatibilidade normal"}
                    </span>{" "}
                    de estilo, preferências e rotina de jogo.
                  </p>

                  <div
                    className={`${XsfontClass} mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-700 dark:text-emerald-300`}
                  >
                    <Shield className="size-3.5" />
                    Perfil respeitoso
                  </div>
                </div>
              </div>

              <div className="my-5 h-px w-full bg-border" />

              {/* ===== JOGO PREFERIDO ===== */}
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Gamepad2 className="size-4" />
                  <span
                    className={`${XsfontClass} font-semibold uppercase tracking-wider`}
                  >
                    Jogo preferido
                  </span>
                  <span
                    className={`${XsfontClass} ml-auto font-mono text-fuchsia-blue-700 dark:text-fuchsia-blue-300`}
                  >
                    1
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`${smfontClass} rounded-xl border border-fuchsia-blue-500/30 bg-fuchsia-blue-500/10 px-3 py-1.5 font-semibold text-foreground`}
                  >
                    {perfilSelecionado.jogo}
                  </span>
                </div>
              </div>

              <div className="my-5 h-px w-full bg-border" />

              {/* ===== COMPATIBILIDADE DO PERFIL ===== */}
              <div>
                <p
                  className={`${XsfontClass} mb-3 font-semibold uppercase tracking-widest text-muted-foreground`}
                >
                  Compatibilidade do perfil
                </p>

                <div className="flex flex-col gap-2">
                  {/* Gameplay */}
                  <div className="flex min-h-16.5 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                      <Swords className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`${XsfontClass} font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        Gameplay
                      </p>
                      <p className={`${smfontClass} truncate font-medium`}>
                        {perfilSelecionado.gameplay}
                      </p>
                    </div>

                    {mesmoGameplay ? (
                      <Check
                        className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>

                  {/* Horário */}
                  <div className="flex min-h-16.5 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                      <Clock3 className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`${XsfontClass} font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        Horário
                      </p>
                      <p className={`${smfontClass} truncate font-medium`}>
                        {perfilSelecionado.horario}
                      </p>
                    </div>

                    {mesmoHorario ? (
                      <Check
                        className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>

                  {/* Microfone */}
                  <div className="flex min-h-16.5 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                      {microfoneDisponivel ? (
                        <Mic className="size-4" />
                      ) : (
                        <MicOff className="size-4" />
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`${XsfontClass} font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        Microfone
                      </p>
                      <p className={`${smfontClass} truncate font-medium`}>
                        {perfilSelecionado.microfone}
                      </p>
                    </div>

                    {mesmoMicrofone ? (
                      <Check
                        className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>

                  {/* Plataforma */}
                  <div className="flex min-h-16.5 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                      <Monitor className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`${XsfontClass} font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        Plataforma
                      </p>
                      <p className={`${smfontClass} truncate font-medium`}>
                        {perfilSelecionado.plataforma}
                      </p>
                    </div>

                    {mesmaPlataforma ? (
                      <Check
                        className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>

                  {/* Idiomas */}
                  <div className="flex min-h-16.5 items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                      <Globe className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`${XsfontClass} font-semibold uppercase tracking-wider text-muted-foreground`}
                      >
                        Idioma
                      </p>
                      <p className={`${smfontClass} truncate font-medium`}>
                        {perfilSelecionado.idioma}
                      </p>
                    </div>

                    {mesmoIdioma ? (
                      <Check
                        className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ===== SINERGIA ===== */}
              {/* A cor muda conforme o tier para a qualidade ficar visível de imediato. */}
              <div className="mt-auto pt-6">
                <div
                  className={`relative overflow-hidden rounded-2xl border p-5 text-center ${tierInfo.borda}`}
                >
                  {/* brilho temático do tier */}
                  <div
                    className={`pointer-events-none absolute left-1/2 top-0 h-[150%] w-full -translate-x-1/2 ${tierInfo.brilho}`}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-3 grid size-14 place-items-center">
                      <Hexagon
                        className={`absolute size-full ${tierInfo.hexagono} ${tierInfo.fill}`}
                      />
                    </div>

                    <p
                      className={`${smfontClass} bg-linear-to-r ${tierInfo.tituloCor} bg-clip-text font-black uppercase tracking-[0.15em] text-transparent`}
                    >
                      {tierInfo.titulo}
                    </p>

                    <p
                      className={`${XsfontClass} mt-1 font-bold uppercase tracking-[0.2em] ${tierInfo.subtituloCor}`}
                    >
                      {tierInfo.subtitulo}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          ) : (
            <aside className="flex min-h-179 flex-col items-center justify-center rounded-3xl border border-fuchsia-blue-200/80 bg-fuchsia-blue-50/92 p-8 text-center text-fuchsia-blue-950 shadow-xl backdrop-blur dark:border-fuchsia-blue-400/20 dark:bg-card/95 dark:text-card-foreground">
              <Gamepad2 className="size-10 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />

              <h2 className={`${XlfontClass} mt-5 font-black`}>
                Fila concluída
              </h2>

              <p className={`${smfontClass} mt-3 max-w-sm text-muted-foreground`}>
                Quando houver novos jogadores disponíveis, a compatibilidade volta a aparecer aqui.
              </p>
            </aside>
          )}
        </div>
      </section>

      {/* ===== HUDDLE RECÍPROCO ===== */}
      {huddleFormado && (
        <div className="fixed inset-0 z-80 grid place-items-center bg-[#080711]/65 px-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl rounded-3xl border border-fuchsia-blue-300/20 bg-[#111020]/95 p-8 text-center text-white shadow-2xl sm:p-10"
          >
            <p
              className={`${XsfontClass} font-bold uppercase tracking-[0.28em] text-cyan-300`}
            >
              Conexão recíproca
            </p>

            <h2 className={`${Xl3fontClass} mt-3 font-black leading-tight`}>
              Novo Huddle!
            </h2>

            <p className={`${lgfontClass} mx-auto mt-4 max-w-md text-white/70`}>
              Você e{" "}
              <span className="font-bold text-white">
                {huddleFormado.nome}
              </span>{" "}
              escolheram jogar juntos.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/mensagens")}
                className={`${smfontClass} inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8b7cf6] to-[#22d3ee] px-5 font-black text-[#0f0c1a] transition hover:brightness-110`}
              >
                <MessageCircle className="size-5" />
                Ir para mensagens
              </button>

              <button
                type="button"
                onClick={() => setHuddleFormado(null)}
                className={`${smfontClass} min-h-12 rounded-xl border border-white/15 bg-white/5 px-5 font-bold text-white transition hover:bg-white/10`}
              >
                Continuar procurando
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
