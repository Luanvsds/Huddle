import Link from "next/link";

export const metadata = {
  title: "Huddle | Home",
  description:
    "Huddle é uma plataforma para conectar jogadores por afinidade, segurança e estilo de jogo.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
      <div className="mx-auto max-w-1450px space-y-20">
        <section className="overflow-hidden rounded-[2.5rem] border border-fuchsia-blue-200 bg-fuchsia-blue-950 shadow-[0_20px_60px_rgba(39,27,90,0.18)] dark:border-fuchsia-blue-900">
          <div className="relative min-h-620px overflow-hidden">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/Video_home.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 bg-linear-to-r from-fuchsia-blue-950 via-fuchsia-blue-950/80 to-fuchsia-blue-950/20"></div>

            <div className="absolute inset-0 bg-linear-to-t from-fuchsia-blue-950/70 via-transparent to-transparent"></div>

            <div className="relative z-10 flex min-h-620px items-center px-6 py-12 md:px-12 lg:px-16">
              <div className="max-w-2xl">
                <p className="text-2xl font-bold uppercase tracking-[0.25em] text-fuchsia-blue-300">
                  Comunidade gamer inteligente
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                  Encontre seu{" "}
                  <span className="bg-linear-to-r from-fuchsia-blue-300 via-white to-fuchsia-blue-400 bg-clip-text text-transparent">
                    squad ideal
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-2xl leading-relaxed text-white/80">
                  O Huddle conecta jogadores por afinidade, horários, estilo de
                  jogo e comportamento, criando uma experiência mais segura,
                  inclusiva e divertida para quem quer jogar acompanhado.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-white/80">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                    Match por afinidade
                  </span>

                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                    Menos toxicidade
                  </span>

                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                    Comunidade 18+
                  </span>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/conecte-se"
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-fuchsia-blue-950 transition-colors hover:bg-fuchsia-blue-100"
                  >
                    Começar agora
                  </Link>

                  <Link
                    href="/sobre"
                    className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white/20"
                  >
                    Conhecer o projeto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-[2rem] border border-fuchsia-blue-200 bg-linear-to-br from-white via-fuchsia-blue-50 to-white p-6 shadow-[0_10px_40px_rgba(93,63,194,0.08)] dark:border-fuchsia-blue-900 dark:from-fuchsia-blue-950/30 dark:via-card dark:to-background">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-blue-600">
              Afinidade
            </p>

            <h2 className="mt-3 text-2xl font-black text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
              Conexões que fazem sentido
            </h2>

            <p className="mt-3 text-lg leading-relaxed dark:text-white">
              O Huddle considera preferências, jogos favoritos, estilo de jogo e
              horários para sugerir pessoas com mais chance de conexão real.
            </p>
          </article>

          <article className="rounded-[2rem] border border-fuchsia-blue-200 bg-linear-to-br from-white via-fuchsia-blue-50 to-white p-6 shadow-[0_10px_40px_rgba(93,63,194,0.08)] dark:border-fuchsia-blue-900 dark:from-fuchsia-blue-950/30 dark:via-card dark:to-background">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-blue-600">
              Segurança
            </p>

            <h2 className="mt-3 text-2xl font-black text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
              Menos toxicidade no jogo
            </h2>

            <p className="mt-3 text-lg leading-relaxed dark:text-white">
              A plataforma valoriza denúncias, bloqueios, filtros e boas
              práticas para criar um ambiente mais saudável para os jogadores.
            </p>
          </article>

          <article className="rounded-[2rem] border border-fuchsia-blue-200 bg-linear-to-br from-white via-fuchsia-blue-50 to-white p-6 shadow-[0_10px_40px_rgba(93,63,194,0.08)] dark:border-fuchsia-blue-900 dark:from-fuchsia-blue-950/30 dark:via-card dark:to-background">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-blue-600">
              Comunidade
            </p>

            <h2 className="mt-3 text-2xl font-black text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
              Jogue com quem combina
            </h2>

            <p className="mt-3 text-lg leading-relaxed dark:text-white">
              A ideia é aproximar jogadores que querem se divertir, competir ou
              criar novos grupos sem depender de encontros totalmente aleatórios.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}