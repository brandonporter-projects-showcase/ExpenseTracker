import { getExpensesAPI } from "@/services/apiExpenses";
import { useQuery } from "@tanstack/react-query";

export function useGetExpensesByMonth({ dateRange, currentMonth }) {
  const {
    data: { expenses = [] } = {},
    error,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["expenses", currentMonth],
    queryFn: ({ signal }) => getExpensesAPI({ dateRange, signal }),
    networkMode: "always",
    enabled: Boolean(dateRange?.start && dateRange?.end),
  });
  if (error) throw error;
  return { expenses, error, isError, isSuccess, isLoading };
}
