import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetBudgets } from "./useGetBudgets";
import { getDateRange } from "#lib/utils";
import { useGetExpensesByMonth } from "@/features/expense/hooks/useGetExpensesByMonth";

export function useBudgetCardGroupData() {
  const [searchParams] = useSearchParams();
  const currentMonth = searchParams.get("month");
  const dateRange = getDateRange(currentMonth);
  const { expenses, isLoading: expensesLoading } = useGetExpensesByMonth({
    dateRange,
    currentMonth,
  });
  const { budgets, isLoading: budgetsLoading } = useGetBudgets();
  const budgetCardsData = useMemo(() => {
    const budgetsPerCategory = budgets.map((budget) => {
      const expenseAmount = expenses.reduce(
        (total, exp) =>
          exp.category === budget.category ? total + exp.amount : total,
        0,
      );
      const fraction = Math.round((expenseAmount / budget.amount) * 100);
      return {
        budgetAmount: budget.amount,
        category: budget.category,
        fraction,
        expenseAmount,
      };
    });
    return budgetsPerCategory;
  }, [expenses, budgets]);
  return { budgetCardsData, isLoading: expensesLoading || budgetsLoading };
}
