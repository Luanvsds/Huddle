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
    <footer className="w-full border-t border-white/10 bg-fuchsia-blue-600 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-4 text-xs md:grid-cols-4 md:items-center">
        <div>
          <h3 className="font-semibold">Idealizadores</h3>

          <p className="mt-1 text-white/75">Giovanna Sophia</p>
          <p className="text-white/75">Carlos Vasconcelos</p>
          <p className="text-white/75">Luan Silveira</p>
          <p className="text-white/75">Gabriela Miranda</p>
        </div>

        <div>
          <h3 className="font-semibold">Redes sociais</h3>

          <div className="mt-2 flex gap-2">
            <Link
              href="#"
              className="rounded-full border border-white/20 p-1.5 text-white/75 transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="Instagram do Huddle"
            >
              <FaInstagram size={14} />
            </Link>

            <Link
              href="#"
              className="rounded-full border border-white/20 p-1.5 text-white/75 transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="GitHub do Huddle"
            >
              <FaGithub size={14} />
            </Link>

            <Link
              href="#"
              className="rounded-full border border-white/20 p-1.5 text-white/75 transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="LinkedIn do Huddle"
            >
              <FaLinkedin size={14} />
            </Link>

            <Link
              href="#"
              className="rounded-full border border-white/20 p-1.5 text-white/75 transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
              aria-label="YouTube do Huddle"
            >
              <FaYoutube size={14} />
            </Link>
          </div>
        </div>

        <div className="text-white/70 md:text-center">
          © 2026 Huddle. Todos os direitos reservados.
        </div>

        <div className="flex items-center justify-start gap-6 md:justify-end">
          <div className="md:text-right">
            <h3 className="font-semibold">Explorar</h3>

            <nav className="mt-1 flex flex-col gap-1 text-white/75">
              <Link
                href="/conecte-se"
                className="transition-colors hover:text-white"
              >
                Conecte-se
              </Link>

              <Link
                href="/sobre"
                className="transition-colors hover:text-white"
              >
                Sobre Nós
              </Link>

              <Link href="/faq" className="transition-colors hover:text-white">
                Perguntas frequentes
              </Link>
            </nav>
          </div>

          <Link
            href="#top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-fuchsia-blue-700 hover:text-white"
            aria-label="Voltar ao topo"
          >
            <FaArrowUp size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
