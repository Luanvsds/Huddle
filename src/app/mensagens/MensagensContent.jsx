"use client";

import { useEffect, useState } from "react";
import { ConversationList } from "@/components/mensagens/ConversationList";
import { ChatArea } from "@/components/mensagens/ChatArea";
import { useAuth } from "@/components/hook/useAuth";

const conversasIniciais = [
  {
    id: 1,
    nome: "LunaFPS",
    ultimaMensagem: "Topo qualquer um!",
    horario: "",
    online: false,
    naoLidas: 1,

    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "Oii, prazer te conhecer!",
        horario: "",
      },
      {
        id: 2,
        autor: "outro",
        texto: "Gosto de vários tipos de jogos, tem algum que você prefira?",
        horario: "",
      },
      {
        id: 3,
        autor: "outro",
        texto: "Topo qualquer um!",
        horario: "",
      }
    ],
  },
  {
    id: 2,
    nome: "MiraGG",
    ultimaMensagem: "Partiu um Valorant?",
    horario: "",
    online: false,
    naoLidas: 1,
    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "Só os MVPs aqui!",
        horario: "",
      },
      {
        id: 2,
        autor: "outro",
        texto: "Partiu um Valorant?",
        horario: "",
      }
    ],
  },
  {
    id: 3,
    nome: "PixelRush",
    ultimaMensagem: "O que acha de procurar uma partida comigo e meus amigos?",
    horario: "",
    online: false,
    naoLidas: 1,
    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "Fala aí, incrível o seu perfil!.",
        horario: "",
      },
      {
        id: 2,
        autor: "outro",
        texto: "O que acha de procurar uma partida comigo e meus amigos?",
        horario: "",
      }
    ],
  },
  {
    id: 4,
    nome: "Nexusbr",
    ultimaMensagem: "E aí! Vi que nosso estilo de jogo combina bastante. Bora jogar?",
    horario: "",
    online: false,
    naoLidas: 1,
    mensagens: [
      {
        id: 1,
        autor: "outro",
        texto: "E aí! Vi que nosso estilo de jogo combina bastante. Bora jogar?",
        horario: "",
      }
    ],
  }
];

export function MensagensContent() {
  // ===== CONVERSAS =====
  const autorizado = useAuth()
  const [conversas, setConversas] = useState([]);
  
  useEffect(() => {
    const nomesComMatch = JSON.parse(
      localStorage.getItem("huddle_nomes") ?? "[]"
    );
    
    const conversasFiltradas = conversasIniciais.filter((conversa) =>
      nomesComMatch.includes(conversa.nome)
  );
  
  setConversas(
    conversasFiltradas.map((conversa) => ({
      ...conversa,
      horario:
      localStorage.getItem(
        `huddle_horario_${conversa.nome}`
      ) ?? "",
      
      mensagens: conversa.mensagens.map((mensagem) => ({
        ...mensagem,
        horario:
        localStorage.getItem(
          `huddle_horario_${conversa.nome}`
        ) ?? "",
      })),
    }))
  );
}, []);;
// ===== CONVERSA SELECIONADA =====
// Guardamos apenas o id da conversa escolhida.
const [conversaSelecionadaId, setConversaSelecionadaId] = useState(1);

// ===== VISUALIZAÇÃO MOBILE =====
// false = mostra a lista de conversas
// true = mostra o chat aberto
const [mostrarChatMobile, setMostrarChatMobile] = useState(false);
if (!autorizado) return null;

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
      <section className="mx-auto w-full max-w-375 px-6 py-8">
        <div className="flex min-h-170 overflow-hidden rounded-3xl border border-border bg-card">
          {/* ===== LISTA DE CONVERSAS ===== */}
          <div
            className={`
  w-full
  shrink-0
  lg:block
  lg:w-85
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
          <div
            className={`
  min-w-0
  flex-1
  lg:
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
