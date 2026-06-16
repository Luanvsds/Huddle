import Link from "next/link";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full  bg-backgroundt text-black dark:text-white ">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-4 text-xs md:grid-cols-4 md:items-center">
        <div>
          <h3 className="font-semibold text-xl">Idealizadores</h3>

          <p className="mt-1 text-xl text-black dark:text-white">Giovanna Sophia</p>
          <p className="text-black dark:text-white text-xl">Carlos Vasconcelos</p>
          <p className="text-black dark:text-white text-xl">Luan Silveira</p>
          <p className="text-black dark:text-white text-xl">Gabriela Miranda</p>
        </div>

        <div>
          <h3 className="font-semibold text-xl">Redes sociais</h3>

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

        <div className="text-black dark:text-white md:text-center text-xl">
          © 2026 Huddle. Todos os direitos reservados.
        </div>

        <div className="flex items-center justify-start gap-6 md:justify-end text-xl">
          <div className="md:text-right">
            <h3 className="font-semibold">Explorar</h3>

            <nav className="mt-1 flex flex-col gap-1 text-black dark:text-white">
              <Link
                href="/conecte-se"
                className="transition-colors hover:text-fuchsia-blue-700 text-xl"
              >
                Conecte-se
              </Link>

              <Link
                href="/sobre"
                className="transition-colors  hover:text-fuchsia-blue-700 text-xl"
              >
                Sobre Nós
              </Link>

              <Link href="/faq" className="transition-colors  hover:text-fuchsia-blue-700 text-xl">
                Perguntas frequentes
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
