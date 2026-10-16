import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AppButton from "#components/common/AppButton";
import { Funnel } from "lucide-react";
import Input from "#components/common/Input";
import Heading from "#components/common/Heading";
import CategorySelect from "./CategorySelect";
import DateRangeChips from "./DateRangeChips";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { useFilter } from "../hooks/useFilter";
import { useEffect, useState } from "react";
function parseFilters(filters) {
  return {
    categories: filters.categories,
    dateRange: filters.date.period || "thisMonth",
    descriptionOrName: filters.search,
    minAmount: filters.minAmount,
    maxAmount: filters.maxAmount,
  };
}
export function FilterSheet() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [_, setSearchParams] = useSearchParams();
  const { filters, appliedFilterCount } = useFilter();
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
    setSheetOpen(false);
  }
  function onClear() {
    setSearchParams({});
    setSheetOpen(false);
  }
  return (
    <div className="flex flex-wrap gap-2 md:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger
          render={
            <AppButton className="my-2 mr-auto flex items-center rounded-md text-xs">
              <Funnel /> Filter{" "}
              <span className="bg-secondary text-secondary-foreground text-2xs flex size-4 items-center justify-center rounded-full py-0.5">
                {appliedFilterCount}
              </span>
            </AppButton>
          }
        />
        <SheetContent
          side="bottom"
          className="scrollbar-none max-h-[80vh] overflow-y-auto rounded-t-2xl"
        >
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FormProvider control={control}>
            <form
              id="filter-form"
              className="flex flex-col gap-4 px-4"
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
          </FormProvider>
          <SheetFooter className="gap-4">
            <div className="flex justify-between gap-2">
              <AppButton
                variant="outline"
                type="button"
                size="sm"
                className="flex-1"
                onClick={onClear}
              >
                Clear
              </AppButton>
              <AppButton
                type="submit"
                size="sm"
                form="filter-form"
                className="flex-1"
              >
                Save changes
              </AppButton>
            </div>
            <SheetClose
              render={
                <AppButton variant="outline" size="sm">
                  Cancel
                </AppButton>
              }
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
