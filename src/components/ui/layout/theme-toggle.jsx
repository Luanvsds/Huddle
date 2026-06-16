"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  // Estado que controla se o dark mode está ligado ou desligado
    const [temaEscuro, setTemaEscuro] = useState(false);

    function mudarTema() {
    if (temaEscuro) {
    document.documentElement.classList.remove("dark");
    setTemaEscuro(false);
    } else {
    document.documentElement.classList.add("dark");
    setTemaEscuro(true);
    }
}

    return (
        <Button
            type="button"
            onClick={mudarTema}
            variant="outline"
            size="icon"
            className="fixed right-16 top-4 z-50 rounded-full border-fuchsia-blue-200 bg-white/90 text-fuchsia-blue-800 shadow-md backdrop-blur hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/90 dark:text-fuchsia-blue-100 dark:hover:bg-fuchsia-blue-900 md:right-4"
            aria-label="Alternar tema"
    >
    {temaEscuro ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
);
}