"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";

import { useFontSize } from "@/components/ui/layout/font-size";

export function MensagemInput({ onEnviarMensagem }) {
  const { lgfontClass } = useFontSize();

  // ===== TEXTO DIGITADO =====
  const [texto, setTexto] = useState("");

  // ===== ENVIAR =====
  function enviar() {
    if (!texto.trim()) {
      return;
    }

    onEnviarMensagem(texto);

    setTexto("");
  }

  // ===== ENTER =====
  function aoPressionarTecla(evento) {
    if (evento.key === "Enter") {
      enviar();
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* ===== ANEXOS FUTUROS ===== */}
      <button
        type="button"
        title="Adicionar"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-75 hover:bg-muted hover:text-foreground"
      >
        <Plus className="size-5" />
      </button>

      {/* ===== CAMPO DA MENSAGEM ===== */}
      <input
        type="text"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        onKeyDown={aoPressionarTecla}
        placeholder="Digite uma mensagem..."
        className={`${lgfontClass} min-w-0 flex-1 rounded-2xl border border-border bg-muted/40 px-4 py-3 outline-none transition-colors duration-75 placeholder:text-muted-foreground focus:border-fuchsia-blue-500`}
      />

      {/* ===== BOTÃO ENVIAR ===== */}
      <button
        type="button"
        onClick={enviar}
        title="Enviar mensagem"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-slate-950 transition-colors duration-75 hover:bg-cyan-400"
      >
        <Send className="size-5" />
      </button>
    </div>
  );
}
