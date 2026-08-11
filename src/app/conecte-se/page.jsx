"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import * as Selected from '@radix-ui/react-select';
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
    const [gameplay, setGameplay] = useState("");
    'use client';

    const games = [
        { id: 1, name: "The Legend of Zelda" },
        { id: 2, name: "Super Mario Bros" },
        { id: 3, name: "God of War" },
        { id: 4, name: "Baldurs Gate 3" }
    ];

    const playstyles = [
        { id: 1, name: "Casual" },
        { id: 2, name: "Gamer" },
        { id: 3, name: "Tryhard" },
        { id: 4, name: "Competitivo" }
    ];



    // Aqui parece ser mais complicado, porem nao é. A logica é exatamente a mesma, servindo para as futuras validacoes
    // Mostrarsenha serve para quando clicarmos no olhinho o a senha fica visivel oui nao. Fazemos isso controlando o type do input.
    // Ja o mostrarRegraSenha serve para mostrar as regras quando o usuario clicar no campo ou se ele errar a senha
    // E o erros ele serve para guardar os erros ao fazer o preenchimento do formulario. Ela usa o setErros para guarda-los. Assim facilitando muito fazer as funcoes.
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erros, setErros] = useState({});
    const [selectedGame, setSelectedGame] = useState('');


    // Aqui basicamente estamos fazendo todas as validacoes das senhas e guardando em uma variavel
    // Aqui estamos usando uma expressao regular(regex) para procurar os padroes dentro da senha
    // e o .teste serve para verificar se ele existe na nossa variavel, q nesse momento é a "senha"
    const senhaTemMinimo = senha.length >= 12;
    const senhaTemMaiuscula = /[A-Z]/.test(senha);
    const senhaTemMinuscula = /[a-z]/.test(senha);
    const senhaTemNumero = /[0-9]/.test(senha);
    const senhaTemEspecial = /[^A-Z a-z 0-9]/.test(senha);

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    // A funcao senha valida sevre, como o nome diz, para verificar se todos os requisitos estao Corretos/preenchidos
    // fazemos essa validacao a partir do && que siginfica, basicamente 'e'. Onde para ser True, ele precisa que todas as regras sejam completadas.

    const senhaValida =
        senhaTemMinimo &&
        senhaTemMaiuscula &&
        senhaTemMinuscula &&
        senhaTemNumero &&
        senhaTemEspecial;

    const mostrarRegrasSenha = !senhaValida && isPasswordFocused;

    const hoje = new Date();

    const dataMaxima = hoje.toISOString().split('T')[0];

    const dataMinima = new Date(
        hoje.getFullYear() - 120,
        hoje.getMonth(),
        hoje.getDate()
    ).toISOString().split('T')[0];
    // Aqui estamos valindando o email. Estamos criando uma funcao para armazenar essas 2 regras e validar por meio do if Se é valido ou nao

    const validarEmail = (value) => {
        if (!value) return 'Preencha o campo';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Digite um e-mail válido.';
        return null;
    };


    function validarSenha(senha) {
        if (!senha) return "Preencha o campo";

        let senhaTemMaiuscula = /[A-Z]/.test(senha);
        let senhaTemMinuscula = /[a-z]/.test(senha);
        let senhaTemNumero = /[0-9]/.test(senha);
        let senhaTemEspecial = /[^A-Z a-z 0-9]/.test(senha);

        let senhaCumpreRequisitos = senhaTemMaiuscula && senhaTemMinuscula && senhaTemNumero && senhaTemEspecial;

        if (!senhaCumpreRequisitos || senha.length < 12) {
            return "Senha inválida, verifique os requisitos"
        }
        return null
    }

    function validarIdade(dataDigitada) {
        if (!dataDigitada) return "Preencha o campo";

        const nascimento = new Date(dataDigitada);
        const hoje = new Date();

        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const diferencaMes = hoje.getMonth() - nascimento.getMonth();
        const diferencaDia = hoje.getDate() - nascimento.getDate();

        // Subtrai 1 ano se ainda não fez aniversário esse ano
        const fezAniversario = diferencaMes > 0 || (diferencaMes === 0 && diferencaDia >= 0);
        const idadeReal = fezAniversario ? idade : idade - 1;

        if (idadeReal < 18) return 'Digite uma data válida, ou lembre-se: O Huddle é uma comunidade 18+. Menores de idade não podem se cadastrar.';


        return null;
    }

    function validarApelido(apelido) {
        if (!apelido) return "Preencha o campo";

        if (apelido.length > 20) {
            return "Limite máximo de tamanho de apelido ultrapassado"
        }

        return null;
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
        let temErros = false;

        const form = event.currentTarget;
        const email = form.elements.namedItem('email').value;
        const dataNascimento = form.elements.namedItem('dataNascimento').value;
        const senha = form.elements.namedItem('senha').value;
        const apelido = form.elements.namedItem('apelido').value;

        const emailInvalido = validarEmail(email)
        const idadeInvalida = validarIdade(dataNascimento)
        const senhaInvalida = validarSenha(senha);
        const apelidoInvalido = validarApelido(apelido);

        setErros((prev) => {
            const erros = { ...prev };
            if (emailInvalido) {
                erros.email = emailInvalido;
                temErros = true;
            } if (senhaInvalida) {
                erros.senha = senhaInvalida;
                temErros = true;
            } if (idadeInvalida) {
                erros.dataNascimento = idadeInvalida;
                temErros = true;
            } if (apelidoInvalido) {
                erros.apelido = apelidoInvalido;
                temErros = true;
            } else {
                delete erros.email;
                delete erros.dataNascimento;
                delete erros.senha;
                delete erros.apelido;
            }
            return erros;
        })
        if (!temErros) {
            router.push("/sucesso");
        }
    }

    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
            <div className="mx-auto max-w-5xl space-y-10">
                <section className="text-center">
                    <p className="text-xl font-bold uppercase tracking-[0.25em] text-fuchsia-blue-950 dark:text-fuchsia-blue-100">
                        Cadastro
                    </p>

                    <h1 className="mt-3 text-10xl font-black tracking-tight text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-6xl">
                        Venha fazer parte da nossa{" "}
                        <span className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100">comunidade!</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-fuchsia-blue-950 dark:text-fuchsia-blue-100 md:text-base">
                        Preencha os dados abaixo e comece a encontrar seu squad perfeito.
                    </p>
                </section>

                <Card className="mx-auto max-w-3xl overflow-hidden border border-fuchsia-blue-300 bg-white/95 shadow-xl dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:shadow-none">
                    <CardContent className="p-6 md:p-10">
                        <form onSubmit={enviarFormulario} noValidate className="space-y-7">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl"
                                >
                                    E-mail
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seuemail@exemplo.com"
                                    value={email}
                                    onChange={(e) => {

                                        const valor = e.target.value;
                                        setEmail(valor);

                                        const error = validarEmail(valor);

                                        setErros((prev) => {
                                            const erros = { ...prev }
                                            if (!error) {
                                                delete erros.email;
                                            } else {
                                                erros.email = error;
                                            }
                                            return erros;
                                        })
                                    }}

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
                                    className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl"
                                >
                                    Senha
                                </Label>

                                <div className="relative">
                                    <Input
                                        id="senha"
                                        type={mostrarSenha ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={senha}
                                        onChange={(event) => {
                                            const valor = event.target.value;
                                            setSenha(valor);

                                            const error = validarSenha(valor);
                                            setErros((prev) => {
                                                const erros = { ...prev }
                                                if (!error) {
                                                    delete erros.senha;
                                                } else {
                                                    erros.senha = error;
                                                }
                                                return erros;
                                            })

                                        }}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
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
                                        className={`rounded-2xl border p-4 text-sm ${erros.senha
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
                                        className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl"
                                    >
                                        Data de nascimento
                                    </Label>

                                    <Input
                                        id="dataNascimento"
                                        type="date"
                                        value={dataNascimento}
                                        max={dataMaxima}
                                        min={dataMinima}
                                        onChange={(e) => {

                                            const valor = e.target.value;
                                            setDataNascimento(valor);

                                            const error = validarIdade(valor);

                                            setErros((prev) => {
                                                const erros = { ...prev };
                                                if (!error) {
                                                    delete erros.dataNascimento;
                                                } else {
                                                    erros.dataNascimento = error;
                                                }
                                                return erros;
                                            })
                                        }}
                                        className={`${estiloDoCampo(erros.dataNascimento)} appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:hidden `}
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
                                        className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl"
                                    >
                                        Apelido
                                    </Label>

                                    <Input
                                        id="apelido"
                                        type="text"
                                        placeholder="Como você quer aparecer?"
                                        value={apelido}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            setApelido(valor);

                                            const error = validarApelido(valor);

                                            setErros((prev) => {
                                                const erros = { ...prev };
                                                if (!error) {
                                                    delete erros.apelido;
                                                } else {
                                                    erros.apelido = error;
                                                }
                                                return erros;
                                            })
                                        }}
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
                                <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl">
                                    Tipo de gameplay
                                </Label>

                                <Select value={gameplay} onValueChange={setGameplay}>
                                    <SelectTrigger className="h-12 w-full flex items-center border-fuchsia-blue-300 bg-fuchsia-blue-50 text-fuchsia-blue-950 focus:ring-fuchsia-blue-600 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100 data-placeholder:text-fuchsia-blue-500 dark:data-placeholder:text-fuchsia-blue-200/70">
                                        <SelectValue placeholder="Escolha seu estilo" />
                                    </SelectTrigger>

                                    <SelectContent side="bottom" align="start" position="popper">
                                        {playstyles.map((playstyle) => (
                                            <SelectItem key={playstyle.id} value={playstyle.name} className="text-xl"> {playstyle.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">

                                <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl">
                                    Jogo preferido
                                </Label>
                                <Select className="w-1xl" value={selectedGame} onValueChange={setSelectedGame}>

                                    <SelectTrigger className="h-12 w-full flex items-center border-fuchsia-blue-300 bg-fuchsia-blue-50 text-fuchsia-blue-950 focus:ring-fuchsia-blue-600 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100 data-placeholder:text-fuchsia-blue-500 dark:data-placeholder:text-fuchsia-blue-200/70">
                                        <SelectValue placeholder="Selecione um jogo" />
                                    </SelectTrigger>

                                    <SelectContent side="bottom" align="start" position="popper">
                                        {games.map((game) => (
                                            <SelectItem key={game.id} value={game.name} className="text-xl"> {game.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-xl">
                                    Horários que costuma jogar:
                                </Label>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-xl font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100 ">
                                        <Checkbox />
                                        Manhã
                                    </label>

                                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-xl font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                                        <Checkbox />
                                        Tarde
                                    </label>

                                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-xl font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                                        <Checkbox />
                                        Noite
                                    </label>

                                    <label className="flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 text-xl font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-background dark:text-fuchsia-blue-100">
                                        <Checkbox />
                                        Fins de semana
                                    </label>
                                </div>
                            </div>

                            <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-sm2 gap-1">
                                Ao clicar em participar, você declara ser maior de 18 anos, e aceitar os <Link  className= " dark:hover:text-fuchsia-blue-700 hover:text-fuchsia-blue-950 no-underline hover:underline text-fuchsia-blue-500" href="/termos">termos de uso</Link> do Huddle.
                            </Label>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button
                                    type="submit"
                                    className="h-12 rounded-full bg-fuchsia-blue-600 text-white hover:bg-fuchsia-blue-700 text-xl"
                                >
                                    Participar
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 rounded-full border-fuchsia-blue-300 dark:text-fuchsia-blue-100 text-fuchsia-blue-700 dark:hover:bg-fuchsia-blue-700 hover:bg-fuchsia-blue-700 hover:text-white text-xl bg-background-white"
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