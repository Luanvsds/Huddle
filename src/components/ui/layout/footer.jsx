"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

import {
  ArrowUp,
  Gamepad2,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { useFontSize } from "@/components/ui/layout/font-size";
import { useEffect, useState } from "react";

export default function Footer() {
  const {
    XsfontClass,
    smfontClass,
    sm2fontClass,
    iconSizes,
    logoSizes
  } = useFontSize();

  const [logado, setLogado] = useState(false);
  

  const idealizadores = [
    "Giovanna",
    "Carlos",
    "Luan",
    "Marcela",
    "Gabriela",
  ];

  const links = [
    {
      href: "/",
      nome: "Home",
    },

    {
      href: logado ? "/perfil" : "/conecte-se",
      nome: logado ? "Perfil" : "Cadastro",
    },

    ...(logado
      ? [
        {
          href: "/huddle",
          nome: "Huddle",
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

  const socialClass = `
    flex
    ${iconSizes}
    items-center
    justify-center
    rounded-full
    border
    border-fuchsia-blue-300/50
    bg-white/70
    text-fuchsia-blue-800
    transition-all
    duration-200
    hover:-translate-y-1
    hover:border-fuchsia-blue-500
    hover:bg-fuchsia-blue-600
    hover:text-white

    dark:border-white/10
    dark:bg-white/5
    dark:text-white/75
    dark:hover:border-fuchsia-blue-400
    dark:hover:bg-fuchsia-blue-600
    dark:hover:text-white
  `;

  useEffect(() => {
    const apelidoSalvo = localStorage.getItem("user_apelido");
    const emailSalvo = localStorage.getItem("user_email");

    setLogado(Boolean(apelidoSalvo && emailSalvo))
  }, []);

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-fuchsia-blue-200/70
        bg-linear-to-b
        from-fuchsia-blue-50/80
        via-background
        to-background

        dark:border-white/10
        dark:from-fuchsia-blue-950/30
        dark:via-background
        dark:to-background
      "
    >
      {/* ===== brilho decorativo ===== */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-0
          h-72
          w-72
          rounded-full
          bg-fuchsia-blue-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-64
          w-64
          rounded-full
          bg-fuchsia-blue-600/10
          blur-3xl
        "
      />

      <div className="relative mx-auto w-full  px-6 py-10">
        {/* =====================================================
            PARTE PRINCIPAL DO FOOTER
        ====================================================== */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-16">
          {/* ===== Marca Huddle ===== */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div
                className={`
                  flex
                  ${iconSizes}
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-fuchsia-blue-300/50
                  bg-fuchsia-blue-600/10

                  dark:border-white/10
                  dark:bg-white/5
                `}
              >
                <Image
                  src="/header-pinguim.png"
                  alt="Logo do Huddle"
                  width={50}
                  height={50}
                  className={`${logoSizes} object-contain`}
                  priority
                />
              </div>

              <div>
                <p
                  className={`${sm2fontClass} font-black tracking-tight text-fuchsia-blue-950 dark:text-white`}
                >
                  Huddle
                </p>

                <p
                  className={`${XsfontClass} text-muted-foreground`}
                >
                  Comunidade gamer inteligente
                </p>
              </div>
            </Link>

            <p
              className={`${smfontClass} mt-5 max-w-xl leading-relaxed text-muted-foreground`}
            >
              Encontre jogadores que combinam com seu estilo,
              horários e forma de jogar. Menos toxicidade,
              mais conexão e partidas melhores.
            </p>

            {/* pequenas características */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span
                className={`${XsfontClass} inline-flex items-center gap-1.5 rounded-full border border-fuchsia-blue-300/40 bg-fuchsia-blue-600/5 px-3 py-1.5 text-fuchsia-blue-800 dark:border-white/10 dark:text-fuchsia-blue-200`}
              >
                <Gamepad2 className="size-3.5" />
                Conexão gamer
              </span>

              <span
                className={`${XsfontClass} inline-flex items-center gap-1.5 rounded-full border border-fuchsia-blue-300/40 bg-fuchsia-blue-600/5 px-3 py-1.5 text-fuchsia-blue-800 dark:border-white/10 dark:text-fuchsia-blue-200`}
              >
                <Sparkles className="size-3.5" />
                Mais afinidade
              </span>
            </div>

            {/* redes sociais */}
            <div className="mt-6 flex items-center gap-2">
              <Link
                href="https://www.instagram.com/huddlefiap/"
                target="_blank"
                rel="noreferrer"
                className={socialClass}
                aria-label="Instagram do Huddle"
              >
                <FaInstagram size={17} />
              </Link>

              <Link
                href="https://github.com/Luanvsds/Huddle"
                target="_blank"
                rel="noreferrer"
                className={socialClass}
                aria-label="GitHub do Huddle"
              >
                <FaGithub size={17} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/huddle-fiap/"
                target="_blank"
                rel="noreferrer"
                className={socialClass}
                aria-label="LinkedIn do Huddle"
              >
                <FaLinkedin size={17} />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UCPoUceXScfawWwhPvWdZ0zw"
                target="_blank"
                rel="noreferrer"
                className={socialClass}
                aria-label="YouTube do Huddle"
              >
                <FaYoutube size={17} />
              </Link>
            </div>
          </div>

          {/* ===== Idealizadores ===== */}
          <div>
            <div className="flex items-center gap-2">
              <UsersRound className="size-5 text-fuchsia-blue-600 dark:text-fuchsia-blue-300" />

              <p
                className={`${smfontClass} font-bold text-fuchsia-blue-950 dark:text-white`}
              >
                Idealizadores
              </p>
            </div>

            <p
              className={`${XsfontClass} mt-2 text-muted-foreground`}
            >
              Projeto acadêmico desenvolvido na FIAP.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {idealizadores.map((nome) => (
                <div
                  key={nome}
                  className={`
                    ${smfontClass}
                    rounded-xl
                    border
                    border-fuchsia-blue-200/80
                    bg-white/60
                    px-3
                    py-2
                    text-fuchsia-blue-950

                    dark:border-white/10
                    dark:bg-white/3
                    dark:text-white/80
                  `}
                >
                  {nome}
                </div>
              ))}
            </div>
          </div>
          {/* ===== Explorar ===== */}
          <div className="pl-100">
            <p
              className={`${smfontClass} font-bold text-fuchsia-blue-950 dark:text-white `}
            >
              Explorar
            </p>

            <nav className="prmt-4 flex flex-col items-start gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    ${smfontClass}
                    relative
                    text-muted-foreground
                    transition-colors
                    duration-200
                    hover:text-fuchsia-blue-700
                    dark:hover:text-fuchsia-blue-300
                  `}
                >
                  {link.nome}
                </Link>
              ))}
            </nav>
          </div>
        </div>


        {/* =====================================================
            PARTE INFERIOR
        ====================================================== */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-4
            border-t
            border-fuchsia-blue-200/70
            pt-5

            dark:border-white/10

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className={`${XsfontClass} text-muted-foreground`}>
            © 2026 Huddle. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span
              className={`${XsfontClass} hidden text-muted-foreground sm:block`}
            >
              Feito para quem joga junto.
            </span>

            <Link
              href="#top"
              aria-label="Voltar ao topo"
              className="
                flex
                size-10
                items-center
                justify-center
                rounded-full
                border
                border-fuchsia-blue-300/50
                bg-fuchsia-blue-600
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:bg-fuchsia-blue-700

                dark:border-white/10
              "
            >
              <ArrowUp className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}