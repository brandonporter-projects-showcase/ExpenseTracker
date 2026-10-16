import { EMAIL_REGEX } from "#lib/utils";
import { useChangeUserEmail } from "../hooks/useChangeUserEmail";
import { useEffect, useState } from "react";
import AppButton from "#components/common/AppButton";
import Modal from "#components/common/Modal";
import Input from "#components/common/Input";

export default function ChangeEmailModal({ setShowForm }) {
  const { changeEmail, error, isPending, isSuccess } = useChangeUserEmail();
  const [newEmail, setNewEmail] = useState("");
  const [inputError, setInputError] = useState("");
  useEffect(() => {
    if (isSuccess && !error) {
      setShowForm(false);
    }
  }, [isSuccess, setShowForm, error]);
  function handleClick() {
    if (!newEmail.length) {
      setInputError("Email is requried.");
      return;
    }
    if (!EMAIL_REGEX.test(newEmail)) {
      setInputError("Please provide a valid email address.");
      return;
    }
    changeEmail(newEmail);
  }

  return (
    <Modal
      heading="Enter the new desired email:"
      input={
        <Input
          label="None"
          className="mt-4"
          setter={setNewEmail}
          error={inputError}
        />
      }
      setShowForm={setShowForm}
    >
      <AppButton
        variant="filled"
        size="sm"
        type="button"
        onClick={handleClick}
        className={`flex-1 duration-200 ${
          isPending ? "animate-custom-pulse" : ""
        }`}
      >
        {isPending ? "Updating..." : "Update"}
      </AppButton>
    </Modal>
  );
}
