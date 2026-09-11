import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link"
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "./dropdown-menu"

export function DropdownLogin() {
    const [open, setOpen] = React.useState(false)
    return (
        <DropdownMenuGroup>
            {/* Itens normais do menu */}
            <DropdownMenuItem asChild>
                <Link href="/conecte-se" className="w-full cursor-pointer">Cadastre-se</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/faq" className="w-full cursor-pointer">FAQ</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* O Dialog fica isolado apenas no item de Entrar */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DropdownMenuItem
                    asChild
                    onSelect={(e) => e.preventDefault()}
                >
                    <DialogTrigger className="w-full cursor-pointer text-fuchsia-blue-700 text-left">
                        Entrar
                    </DialogTrigger>
                </DropdownMenuItem>

                <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none">
                    <Card className="mx-auto w-full">
                        <CardHeader>
                            <CardTitle>Entre na sua conta</CardTitle>
                            <CardDescription>
                                Digite seu e-mail abaixo para entrar na sua conta
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email-login">E-mail</Label>
                                        <Input
                                            id="email-login"
                                            type="email"
                                            placeholder="voce@exemplo.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="senha-login">Senha</Label>
                                        <Input id="senha-login" type="password" required />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Entrar
                            </Button>
                            <Button variant="outline" className="w-full" asChild onClick ={() => setOpen(false)}>
                                <Link href="/conecte-se">
                                    Cadastrar-se
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </DialogContent>
            </Dialog>
        </DropdownMenuGroup>
    )
}