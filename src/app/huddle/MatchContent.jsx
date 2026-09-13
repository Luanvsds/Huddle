"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
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
} from "lucide-react";

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
    afinidade: 87,
    huddleReciproco: false,
    mensagemInicial: "Oi! Tudo bem? Vi que nossos horários combinam. Bora jogar qualquer hora?",
    banner:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&h=520&fit=crop&auto=format",
  },
  {
    nome: "MiraGG",
    jogo: "Valorant",
    microfone: "Não disponível",
    gameplay: "Casual",
    horario: "Tarde",
    plataforma: "Console",
    afinidade: 72,
    huddleReciproco: true,
    mensagemInicial: "Opa! Tranquilo? Quer jogar alguma coisa qualquer hora?",
    banner:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&h=520&fit=crop&auto=format",
  },
  {
    nome: "Nexusbr",
    jogo: "God of War",
    microfone: "Disponível",
    gameplay: "Competitivo",
    horario: "Manhã",
    plataforma: "PC",
    afinidade: 90,
    huddleReciproco: false,
    mensagemInicial: "Fala! Vi que você também curte jogar mais competitivo. Bora marcar uma?",
    banner:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&h=520&fit=crop&auto=format",
  },
  {
    nome: "PixelRush",
    jogo: "League of Legends",
    microfone: "Disponível",
    gameplay: "Casual",
    horario: "Fins de semana",
    plataforma: "PC",
    afinidade: 78,
    huddleReciproco: true,
    mensagemInicial: "Oi! Tudo certo? Quer combinar uma partida no fim de semana?",
    banner:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1000&h=520&fit=crop&auto=format",
  },
];

const perfilUsuario = {
  jogo: "The Legend of Zelda",
  gameplay: "Tryhard",
  horario: "Noite",
  microfone: "Disponível",
  plataforma: "PC",
};

