    "use client";

    import Image from "next/image";
    import Link from "next/link";
    import { useState } from "react";
    import { CheckCircle, Star } from "lucide-react";

    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";

    export default function SucessoPage() {
    const [avaliacao, setAvaliacao] = useState(0);

    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-16 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
        <div className="mx-auto flex max-w-5xl items-center justify-center">
            <Card className="w-full max-w-3xl overflow-hidden border border-fuchsia-blue-300 bg-white/95 shadow-xl dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:shadow-none">
            <CardContent className="flex flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-blue-300 bg-fuchsia-blue-50 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/60">
                <CheckCircle
                    size={56}
                    className="text-fuchsia-blue-600 dark:text-fuchsia-blue-300"
                />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-blue-600 dark:text-fuchsia-blue-300">
                Cadastro concluído
                </p>

                <h1 className="mt-4 text-4xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-5xl">
                Bem-vindo à comunidade Huddle!
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Seu cadastro foi realizado com sucesso. Agora é só encontrar seu
                squad e começar novas partidas com pessoas que combinam com você.
                </p>

                <div className="my-10 flex h-32 w-32 items-center justify-center rounded-full bg-fuchsia-blue-50 dark:bg-fuchsia-blue-950/60">
                <Image
                    src="/header-pinguim.png"
                    alt="Mascote do Huddle"
                    width={96}
                    height={96}
                    className="h-24 w-24 object-contain"
                />
                </div>

                <Button
                asChild
                className="h-12 rounded-full bg-fuchsia-blue-600 px-10 text-white hover:bg-fuchsia-blue-700"
                >
                <Link href="/">Voltar ao início</Link>
                </Button>

                <div className="mt-12 w-full max-w-md rounded-3xl border border-fuchsia-blue-200 bg-fuchsia-blue-50/70 p-6 dark:border-fuchsia-blue-700 dark:bg-fuchsia-blue-950/40">
                <h2 className="text-lg font-bold text-fuchsia-blue-700 dark:text-fuchsia-blue-200">
                    Como foi sua experiência de cadastro?
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
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
                            ? "fill-fuchsia-blue-500 text-fuchsia-blue-500"
                            : "text-fuchsia-blue-300 hover:text-fuchsia-blue-500 dark:text-fuchsia-blue-700 dark:hover:text-fuchsia-blue-300"
                        }
                        />
                    </button>
                    ))}
                </div>

                {avaliacao > 0 && (
                    <p className="mt-4 text-sm font-medium text-fuchsia-blue-700 dark:text-fuchsia-blue-200">
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