import { useFontSize } from "@/components/ui/layout/font-size";

export function ConversationItem({ conversa, selecionada, onClick }) {
  const { smfontClass, lgfontClass } = useFontSize();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-2xl
				border-l-4
        px-3
        py-3
        text-left
				transition-colors duration-75
        ${
          selecionada
            ? "border-l-fuchsia-blue-500 bg-fuchsia-blue-600/15"
            : "border-l-transparent hover:bg-muted/50"
        }
      `}
    >
      {/* ===== INICIAIS DO JOGADOR ===== */}
      <div className="relative shrink-0">
        <div
          className={`
            flex
            size-11
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

        {/* Só aparece se o jogador estiver online */}
        {conversa.online && (
          <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-emerald-400" />
        )}
      </div>

      {/* ===== INFORMAÇÕES DA CONVERSA ===== */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className={`${lgfontClass} truncate font-bold`}>{conversa.nome}</p>
          <span className={`${smfontClass} shrink-0 text-muted-foreground`}>
            {conversa.horario}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className={`${smfontClass} truncate text-muted-foreground`}>
            {conversa.ultimaMensagem}
          </p>

          {/* Só aparece se houver mensagem não lida */}
          {conversa.naoLidas > 0 && (
            <span
              className={`
                flex
                min-w-6
                items-center
                justify-center
                rounded-full
                bg-fuchsia-blue-600
                px-1.5
                py-0.5
                ${smfontClass}
                font-bold
                text-white
              `}
            >
              {conversa.naoLidas}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
