import { getExpenseAPI } from "@/services/apiExpenses";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetExpense(expenseId, filters) {
  const queryClient = useQueryClient();
  const {
    minAmount,
    maxAmount,
    search,
    categories,
    page,
    date: { period },
  } = filters;
  const {
    data: expense,
    error,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: () => getExpenseAPI(expenseId),
    enabled: Boolean(expenseId),
    networkMode: "always",
    initialData: () => {
      const expensesQuery = queryClient.getQueryData([
        "expenses",
        { minAmount, maxAmount, search, categories, period, page },
      ]);
      if (expensesQuery)
        return expensesQuery?.expenses?.find((exp) => exp.id === expenseId);
    },
  });
  if (error) throw error;
  return { expense, isSuccess, isLoading };
}
