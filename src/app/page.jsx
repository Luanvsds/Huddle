import { HomeContent } from "./HomeContent.jsx";

// Exportação do metadata no Server Component
export const metadata = {
  title: "Huddle | Home",
  description:
    "Huddle é uma plataforma para conectar jogadores.",
};

export default function HomePage() {
  return <HomeContent />;
}