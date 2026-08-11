    import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    } from "@/components/ui/carousel";

    import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table";

    export const metadata = {
    title: "Huddle | Dados",
    description:
        "Estatísticas, comportamento gamer e benchmark de plataformas para o projeto Huddle.",
    };

    const statsCards = [
    {
        id: 1,
        number: "78%",
        text: "dos jogadores já enfrentaram assédio online.",
    },
    {
        id: 2,
        number: "70%",
        text: "da Gen Z afirma que jogar com os outros é sua principal forma social.",
    },
    {
        id: 3,
        number: "51%",
        text: "dos gamers no Brasil já sofreram assédio.",
    },
    {
        id: 4,
        number: "28%",
        text: "dos jogadores deixam de jogar devido à comunidade tóxica.",
    },
    ];

    const benchmarkData = [
    {
        plataforma: "Discord",
        foco: "Comunicação e Comunidade",
        diferencial: "Infraestrutura robusta e servidores dedicados.",
        pontoFraco:
        "Difícil de encontrar novos grupos do zero sem convite ou busca manual, o que gera um trabalho excessivo para os usuários.",
    },
    {
        plataforma: "GamerLink",
        foco: "LFG Puro (Busca de Grupo)",
        diferencial: "Filtros técnicos precisos, como rank, região e plataforma.",
        pontoFraco:
        "Foca pouco na camada social e ainda é muito suscetível a encontros aleatórios tóxicos.",
    },
    {
        plataforma: "Tinder",
        foco: "Relacionamento Geral",
        diferencial: "Interface de swipe intuitiva e alta densidade de usuários.",
        pontoFraco:
        "Foco em estética, ambiente frequentemente tóxico e superficial para minorias.",
    },
    {
        plataforma: "Huddle",
        foco: "Afinidade e Inclusão",
        diferencial:
        "Mecânica de match com filtros de segurança, acessibilidade e afinidade.",
        pontoFraco: "Focado em um nicho específico: gamers.",
    },
    ];

    export default function DadosPage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
        <div className="mx-auto max-w-362.5 space-y-24">
            <section className="text-center">
            <p className="text-xl font-bold uppercase tracking-[0.25em] text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                Dados e contexto
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-6xl">
                Os números{" "}
                <span className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-6xl">
                dizem tudo
                </span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-lg  text-fuschia-blue-100 ">
                Dados reais sobre comportamento, conexão e os desafios que os
                jogadores enfrentam hoje, motivo de estamos construindo uma forma
                mais inteligente de conectar pessoas dentro do jogo.
            </p>
            </section>

            <section className="rounded-[2rem] border border-fuchsia-blue-200 bg-linear-to-br from-white via-fuchsia-blue-50 to-fuchsia-blue-100/40 p-6 shadow-[0_10px_40px_rgba(93,63,194,0.08)] dark:border-fuchsia-blue-900 dark:from-fuchsia-blue-950/40 dark:via-card dark:to-background md:p-10">
            <div className="mb-10 text-center">
                <p className="text-lg font-bold uppercase tracking-[0.25em] text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                Estatísticas
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-5xl">
                Principais{" "}
                <span className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    números
                </span>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-2xl leading-relaxed dark:text-white md:text-base">
                Cards com dados importantes sobre comportamento, conexão e
                toxicidade na comunidade gamer.
                </p>
            </div>

            <div className="mx-auto max-w-6xl px-8">
                <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
                >
                <CarouselContent className="-ml-5">
                    {statsCards.map((card) => (
                    <CarouselItem
                        key={card.id}
                        className="basis-full pl-5 md:basis-1/2 xl:basis-1/3"
                    >
                        <div className="h-full">
                        <div className="flex h-107.5 flex-col justify-between rounded-[2rem] bg-fuchsia-blue-700 p-7 text-white shadow-xl ring-1 ring-fuchsia-blue-300/20">
                            <div>
                            <p className="text-5xl font-black leading-none md:text-6xl">
                                {card.number}
                            </p>

                            <p className="mt-6 max-w-[15ch] text-2xl  dark:text-fuchsia-blue-100">
                                {card.text}
                            </p>
                            </div>

                            <div>
                            <div className="mb-3 h-px w-full bg-white/15"></div>

                            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                                Dado relevante para o Huddle
                            </p>
                            </div>
                        </div>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="-left-4 border-fuchsia-blue-300 bg-white text-fuchsia-blue-700 shadow-sm hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-800 dark:bg-card dark:text-fuchsia-blue-200 dark:hover:bg-fuchsia-blue-950/40" />

                <CarouselNext className="-right-4 border-fuchsia-blue-300 bg-white text-fuchsia-blue-700 shadow-sm hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-800 dark:bg-card dark:text-fuchsia-blue-200 dark:hover:bg-fuchsia-blue-950/40" />
                </Carousel>
            </div>
            </section>

            <section className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-5xl">
                O Huddle vem para{" "}
                <span className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                mudar essa história
                </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text">
                Para mostrar o espaço que o Huddle ocupa, vale comparar a proposta
                com plataformas já conhecidas e entender onde cada uma acerta — e
                onde ainda deixa lacunas.
            </p>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-fuchsia-blue-200 bg-linear-to-br from-white via-fuchsia-blue-50/40 to-white shadow-[0_10px_40px_rgba(93,63,194,0.08)] dark:border-fuchsia-blue-900 dark:from-fuchsia-blue-950/30 dark:via-card dark:to-background">
            <div className="border-b border-fuchsia-blue-100 px-6 py-6 dark:border-fuchsia-blue-900 md:px-8">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-blue-600">
                Comparativo
                </p>

                <h3 className="mt-2 text-3xl font-black text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                Benchmark
                </h3>

                <p className="mt-3 max-w-3xl text-2sm leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 ">
                Comparação entre plataformas que atuam em comunicação,
                relacionamento e conexão entre usuários.
                </p>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
                <Table>
                <TableHeader>
                    <TableRow className="border-b border-fuchsia-blue-200 bg-fuchsia-blue-50 hover:bg-fuchsia-blue-50 dark:border-fuchsia-blue-900 dark:bg-fuchsia-blue-950/30 dark:hover:bg-fuchsia-blue-950/30">
                    <TableHead className="w-[13%] font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        Plataforma
                    </TableHead>

                    <TableHead className="w-[18%] font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        Foco
                    </TableHead>

                    <TableHead className="w-[29%] font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        Diferencial
                    </TableHead>

                    <TableHead className="w-[40%] font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        Ponto fraco
                    </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {benchmarkData.map((item) => (
                    <TableRow
                        key={item.plataforma}
                        className="align-top border-b border-fuchsia-blue-100 hover:bg-fuchsia-blue-50/50 dark:border-fuchsia-blue-900 dark:hover:bg-fuchsia-blue-950/20"
                    >
                        <TableCell className="font-semibold text-lg text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        {item.plataforma}
                        </TableCell>

                        <TableCell className="leading-relaxed text-lg text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        {item.foco}
                        </TableCell>

                        <TableCell className="leading-relaxed text-lg text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        {item.diferencial}
                        </TableCell>

                        <TableCell className="leading-relaxed text-lg text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        {item.pontoFraco}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
            </section>
        </div>
        </main>
    );
    }
