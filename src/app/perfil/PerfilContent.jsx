"use client";

import { useState, useEffect } from "react";
import {
    CheckCircle2,
    ChevronDown,
    Circle,
    Clock,
    Gamepad2,
    Globe,
    Image as ImageIcon,
    MapPin,
    Mic,
    MinusCircle,
    SignalHigh,
    Trophy,
    XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFontSize } from "@/components/ui/layout/font-size";
import Image from "next/image";
import { useAuth } from "@/components/hook/useAuth";
import { EditarPerfilModal } from "@/components/ui/editarPerfilModal";
const STATUS_OPTIONS = [
    {
        id: "online",
        label: "Online",
        dotColor: "bg-emerald-500",
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
    },
    {
        id: "jogando",
        label: "Jogando",
        dotColor: "bg-red-500",
        icon: Circle,
        iconColor: "text-red-500",
        fill: true,
    },
    {
        id: "ranked",
        label: "Ranked",
        dotColor: "bg-fuchsia-blue-600",
        icon: MinusCircle,
        iconColor: "text-fuchsia-blue-600",
    },
    {
        id: "AFK",
        label: "AFK",
        dotColor: "bg-amber-500",
        icon: Clock,
        iconColor: "text-amber-500",
    },
    {
        id: "invisivel",
        label: "Invisível",
        dotColor: "bg-slate-400",
        icon: XCircle,
        iconColor: "text-slate-400",
    },
];


function verificarHorarios() {
    return {
        icon: Clock,
        label: "Horário preferido",
        value: (() => {
            const horarios = JSON.parse(
                localStorage.getItem("user_horarios") || "{}"
            );
            const labels = {
                manha: "Manhã",
                tarde: "Tarde",
                noite: "Noite",
                fimDeSemana: "Fim de Semana",
            };
            const ativos = Object.keys(horarios)
                .filter((key) => horarios[key])
                .map((key) => labels[key]);
            return ativos.length ? ativos.join(", ") : "Não informado";
        })()
    }
}

function verificarPlataformas() {
    return {
        icon: Gamepad2,
        label: "Plataformas",
        value: (() => {
            const plataforma = JSON.parse(
                localStorage.getItem("user_plataformas") || "{}"
            );
            const labels = {
                pc: "PC",
                console: "Console",
                mobile: "Mobile",
            };
            const ativos = Object.keys(plataforma)
                .filter((key) => plataforma[key])
                .map((key) => labels[key]);
            return ativos.length ? ativos.join(", ") : "Não informado";
        })()
    }
}

function verificarIdiomas() {
    return {
        icon: Globe,
        label: "Idiomas",
        value: (() => {
            const plataforma = JSON.parse(
                localStorage.getItem("user_idiomas") || "{}"
            );
            const labels = {
                PT: "PT",
                EN: "EN",
                ES: "ES",
            };
            const ativos = Object.keys(plataforma)
                .filter((key) => plataforma[key])
                .map((key) => labels[key]);
            return ativos.length ? ativos.join(", ") : "Não informado";
        })()
    }
}

function setInfo() {
    return [
        verificarPlataformas(),
        verificarHorarios(),
        verificarIdiomas(),
        { icon: Mic, label: "Microfone", value: localStorage.getItem("user_microfone") ? localStorage.getItem("user_microfone") : "Não informado" },
        { icon: Trophy, label: "Estilo de jogo", value: localStorage.getItem("user_estilo") ? localStorage.getItem("user_estilo") : "Não informado" },
    ]
}

