import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetBudgets } from "./useGetBudgets";
import { getDateRange } from "#lib/utils";
import { useGetExpensesByMonth } from "@/features/expense/hooks/useGetExpensesByMonth";

export function useOverviewPanelData() {
  const [searchParams] = useSearchParams();
  const currentMonth = searchParams.get("month");
  const dateRange = getDateRange(currentMonth);
  const { expenses, isLoading: expensesLoading } = useGetExpensesByMonth({
    dateRange,
    currentMonth,
  });
  const { budgets, isLoading: budgetsLoading } = useGetBudgets();
  const overviewData = useMemo(() => {
    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const totalBudget = budgets.reduce((acc, bud) => acc + bud.amount, 0);
    const remaining = totalBudget - totalSpent;
    const fraction =
      totalBudget > 0
        ? Number(((totalSpent / totalBudget) * 100).toFixed(1))
        : 0;
    return {
      totalSpent,
      remaining,
      totalBudget,
      fraction: isNaN(fraction) ? 0 : fraction,
    };
  }, [expenses, budgets]);
  return { overviewData, isLoading: expensesLoading || budgetsLoading };
}
