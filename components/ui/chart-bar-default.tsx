"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  return (
    <Card className="w-1/2">
      <div className="p-6 pb-0">
        <CardTitle>Trainings Statistics</CardTitle>
        <CardDescription>
          Overview of available, enrolled, and completed trainings
        </CardDescription>
      </div>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
