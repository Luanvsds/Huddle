"use client";

import { useState, useEffect } from "react";
import { Minus, Moon, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFontSize } from "@/components/ui/layout/font-size";


export default function ThemeToggle() {
const [temaEscuro, setTemaEscuro] = useState(false);

const { increase, decrease, canIncrease, canDecrease } = useFontSize();

// 1. Lê o cookie ao carregar a página (F5)
useEffect(() => {
    // Procura pelo cookie "temaEscuro"
    const match = document.cookie.match(new RegExp('(^| )temaEscuro=([^;]+)'));
    
    if (match) {
        const isDark = match[2] === "true";
        setTemaEscuro(isDark);
        
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }
}, []);

function mudarTema() {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    
    document.cookie = `temaEscuro=${novoTema}; path=/; max-age=10800`;

    if (novoTema) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

return (
    <div>
        <Button
            type="button"
            onClick={mudarTema}
            variant="outline"
            size="icon"
            className="fixed left-16 top-4 z-50 rounded-full border-fuchsia-blue-200 bg-white/90 text-fuchsia-blue-800 shadow-md backdrop-blur hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/90 dark:text-fuchsia-blue-100 dark:hover:bg-fuchsia-blue-900"
            aria-label="Alternar tema"
        >
            {temaEscuro ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        <Button
            onClick={decrease}
            disabled={!canDecrease}
            size="icon"
            className="fixed left-7 top-4 z-50 rounded-full border-fuchsia-blue-200 bg-white/90 text-fuchsia-blue-800 shadow-md backdrop-blur hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/90 dark:text-fuchsia-blue-100 dark:hover:bg-fuchsia-blue-900"
            aria-label="Diminuir fonte"
        >
            <Minus />
        </Button>
        <Button
            onClick={increase}
            disabled={!canIncrease}
            size="icon"
            className="fixed left-25 top-4 z-50 rounded-full border-fuchsia-blue-200 bg-white/90 text-fuchsia-blue-800 shadow-md backdrop-blur hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/90 dark:text-fuchsia-blue-100 dark:hover:bg-fuchsia-blue-900"
            aria-label="Aumentar fonte"
        >
            <Plus />
        </Button>
    </div>
);
}