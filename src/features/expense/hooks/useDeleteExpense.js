import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
import { deleteExpenseAPI } from "@/services/apiExpenses";

export function useDeleteExpense(filters) {
  const queryClient = useQueryClient();
  const {
    mutate: deleteExpense,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteExpenseAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onMutate: (data) => {
      queryClient.setQueryData(["expenses", filters], (cur) => {
        const expenses = cur?.expenses?.filter((exp) => exp.id !== data);
        return { expenses, count: cur?.count };
      });
    },
  });

  return { deleteExpense, error, isPending, isSuccess };
}
