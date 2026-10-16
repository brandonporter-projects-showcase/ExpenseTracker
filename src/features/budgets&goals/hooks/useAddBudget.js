import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
import { addBudgetAPI } from "@/services/apiBudgets";

export function useAddBudget() {
  const queryClient = useQueryClient();
  const {
    data,
    isSuccess,
    isPending,
    mutate: addBudget,
  } = useMutation({
    mutationFn: addBudgetAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onSuccess: (newBudget) => {
      queryClient.setQueryData(["budgets"], (oldBudgets) => {
        return [...oldBudgets, ...newBudget];
      });
    },
  });
  return { data, isPending, isSuccess, addBudget };
}
