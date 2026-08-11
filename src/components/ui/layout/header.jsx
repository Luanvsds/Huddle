"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-fuchsia-blue-600 text-white">
      <nav className="mx-auto flex max-w-6xl text items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/header-pinguim.png"
            alt="Logo do Huddle"
            width={36}
            height={36}
          />
          <span className="text-2xl font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100">Huddle</span>
        </Link>

        <div className="hidden items-center gap-4 text-sm font-medium md:flex">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-2xl transition-colors ${
              pathname === "/"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
            }`}
          >
            Home
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          <Link
            href="/conecte-se"
            className={`rounded-md px-3 py-2 text-2xl transition-colors ${
              pathname === "/conecte-se"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
            }`}
          >
            Conecte-se
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          <Link
            href="/sobre"
            className={`rounded-md px-3 py-2 text-2xl transition-colors ${
              pathname === "/sobre"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
            }`}
          >
            Sobre Nós
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          <Link
            href="/dados"
            className={`rounded-md px-3 py-2 text-2xl transition-colors ${
              pathname === "/dados"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
            }`}
          >
            Dados
          </Link>
          <span className="border-l border-white/40 h-5"></span>

          <Link
            href="/faq"
            className={`rounded-md px-3 py-2 text-2xl transition-colors ${
              pathname === "/faq"
                ? "bg-fuchsia-blue-700 text-white"
                : "text-white/85 hover:bg-white hover:text-fuchsia-blue-700"
            }`}
          >
            FAQ
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-white/40 px-3 py-1 text-xl">
            ☰
          </summary>

          <div className="absolute right-0 top-10 z-50 flex w-44 flex-col rounded-md bg-purple-700 p-4 text-sm font-medium shadow-lg">
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
    </header>
  );
}
