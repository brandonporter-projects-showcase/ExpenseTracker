import AppButton from "#components/common/AppButton";
import Select from "#components/common/Select";
import { showError } from "@/utils/showError";
import { useGetCategory } from "../hooks/useGetCategory";
import {
  fallbackCategories,
  getErrorMessage,
  normalizeError,
} from "#lib/utils";

export default function SelectCategory({
  error,
  setValue,
  watch,
  register,
  smart = true,
}) {
  const description = watch("description");
  const { categories, getCategories, isFetching } = useGetCategory(description);
  async function handleAIDecide() {
    if (isFetching || !smart) return;
    const { data, error: err, isSuccess } = await getCategories();
    if (isSuccess && data.length)
      setValue("category", data[0].label, {
        shouldDirty: true,
      });
    if (err) {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    }
  }
  return (
    <div className="grid grid-cols-1 items-center gap-2">
      <Select
        label="Category"
        options={smart ? categories : fallbackCategories}
        error={error}
        setValue={setValue}
        watch={watch}
        {...register("category", { required: "Please select a category" })}
      />

      {smart ? (
        <AppButton
          type="button"
          variant="outline"
          size="xs"
          onClick={handleAIDecide}
          disabled={isFetching}
          className={`self-end ${isFetching ? "animate-custom-pulse" : ""}`}
        >
          {isFetching ? "Deciding..." : "Let AI decide"}
        </AppButton>
      ) : null}
    </div>
  );
}
