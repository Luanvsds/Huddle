"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedin } from "react-icons/fa";
import { useFontSize } from "@/components/ui/layout/font-size";
import CrescimentoHuddle from "@/components/CrescimentoHuddle";

const teamMembers = [
  {
    name: "Giovanna",
    role: "CEO",
    image: "/Sophia.png",
    linkedin: "https://www.linkedin.com/in/giovanna-sophia-gomes-6136a23b7/",
  },
  {
    name: "Carlos",
    role: "CEO",
    image: "/Carlos.png",
    linkedin: "https://www.linkedin.com/in/carlos-vasconcelos-pereira/",
  },
  {
    name: "Luan",
    role: "CEO",
    image: "/Luan.png",
    linkedin: "https://www.linkedin.com/in/luan-silva-8ba26921a/",
  },
  {
    name: "Miranda",
    role: "CEO",
    image: "/Miranda.png",
    linkedin:
      "https://www.linkedin.com/in/gabriela-miranda-siqueira-24b9a1328/",
  },
];

export function SobreContent() {
  const {
    XlfontClass,
    Xl3fontClass,
    Xl4fontClass,
    Xl5fontClass,
    Xl6fontClass,
    smfontClass,
    lgfontClass,
  } = useFontSize();

  return (
    <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="mx-auto max-w-4xl text-center">
          <h1
            className={`${Xl4fontClass} font-black uppercase leading-none text-fuchsia-blue-950 dark:text-fuchsia-blue-100`}
          >
            Ninguém
            <br />
            gosta de
            <br />
            jogar sozinho
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 ${XlfontClass}`}
          >
            E por isso o Huddle nasceu.
            <br />
            Para ser um espaço onde fugir do ambiente tóxico e encontrar gente
            boa de verdade não é sonho, é realidade.
          </p>
        </section>

        <section className="mx-auto max-w-5xl">
          <div className="grid items-center gap-8 rounded-[2.5rem] bg-linear-to-r from-fuchsia-blue-500 to-fuchsia-blue-400 p-8 shadow-xl md:grid-cols-2 md:p-10">
            <div className="order-2 md:order-1">
              <p
                className={`${lgfontClass} font-bold uppercase tracking-[0.25em] text-fuchsia-blue-950 dark:text-fuchsia-blue-100`}
              >
                Comunidade
              </p>

              <h2
                className={`mt-3 ${Xl4fontClass} font-black uppercase leading-none text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:${Xl5fontClass}`}
              >
                Encontre
                <br />
                seu squad
              </h2>

              <p
                className={`mt-6 max-w-md text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:${lgfontClass}`}
              >
                Chega de cair com gente tóxica! No Huddle, você encontra
                jogadores que realmente combinam com você. Mesmo estilo, mesma
                vibe, mesmo objetivo.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-[1.75rem] border-4 border-white/20 shadow-lg">
                <Image
                  src="/sobre-image.jpg"
                  alt="Pessoa jogando em ambiente gamer"
                  width={800}
                  height={520}
                  className="h-65 w-full object-cover md:h-80"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl">
          <div className="grid items-center gap-8 rounded-[2.5rem] bg-linear-to-r from-fuchsia-blue-500 to-fuchsia-blue-400 p-8 shadow-xl md:grid-cols-2 md:p-10">
            <div>
              <div className="overflow-hidden rounded-[1.75rem] border-4 border-white/20 shadow-lg">
                <video
                  src="/Video_tela_sobre.mp4"
                  className="h-65 w-full object-cover md:h-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>

            <div>
              <p
                className={`${lgfontClass} font-bold uppercase tracking-[0.25em] text-fuchsia-blue-950 dark:text-fuchsia-blue-100`}
              >
                Conexão
              </p>

              <h2
                className={`mt-3 ${Xl4fontClass} font-black uppercase leading-none text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:${Xl5fontClass}`}
              >
                Match
                <br />
                de verdade
              </h2>

              <p
                className={`mt-6 max-w-md text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:${lgfontClass}`}
              >
                Aqui não é só jogar. É criar conexão. Se divertir de verdade.
                Você entra pelo game e fica pela parceria.
              </p>
            </div>
          </div>
        </section>

        <CrescimentoHuddle />
      </div>
    </main>
  );
}
