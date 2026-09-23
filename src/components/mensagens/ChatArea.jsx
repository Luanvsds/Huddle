import { ArrowLeft, Gamepad2, Info, MoreVertical } from "lucide-react";
import { MensagemBubble } from "./MensagemBubble";
import { useFontSize } from "@/components/ui/layout/font-size";
import { MensagemInput } from "./MensagemInput";

export function ChatArea({ conversa, onEnviarMensagem, onVoltar }) {
  const { smfontClass, lgfontClass, XlfontClass } = useFontSize();

  if (!conversa) {
    return null;
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background/40">
      {/* ===== CABEÇALHO DA CONVERSA ===== */}
      <header className="flex min-h-20 items-center justify-between border-b border-border px-6">
        <div className="flex min-w-0 items-center gap-3">

          {/* ===== VOLTAR PARA CONVERSAS ===== */}
          <button
            type="button"
            onClick={onVoltar}
            title="Voltar para conversas"
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-5" />
          </button>

          {/* Iniciais do jogador */}
          <div
            className={`
              flex
              size-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-fuchsia-blue-400/30
              bg-fuchsia-blue-600/10
              ${lgfontClass}
              font-bold
            `}
          >
            {conversa.nome.slice(0, 2)}
          </div>

          <div className="min-w-0">
            <h2 className={`${XlfontClass} truncate font-black`}>
              {conversa.nome}
            </h2>

            <div className="mt-0.5 flex items-center gap-2">
              <span
                className={`
                  size-2
                  rounded-full
                  ${
                    conversa.online
                      ? "bg-emerald-400"
                      : "bg-muted-foreground/50"
                  }
                `}
              />

              <p className={`${smfontClass} text-muted-foreground`}>
                {conversa.online ? "Online agora" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* ===== AÇÕES DO CABEÇALHO ===== */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Informações"
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-75 hover:bg-muted hover:text-foreground"
          >
            <Info className="size-5" />
          </button>

          <button
            type="button"
            title="Mais opções"
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-75 hover:bg-muted hover:text-foreground"
          >
            <MoreVertical className="size-5" />
          </button>
        </div>
      </header>

      {/* ===== ÁREA DAS MENSAGENS ===== */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Mensagem especial mostrando que a conversa nasceu de um Huddle */}
        <div className="mb-8 flex justify-center">
          <div
            className={`
              flex
              items-center
              gap-2
              rounded-full
              border
              border-fuchsia-blue-400/20
              bg-fuchsia-blue-600/10
              px-4
              py-2
              ${smfontClass}
              text-muted-foreground
            `}
          >
            <Gamepad2 className="size-4 text-fuchsia-blue-500" />
            Vocês formaram um Huddle
          </div>
        </div>

        {/* ===== BUBBLES ===== */}
        <div className="space-y-3">
          {conversa.mensagens.map((mensagem) => (
            <MensagemBubble key={mensagem.id} mensagem={mensagem} />
          ))}
        </div>
      </div>

      {/* ===== CAMPO PARA ENVIAR MENSAGEM ===== */}
      <div className="border-t border-border px-6 py-4">
        <MensagemInput onEnviarMensagem={onEnviarMensagem} />
      </div>
    </section>
  );
}
