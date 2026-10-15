"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFontSize } from "@/components/ui/layout/font-size";

const games = [
    { id: 1, name: "The Legend of Zelda" },
    { id: 2, name: "Valorant" },
    { id: 3, name: "God of War" },
    { id: 4, name: "League of Legends" },
];

const playstyles = [
    { id: 1, name: "Casual" },
    { id: 2, name: "Gamer" },
    { id: 3, name: "Tryhard" },
    { id: 4, name: "Competitivo" },
];

const microfoneOptions = [
    { id: 1, name: "Não informado" },
    { id: 2, name: "Disponível" },
    { id: 3, name: "Não Disponível" },
];

const HORARIOS_LABELS = [
    ["manha", "Manhã"],
    ["tarde", "Tarde"],
    ["noite", "Noite"],
    ["fimDeSemana", "Fins de semana"],
];

const PLATAFORMAS_LABELS = [
    ["PC", "PC"],
    ["Console", "Console"],
    ["Mobile", "Mobile"],
];

const IDIOMAS_LABELS = [
    ["PT", "Português"],
    ["EN", "Inglês"],
    ["ES", "Espanhol"],
];

const estiloInput =
    "h-12 border-fuchsia-blue-300 bg-fuchsia-blue-50 text-fuchsia-blue-950 placeholder:text-fuchsia-blue-500 focus-visible:ring-fuchsia-blue-600 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100 dark:placeholder:text-fuchsia-blue-200/70";

const estiloSelectTrigger =
    "h-12 w-full flex items-center border-fuchsia-blue-300 bg-fuchsia-blue-50 text-fuchsia-blue-950 focus:ring-fuchsia-blue-600 dark:border-fuchsia-blue-600 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100 data-placeholder:text-fuchsia-blue-500 dark:data-placeholder:text-fuchsia-blue-200/70";

const estiloCheckboxLabel =
    "flex items-center gap-3 rounded-2xl border border-fuchsia-blue-200 bg-fuchsia-blue-50 p-3 font-medium text-fuchsia-blue-950 dark:border-fuchsia-blue-900 dark:bg-fuchsia-blue-950/40 dark:text-fuchsia-blue-100";

function carregarEstadoInicial() {
    let horarios = { manha: false, tarde: false, noite: false, fimDeSemana: false };
    let plataformas = { PC: false, Console: false, Mobile: false };
    let idiomas = { PT: false, EN: false, ES: false };

    try {
        horarios = { ...horarios, ...JSON.parse(localStorage.getItem("user_horarios") || "{}") };
    } catch { }
    try {
        plataformas = { ...plataformas, ...JSON.parse(localStorage.getItem("user_plataformas") || "{}") };
    } catch { }
    try {
        idiomas = { ...idiomas, ...JSON.parse(localStorage.getItem("user_idiomas") || "{}") };
    } catch { }

    return {
        gameplay: localStorage.getItem("user_estilo") || "",
        jogoSelecionado: localStorage.getItem("user_jogo") || "",
        motivoJogo: localStorage.getItem("user_motivo_jogo") || "",
        nome: localStorage.getItem("user_nome") || "",
        cidade: localStorage.getItem("user_cidade") || "",
        bio: localStorage.getItem("user_bio") || "",
        sobre: localStorage.getItem("user_sobre") || "",
        microfone: localStorage.getItem("user_microfone") || "",
        horarios,
        plataformas,
        idiomas,
    };
}

