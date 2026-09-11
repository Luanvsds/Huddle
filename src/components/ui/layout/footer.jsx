'use client';
import Link from "next/link";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";
import { useFontSize } from "@/components/ui/layout/font-size";

export default function Footer() {
  const { XlfontClass,XsfontClass } = useFontSize();

  return (
    <footer className="w-full  bg-backgroundt text-black dark:text-white ">
      <div className={`mx-auto grid max-w-6xl gap-6 px-4 py-4 ${XsfontClass} md:grid-cols-4 md:items-center`}>
        <div>
          <h3 className={`font-semibold ${XlfontClass}`}>Idealizadores</h3>

          <p className={`mt-1 ${XlfontClass} text-black dark:text-white`}>Giovanna</p>
          <p className={`text-black dark:text-white ${XlfontClass}`}>Carlos</p>
          <p className={`text-black dark:text-white ${XlfontClass}`}>Luan</p>
          <p className={`text-black dark:text-white ${XlfontClass}`}>Marcela</p>
          <p className={`text-black dark:text-white ${XlfontClass}`}>Gabriela</p>
        </div>

        <div>
          <h3 className={`font-semibold ${XlfontClass}`}>Redes sociais</h3>

          <div className="mt-2 flex gap-2">
            <Link
              href="https://www.instagram.com/huddlefiap/"
              className="rounded-full border dark:border-white/20 border-black p-1.5 text-black dark:text-white transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="Instagram do Huddle"
            >
              <FaInstagram size={14} />
            </Link>

            <Link
              href="https://github.com/Luanvsds/Huddle"
              className="rounded-full border dark:border-white/20 border-black p-1.5 text-black dark:text-white transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="GitHub do Huddle"
            >
              <FaGithub size={14} />
            </Link>

            <Link
              href="https://www.linkedin.com/in/huddle-fiap/"
              className="rounded-full border dark:border-white/20 border-black p-1.5 text-black dark:text-white transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="LinkedIn do Huddle"
            >
              <FaLinkedin size={14} />
            </Link>

            <Link
              href="https://www.youtube.com/channel/UCPoUceXScfawWwhPvWdZ0zw"
              className="rounded-full border dark:border-white/20 border-black p-1.5 text-black dark:text-white transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="YouTube do Huddle"
            >
              <FaYoutube size={14} />
            </Link>
          </div>
        </div>

        <div className={`text-black dark:text-white md:text-center ${XlfontClass}`}>
          © 2026 Huddle. Todos os direitos reservados.
        </div>

        <div className={`flex items-center justify-start gap-6 md:justify-end ${XlfontClass}`}>
          <div className="md:text-right">
            <h3 className="font-semibold">Explorar</h3>

            <nav className="mt-1 flex flex-col gap-1 text-black dark:text-white">
              <Link
                href="/conecte-se"
                className={`transition-colors hover:text-fuchsia-blue-700 ${XlfontClass}`}
              >
                Conecte-se
              </Link>

              <Link
                href="/sobre"
                className={`transition-colors  hover:text-fuchsia-blue-700 ${XlfontClass}`}
              >
                Sobre Nós
              </Link>

              <Link href="/faq" className={`transition-colors  hover:text-fuchsia-blue-700 ${XlfontClass}`}>
                FAQ
              </Link>
            </nav>
          </div>

          <Link
            href="#top"
            className="flex h-10 w-10 items-center justify-center rounded-full border dark:border-white border-black bg-white text-white transition-colors hover:bg-fuchsia-blue-700 dark:hover:text-white hover:text-black"
            aria-label="Voltar ao topo"
          >
            <FaArrowUp color="indigo" size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
