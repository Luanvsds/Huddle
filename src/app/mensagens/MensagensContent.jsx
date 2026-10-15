"use client";

import { useEffect, useState } from "react";
import { ConversationList } from "@/components/mensagens/ConversationList";
import { ChatArea } from "@/components/mensagens/ChatArea";
import { useAuth } from "@/components/hook/useAuth";


export function MensagensContent() {
  const autorizado = useAuth();
  const [conversas, setConversas] = useState([]);
  
  useEffect(() => {
    const huddles = JSON.parse(localStorage.getItem("huddle_conexoes") ?? "[]");
  
  setConversas(
      huddles.map((huddle, indice) => ({
        id: indice + 1,
        nome: huddle.nome,
        ultimaMensagem: huddle.ultimaMensagem,
        horario: huddle.horario,
        online: false,
        naoLidas: 1,
        mensagens: huddle.mensagens,
    }))
  );
  }, []);

  const [conversaSelecionadaId, setConversaSelecionadaId] = useState(null);


const [mostrarChatMobile, setMostrarChatMobile] = useState(false);
if (!autorizado) return null;


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

  const conversaSelecionada = conversas.find(
    (conversa) => conversa.id === conversaSelecionadaId,
  );

  // ===== ENVIAR NOVA MENSAGEM =====
  function enviarMensagem(texto) {
    if (!texto.trim()) {
      return;
    }

    const horarioAtual = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setConversas((conversasAtuais) =>
      conversasAtuais.map((conversa) => {
        if (conversa.id !== conversaSelecionadaId) {
          return conversa;
        }

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
