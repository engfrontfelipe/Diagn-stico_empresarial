"use client"

import { Bar, BarChart, Cell, Pie, PieChart, Sector, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#2563eb" },   // Azul forte
  { browser: "safari", visitors: 200, fill: "#db2777" },   // Rosa escuro
  { browser: "firefox", visitors: 187, fill: "#f59e0b" },  // Amarelo queimado
  { browser: "edge", visitors: 173, fill: "#10b981" },     // Verde escuro
  { browser: "other", visitors: 90, fill: "#8b5cf6" },     // Roxo escuro
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Estratégia",
    color: "#2563eb",
  },
  safari: {
    label: "Vendas",
    color: "#db2777",
  },
  firefox: {
    label: "Marketing",
    color: "#f59e0b",
  },
  edge: {
    label: "RH",
    color: "#10b981",
  },
  other: {
    label: "Operações",
    color: "#8b5cf6",
  },
} satisfies ChartConfig

export default function DashboardGeneral() {
  return (
    <Card className="w-full h-full p-8 grid grid-cols-2 justify-center align-middle">
      <ChartContainer className="h-50 " config={chartConfig}>
            <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 10 }}
            >
            <YAxis
                dataKey="browser"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
                }
                tick={{ fill: "#f9fafb" }}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
            </BarChart>
      </ChartContainer>

      <ChartContainer
        config={chartConfig}
        className="mx-auto "
      >
            <PieChart>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                data={chartData}
                height={100}
                width={100}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                outerRadius={80}
                stroke="#1f2937"
                strokeWidth={2}
                activeIndex={0}
                activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                )}
                >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                </Pie>
                </PieChart>
      </ChartContainer>
    </Card>
  )
}
