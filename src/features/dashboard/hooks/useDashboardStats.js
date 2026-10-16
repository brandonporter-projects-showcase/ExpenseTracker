import { useFilter } from "@/features/expense/hooks/useFilter";
import { useGetExpenses } from "@/features/expense/hooks/useGetExpenses";
import { useMemo } from "react";

function getNumDays(dateRange, firstExpenseDate) {
  let end, start;
  if (!dateRange && !firstExpenseDate)
    return { numDays: 0, start: null, end: null };
  if (dateRange?.start && dateRange?.end) {
    start = new Date(dateRange.start);
    end = new Date(dateRange.end);
  } else if (firstExpenseDate) {
    start = new Date(firstExpenseDate);
    end = new Date();
  }
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffMs = end.getTime() - start.getTime();
  const numDays = diffMs / (1000 * 60 * 60 * 24) + 1;
  return { numDays, start, end };
}
export function useDashboardStats() {
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
  const stats = useMemo(() => {
    const { dateRange } = date;
    const { numDays, start, end } = getNumDays(
      dateRange,
      expenses[0]?.created_at,
    );
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    const totalExpenses = expenses.reduce((total, exp) => {
      return total + exp.amount;
    }, 0);
    const totalExpensesLabel =
      !start || !end
        ? "All Time"
        : `${formatter.format(start)} - ${formatter.format(end)}`;
    const dailyAvg =
      totalExpenses && numDays ? (totalExpenses / numDays).toFixed(2) : 0;
    const categoryTotals = expenses.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
    const topCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];
    const transactions = expenses.length;
    return {
      stats: {
        totalExpenses: `$${totalExpenses}`,
        dailyAvg: `$${dailyAvg}`,
        topCategory: topCategory ?? "-",
        transactions,
      },
      isLoading,
      totalExpensesLabel,
    };
  }, [expenses, isLoading, date]);

  return stats;
}
