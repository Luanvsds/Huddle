import { SobreContent } from "./SobreContent";

// Exportação do metadata no Server Component
export const metadata = {
  title: "Huddle | Sobre Nós",
  description:
    "Conheça a proposta do Huddle e as pessoas que fizeram esse projeto acontecer.",
};

export default function SobrePage() {
  return <SobreContent />;
}