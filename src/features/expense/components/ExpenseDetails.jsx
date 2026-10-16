import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/common/Input";
import AppButton from "../../../components/common/AppButton";
import AppLayout from "../../../components/layout/AppLayout";
import { useParams } from "react-router";
import { useGetExpense } from "../hooks/useGetExpense";
import SelectCategory from "./SelectCategory";
import { useFilter } from "../hooks/useFilter";
export default function ExpenseDetails({
  mutate,
  isSuccess,
  resetMutation,
  isPending,
}) {
  const { expenseId } = useParams();
  const { filters } = useFilter();
  const isEditSession = Boolean(expenseId);
  const { expense: selectedExpense, isLoading } = useGetExpense(
    Number(expenseId),
    filters,
  );
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      amount: "",
      category: "",
      description: "",
    },
  });
  useEffect(() => {
    if (!selectedExpense) return;

    reset({
      amount: selectedExpense.amount,
      category: selectedExpense.category,
      description: selectedExpense.description,
    });
  }, [selectedExpense, reset]);
  useEffect(() => {
    if (isDirty && isSuccess) resetMutation();
  }, [isDirty, isSuccess, resetMutation]);

  function onSubmit(data) {
    mutate({
      ...data,
      ...(selectedExpense && isEditSession && { id: selectedExpense.id }),
    });
    reset(data);
  }
  const buttonText = isSuccess ? "Expense Saved!" : "Save Expense";
  return (
    <AppLayout.Main>
      <form
        noValidate
        className={`mx-auto flex w-full max-w-[650px] flex-col gap-6 ${isLoading && isEditSession ? "animate-custom-pulse backdrop-blur-2xl" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
        disabled={isLoading && isEditSession}
      >
        <div className="flex flex-col gap-5">
          <Input
            type="number"
            label="Amount"
            placeholder="0.00"
            error={errors.amount}
            {...register("amount", {
              required: "Amount is required",
              min: { value: 0.01, message: "Amount must be greater than 0" },
            })}
          />

          <Input
            type="textarea"
            label="Description"
            placeholder="What was this for?"
            error={errors.description}
            {...register("description", {
              required: "Description is required",
              minLength: { value: 3, message: "Description is too short" },
            })}
          />
          <SelectCategory
            error={errors.category}
            setValue={setValue}
            watch={watch}
            register={register}
          />
        </div>

        <div>
          <AppButton
            type="submit"
            size="lg"
            variant="filled"
            className={`shadow-primary/20 w-full shadow-lg ${isPending ? "animate-custom-pulse" : ""}`}
          >
            {isPending ? "Saving Expense..." : buttonText}
          </AppButton>
        </div>
      </form>
    </AppLayout.Main>
  );
}
