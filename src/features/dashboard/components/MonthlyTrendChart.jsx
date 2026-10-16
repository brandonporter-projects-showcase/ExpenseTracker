import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "#components/ui/card";
import { useBarChartData } from "../hooks/useBarChartData";
import { Skeleton } from "#components/ui/skeleton";

export default function MonthlyTrendChart() {
  const {
    chartInfo: { chartData, chartConfig },
    isLoading,
  } = useBarChartData();
  return (
    <Card className="mx-auto aspect-auto w-full justify-start gap-4 [--card-spacing:--spacing(4)] sm:gap-5 sm:[--card-spacing:--spacing(6)] lg:gap-6 lg:[--card-spacing:--spacing(8)]">
      <CardHeader className="items-center">
        <CardTitle className="text-base">Expenses</CardTitle>
        <CardDescription>By month</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center p-0">
        {isLoading ? (
          <div className="flex w-full items-end justify-around">
            <Skeleton className="h-[50px] w-1/4 rounded-xl" />
            <Skeleton className="h-[150px] w-1/4 rounded-xl" />
            <Skeleton className="h-[300px] w-1/4 rounded-xl" />
          </div>
        ) : (
          <ChartContainer
            className="h-[300px] min-h-[200px] w-full"
            config={chartConfig}
          >
            <BarChart
              data={chartData}
              responsive
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="expenses" fill="var(--color-expenses)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
