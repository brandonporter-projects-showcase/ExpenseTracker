import { useEffect } from "react";
import AppButton from "#components/common/AppButton";
import Modal from "#components/common/Modal";
import { createPortal } from "react-dom";
import { useDeleteBudget } from "../hooks/useDeleteBudget";
export default function ConfirmDeleteBudget({
  setShowDeleteForm,
  selectedBudgetCategory,
}) {
  const { deleteBudget, error, isPending, isSuccess } = useDeleteBudget();

  useEffect(() => {
    if (isSuccess && !error) {
      setShowDeleteForm(false);
    }
  }, [isSuccess, setShowDeleteForm, error]);
  function handleClick() {
    if (!selectedBudgetCategory) return;
    deleteBudget(selectedBudgetCategory);
  }

  return createPortal(
    <Modal
      heading="Are You Sure You Want To Delete This Budget?"
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
