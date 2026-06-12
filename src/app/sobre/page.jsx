    import Image from "next/image";
    import { Card, CardContent } from "@/components/ui/card";
    import { FaLinkedin } from "react-icons/fa";

    export const metadata = {
    title: "Huddle | Sobre Nós",
    description:
        "Conheça a proposta do Huddle e as pessoas que fizeram esse projeto acontecer.",
    };

    const teamMembers = [
    {
        name: "Giovanna",
        role: "CEO",
        image: "/Sophia.png",
        linkedin: "#",
    },
    {
        name: "Carlos",
        role: "CEO",
        image: "/Carlos.png",
        linkedin: "#",
    },
    {
        name: "Luan",
        role: "CEO",
        image: "/Luan.png",
        linkedin: "#",
    },
    {
        name: "Miranda",
        role: "CEO",
        image: "/Miranda.png",
        linkedin: "#",
    },
    ];

    export default function SobrePage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
        <div className="mx-auto max-w-6xl space-y-20">
            <section className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black uppercase leading-none text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-6xl">
                Ninguém
                <br />
                gosta de
                <br />
                jogar sozinho
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fuchsia-blue-100 md:text-xl">
                E por isso o Huddle nasceu.
                <br />
                Para ser um espaço onde fugir do ambiente tóxico e encontrar gente
                boa de verdade não é sonho, é realidade.
            </p>
            </section>

            <section className="mx-auto max-w-5xl">
            <div className="grid items-center gap-8 rounded-[2.5rem] bg-linear-to-r from-fuchsia-blue-500 to-fuchsia-blue-400 p-8 shadow-xl md:grid-cols-2 md:p-10">
                <div className="order-2 md:order-1">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">
                    Comunidade
                </p>

                <h2 className="mt-3 text-4xl font-black uppercase leading-none text-fuchsia-blue-950 md:text-5xl">
                    Encontre
                    <br />
                    seu squad
                </h2>

                <p className="mt-6 max-w-md text-base leading-relaxed text-white md:text-lg">
                    Chega de cair com gente tóxica! No Huddle, você encontra
                    jogadores que realmente combinam com você. Mesmo estilo, mesma
                    vibe, mesmo objetivo.
                </p>
                </div>

                <div className="order-1 md:order-2">
                <div className="overflow-hidden rounded-[1.75rem] border-4 border-white/20 shadow-lg">
                    <Image
                    src="/sobre-image.jpg"
                    alt="Pessoa jogando em ambiente gamer"
                    width={800}
                    height={520}
                    className="h-65 w-full object-cover md:h-80"
                    />
                </div>
                </div>
            </div>
            </section>

            <section className="mx-auto max-w-5xl">
            <div className="grid items-center gap-8 rounded-[2.5rem] bg-linear-to-r from-fuchsia-blue-500 to-fuchsia-blue-400 p-8 shadow-xl md:grid-cols-2 md:p-10">
                <div>
                <div className="overflow-hidden rounded-[1.75rem] border-4 border-white/20 shadow-lg">
                    <video
                    src="/Video_tela_sobre.mp4"
                    className="h-65 w-full object-cover md:h-80"
                    autoPlay
                    muted
                    loop
                    playsInline
                    />
                </div>
                </div>

                <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">
                    Conexão
                </p>

                <h2 className="mt-3 text-4xl font-black uppercase leading-none text-fuchsia-blue-950 md:text-5xl">
                    Match
                    <br />
                    de verdade
                </h2>

                <p className="mt-6 max-w-md text-base leading-relaxed text-white md:text-lg">
                    Aqui não é só jogar. É criar conexão. Se divertir de verdade.
                    Você entra pelo game e fica pela parceria.
                </p>
                </div>
            </div>
            </section>

            <section className="mx-auto max-w-6xl">
            <div className="text-center">
                <p className="text-base font-semibold text-fuchsia-blue-600 md:text-lg">
                Conheça o time!
                </p>

                <h2 className="mt-2 text-3xl font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-5xl">
                As pessoas incríveis que fizeram esse projeto acontecer!
                </h2>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member) => (
                <Card
                    key={member.name}
                    className="overflow-hidden border border-fuchsia-blue-200 bg-white p-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-fuchsia-blue-900 dark:bg-card"
                >
                    <div className="relative h-72 w-full overflow-hidden">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                    </div>

                    <CardContent className="bg-fuchsia-blue-950 p-5 text-white">
                    <h3 className="text-2xl font-semibold">{member.name}</h3>

                    <p className="mt-1 text-sm text-white/80">{member.role}</p>

                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-fuchsia-blue-500 text-white transition-colors hover:bg-fuchsia-blue-400"
                        aria-label={`LinkedIn de ${member.name}`}
                    >
                        <FaLinkedin size={18} />
                    </a>
                    </CardContent>
                </Card>
                ))}
            </div>
            </section>
        </div>
        </main>
    );
    }