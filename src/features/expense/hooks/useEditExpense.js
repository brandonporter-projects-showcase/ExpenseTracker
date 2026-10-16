import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
import { updateExpenseAPI } from "@/services/apiExpenses";

export function useEditExpense(filters) {
  const queryClient = useQueryClient();
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const {
    mutate: editExpense,
    isPending,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (data) => updateExpenseAPI(Number(expenseId), data),
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onMutate: (data) => {
      const queryKey = ["expenses", filters];
      const existing = queryClient.getQueryData(queryKey);
      if (!existing) {
        queryClient.invalidateQueries({ queryKey });
      } else {
        queryClient.setQueryData(["expenses", filters], (cur) => {
          const expenses = cur?.expenses?.map((exp) => {
            if (exp.id === data.id) return data;
            return exp;
          });
          return { expenses, count: cur.count };
        });
      }
      navigate("/app/home");
    },
  });
  return { editExpense, isPending, isSuccess, reset };
}
