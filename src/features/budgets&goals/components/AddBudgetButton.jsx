import AppButton from "#components/common/AppButton";
import { Plus } from "lucide-react";
import { useAddBudget } from "../hooks/useAddBudget";
import { Spinner } from "#components/ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverTitle,
  PopoverDescription,
} from "#components/ui/popover";
import SelectCategory from "@/features/expense/components/SelectCategory";
import { useForm } from "react-hook-form";
import Input from "#components/common/Input";
import { useState } from "react";
export default function AddBudgetButton() {
  const { addBudget, isPending, data } = useAddBudget();
  const [open, setOpen] = useState(false);
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
    },
  });

  function handleClick(data) {
    addBudget(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <AppButton
            size="xs"
            variant="filled"
            className="flex size-7 min-w-fit"
          >
            <span className="hidden sm:flex">
              {!isPending ? "Add Budget" : "Adding..."}
            </span>
            {!isPending ? <Plus className="size-4" /> : <Spinner />}
          </AppButton>
        }
      ></PopoverTrigger>
      <PopoverContent align="start" alignOffset={0} side="bottom">
        <PopoverHeader>
          <PopoverTitle>Add </PopoverTitle>
          <PopoverDescription>Your next budget</PopoverDescription>
          <form
            className="grid grid-cols-1 gap-2"
            onSubmit={handleSubmit(handleClick)}
          >
            <SelectCategory
              error={errors.category}
              setValue={setValue}
              watch={watch}
              register={register}
              smart={false}
            />
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
            <AppButton
              type="submit"
              size="xs"
              variant="secondary"
              className={`shadow-primary/20 w-full shadow-lg ${isPending ? "animate-custom-pulse" : ""}`}
            >
              {isPending ? "Saving Budget..." : "Save Budget"}
            </AppButton>
          </form>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
