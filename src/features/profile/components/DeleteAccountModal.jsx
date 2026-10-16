import AppButton from "#components/common/AppButton";
import Modal from "#components/common/Modal";
import { useDeleteUser } from "@/features/authentication/hooks/useDeleteUser";
export default function DeleteAccountModal({ setShowForm }) {
  const { deleteUser, isPending } = useDeleteUser();

  return (
    <Modal
      heading="Are You Sure You Want To Delete Your Account?"
      setShowForm={setShowForm}
    >
      <AppButton
        variant="destructive"
        size="sm"
        type="button"
        onClick={deleteUser}
        className={`flex-1 duration-200 ${
          isPending ? "animate-custom-pulse" : ""
        }`}
      >
        {isPending ? "Deleting..." : "Delete"}
      </AppButton>
    </Modal>
  );
}
