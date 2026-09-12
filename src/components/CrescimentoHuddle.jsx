"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFontSize } from "./ui/layout/font-size";

const chartConfig = {
  usuarios: {
    label: "Usuários",
    color: "var(--chart-1)",
  },
};
export default function CrescimentoHuddle() {
  const {
    XlfontClass,
    Xl3fontClass,
    Xl4fontClass,
    Xl5fontClass,
    Xl6fontClass,
    smfontClass,
    lgfontClass,
  } = useFontSize();

  const [meses, setMeses] = useState(12);

  function calcularUsuarios(meses) {
    return 100 * 1.15 ** meses;
  }

  const usuariosProjetados = Math.round(calcularUsuarios(meses));

  const dadosGrafico = [];

  for (let mesAtual = 0; mesAtual <= meses; mesAtual++) {
    dadosGrafico.push({
      mes: mesAtual,
      usuarios: Math.round(calcularUsuarios(mesAtual)),
    });
  }
  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6 text-center">
        <p
          className={`${lgfontClass} font-bold uppercase tracking-[0.25rem] text-fuchsia-blue-600 dark:text-fuchsia-blue-300`}
        >
          Crescimento da comunidade
        </p>

        <h2
          className={`mt-2 ${Xl3fontClass} font-black text-fuchsia-blue-950 dark:text-fuchsia-blue-100`}
        >
          Projeção de usuários do Huddle
        </h2>

        <p
          className={`mx-auto mt-4 max-w-2xl ${smfontClass} text-muted-foreground`}
        >
          Acompanhe como a comunidade pode crescer ao longo do tempo com base em
          uma projeção exponencial
        </p>
      </div>

      <div className="mx-auto mt-6 w-fit rounded-2xl border border-fuchsia-blue-400/30 bg-fuchsia-blue-950/5 px-8 py-4 shadow-sm dark:bg-white/5">
        <p
          className={`${lgfontClass} font-black text-fuchsia-blue-700 dark:text-fuchsia-blue-300 text-center`}
        >
          {usuariosProjetados.toLocaleString("pt-BR")} usuários
        </p>

        <p className={`mt-1 ${smfontClass} text-muted-foreground`}>
          Projetados em {meses} meses
        </p>
      </div>

      <div className="mt-6 mb-10 rounded-2xl border border-fuchsia-blue-400/30 bg-fuchsia-blue-950/10 p-5 dark:bg-white/5">
        <div className="mb-4 flex items-center justify-between">
          <span className={`${lgfontClass} font-semibold`}>
            Período da Projeção
          </span>

          <span
            className={`rounded-full bg-fuchsia-blue-600 px-3 py-1 ${smfontClass} font-bold text-white`}
          >
            {meses} meses
          </span>
        </div>
        <Slider
          value={[meses]}
          min={0}
          max={24}
          step={1}
          onValueChange={(valor) => setMeses(valor[0])}
          className="**:data-[slot=slider-track]:h-2 **:data-[slot=slider-track]:bg-fuchsia-blue-300/30 [&_[data-slot=slider-range]]:bg-fuchsia-blue-600 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-fuchsia-blue-600 [&_[data-slot=slider-thumb]]:shadow-md"
        />
        <div
          className={`mt-2 flex justify-between ${smfontClass} text-muted-foreground`}
        >
          <span>0 meses</span>
          <span>24 meses</span>
        </div>
      </div>
      <ChartContainer config={chartConfig} className={"min-h-75 w-full"}>
        <LineChart data={dadosGrafico}>
          <XAxis
            dataKey="mes"
            padding={{ left: 10, right: 10 }}
            tick={{ fill: "var(--foreground)" }}
            axisLine={{ stroke: "var(--foreground)" }}
            tickLine={{ stroke: "var(--foreground)" }}
          />
          <YAxis
            tick={{ fill: "var(--foreground" }}
            axisLine={{ stroke: "var(--foreground)" }}
            tickLine={{ stroke: "var(--foreground)" }}
          />
          <Line
            type={"monotone"}
            dataKey="usuarios"
            stroke="var(--color-usuarios)"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ChartContainer>
    </section>
  );
}
