import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
import { addExpenseAPI, updateExpenseAPI } from "@/services/apiExpenses";
import { useNavigate } from "react-router";
import { getExpenseName } from "@/services/apiExpenseName";

export function useAddExpense(filters) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  async function generateAndAssignName({ description, category, id }) {
    try {
      const result = await getExpenseName({
        description,
        category,
      });
      const generatedName = result.name;
      if (!generatedName)
        throw normalizeError(
          new Error("The AI could not generate an expense name."),
        );
      const data = await updateExpenseAPI(id, {
        name: generatedName,
      });
      await queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    } catch (err) {
      console.log({ err });
      await updateExpenseAPI(id, {
        name: description,
      });
    }
  }
  const {
    data,
    reset,
    isSuccess,
    isPending,
    mutate: addExpense,
  } = useMutation({
    mutationFn: addExpenseAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
      queryClient.invalidateQueries({ queryKey: ["expenses", filters] });
    },
    onSuccess: (data) => {
      const queryKey = ["expenses", filters];
      const existing = queryClient.getQueryData(queryKey);
      if (!existing) {
        queryClient.invalidateQueries({ queryKey });
      } else {
        queryClient.setQueryData(queryKey, (cur) => ({
          expenses: [...cur.expenses, ...data],
          count: cur.count,
        }));
      }
      void generateAndAssignName(...data);
      navigate("/app/home");
    },
  });
  return { data, isPending, isSuccess, addExpense, reset };
}
