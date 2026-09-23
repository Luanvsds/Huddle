"use client";
import { ArrowDownCircle, CircleQuestionMark, CircleUserRound, LogOut, MessageCircle, Star, UserRound, Users } from "lucide-react";

import Link from "next/link";


import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AvatarDropdown({ apelido, onLogout, sizeClass = "size-9" }) {
  return (
    <DropdownMenu>
      {/* ===== Avatar compacto do Header ===== */}
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`
      ${sizeClass}
      relative
      rounded-full
      border
      border-white/20
      bg-white/10
      text-white
      shadow-sm
      backdrop-blur-sm
      transition-all
      duration-200

      hover:scale-105
      hover:border-white/40
      hover:bg-white/20
      hover:text-white

      data-[state=open]:border-white/40
      data-[state=open]:bg-fuchsia-blue-950/25
      data-[state=open]:text-white
      data-[state=open]:ring-2
      data-[state=open]:ring-white/15`}
          aria-label="Abrir menu do usuário"
        >
          <ArrowDownCircle className="absolute bottom-0 right-0  rounded-full border-2 border-fuchsia-blue-600" />
          <CircleUserRound className="size-[65%] stroke-[1.7]" />

          {/* Indicador de usuário conectado */}

        </Button>
      </DropdownMenuTrigger>

      {/* ===== Menu do usuário ===== */}
      <DropdownMenuContent
        align="end"
        className="
        w-56
        rounded-2xl
        border
        border-fuchsia-blue-300/50
        bg-fuchsia-blue-50/95
        p-2
        text-fuchsia-blue-950
        shadow-xl
        backdrop-blur-xl

        dark:border-fuchsia-blue-400/20
        dark:bg-card/95
        dark:text-white
  "
      >
        {apelido ? (
          <>
            {/* ===== Usuário logado ===== */}
            <Link href={"/perfil"}>
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-fuchsia-blue-100/80 p-3 dark:bg-fuchsia-blue-600/10">
                <div className="flex size-10 items-center justify-center rounded-full bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:bg-fuchsia-blue-600/20 dark:text-fuchsia-blue-300">
                  <CircleUserRound className="size-6" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{apelido}</p>

                  <p className="text-xs text-muted-foreground">
                    Jogador conectado
                  </p>
                </div>
              </div>
            </Link>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/perfil"
                className="flex cursor-pointer items-center gap-2 rounded-lg"
              >
                <UserRound className="size-4" />
                Meu perfil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/huddle"
                className="flex cursor-pointer items-center gap-2 rounded-lg"
              >
                <Users className="size-4" />
                Huddle
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/mensagens"
                className="flex cursor-pointer items-center gap-2 rounded-lg"
              >
                <MessageCircle className="size-4" />
                Mensagens
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogout}
              className="flex cursor-pointer items-center gap-2 rounded-lg text-red-500 focus:text-red-500"
            >
              <LogOut className="size-4" />
              Sair
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <Link href={"/conecte-se"}>
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-fuchsia-blue-100/80 p-3 dark:bg-fuchsia-blue-600/10">
                <div className="flex size-10 items-center justify-center rounded-full bg-fuchsia-blue-600/15 text-fuchsia-blue-700 dark:bg-fuchsia-blue-600/20 dark:text-fuchsia-blue-300">
                  <CircleUserRound className="size-6" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{apelido}</p>

                  <p className="text-xs text-muted-foreground">
                    Sem jogador conectado
                  </p>
                </div>
              </div>
            </Link>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/conecte-se"
                className="flex cursor-pointer items-center gap-2 rounded-lg"
              >
                <UserRound className="size-4" />
                Cadastre-se
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/faq"
                className="flex cursor-pointer items-center gap-2 rounded-lg"
              >
                <CircleQuestionMark className="size-4" />
                FAQ
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/sobre"
                className="flex cursor-pointer items-center gap-2 rounded-lg"
              >
                <Star className="size-4" />
                Sobre nós
              </Link>
            </DropdownMenuItem>
          </>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
