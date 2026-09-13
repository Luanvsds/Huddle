import { MatchContent } from "./MatchContent";
import { MatchGuard } from "./MatchGuard";

export const metadata = {
  title: "Huddle | Match",
  description: "Encontre jogadores compatíveis com o seu estilo de gameplay.",
};

export default function MatchPage() {
  return (
    <MatchGuard>
      <MatchContent />
    </MatchGuard>
  );
}
