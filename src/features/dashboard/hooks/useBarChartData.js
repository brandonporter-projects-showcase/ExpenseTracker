import { useFilter } from "@/features/expense/hooks/useFilter";
import { useGetExpenses } from "@/features/expense/hooks/useGetExpenses";
import { useMemo } from "react";

export function useBarChartData() {
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
    const monthlyExpenses = expenses.map((expense) => {
      const month = new Date(expense.created_at).toLocaleString("en-US", {
        month: "short",
      });

      return [month, expense.amount];
    });

    const monthlyTotals = Array.from(
      monthlyExpenses.reduce((totals, monthlyExpense) => {
        const month = monthlyExpense[0];
        const amount = monthlyExpense[1];
        totals.set(month, (totals.get(month) ?? 0) + amount);
        return totals;
      }, new Map()),
    );

    const chartData = monthlyTotals
      .reduce((barChartData, monthlyTotal) => {
        const month = monthlyTotal[0];
        const totalExpenses = monthlyTotal[1];
        return [...barChartData, { month, expenses: totalExpenses }];
      }, [])
      .slice(-6);

    const chartConfig = {
      expenses: {
        label: "Expenses",
        color: "var(--chart-3)",
      },
    };
    return { chartData, chartConfig };
  }, [expenses]);

  return { chartInfo, isLoading };
}
