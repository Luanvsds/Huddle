"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { ConversationItem } from "./ConversationItem";
import { useFontSize } from "@/components/ui/layout/font-size";

export function ConversationList({
  conversas,
  conversaSelecionadaId,
  onSelecionarConversa,
}) {
  const {
    smfontClass,
    lgfontClass,
    XlfontClass,
  } = useFontSize();

  const [busca, setBusca] = useState("");

  const conversasFiltradas = conversas.filter((conversa) =>
    conversa.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <aside className="h-full w-full border-r border-border bg-card">
      {/* ===== CABEÇALHO ===== */}
      <div className="border-b border-border p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className={`${XlfontClass} font-black`}>
              Conversas
            </h1>

            <p
              className={`${smfontClass} mt-1 font-semibold uppercase tracking-wider text-muted-foreground`}
            >
              Seus Huddles
            </p>
          </div>
        </div>

        {/* ===== CAMPO DE BUSCA ===== */}
        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Buscar conversa"
            className={`${lgfontClass} w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-10 pr-4 outline-none transition placeholder:text-muted-foreground focus:border-fuchsia-blue-500`}
          />
        </div>
      </div>

      {/* ===== LISTA DE CONVERSAS ===== */}
      <div className="p-2">
        {conversasFiltradas.map((conversa) => (
          <ConversationItem
            key={conversa.id}
            conversa={conversa}
            selecionada={conversa.id === conversaSelecionadaId}
            onClick={() => onSelecionarConversa(conversa.id)}
          />
        ))}
      </div>
    </aside>
  );
}