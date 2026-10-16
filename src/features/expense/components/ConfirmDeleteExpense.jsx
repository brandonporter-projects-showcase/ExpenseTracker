import { useEffect } from "react";
import { useDeleteExpense } from "../hooks/useDeleteExpense";
import AppButton from "#components/common/AppButton";
import Modal from "#components/common/Modal";
import { createPortal } from "react-dom";
import { useFilter } from "../hooks/useFilter";
export default function ConfirmDeleteExpense({
  setShowDeleteForm,
  selectedExpenseId,
}) {
  const {
    filters: { categories, maxAmount, minAmount, date, search, page },
  } = useFilter();
  const { deleteExpense, error, isPending, isSuccess } = useDeleteExpense({
    categories,
    maxAmount,
    minAmount,
    search,
    period: date.period,
    page,
  });

  useEffect(() => {
    if (isSuccess && !error) {
      setShowDeleteForm(false);
    }
  }, [isSuccess, setShowDeleteForm, error]);
  function handleClick() {
    if (!selectedExpenseId) return;
    deleteExpense(selectedExpenseId);
  }

  return createPortal(
    <Modal
      heading="Are You Sure You Want To Delete This Expense?"
      setShowForm={setShowDeleteForm}
    >
      <AppButton
        variant="destructive"
        size="sm"
        type="button"
        onClick={handleClick}
        className={`flex-1 duration-200 ${
          isPending ? "animate-custom-pulse" : ""
        }`}
      >
        {isPending ? "Deleting..." : "Delete"}
      </AppButton>
    </Modal>,
    document.body,
  );
}
