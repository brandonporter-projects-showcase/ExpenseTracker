import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
import { deleteBudgetAPI } from "@/services/apiBudgets";

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBudget,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteBudgetAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onMutate: (data) => {
      queryClient.setQueryData(["budgets"], (cur) => {
        return cur.filter((bud) => bud.category !== data);
      });
    },
  });

  return { deleteBudget, error, isPending, isSuccess };
}
