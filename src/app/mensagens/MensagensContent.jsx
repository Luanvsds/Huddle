"use client";

import { useEffect, useState } from "react";
import { ConversationList } from "@/components/mensagens/ConversationList";
import { ChatArea } from "@/components/mensagens/ChatArea";

// ===== HORÁRIO DO HUDDLE =====
// Por enquanto usamos o horário em que a página foi carregada.
// Quando integrarmos com o Match/Huddle,
// esse horário será criado exatamente no momento da conexão.
const horarioDoHuddle = new Date().toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

const conversasIniciais = [
  {
    id: 1,
    nome: "LunaFPS",
    ultimaMensagem: "Oi! Tudo bem? Eu jogo de SUP, e você?",
    horario: horarioDoHuddle,
    online: true,
    naoLidas: 0,

    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "Oi! Tudo bem? Eu jogo de SUP, e você?",
        horario: horarioDoHuddle,
      },
    ],
  },

  {
    id: 2,
    nome: "MiraGG",
    ultimaMensagem: "Opa! Bora jogar alguma coisa qualquer hora?",
    horario: horarioDoHuddle,
    online: true,
    naoLidas: 1,

    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "Opa! Bora jogar alguma coisa qualquer hora?",
        horario: horarioDoHuddle,
      },
    ],
  },

  {
    id: 3,
    nome: "Nexusbr",
    ultimaMensagem: "E aí! Vi que nosso estilo de jogo combina bastante.",
    horario: horarioDoHuddle,
    online: false,
    naoLidas: 1,

    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "E aí! Vi que nosso estilo de jogo combina bastante.",
        horario: horarioDoHuddle,
      },
    ],
  },

  {
    id: 4,
    nome: "PixelRush",
    ultimaMensagem: "Fala! Quer combinar uma partida depois?",
    horario: horarioDoHuddle,
    online: false,
    naoLidas: 1,

    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "Fala! Quer combinar uma partida depois?",
        horario: horarioDoHuddle,
      },
    ],
  },
];

export function MensagensContent() {
  // ===== CONVERSAS =====
  const [conversas, setConversas] = useState(conversasIniciais);

  // ===== CONVERSA SELECIONADA =====
  // Guardamos apenas o id da conversa escolhida.
  const [conversaSelecionadaId, setConversaSelecionadaId] = useState(1);

  // ===== VISUALIZAÇÃO MOBILE =====
  // false = mostra a lista de conversas
  // true = mostra o chat aberto
  const [mostrarChatMobile, setMostrarChatMobile] = useState(false);

  // ===== HUDDLES VINDOS DA TELA DE MATCH =====
  // Ao abrir Mensagens, procura conversas criadas quando
  // aconteceu um Huddle recíproco.
  useEffect(() => {
    const conversasSalvas = JSON.parse(
      localStorage.getItem("huddleConversas") ?? "[]",
    );

    if (conversasSalvas.length === 0) {
      return;
    }

    setConversas((conversasAtuais) => {
      const conversasSemDuplicar = conversasAtuais.filter(
        (conversaAtual) =>
          !conversasSalvas.some(
            (conversaSalva) => conversaSalva.nome === conversaAtual.nome,
          ),
      );

      return [...conversasSalvas, ...conversasSemDuplicar];
    });
  }, []);

  // ===== SELECIONAR CONVERSA =====
  // Abre a conversa, marca como lida
  // e no mobile troca a lista pelo chat.
  function selecionarConversa(id) {
    setConversaSelecionadaId(id);

    setMostrarChatMobile(true);

    setConversas((conversasAtuais) =>
      conversasAtuais.map((conversa) => {
        if (conversa.id !== id) {
          return conversa;
        }

        return {
          ...conversa,
          naoLidas: 0,
        };
      }),
    );
  }

  // ===== CONVERSA ATUAL =====
  // Procura dentro do array a conversa cujo id
  // é igual ao id que está salvo no estado.
  const conversaSelecionada = conversas.find(
    (conversa) => conversa.id === conversaSelecionadaId,
  );

  // ===== ENVIAR NOVA MENSAGEM =====
  function enviarMensagem(texto) {
    // Evita enviar mensagem vazia ou só com espaços.
    if (!texto.trim()) {
      return;
    }

    // Pega o horário atual do computador do usuário.
    const horarioAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Atualiza o array de conversas.
    setConversas((conversasAtuais) =>
      conversasAtuais.map((conversa) => {
        // Se NÃO for a conversa que está aberta,
        // devolvemos ela sem alterar nada.
        if (conversa.id !== conversaSelecionadaId) {
          return conversa;
        }

        // Se for a conversa aberta,
        // criamos uma nova versão dela com a nova mensagem.
        return {
          ...conversa,

          ultimaMensagem: texto,
          horario: horarioAtual,

          mensagens: [
            ...conversa.mensagens,
            {
              id: Date.now(),
              autor: "eu",
              texto: texto,
              horario: horarioAtual,
            },
          ],
        };
      }),
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
      <section className="mx-auto w-full max-w-[1500px] px-6 py-8">
        <div className="flex min-h-[680px] overflow-hidden rounded-3xl border border-border bg-card">
          {/* ===== LISTA DE CONVERSAS ===== */}
          {/* No mobile some quando uma conversa é aberta.
      No desktop permanece sempre visível. */}
          <div
            className={`
      w-full
      shrink-0
      lg:block
      lg:w-[340px]
      ${mostrarChatMobile ? "hidden" : "block"}
    `}
          >
            <ConversationList
              conversas={conversas}
              conversaSelecionadaId={conversaSelecionadaId}
              onSelecionarConversa={selecionarConversa}
            />
          </div>

          {/* ===== CHAT ===== */}
          {/* No mobile só aparece depois que escolhemos alguém.
      No desktop permanece sempre visível. */}
          <div
            className={`
      min-w-0
      flex-1
      lg:flex
      ${mostrarChatMobile ? "flex" : "hidden"}
    `}
          >
            <ChatArea
              conversa={conversaSelecionada}
              onEnviarMensagem={enviarMensagem}
              onVoltar={() => setMostrarChatMobile(false)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
