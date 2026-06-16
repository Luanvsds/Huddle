    import Image from "next/image";
    import Link from "next/link";

    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";

    export default function NotFound() {
    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-16 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
        <div className="mx-auto flex max-w-5xl items-center justify-center">
            <Card className="w-full max-w-3xl overflow-hidden border border-fuchsia-blue-300 bg-white/95 shadow-xl dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40">
            <CardContent className="flex flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-blue-200 bg-fuchsia-blue-50 shadow-sm dark:border-fuchsia-blue-700 dark:bg-fuchsia-blue-950">
                <Image
                    src="/header-pinguim.png"
                    alt="Mascote do Huddle"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-blue-600 dark:text-fuchsia-blue-300">
                Erro 404
                </p>

                <h1 className="mt-4 text-4xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-6xl">
                Squad não encontrado
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Parece que essa página saiu da partida ou nunca existiu. Mas fica
                tranquilo, você pode voltar para o início e continuar procurando
                seu squad ideal.
                </p>

                <div className="mt-8 grid w-full max-w-md gap-3 sm:grid-cols-2">
                <Button
                    asChild
                    className="h-12 rounded-full bg-fuchsia-blue-600 text-white hover:bg-fuchsia-blue-700"
                >
                    <Link href="/">Voltar ao início</Link>
                </Button>

                <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-fuchsia-blue-300 text-fuchsia-blue-700 hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-600 dark:text-fuchsia-blue-100 dark:hover:bg-fuchsia-blue-950"
                >
                    <Link href="/faq">Ir para FAQ</Link>
                </Button>
                </div>
            </CardContent>
            </Card>
        </div>
        </main>
    );
    }