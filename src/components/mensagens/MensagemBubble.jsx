import { useFontSize } from "@/components/ui/layout/font-size";

export function MensagemBubble({ mensagem }) {
  const { smfontClass, lgfontClass } = useFontSize();

  const enviadaPorMim = mensagem.autor === "eu";

  return (
    <div
      className={`
        flex
        w-full
        ${enviadaPorMim ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          max-w-[70%]
          rounded-2xl
          px-4
          py-3
          shadow-sm
          ${enviadaPorMim
            ? "rounded-br-md bg-fuchsia-blue-600 text-white"
            : "rounded-bl-md border border-border bg-card text-card-foreground"
          }
        `}
      >
        {/* ===== TEXTO ===== */}
        <p className={`${lgfontClass} leading-relaxed`}>{mensagem.texto}</p>

        {/* ===== HORÁRIO ===== */}
        <p
          className={`
            mt-1
            text-right
            ${smfontClass}
            ${enviadaPorMim ? "text-white/65" : "text-muted-foreground"}
          `}
        >
          {mensagem.horario}
        </p>
      </div>
    </div>
  );
}
