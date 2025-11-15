"use client"

import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Skeleton } from "./skeleton"

export const description = "A pie chart with a label"

export function ChartPieLabel() {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTrainingsByCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/statistics/trainings-by-categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        )
        const data = await res.json()

        const chartColors = [
          "var(--chart-1)",
          "var(--chart-2)",
          "var(--chart-3)",
          "var(--chart-4)",
          "var(--chart-5)",
        ]

        const transformedData = data.map((item: any, index: number) => ({
          category: item.category_name,
          total: item.total_trainings,
          fill: chartColors[index % chartColors.length],
        }))
        setChartData(transformedData)

        const newChartConfig = data.reduce(
          (acc: ChartConfig, item: any, index: number) => {
            acc[item.category_name] = {
              label: item.category_name,
              color: chartColors[index % chartColors.length],
            }
            return acc
          },
          { total: { label: "Trainings" } }
        )
        setChartConfig(newChartConfig)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getTrainingsByCategory()
  }, [])

  return (
    <Card className="flex flex-col w-1/2">
      <div className="items-center p-6 pb-0">
        <CardTitle>Trainings by Category</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </div>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[350px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="total" label nameKey="category" />
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
