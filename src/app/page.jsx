import { HomeContent } from "./HomeContent.jsx";

// Exportação do metadata no Server Component
export const metadata = {
  title: "Huddle | Home",
  description:
    "Huddle é uma plataforma para conectar jogadores por afinidade, segurança e estilo de jogo.",
};

export default function HomePage() {
  return <HomeContent />;
}