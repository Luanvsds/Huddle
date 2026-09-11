"use client"

import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DropdownLogin } from "./meuLogin"

export function AvatarDropdown({ apelido, onLogout }) {
  return (
    <DropdownMenu>
      {/* O Trigger encapsula o botão que aciona o menu */}
      <DropdownMenuTrigger asChild className="position fixed left-0">
        <Button className="relative h-20 w-21 rounded-full pb-3 in-hover:cursor-pointer" variant="ghost" >
          <Avatar className="h-23 w-23">
            <AvatarImage src={"/imagem-de-usuario.png"} alt={"imagem que representa" + apelido || "Imagem que representa Usuário"} />
            <AvatarFallback>{apelido ? apelido.substring(0, 2).toUpperCase() : "US"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* O conteúdo do menu dropdown (alinha à direita com align="end") */}
      <DropdownMenuContent className="w-48" align="end" forceMount>
        {apelido ? (
          // Opções quando o usuário ESTÁ logado
          <DropdownMenuGroup>
            <div className="flex items-center justify-start gap-2 p-2 font-medium text-sm">
              <span className="truncate">{apelido}</span>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/perfil" className="w-full cursor-pointer">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/faq" className="w-full cursor-pointer">FAQ</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="text-fuchsia-blue-700 cursor-pointer w-full"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          // Opções quando o usuário NÃO está logado
          <DropdownMenuGroup>
<DropdownLogin/>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}