export function EditarPerfilModal({ onSalvar }) {
    const { XlfontClass } = useFontSize();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(null);

    function abrirModal(estaAbrindo) {
        if (estaAbrindo) {
            setForm(carregarEstadoInicial());
        }
        setOpen(estaAbrindo);
    }

    function atualizarCampo(campo, valor) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    }

    function atualizarGrupo(grupo, chave, valor) {
        setForm((prev) => ({
            ...prev,
            [grupo]: { ...prev[grupo], [chave]: valor },
        }));
    }

    function handleSalvar() {
        localStorage.setItem("user_estilo", form.gameplay);
        localStorage.setItem("user_jogo", form.jogoSelecionado);
        localStorage.setItem("user_motivo_jogo", form.jogoSelecionado ? form.motivoJogo : "");
        localStorage.setItem("user_nome", form.nome);
        localStorage.setItem("user_cidade", form.cidade);
        localStorage.setItem("user_bio", form.bio);
        localStorage.setItem("user_sobre", form.sobre);
        localStorage.setItem("user_microfone", form.microfone);
        localStorage.setItem("user_horarios", JSON.stringify(form.horarios));
        localStorage.setItem("user_plataformas", JSON.stringify(form.plataformas));
        localStorage.setItem("user_idiomas", JSON.stringify(form.idiomas));

        onSalvar?.();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={abrirModal}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="justify-between gap-3 rounded-full border-violet-200 bg-transparent font-normal text-fuchsia-blue-950 hover:bg-violet-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                    <span className="flex items-center gap-2">
                        <Pencil className="h-3.5 w-3.5" />
                        Editar perfil
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex max-h-[85vh] flex-col pr-4 sm:max-w-xl ">
                <DialogHeader>
                    <DialogTitle className={XlfontClass}>Editar perfil</DialogTitle>
                    <DialogDescription>
                        Atualize as informações extras do seu perfil. E-mail, senha, CPF, data de
                        nascimento e apelido não são editados por aqui.
                    </DialogDescription>
                </DialogHeader>

                {form && (
                    <ScrollArea className="h-100 w-full rounded-md border p-5 items-center" >
                        <div className="space-y-6 py-2 items-center pr-4">
                            <div className="space-y-2">
                                <Label className={XlfontClass}>Tipo de gameplay</Label>
                                <Select value={form.gameplay} onValueChange={(v) => atualizarCampo("gameplay", v)}>
                                    <SelectTrigger className={estiloSelectTrigger}>
                                        <SelectValue placeholder="Escolha seu estilo" />
                                    </SelectTrigger>
                                    <SelectContent side="bottom" align="start" position="popper">
                                        {playstyles.map((p) => (
                                            <SelectItem key={p.id} value={p.name} className={XlfontClass}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className={XlfontClass}>Jogo preferido</Label>
                                <Select
                                    value={form.jogoSelecionado}
                                    onValueChange={(v) => atualizarCampo("jogoSelecionado", v)}
                                >
                                    <SelectTrigger className={estiloSelectTrigger}>
                                        <SelectValue placeholder="Selecione um jogo" />
                                    </SelectTrigger>
                                    <SelectContent side="bottom" align="start" position="popper">
                                        {games.map((g) => (
                                            <SelectItem key={g.id} value={g.name} className={XlfontClass}>
                                                {g.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {form.jogoSelecionado && (
                                <div className="space-y-2">
                                    <Label className={XlfontClass}>
                                        Por que <strong>{form.jogoSelecionado}</strong> é seu jogo favorito?
                                    </Label>
                                    <Textarea
                                        value={form.motivoJogo}
                                        placeholder="Conte o motivo de ter escolhido seu jogo preferido"
                                        className={estiloInput}
                                        onChange={(e) => atualizarCampo("motivoJogo", e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <Label className={XlfontClass}>Horários que costuma jogar:</Label>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {HORARIOS_LABELS.map(([chave, label]) => (
                                        <label key={chave} className={estiloCheckboxLabel}>
                                            <Checkbox
                                                checked={form.horarios[chave]}
                                                onCheckedChange={(v) => atualizarGrupo("horarios", chave, v)}
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className={XlfontClass}>Nome</Label>
                                    <Input
                                        value={form.nome}
                                        placeholder="Qual o seu nome?"
                                        className={estiloInput}
                                        onChange={(e) => atualizarCampo("nome", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className={XlfontClass}>Cidade</Label>
                                    <Input
                                        value={form.cidade}
                                        placeholder="Qual o nome da sua cidade?"
                                        className={estiloInput}
                                        onChange={(e) => atualizarCampo("cidade", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className={XlfontClass}>Plataformas que costuma jogar:</Label>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {PLATAFORMAS_LABELS.map(([chave, label]) => (
                                        <label key={chave} className={estiloCheckboxLabel}>
                                            <Checkbox
                                                checked={form.plataformas[chave]}
                                                onCheckedChange={(v) => atualizarGrupo("plataformas", chave, v)}
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className={XlfontClass}>Idiomas que você fala:</Label>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {IDIOMAS_LABELS.map(([chave, label]) => (
                                        <label key={chave} className={estiloCheckboxLabel}>
                                            <Checkbox
                                                checked={form.idiomas[chave]}
                                                onCheckedChange={(v) => atualizarGrupo("idiomas", chave, v)}
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className={XlfontClass}>Bio do Perfil</Label>
                                <Textarea
                                    value={form.bio}
                                    placeholder="Insira a bio do seu perfil"
                                    className={estiloInput}
                                    onChange={(e) => atualizarCampo("bio", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className={XlfontClass}>Sobre você</Label>
                                <Textarea
                                    value={form.sobre}
                                    placeholder="Fale um pouco sobre você"
                                    className={estiloInput}
                                    onChange={(e) => atualizarCampo("sobre", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className={XlfontClass}>Microfone</Label>
                                <Select value={form.microfone} onValueChange={(v) => atualizarCampo("microfone", v)}>
                                    <SelectTrigger className={estiloSelectTrigger}>
                                        <SelectValue placeholder="Seu microfone está disponível?" />
                                    </SelectTrigger>
                                    <SelectContent side="bottom" align="start" position="popper">
                                        {microfoneOptions.map((m) => (
                                            <SelectItem key={m.id} value={m.name} className={XlfontClass}>
                                                {m.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </ScrollArea>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSalvar}
                        className="bg-fuchsia-blue-600 text-white hover:bg-fuchsia-blue-700"
                    >
                        Salvar alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}