export function MatchContent() {
  const {
    level,
    XsfontClass,
    smfontClass,
    lgfontClass,
    XlfontClass,
    Xl3fontClass,
  } = useFontSize();

  const router = useRouter();

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
  const afinidade = perfilSelecionado?.afinidade ?? 0;

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
    perfilUsuario.gameplay === perfilSelecionado.gameplay;
  const mesmoHorario =
    perfilSelecionado &&
    perfilUsuario.horario === perfilSelecionado.horario;
  const mesmoMicrofone =
    perfilSelecionado &&
    perfilUsuario.microfone === perfilSelecionado.microfone;
  const mesmaPlataforma =
    perfilSelecionado &&
    perfilUsuario.plataforma === perfilSelecionado.plataforma;

  // ===== SELO DE SINERGIA =====
  // Cada tier usa uma família de cores diferente para a qualidade
  // da sinergia ficar evidente só de bater o olho.
  const tierInfo =
    afinidade >= 90
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
      }
      : afinidade >= 75
        ? {
          titulo: "SINERGIA TIER A",
          subtitulo: "CONEXÃO MUITO FORTE",
          borda:
            "border-cyan-500/30 bg-cyan-50/80 dark:border-cyan-400/25 dark:bg-cyan-500/5",
          brilho:
            "bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.20),transparent_62%)]",
          hexagono: "text-cyan-600/30 dark:text-cyan-300/25",
          mascote: "text-cyan-700 dark:text-cyan-300",
          tituloCor:
            "from-cyan-800 via-sky-500 to-cyan-700 dark:from-cyan-200 dark:via-sky-300 dark:to-cyan-200",
          subtituloCor: "text-cyan-800/70 dark:text-cyan-300/70",
        }
        : afinidade >= 60
          ? {
            titulo: "SINERGIA TIER B",
            subtitulo: "BOA SINCRONIA",
            borda:
              "border-violet-500/30 bg-violet-50/80 dark:border-violet-400/25 dark:bg-violet-500/5",
            brilho:
              "bg-[radial-gradient(ellipse_at_top,rgba(139,124,246,0.20),transparent_62%)]",
            hexagono: "text-violet-600/30 dark:text-violet-300/25",
            mascote: "text-violet-700 dark:text-violet-300",
            tituloCor:
              "from-violet-800 via-fuchsia-blue-600 to-violet-700 dark:from-violet-200 dark:via-fuchsia-blue-300 dark:to-violet-200",
            subtituloCor: "text-violet-800/70 dark:text-violet-300/70",
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
          };

  const microfoneDisponivel = perfilSelecionado?.microfone === "Disponível";

  function proximoPerfil() {
    // Não volta ao começo: cada card é tratado uma única vez.
    setPerfilAtual((indiceAtual) => indiceAtual + 1);
  }

  // ===== REGISTRA UM HUDDLE PARA A PÁGINA DE MENSAGENS =====
  // É um mock simples para a integração entre as telas.
  // Depois, quando os dados reais do Carlos estiverem prontos,
  // este objeto poderá vir do banco/estado global.
  function salvarHuddleParaMensagens(perfil) {
    if (typeof window === "undefined") return;

    const horarioDoHuddle = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const novaConversa = {
      id: `huddle-${perfil.nome.toLowerCase()}`,
      nome: perfil.nome,
      ultimaMensagem: perfil.mensagemInicial,
      horario: horarioDoHuddle,
      online: true,
      naoLidas: 1,
      mensagens: [
        {
          id: Date.now(),
          autor: "outro",
          texto: perfil.mensagemInicial,
          horario: horarioDoHuddle,
        },
      ],
    };

    const chave = "huddleConversas";
    const conversasSalvas = JSON.parse(localStorage.getItem(chave) ?? "[]");

    const jaExiste = conversasSalvas.some(
      (conversa) => conversa.nome === perfil.nome,
    );

    if (!jaExiste) {
      localStorage.setItem(
        chave,
        JSON.stringify([novaConversa, ...conversasSalvas]),
      );
    }
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

    // O card sempre sai da fila, tanto ao pular quanto ao conectar.
    proximoPerfil();

    // MOCK: somente o 2º e o 4º perfil aceitam de volta.
    // Nesses casos existe um Huddle recíproco.
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
                <span className="h-[3px] w-14 -rotate-6 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.18)]" />
                <span className="ml-4 h-[3px] w-20 -rotate-6 rounded-full bg-white/40" />
                <span className="ml-8 h-[3px] w-12 -rotate-6 rounded-full bg-white/25" />
                <span className="ml-3 h-[3px] w-9 -rotate-6 rounded-full bg-white/15" />
              </motion.div>

              {/* ===== RASTRO PARA CONECTAR ===== */}
              <motion.div
                style={{ opacity: opacidadeRastroDireita }}
                className="pointer-events-none absolute -right-16 top-1/2 z-0 flex -translate-y-1/2 flex-col items-end gap-3"
                aria-hidden="true"
              >
                <span className="h-[3px] w-14 rotate-6 rounded-full bg-cyan-300/85 shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
                <span className="mr-4 h-[3px] w-20 rotate-6 rounded-full bg-cyan-300/55" />
                <span className="mr-8 h-[3px] w-12 rotate-6 rounded-full bg-cyan-300/30" />
                <span className="mr-3 h-[3px] w-9 rotate-6 rounded-full bg-cyan-300/20" />
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
                    <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
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

                    <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
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

                    <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
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

                    <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/60 bg-white/45 px-4 py-3.5 dark:border-border dark:bg-muted/35">
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
                  <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
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

                  <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
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

                  <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
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

                  <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-4 py-3.5 dark:border-border dark:bg-muted/45">
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
          <aside className="flex min-h-[680px] flex-col rounded-3xl border border-fuchsia-blue-200/80 bg-fuchsia-blue-50/92 p-7 text-fuchsia-blue-950 shadow-xl backdrop-blur dark:border-fuchsia-blue-400/20 dark:bg-card/95 dark:text-card-foreground">
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
                    alta compatibilidade
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
                <div className="flex min-h-[66px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
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
                <div className="flex min-h-[66px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
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
                <div className="flex min-h-[66px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
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
                <div className="flex min-h-[66px] items-center gap-3 rounded-2xl border border-fuchsia-blue-200/70 bg-white/55 px-3.5 py-2.5 dark:border-border dark:bg-muted/30">
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
                      className={`absolute inset-0 size-full ${tierInfo.hexagono}`}
                    />
                    <HuddleMascot
                      className={`relative z-10 size-7 ${tierInfo.mascote}`}
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
            <aside className="flex min-h-[680px] flex-col items-center justify-center rounded-3xl border border-fuchsia-blue-200/80 bg-fuchsia-blue-50/92 p-8 text-center text-fuchsia-blue-950 shadow-xl backdrop-blur dark:border-fuchsia-blue-400/20 dark:bg-card/95 dark:text-card-foreground">
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
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#080711]/65 px-4 backdrop-blur-md">
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
