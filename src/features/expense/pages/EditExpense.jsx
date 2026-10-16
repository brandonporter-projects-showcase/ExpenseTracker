import ExpenseDetails from "../components/ExpenseDetails";
import { useEditExpense } from "../hooks/useEditExpense";
import { useFilter } from "../hooks/useFilter";
export default function EditExpense() {
  const {
    filters: { categories, maxAmount, minAmount, date, search, page },
  } = useFilter();
  const {
    editExpense,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useEditExpense({
    categories,
    maxAmount,
    minAmount,
    search,
    period: date.period,
    page,
  });
  return (
    <ExpenseDetails
      mutate={editExpense}
      isPending={isPending}
      isSuccess={isSuccess}
      resetMutation={resetMutation}
    />
  );
}
