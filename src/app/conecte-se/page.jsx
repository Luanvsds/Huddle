    "use client";

    import Link from "next/link";
    import { useRouter } from "next/navigation";
    import { useState } from "react";
    import { Eye, EyeOff } from "lucide-react";

    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select";

    export default function ConecteSePage() {
    const router = useRouter();

    // Aqui estamos usandos o useState para guardar oq a pessoa digita no formulario.
    // é muito importante, pois usamos ela para as validacoes.
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [apelido, setApelido] = useState("");
    const [gameplay, setGameplay] = useState("casual");

    // Aqui parece ser mais complicado, porem nao é. A logica é exatamente a mesma, servindo para as futuras validacoes
    // Mostrarsenha serve para quando clicarmos no olhinho o a senha fica visivel oui nao. Fazemos isso controlando o type do input.
    // Ja o mostrarRegraSenha serve para mostrar as regras quando o usuario clicar no campo ou se ele errar a senha
    // E o erros ele serve para guardar os erros ao fazer o preenchimento do formulario. Ela usa o setErros para guarda-los. Assim facilitando muito fazer as funcoes.
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarRegrasSenha, setMostrarRegrasSenha] = useState(false);
    const [erros, setErros] = useState({});

    // Aqui basicamente estamos fazendo todas as validacoes das senhas e guardando em uma variavel
    // Aqui estamos usando uma expressao regular(regex) para procurar os padroes dentro da senha
    // e o .teste serve para verificar se ele existe na nossa variavel, q nesse momento é a "senha"
    const senhaTemMinimo = senha.length >= 12;
    const senhaTemMaiuscula = /[A-Z]/.test(senha);
    const senhaTemMinuscula = /[a-z]/.test(senha);
    const senhaTemNumero = /[0-9]/.test(senha);
    const senhaTemEspecial = /[^A-Z a-z 0-9]/.test(senha);

    // A funcao senha valida sevre, como o nome diz, para verificar se todos os requisitos estao Corretos/preenchidos
    // fazemos essa validacao a partir do && que siginfica, basicamente 'e'. Onde para ser True, ele precisa que todas as regras sejam completadas.

    const senhaValida =
        senhaTemMinimo &&
        senhaTemMaiuscula &&
        senhaTemMinuscula &&
        senhaTemNumero &&
        senhaTemEspecial;

    // Aqui estamos valindando o email. Estamos criando uma funcao para armazenar essas 2 regras e validar por meio do if Se é valido ou nao

    function emailValido(emailDigitado) {
        const temArroba = emailDigitado.includes("@");
        const temPonto = emailDigitado.includes(".");

        if (temArroba && temPonto) {
        return true;
        }

        return false;
    }

    // Usando a mesma logica da passada, estamos fazendo uma funcao para armazenar a regra e a verificacao da propria
    function pessoaTem18AnosOuMais(dataDigitada) {
        const anoAtual = new Date().getFullYear();
        const anoNascimento = new Date(dataDigitada).getFullYear();
        const idade = anoAtual - anoNascimento;

        if (idade >= 18) {
        return true;
        }

        return false;
    }

    // A funcao estiloDoCampo serve para mudar a cor do campo, caso ele esteja com algum erro ele fica vermelho Se estiver normal, ele fica roxo, apenas para dar um foco maior no campo escolhido
    function estiloDoCampo(campoTemErro) {
  // Define o visual normal ou de erro dos campos do formulário
        if (campoTemErro) {
            return "h-12 border-red-500 bg-red-50 text-fuchsia-blue-950 placeholder:text-red-400 focus-visible:ring-red-500 dark:border-red-500 dark:bg-red-950/30 dark:text-fuchsia-blue-100 dark:placeholder:text-red-300/70";
}

        return "h-12 border-fuchsia-blue-300 bg-fuchsia-blue-50 text-fuchsia-blue-950 placeholder:text-fuchsia-blue-500 focus-visible:ring-fuchsia-blue-600 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100 dark:placeholder:text-fuchsia-blue-200/70";
}
    function enviarFormulario(event) {
        // Essa função é chamada quando o usuário clica no botão Participar.
        // Antes de mandar para a tela de sucesso, ela confere se os campos estão preenchidos corretamente.
        event.preventDefault();
        // Por padrão, um formulário HTML recarrega a página quando é enviado.
        // Como queremos validar os dados antes, usamos preventDefault para impedir esse comportamento automático.

        const novosErros = {};
        // Aqui criamos um objeto vazio para guardar os erros encontrados.
        // Se algum campo estiver errado, colocamos uma mensagem dentro desse objeto.

        if (email.trim() === "") {
        novosErros.email = "Informe seu e-mail.";
        } else if (!emailValido(email)) {
        novosErros.email = "Digite um e-mail válido.";
        }
        // O primeiro passo é conferir se o campo email está vazio, para validar isso, utilizamos o trim, que serve para nao aceitar um campo preenchido so com vazio
        // Apos passar por essa validacao, conferimos se o emaul segue as reguas para ser valido

        if (senha === "") {
        novosErros.senha = "Informe sua senha.";
        setMostrarRegrasSenha(true);
        } else if (!senhaValida) {
        novosErros.senha = "A senha precisa cumprir todos os requisitos.";
        setMostrarRegrasSenha(true);
        }
        // Aqui repetimos o processo, vericamos se esta vazio e se estiver acusa erro, e apaerece uma mensagem reforcando o preechimento certo
        //  Se estiver preenchida e nao cumprir as regras, tambem vai aparecer o erro. Automaticamente abrindo as regras para o usuario entender oq faltou


        if (dataNascimento === "") {
        novosErros.dataNascimento = "Informe sua data de nascimento.";
        } else if (!pessoaTem18AnosOuMais(dataNascimento)) {
        novosErros.dataNascimento =
            "O Huddle é uma comunidade 18+. Menores de idade não podem se cadastrar.";
        }
        // Na idade, tambem conferimos se esta vazio. apos isso, verificamos se o usario tem a idade minima para acessar nosso site (18 anos)


        if (apelido.trim() === "") {
        novosErros.apelido = "Informe seu apelido.";
        }
        // aqui a mesma coisa, verificamos se o usuario fez o preenchimento(atraves do trim)
        setErros(novosErros);
        // aqui que ocorre o salvamento dos erros. O setErros e quem faz essa magica. Ele que atualizado o valor do UseStates(erro). 
        // E a assim que a engrenagem de verificacao de erros termina, ou quase kkk.

        if (Object.keys(novosErros).length === 0) {
        // E por ultimo, aqui é o ultimo mecanismo para verficicao do erro. Aqui por meio do length verifacmos e o valor que esta no erro esta ou nao vazio
        // se estiver, finalmente iremos para a pagina de sucesso atravews router.push
        router.push("/sucesso");
        }
    }

    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
        <div className="mx-auto max-w-5xl space-y-10">
            <section className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">
                Cadastro
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
                Venha fazer parte da nossa{" "}
                <span className="text-fuchsia-blue-200">comunidade!</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
                Preencha os dados abaixo e comece a encontrar seu squad perfeito.
            </p>
            </section>

            <Card className="mx-auto max-w-3xl overflow-hidden border border-fuchsia-blue-300 bg-white/95 shadow-xl dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:shadow-none">
            <CardContent className="p-6 md:p-10">
                <form onSubmit={enviarFormulario} noValidate className="space-y-7">
                <div className="space-y-2">
                    <Label
                    htmlFor="email"
                    className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100"
                    >
                    E-mail
                    </Label>

                    <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={estiloDoCampo(erros.email)}
                    />

                    {erros.email && (
                    <p className="text-sm font-medium text-red-600">
                        {erros.email}
                    </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                    htmlFor="senha"
                    className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100"
                    >
                    Senha
                    </Label>

                    <div className="relative">
                    <Input
                        id="senha"
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        onFocus={() => setMostrarRegrasSenha(true)}
                        className={`${estiloDoCampo(erros.senha)} pr-12`}
                    />

                    <button
                        type="button"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-fuchsia-blue-700"
                        aria-label="Mostrar ou esconder senha"
                    >
                        {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    </div>

                    {mostrarRegrasSenha && (
                    <div
                        className={`rounded-2xl border p-4 text-sm ${
                        erros.senha
                            ? "border-red-300 bg-red-50"
                            : "border-fuchsia-blue-200 bg-fuchsia-blue-50"
                        } dark:border-fuchsia-blue-900 dark:bg-fuchsia-blue-950/30`}
                    >
                        <p className="mb-2 font-medium text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        Sua senha precisa ter:
                        </p>

                        <ul className="space-y-1">
                        <li
                            className={
                            senhaTemMinimo ? "text-green-600" : "text-red-600"
                            }
                        >
                            {senhaTemMinimo ? "✓" : "×"} Mínimo de 12 caracteres
                        </li>

                        <li
                            className={
                            senhaTemMaiuscula ? "text-green-600" : "text-red-600"
                            }
                        >
                            {senhaTemMaiuscula ? "✓" : "×"} Letra maiúscula
                        </li>

                        <li
                            className={
                            senhaTemMinuscula ? "text-green-600" : "text-red-600"
                            }
                        >
                            {senhaTemMinuscula ? "✓" : "×"} Letra minúscula
                        </li>

                        <li
                            className={
                            senhaTemNumero ? "text-green-600" : "text-red-600"
                            }
                        >
                            {senhaTemNumero ? "✓" : "×"} Número
                        </li>

                        <li
                            className={
                            senhaTemEspecial ? "text-green-600" : "text-red-600"
                            }
                        >
                            {senhaTemEspecial ? "✓" : "×"} Caractere especial
                        </li>
                        </ul>
                    </div>
                    )}

                    {erros.senha && (
                    <p className="text-sm font-medium text-red-600">
                        {erros.senha}
                    </p>
                    )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                    <Label
                        htmlFor="dataNascimento"
                        className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100"
                    >
                        Data de nascimento
                    </Label>

                    <Input
                        id="dataNascimento"
                        type="date"
                        value={dataNascimento}
                        onChange={(event) =>
                        setDataNascimento(event.target.value)
                        }
                        className={estiloDoCampo(erros.dataNascimento)}
                    />

                    {erros.dataNascimento && (
                        <p className="text-sm font-medium text-red-600">
                        {erros.dataNascimento}
                        </p>
                    )}
                    </div>

                    <div className="space-y-2">
                    <Label
                        htmlFor="apelido"
                        className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100"
                    >
                        Apelido
                    </Label>

                    <Input
                        id="apelido"
                        type="text"
                        placeholder="Como você quer aparecer?"
                        value={apelido}
                        onChange={(event) => setApelido(event.target.value)}
                        className={estiloDoCampo(erros.apelido)}
                    />

                    {erros.apelido && (
                        <p className="text-sm font-medium text-red-600">
                        {erros.apelido}
                        </p>
                    )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    Tipo de gameplay
                    </Label>

                    <Select value={gameplay} onValueChange={setGameplay}>
                    <SelectTrigger className="h-12 border-fuchsia-blue-300 bg-fuchsia-blue-50 text-fuchsia-blue-950 focus:ring-fuchsia-blue-600 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100">
                        <SelectValue placeholder="Escolha seu estilo" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="gamer">Gamer</SelectItem>
                        <SelectItem value="tryhard">Try hard</SelectItem>
                        <SelectItem value="competitivo">Competitivo</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                    Horários que costuma jogar:
                    </Label>

                    <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-sm font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                        <Checkbox />
                        Manhã
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-sm font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                        <Checkbox />
                        Tarde
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-sm font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                        <Checkbox />
                        Noite
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-sm font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                        <Checkbox />
                        Fins de semana
                    </label>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                    type="submit"
                    className="h-12 rounded-full bg-fuchsia-blue-600 text-white hover:bg-fuchsia-blue-700"
                    >
                    Participar
                    </Button>

                    <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full border-fuchsia-blue-300 text-fuchsia-blue-700 hover:bg-fuchsia-blue-50"
                    asChild
                    >
                    <Link href="/">Voltar ao início</Link>
                    </Button>
                </div>
                </form>
            </CardContent>
            </Card>
        </div>
        </main>
    );
    }