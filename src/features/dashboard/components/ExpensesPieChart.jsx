import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePieChartData } from "../hooks/usePieChartData";
import { Skeleton } from "#components/ui/skeleton";

export default function ExpensesPieChart() {
  const {
    chartInfo: { chartConfig, chartData },
    isLoading,
  } = usePieChartData();
  return (
    <Card className="mx-auto aspect-auto w-full grow justify-start gap-4 [--card-spacing:--spacing(4)] sm:gap-5 sm:[--card-spacing:--spacing(6)] lg:gap-6 lg:[--card-spacing:--spacing(8)]">
      <CardHeader className="items-center">
        <CardTitle className="text-base">Expenses</CardTitle>
        <CardDescription>By category</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center p-0">
        {isLoading ? (
          <div
            aria-busy="true"
            className="mx-auto flex h-[300px] min-h-[200px] w-full flex-col items-center justify-center gap-4"
          >
            <Skeleton className="size-[220px] rounded-full" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[300px] min-h-[200px] w-full"
          >
            <PieChart accessibilityLayer>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent nameKey="category" />}
                className="w-44"
              />

              <Pie
                data={chartData}
                dataKey="expense"
                nameKey="category"
                outerRadius={110}
              />

              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
