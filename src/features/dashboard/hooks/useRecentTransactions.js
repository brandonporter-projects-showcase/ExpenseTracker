import { useFilter } from "@/features/expense/hooks/useFilter";
import { useGetExpenses } from "@/features/expense/hooks/useGetExpenses";
import { useMemo } from "react";

const transactions = [
  {
    name: "Weekly groceries",
    category: "Food",
    price: "62.20",
    date: "Jun 28",
  },
];
export function useRecentTransactions() {
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
  const recentTransactions = useMemo(() => {
    const recentExpenses = expenses
      .slice(-5)
      .toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const recentTransactions = recentExpenses.map((transaction) => {
      const date = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(new Date(transaction.created_at));
      return {
        name: transaction.name ?? transaction.description,
        category: transaction.category,
        price: transaction.amount.toFixed(2),
        date,
        id: transaction.id,
      };
    });
    return recentTransactions;
  }, [expenses]);

  return { recentTransactions, isLoading };
}
