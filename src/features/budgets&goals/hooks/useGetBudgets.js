import { getBudgetsAPI } from "@/services/apiBudgets";
import { useQuery } from "@tanstack/react-query";

export function useGetBudgets() {
  const {
    data: budgets = [],
    error,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgetsAPI,
    networkMode: "always",
  });
  if (error) throw error;
  return { budgets, error, isError, isSuccess, isLoading };
}
