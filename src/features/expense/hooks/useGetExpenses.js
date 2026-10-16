import { getExpensesAPI } from "@/services/apiExpenses";
import { useQuery } from "@tanstack/react-query";

export function useGetExpenses(filters) {
  const {
    minAmount,
    maxAmount,
    search,
    categories,
    page,
    date: { dateRange, period },
  } = filters;
  const {
    data: { expenses = [], count = 0 } = {},
    error,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [
      "expenses",
      { minAmount, maxAmount, search, categories, period, page },
    ],
    queryFn: ({ signal }) =>
      getExpensesAPI({
        dateRange,
        minAmount,
        maxAmount,
        search,
        categories,
        page,
        signal,
      }),
    networkMode: "always",
    // enabled: Boolean(dateRange?.start && dateRange?.end),
  });
  if (error) throw error;
  return { expenses, count, error, isError, isSuccess, isLoading };
}
