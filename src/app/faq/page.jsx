    import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    } from "@/components/ui/accordion";

    export const metadata = {
    title: "Huddle | FAQ",
    description:
        "Perguntas frequentes sobre conta, segurança, match e funcionamento do Huddle.",
    };

    export default function Faq() {
    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
        <div className="mx-auto max-w-6xl space-y-12">
            <section className="text-center">
            <p className="text-xl font-bold uppercase tracking-[0.25em] text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                Central de ajuda
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-6xl">
                Perguntas{" "}
                <span className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                frequentes
                </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                Tudo que você precisa saber antes de entrar no Huddle e encontrar o
                seu squad ideal.
            </p>
            </section>

            <section className="mx-auto max-w-5xl rounded-[2rem] border border-fuchsia-blue-200 bg-white/90 p-6 shadow-lg backdrop-blur md:p-10 dark:border-fuchsia-blue-900 dark:bg-card/90">
            <div className="mx-auto mb-9 max-w-2xl text-center">
                <p className="text-xl font-semibold uppercase tracking-wide text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                FAQ
                </p>

                <h2 className="mt-2 text-2xl font-bold text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-4xl">
                Respostas rápidas para continuar jogando
                </h2>

                <p className="mt-3 text-lg leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-base">
                Abra uma pergunta abaixo para ver a resposta.
                </p>
            </div>

            <Accordion type="single" collapsible className="space-y-6">
                <AccordionItem
                value="item-1"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Esqueci minha senha, como prosseguir?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    É super fácil! Na tela de login, toque em “Esqueci minha
                    senha” e informe o e-mail cadastrado. Você receberá um link
                    para criar uma nova senha em poucos minutos.
                    </p>

                    <p className="mt-2">
                    Caso não encontre o e-mail, não esqueça de dar uma olhadinha
                    no spam.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-2"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Conheci alguém tóxico. Como posso denunciar?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>Sentimos muito por essa experiência.</p>

                    <p className="mt-2">
                    Para denunciar, acesse o perfil da pessoa ou a conversa, toque
                    no menu de três pontinhos e selecione “Denunciar”.
                    </p>

                    <p className="mt-2">
                    Nossa equipe analisa todos os relatos com atenção e sigilo
                    para manter o Huddle seguro para todo mundo.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-3"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Não consigo fazer login, como resolver?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    Confira primeiro se seu e-mail e senha estão corretos. Se
                    ainda assim não funcionar:
                    </p>

                    <ul className="list-disc pl-5">
                    <li>Verifique sua conexão com a internet</li>
                    <li>Tente redefinir sua senha</li>
                    <li>Atualize o aplicativo para a versão mais recente</li>
                    </ul>

                    <p className="mt-3">
                    Se o problema continuar, fale com a gente pelo e-mail de
                    suporte:
                    </p>

                    <p className="mt-1 font-medium text-fuchsia-blue-700 dark:text-fuchsia-blue-300">
                    huddle.support@huddle.com
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-4"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Como alterar as minhas informações pessoais?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>É bem simples, vá até Perfil e depois Editar Perfil.</p>

                    <p className="mt-2">Exemplo: alterando sua foto:</p>

                    <p className="mt-2">
                    Toque na sua foto e escolha uma nova imagem da galeria ou da
                    câmera. Depois é só salvar.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-5"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Onde posso alterar minhas preferências?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    Assim como as informações pessoais, as preferências também
                    ficam no seu perfil.
                    </p>

                    <p className="mt-2">
                    Acesse Perfil e depois Editar Perfil. Lá você pode atualizar
                    bio, interesses, horário de preferência para jogar e outras
                    informações para deixar seu perfil ainda mais com a sua cara.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-6"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Preciso bloquear um usuário, como posso fazer isso?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>Para bloquear um usuário:</p>

                    <ol className="list-decimal pl-5">
                    <li>Abra o perfil da pessoa</li>
                    <li>Toque no menu de três pontinhos</li>
                    <li>Selecione “Bloquear”</li>
                    </ol>

                    <p className="mt-3">
                    A partir daí, vocês não vão mais conseguir se comunicar pelo
                    Huddle.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-7"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Como posso me tornar VIP no Huddle?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    Para turbinar sua experiência no Huddle, você só precisa
                    acessar o seu perfil e selecionar a opção para se tornar
                    membro VIP.
                    </p>

                    <p className="mt-2">
                    Sendo VIP, você ganha benefícios exclusivos como mais
                    visibilidade, recursos extras para personalização e prioridade
                    em novidades.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-8"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Tenho uma sugestão de melhoria, como posso enviar para a equipe
                    Huddle?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    Muito obrigado por querer ajudar nossa plataforma a crescer!
                    </p>

                    <p className="mt-2">
                    Envie sua sugestão pelo menu Configurações, depois Enviar
                    feedback, ou pelo nosso canal de suporte.
                    </p>

                    <p className="mt-2">
                    Sua ideia vai ser encaminhada para a área responsável e, se
                    utilizada, te daremos os créditos.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-9"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Como funciona o sistema de match do Huddle?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    O sistema de match do Huddle usa seus interesses, preferências
                    e horário de preferência para jogar, sugerindo pessoas com
                    maior chance de conexão real e mais adaptadas ao seu perfil.
                    </p>

                    <p className="mt-2">
                    Quanto mais completo seu perfil, melhores serão os matches.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-10"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Vai existir um chat de voz pelo Huddle?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    Inicialmente, todos os esforços do Huddle são para criar a
                    melhor experiência de conexão de usuários.
                    </p>

                    <p className="mt-2">
                    Levando isso em conta, não planejamos inicialmente adicionar
                    um chat de voz.
                    </p>

                    <p className="mt-2">
                    Mas claro, se for um pedido da nossa comunidade,
                    implementaremos no futuro.
                    </p>
                </AccordionContent>
                </AccordionItem>

                <AccordionItem
                value="item-11"
                className="rounded-2xl border border-fuchsia-blue-200 bg-white/90 px-5 shadow-sm transition-colors hover:border-fuchsia-blue-300 hover:bg-fuchsia-blue-50/70 dark:border-fuchsia-blue-900 dark:bg-card/90 dark:hover:bg-fuchsia-blue-950/40"
                >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-fuchsia-blue-950 transition-colors hover:text-fuchsia-blue-700 dark:text-fuchsia-blue-100 dark:hover:text-fuchsia-blue-300 md:text-lg">
                    Quero excluir minha conta, como prosseguir?
                </AccordionTrigger>

                <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    <p>
                    Que pena que você queira excluir sua conta. Pedimos que
                    preencha o formulário final indicando melhorias para a gente.
                    </p>

                    <p className="mt-2">
                    Acesse Configurações, depois Conta, depois Excluir conta e
                    siga as instruções.
                    </p>

                    <p className="mt-2 font-semibold text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    Importante: essa ação é permanente e não pode ser desfeita.
                    </p>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </section>
        </div>
        </main>
    );
    }