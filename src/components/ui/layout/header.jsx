"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, Minus, Moon, Plus, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "../meuAvatarDropdown";
import { useFontSize } from "./font-size";

function handleLogout() {
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_senha");
  localStorage.removeItem("user_dataNascimento");
  localStorage.removeItem("user_apelido");
  localStorage.removeItem("user_gameplay");
  localStorage.removeItem("user_selectedGame");
  localStorage.removeItem("user_horarios");

  window.location.href = "/";
}

export default function Header() {
  const pathname = usePathname();

  const {
    level,
    smfontClass,
    sm2fontClass,
    increase,
    decrease,
    canIncrease,
    canDecrease,
    lgFontSize,
  } = useFontSize();

  const [apelido, setApelido] = useState(null);
  const [logado, setLogado] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // ===== Verifica login e tema =====
  useEffect(() => {
    const apelidoSalvo = localStorage.getItem("user_apelido");
    const emailSalvo = localStorage.getItem("user_email");

    setApelido(apelidoSalvo);

    // Por enquanto, estes dados representam o login do projeto.
    setLogado(Boolean(apelidoSalvo && emailSalvo));

    const cookieTema = document.cookie.match(
      new RegExp("(^| )temaEscuro=([^;]+)"),
    );

    if (cookieTema) {
      const escuro = cookieTema[2] === "true";

      setTemaEscuro(escuro);

      if (escuro) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    setCarregando(false);
  }, []);

  // ===== Alterna tema claro / escuro =====
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

  // ===== Tamanhos que acompanham a acessibilidade =====
  // Não aumentamos apenas o texto:
  // os controles e o avatar também crescem um pouco.
  const tamanhoControle =
    level === 0 ? "size-10" : level === 1 ? "size-11" : "size-20";

  const tamanhoLogo =
    level === 0 ? "size-9" : level === 1 ? "size-12" : "size-23";

  const tamanhoIcone =
    level === 0 ? "size-5" : level === 1 ? "size-[22px]" : "size-10";

  // ===== Links do Header =====
  const links = [
    {
      href: "/",
      nome: "Home",
    },

    {
      href: logado ? "/perfil" : "/conecte-se",
      nome: logado ? "Perfil" : "Cadastro",
    },

    // Match só aparece para usuário logado
    ...(logado
      ? [
          {
            href: "/match",
            nome: "Match",
          },
        ]
      : []),

    {
      href: "/sobre",
      nome: "Sobre",
    },

    {
      href: "/dados",
      nome: "Dados",
    },

    {
      href: "/faq",
      nome: "FAQ",
    },
  ];

  // ===== Estilo de cada link =====
  function classeLink(href) {
    const ativo = pathname === href;

    return `
      ${sm2fontClass}
      rounded-lg
      px-3
      py-1.5
      font-medium
      whitespace-nowrap
      transition-all
      duration-200
      ${
        ativo
          ? "bg-white/12 text-white ring-1 ring-white/10"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      }
    `;
  }

  if (carregando) {
    return null;
  }

  return (
    <header className="relative z-50 w-full bg-fuchsia-blue-600 text-white">
      <nav className="relative flex w-full items-center justify-between px-5 py-3 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* =====================================================
            ESQUERDA: CONTROLES + LOGO
        ====================================================== */}
        <div className="flex items-center gap-3">
          {/* Controles de acessibilidade */}
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              onClick={decrease}
              disabled={!canDecrease}
              variant="ghost"
              size="icon"
              aria-label="Diminuir fonte"
              className={`${tamanhoControle} rounded-full border border-white/10 bg-white/10 text-white/80 shadow-none hover:bg-white/20 hover:text-white disabled:opacity-30`}
            >
              <Minus className={tamanhoIcone} />
            </Button>

            <Button
              type="button"
              onClick={mudarTema}
              variant="ghost"
              size="icon"
              aria-label="Alternar tema"
              className={`${tamanhoControle} rounded-full border border-white/10 bg-white/10 text-white/80 shadow-none hover:bg-white/20 hover:text-white`}
            >
              {temaEscuro ? (
                <Moon className={tamanhoIcone} />
              ) : (
                <Sun className={tamanhoIcone} />
              )}
            </Button>

            <Button
              type="button"
              onClick={increase}
              disabled={!canIncrease}
              variant="ghost"
              size="icon"
              aria-label="Aumentar fonte"
              className={`${tamanhoControle} rounded-full border border-white/10 bg-white/10 text-white/80 shadow-none hover:bg-white/20 hover:text-white disabled:opacity-30`}
            >
              <Plus className={tamanhoIcone} />
            </Button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="ml-2 flex items-center gap-2 whitespace-nowrap"
          >
            <Image
              src="/header-pinguim.png"
              alt="Logo do Huddle"
              width={50}
              height={50}
              className={`${tamanhoLogo} object-contain`}
              priority
            />

            
          </Link>
        </div>

        {/* =====================================================
            CENTRO: NAVEGAÇÃO DESKTOP
            absolute mantém o menu realmente centralizado,
            mesmo que a esquerda seja maior que a direita.
        ====================================================== */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classeLink(link.href)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.nome}
            </Link>
          ))}
        </div>

        {/* =====================================================
            DIREITA: PERFIL + MENU COMPACTO
        ====================================================== */}
        <div className="flex items-center gap-2">
          <AvatarDropdown
            apelido={apelido}
            onLogout={handleLogout}
            sizeClass={tamanhoControle}
          />

          {/* Só aparece quando o Header fica compacto */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            className={`${tamanhoControle} rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/20 xl:hidden`}
          >
            {menuAberto ? (
              <X className={tamanhoIcone} />
            ) : (
              <Menu className={tamanhoIcone} />
            )}
          </Button>
        </div>
      </nav>

      {/* =====================================================
          MENU RESPONSIVO
          Entra em cena antes de o Header começar a apertar.
      ====================================================== */}
      {menuAberto && (
        <div className="border-t border-white/10 px-4 pb-4 pt-2 xl:hidden">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-1 rounded-2xl border border-white/10 bg-black/10 p-2 backdrop-blur">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuAberto(false)}
                className={`${smfontClass} rounded-xl px-4 py-2 font-medium transition ${
                  pathname === link.href
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.nome}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
