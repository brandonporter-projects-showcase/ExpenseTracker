import { useEffect, useState } from "react";
import AppButton from "#components/common/AppButton";
import Modal from "#components/common/Modal";
import Input from "#components/common/Input";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../hooks/useChangePassword";

function PasswordForm({ isPending, changePassword }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  function onSubmit(data) {
    const { newPassword, currentPassword } = data;
    if (!newPassword || !currentPassword) return;
    changePassword({ newPassword, currentPassword });
  }
  return (
    <form
      noValidate
      className={`mt-6 flex flex-col gap-6 ${isPending ? "animate-custom-pulse" : ""}`}
      id="change-password"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="password"
        label="Current Password"
        disabled={isPending}
        error={errors.currentPassword}
        {...register("currentPassword", {
          required: "Current password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          validate: (v) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            return (
              regex.test(v) ||
              "Must include uppercase, lowercase, and a number."
            );
          },
        })}
      />
      <Input
        type="password"
        label="New Password"
        disabled={isPending}
        error={errors.newPassword}
        {...register("newPassword", {
          required: "Current password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          validate: (v) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            return (
              regex.test(v) ||
              "Must include uppercase, lowercase, and a number."
            );
          },
        })}
      />
    </form>
  );
}
export default function ChangePasswordModal({ setShowForm }) {
  const { changePassword, error, isPending, isSuccess } = useChangePassword();
  useEffect(() => {
    if (isSuccess && !error) {
      setShowForm(false);
    }
  }, [isSuccess, setShowForm, error]);

  return (
    <Modal
      heading="Reset your password:"
      input={
        <PasswordForm isPending={isPending} changePassword={changePassword} />
      }
      setShowForm={setShowForm}
    >
      <AppButton
        variant="filled"
        size="sm"
        type="submit"
        form="change-password"
        className={`flex-1 duration-200 ${
          isPending ? "animate-custom-pulse" : ""
        }`}
      >
        {isPending ? "Reseting..." : "Reset"}
      </AppButton>
    </Modal>
  );
}