export function PerfilContent() {
    const autorizado = useAuth()
    const [status, setStatus] = useState(STATUS_OPTIONS[0]);
    const { XlfontClass, lgfontClass, smfontClass, XsfontClass } = useFontSize();
    const [info_rows, setInfoRows] = useState([{ icon: Gamepad2, label: "Plataformas", value: "Não informado" }]);
    const [tags, setTags] = useState(["Tipo de gameplay não informado"]);

    const [perfil, setPerfil] = useState({
        apelido: "",
        nome: "",
        cidade: "",
        plataforma: "",
        idade: "",
        bio: "",
        sobre: "",
        jogo: "",
        motivoJogo: "",
    });
    function carregarPrimeiraPlataforma() {
        try {
            const plataformas = JSON.parse(localStorage.getItem("user_plataformas") || "{}");
            const labels = { pc: "PC", console: "Console", mobile: "Mobile" };
            const chave = Object.keys(labels).find((key) => plataformas[key]);
            return chave ? labels[chave] : "";
        } catch {
            return "";
        }
    }

    function carregarPerfilDoStorage() {
        const estilo = localStorage.getItem("user_estilo");
        setTags(estilo ? [estilo] : ["Tipo de gameplay não informado"]);
        setInfoRows(setInfo());
        setPerfil({
            apelido: localStorage.getItem("user_apelido") || "",
            nome: localStorage.getItem("user_nome") || "",
            cidade: localStorage.getItem("user_cidade") || "",
            plataforma: carregarPrimeiraPlataforma(),
            idade: localStorage.getItem("idade") || "",
            bio: localStorage.getItem("user_bio") || "",
            sobre: localStorage.getItem("user_sobre") || "",
            jogo: localStorage.getItem("user_jogo") || "",
            motivoJogo: localStorage.getItem("user_motivo_jogo") || ""
        });
    }

    useEffect(() => {
        carregarPerfilDoStorage();
    }, []);
    if (!autorizado) return null;
    return (
        <main className="min-h-screen bg-linear-to-b from-fuchsia-blue-600 via-fuchsia-blue-50 to-white px-4 py-14 text-foreground dark:from-fuchsia-blue-600 dark:via-fuchsia-blue-950 dark:to-background">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <div className="rounded-[2.5rem] bg-linear-to-br from-violet-500 via-indigo-500 to-blue-500 p-0.5 shadow-[0_0_60px_-15px_rgba(124,58,237,0.5)]">
                    <div className="overflow-hidden rounded-[2.375rem] bg-white dark:bg-[#0b0817]">
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image src={perfil.jogo ? `/${perfil.jogo}.jpg` : '/padraoBanner.jpg'} alt="Imagem do jogo preferido do jogador, se não selecionado, imagem padrão" fill={true} />

                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10" />

                            <div className="absolute right-6 top-6">
                            </div>
                        </div>

                        <div className="relative bg-white px-8 pb-8 dark:bg-[#120d24]">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                <div className="-mt-12 flex gap-5">
                                    <div className="relative shrink-0">
                                        <div className="flex h-28 w-28 items-center justify-center rounded-[1.5rem] bg-linear-to-br from-violet-500 to-indigo-700 text-3xl font-extrabold text-white shadow-lg ring-4 ring-white dark:ring-[#120d24]">
                                            {perfil.apelido.substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className={`absolute -bottom-0.5  justify-center flex items-center gap-1.5 rounded-full ${status.dotColor} px-2.5 py-1 text-xs font-semibold text-white shadow`}>
                                            <span className="h-3 w-3 rounded-full" />
                                        </span>
                                    </div>

                                    <div className="pt-14 sm:pt-16">
                                        <div className="flex flex-wrap items-baseline gap-2">
                                            <h1
                                                className={`${XlfontClass} font-bold text-fuchsia-blue-950 dark:text-white`}
                                            >
                                                {perfil.nome || perfil.apelido}
                                            </h1>
                                            <span
                                                className={`${lgfontClass} text-violet-500 dark:text-violet-300/80`}
                                            >
                                                {'@' + perfil.apelido}
                                            </span>
                                        </div>
                                        <div
                                            className={`mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 ${smfontClass} text-slate-500 dark:text-slate-400`}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4" />
                                                {perfil.cidade ? perfil.cidade + ', Brasil' : "Cidade não informada" + ', Brasil'}{" "}
                                                <span
                                                    className={`${XsfontClass} text-slate-400 dark:text-slate-500`}
                                                >
                                                    BR
                                                </span>
                                            </span>
                                            <span>{perfil.idade ? `${perfil.idade} Anos` : "Idade não informada"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 flex-col gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="justify-between gap-3 rounded-full border-violet-200 bg-transparent font-normal text-fuchsia-blue-950 hover:bg-violet-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className={`h-2 w-2 rounded-full ${status.dotColor}`}
                                                    />
                                                    {status.label}
                                                </span>
                                                <ChevronDown className="h-4 w-4 text-slate-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            {STATUS_OPTIONS.map((opt) => {
                                                const Icon = opt.icon;
                                                return (
                                                    <DropdownMenuItem
                                                        key={opt.id}
                                                        onClick={() => setStatus(opt)}
                                                        className="gap-2.5"
                                                    >
                                                        <Icon
                                                            className={`h-4 w-4 ${opt.iconColor}`}
                                                            fill={opt.fill ? "currentColor" : "none"}
                                                        />
                                                        {opt.label}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                        <EditarPerfilModal onSalvar={carregarPerfilDoStorage} />
                                </div>
                            </div>

                            {/* Bio */}
                            <p
                                className={`mt-6 max-w-2xl ${smfontClass} leading-relaxed text-slate-600 dark:text-slate-300`}
                            >
                                {perfil.bio || "Biografia não informada"}
                            </p>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className={`rounded-full border-violet-200 bg-violet-50 px-4 py-1.5 ${smfontClass} font-normal text-violet-900 hover:bg-violet-100 dark:border-violet-400/30 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10`}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sobre mim / Jogo favorito / Ficha do jogador */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Coluna esquerda */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        {/* Sobre mim */}
                        <Card className="gap-0 rounded-[2.5rem] border-slate-200/70 bg-white py-0 shadow-sm dark:border-white/5 dark:bg-[#120d24] dark:shadow-none">
                            <CardContent className="p-8">
                                <p
                                    className={`${XsfontClass} font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400`}
                                >
                                    Identidade
                                </p>
                                <h2
                                    className={`mt-2 ${XlfontClass} font-bold text-fuchsia-blue-950 dark:text-white`}
                                >
                                    Sobre mim
                                </h2>

                                <div
                                    className={`mt-4 space-y-4 ${smfontClass} leading-relaxed text-slate-600 dark:text-slate-300`}
                                >
                                    {perfil.sobre || "Esse usuário não colocou nenhuma informação sobre sua identidade ainda."}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Jogo favorito */}
                        <Card className="gap-0 rounded-[2.5rem] border-slate-200/70 bg-white py-0 shadow-sm dark:border-white/5 dark:bg-[#120d24] dark:shadow-none">
                            <CardContent className="p-8">
                                <p
                                    className={`${XsfontClass} font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400`}
                                >
                                    Jogo favorito
                                </p>
                                <h2
                                    className={`mt-2 ${XlfontClass} font-bold text-fuchsia-blue-950 dark:text-white`}
                                >
                                    O jogo que me define
                                </h2>

                                <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                                    <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-[1.75rem] bg-linear-to-br from-violet-500 to-indigo-800">
                                        <Image src={perfil.jogo ? `/${perfil.jogo}-mini.jpg` : '/padraoBanner.jpg'} alt="Imagem do jogo preferido do jogador, se não selecionado, imagem padrão" fill={true} />
                                        <span className="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white">
                                            {perfil.plataforma || ""}
                                        </span>
                                        <div className="absolute bottom-0 w-full bg-linear-to-t from-black/70 to-transparent p-3">
                                            <p className="text-sm font-bold leading-tight text-white">
                                                {perfil.jogo ? "Imagem do jogo escolhido" : "Esse jogador não escolheu um jogo preferido ainda"}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p
                                            className={`${smfontClass} font-semibold text-fuchsia-blue-950 dark:text-white`}
                                        >
                                            Por que escolhi
                                        </p>
                                        <p
                                            className={`mt-2 ${smfontClass} leading-relaxed text-slate-600 dark:text-slate-300`}
                                        >
                                            {perfil.motivoJogo || "Esse jogador não descreveu o motivo do seu jogo preferido ser escolhido."}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna direita */}
                    <Card className="h-fit gap-0 overflow-hidden rounded-[2.5rem] border-slate-200/70 bg-white py-0 shadow-sm dark:border-white/5 dark:bg-[#120d24] dark:shadow-none">
                        <div className="bg-linear-to-br from-violet-600 to-indigo-600 px-6 py-5">
                            <p
                                className={`${XsfontClass} font-semibold uppercase tracking-widest text-white/70`}
                            >
                                Ficha do jogador
                            </p>
                            <p className={`mt-1 ${lgfontClass} font-bold text-white`}>
                                Resumo rápido
                            </p>
                        </div>

                        <CardContent className="p-0">
                            {info_rows.map(({ icon: Icon, label, value }, i) => (
                                <div
                                    key={label}
                                    className={`flex items-center gap-4 px-6 py-4 ${i !== info_rows.length - 1
                                        ? "border-b border-slate-100 dark:border-white/5"
                                        : ""
                                        }`}
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-white/5 dark:text-violet-300">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p
                                            className={`${XsfontClass} text-slate-500 dark:text-slate-400`}
                                        >
                                            {label}
                                        </p>
                                        <p
                                            className={`${smfontClass} font-semibold text-fuchsia-blue-950 dark:text-white`}
                                        >
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}