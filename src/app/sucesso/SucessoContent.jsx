"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { useFontSize } from "@/components/ui/layout/font-size";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SucessoContent() {
    const { Xl4fontClass, xl5fontClass, smfontClass, lgfontClass } = useFontSize();

    const [avaliacao, setAvaliacao] = useState(0);

    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-16 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
            <div className="mx-auto flex max-w-5xl items-center justify-center">
                <Card className="w-full max-w-3xl overflow-hidden border  shadow-xl border-fuchsia-blue-600 bg-fuchsia-blue-950 dark:shadow-none">
                    <CardContent className="flex flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-blue-600 bg-fuchsia-blue-950">
                            <CheckCircle
                                size={56}
                                className="text-fuchsia-blue-600"
                            />
                        </div>

                        <p className={`${smfontClass} font-bold uppercase tracking-[0.25em] text-fuchsia-blue-300`}>
                            Cadastro concluído
                        </p>

                        <h1 className={`mt-4 ${Xl4fontClass} font-black tracking-tight text-fuchsia-blue-100`}>
                            Bem-vindo à comunidade Huddle!
                        </h1>

                        <p className={`mt-5 max-w-xl ${lgfontClass} leading-relaxed text-fuchsia-blue-300`}>
                            Seu cadastro foi realizado com sucesso. Agora é só encontrar seu
                            squad e começar novas partidas com pessoas que combinam com você.
                        </p>

                        <div className="my-10 flex h-32 w-32 items-center justify-center rounded-full  bg-fuchsia-blue-950">
                            <Image
                                src="/header-pinguim.png"
                                alt="Mascote do Huddle"
                                width={150}
                                height={150}
                                className="h-32 w-32 object-contain"
                            />
                        </div>
                        <div className="mt-8 grid w-full max-w-md gap-3 sm:grid-cols-2">

                            <Button
                                asChild
                                className="h-12 rounded-full bg-fuchsia-blue-600 px-10 text-white hover:bg-fuchsia-blue-700"
                            >
                                <Link href="/">Voltar ao início</Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="h-12 rounded-full dark:border-fuchsia-blue-300 text-fuchsia-blue-950 hover:bg-fuchsia-blue-50 border-fuchsia-blue-600 dark:text-fuchsia-blue-100 dark:hover:bg-fuchsia-blue-950"
                            >
                                <Link href="/perfil">Perfil</Link>
                            </Button>
                        </div>
                        <div className="mt-12 w-full max-w-md rounded-3xl border p-6 border-fuchsia-blue-700 bg-fuchsia-blue-950">
                            <h2 className={`${lgfontClass} font-bold  text-fuchsia-blue-200`}>
                                Como foi sua experiência de cadastro?
                            </h2>

                            <p className={`mt-2 ${smfontClass} text-fuchsia-blue-300`}>
                                Clique em uma estrela para avaliar.
                            </p>

                            <div className="mt-5 flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((nota) => (
                                    <button
                                        key={nota}
                                        type="button"
                                        onClick={() => setAvaliacao(nota)}
                                        className="transition-transform hover:scale-110"
                                        aria-label={`Avaliar com ${nota} estrela`}
                                    >
                                        <Star
                                            size={32}
                                            className={
                                                nota <= avaliacao
                                                    ? "fill-yellow-500 text-fuchsia-blue-500"
                                                    : "text-fuchsia-blue-300  hover:text-fuchsia-blue-300"
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            {avaliacao > 0 && (
                                <p className={`mt-4 ${smfontClass} font-medium  text-fuchsia-blue-200`}>
                                    Obrigado pela avaliação de {avaliacao} estrela
                                    {avaliacao > 1 ? "s" : ""}!
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}