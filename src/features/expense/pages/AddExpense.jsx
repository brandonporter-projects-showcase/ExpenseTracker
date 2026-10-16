import ExpenseDetails from "../components/ExpenseDetails";
import { useAddExpense } from "../hooks/useAddExpense";
import { useFilter } from "../hooks/useFilter";
export default function AddExpense({ onSuccess }) {
  const {
    filters: { categories, maxAmount, minAmount, date, search, page },
  } = useFilter();
  const {
    addExpense,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useAddExpense({
    categories,
    maxAmount,
    minAmount,
    search,
    period: date.period,
    page,
  });
  return (
    <ExpenseDetails
      mutate={addExpense}
      isPending={isPending}
      isSuccess={isSuccess}
      resetMutation={resetMutation}
    />
  );
}
