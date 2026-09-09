"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFontSize } from "./font-size";
import { useState, useEffect } from "react";


export default function Header() {
  const { XlfontClass, smfontClass } = useFontSize();
  const pathname = usePathname();
  const [apelido, setApelido] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const apelidoSalvo = localStorage.getItem("user_apelido");
    if (apelidoSalvo) {
      setApelido(apelidoSalvo);
    }
    setCarregando(false);
  }, []);

  // Evita renderizar antes de verificar o localStorage no cliente
  if (carregando) {
    return null; // Ou um estado visual neutro (Skeleton/Spinner)
  }

  return (
    <header className="w-full bg-fuchsia-blue-600 text-white">
      <nav className="mx-auto flex max-w-6xl text items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/header-pinguim.png"
            alt="Logo do Huddle"
            width={50}
            height={50}
          />
          <span className={`${XlfontClass} font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100 pr-20`}>Huddle</span>
        </Link>

        <div className={`hidden items-center gap-4 ${smfontClass} font-medium md:flex`}>
          <Link
            href="/"
            className={`rounded-md px-3 py-2 ${XlfontClass} transition-colors ${pathname === "/"
              ? "bg-fuchsia-blue-700 text-white"
              : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
              }`}
          >
            Home
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          {apelido ?
            <Link
              href="/perfil"
              className={`rounded-md px-3 py-2 ${XlfontClass} transition-colors ${pathname === "/conecte-se"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
                }`}
            >
              Perfil
            </Link>
            : <Link
              href="/conecte-se"
              className={`rounded-md px-3 py-2 ${XlfontClass} transition-colors ${pathname === "/conecte-se"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
                }`}
            >
              Conecte-se
            </Link>}
          <span className="border-l border-white/40 h-5"></span>
          <Link
            href="/sobre"
            className={`rounded-md px-3 py-2 ${XlfontClass} transition-colors ${pathname === "/sobre"
              ? "bg-fuchsia-blue-700 text-white"
              : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
              }`}
          >
            Sobre Nós
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          <Link
            href="/dados"
            className={`rounded-md px-3 py-2 ${XlfontClass} transition-colors ${pathname === "/dados"
              ? "bg-fuchsia-blue-700 text-white"
              : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
              }`}
          >
            Dados
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          <Link
            href="/faq"
            className={`rounded-md px-3 py-2 ${XlfontClass} transition-colors ${pathname === "/faq"
              ? "bg-fuchsia-blue-700 text-white"
              : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
              }`}
          >
            FAQ
          </Link>
          {apelido ?
            <Link href="/perfil" className="flex items-center gap-2 pl-30">
              <span className={`${XlfontClass} font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100`}>{apelido}</span>
              <Image
                src="/imagem-de-usuario.png"
                alt="Símbolo de usuário"
                width={50}
                height={50}
              />
            </Link>
            : <Link href="/conecte-se" className="flex items-center gap-2 pl-30">
              <span className={`${XlfontClass} font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100`}>Cadastro</span>
              <Image
                src="/imagem-de-usuario.png"
                alt="Símbolo de usuário"
                width={50}
                height={50}
              />
            </Link>}
        </div>

        <details className="relative md:hidden">
          <summary className={`cursor-pointer list-none rounded-md border border-white/40 px-3 py-1 ${XlfontClass}`} >
            ☰
          </summary>

          <div className={`absolute right-0 top-10 z-50 flex w-44 flex-col rounded-md bg-purple-700 p-4 ${smfontClass} font-medium shadow-lg`}>
            <Link href="/" className="py-2">
              Home
            </Link>

            <Link href="/conecte-se" className="py-2">
              Conecte-se
            </Link>

            <Link href="/sobre" className="py-2">
              Sobre Nós
            </Link>

            <Link href="/dados" className="py-2">
              Dados
            </Link>

            <Link href="/faq" className="py-2">
              FAQ
            </Link>
          </div>
        </details>
      </nav>
    </header >
  );
}
