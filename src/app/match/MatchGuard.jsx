"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function MatchGuard({ children }) {
  const router = useRouter();

  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const apelido = localStorage.getItem("user_apelido");
    const email = localStorage.getItem("user_email");

    // Sem usuário cadastrado/logado:
    // não deixa acessar diretamente /match.
    if (!apelido || !email) {
      router.replace("/conecte-se");
      return;
    }

    setAutorizado(true);
  }, [router]);

  // Evita a tela de Match aparecer por um instante
  // antes da verificação.
  if (!autorizado) {
    return null;
  }

  return children;
}
