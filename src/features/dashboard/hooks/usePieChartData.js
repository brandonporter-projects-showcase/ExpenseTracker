import { useFilter } from "@/features/expense/hooks/useFilter";
import { useGetExpenses } from "@/features/expense/hooks/useGetExpenses";
import { useMemo } from "react";

export function usePieChartData() {
  const {
    filters: { search, categories, minAmount, maxAmount, date },
  } = useFilter();
  const { expenses, isLoading } = useGetExpenses({
    search,
    categories,
    minAmount,
    maxAmount,
    date,
  });
  const chartInfo = useMemo(() => {
    const categories = Array.from(new Set(expenses.map((exp) => exp.category)));
    const expensesPerCategory = categories.map((cat) => {
      const totalExpenses = expenses.reduce((total, curExpense) => {
        if (cat === curExpense.category) return total + curExpense.amount;
        return total;
      }, 0);
      return [cat, totalExpenses];
    });
    const sortedCategories = expensesPerCategory.sort((a, b) => b[1] - a[1]);
    const topCategories = sortedCategories.slice(0, 5);
    const othersTotal = sortedCategories
      .slice(5)
      .reduce((total, cur) => total + cur[1], 0);
    const normalizedCategories =
      othersTotal > 0
        ? [...topCategories, ["Others", othersTotal]]
        : topCategories;

    const chartData = normalizedCategories.map((cur) => {
      return {
        category: cur[0].split(" ").join("-"),
        expense: cur[1],
        fill: `var(--color-${cur[0].split(" ").join("-")})`,
      };
    });
    const chartConfig = normalizedCategories.reduce((config, cur, i) => {
      return {
        ...config,
        [cur[0].split(" ").join("-")]: {
          label: cur[0],
          color: `var(--chart-${i + 1})`,
        },
      };
    }, {});
    return { chartData, chartConfig };
  }, [expenses]);

  return { chartInfo, isLoading };
}
