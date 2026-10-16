import AppButton from "#components/common/AppButton";
import Input from "#components/common/Input";
import Heading from "#components/common/Heading";
import CategorySelect from "./CategorySelect";
import DateRangeChips from "./DateRangeChips";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { useFilter } from "../hooks/useFilter";
import { useEffect } from "react";
function parseFilters(filters) {
  return {
    categories: filters.categories,
    dateRange: filters.date.period || "thisMonth",
    descriptionOrName: filters.search,
    minAmount: filters.minAmount,
    maxAmount: filters.maxAmount,
  };
}
export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters } = useFilter();
  const defaultValues = parseFilters(filters);
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
  });
  useEffect(() => {
    reset(parseFilters(filters));
  }, [filters, reset]);
  function onSubmit(value) {
    const { categories, dateRange, descriptionOrName, maxAmount, minAmount } =
      value;
    setSearchParams((searchParams) => {
      descriptionOrName
        ? searchParams.set("search", descriptionOrName)
        : searchParams.delete("search");
      categories.length
        ? searchParams.set("categories", categories)
        : searchParams.delete("categories");
      dateRange
        ? searchParams.set("dateRange", dateRange)
        : searchParams.delete("dateRange");
      minAmount
        ? searchParams.set("minAmount", String(minAmount))
        : searchParams.delete("minAmount");
      maxAmount
        ? searchParams.set("maxAmount", String(maxAmount))
        : searchParams.delete("maxAmount");
      return searchParams;
    });
  }
  function onClear() {
    setSearchParams({});
  }
  return (
    <aside className="bg-muted text-muted-foreground flex w-72 flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <Heading as="h2" size="h4">
          Filters
        </Heading>
        <AppButton variant="ghost" size="ghost" onClick={onClear}>
          Clear all
        </AppButton>
      </div>
      <FormProvider control={control}>
        <form
          id="filter-sidebar"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            label="Name or description"
            error={errors.descriptionOrName}
            {...register("descriptionOrName", {
              maxLength: {
                value: 200,
                message: "Max 200 characters.",
              },
            })}
          />
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="h5" className="font-medium">
              Category
            </Heading>
            <CategorySelect control={control} />
          </div>
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="h5" className="font-medium">
              Date range
            </Heading>
            <DateRangeChips />
          </div>
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="h5" className="font-medium">
              Amount
            </Heading>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                label="None"
                placeholder="Min"
                {...register("minAmount", {
                  min: { value: 0, message: "Must be positive." },
                  max: {
                    value: 99999999999999,
                    message: "Maximum 15 digits.",
                  },
                })}
              />
              <span>-</span>
              <Input
                type="number"
                label="None"
                placeholder="Max"
                {...register("maxAmount", {
                  min: { value: 0, message: "Must be positive." },
                  max: {
                    value: 99999999999999,
                    message: "Max 15 digits.",
                  },
                })}
              />
            </div>
          </div>
        </form>
        <AppButton type="submit" size="sm" form="filter-sidebar">
          Save changes
        </AppButton>
      </FormProvider>
    </aside>
  );
}
