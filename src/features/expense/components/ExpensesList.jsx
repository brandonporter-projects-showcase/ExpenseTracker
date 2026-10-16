import Heading from "../../../components/common/Heading";
import ListItem from "../../../components/common/ListItem";
import { useGetExpenses } from "../hooks/useGetExpenses";
import { ItemGroup } from "#components/ui/item";
import { FilterSheet } from "./FilterSheet";
import { useFilter } from "../hooks/useFilter";
import SkeletonListItem from "@/features/dashboard/components/SkeletonListItem";
import FilterSidebar from "./FilterSidebar";
import Pagination from "#components/common/Pagination";

export default function ExpensesList() {
  const { filters } = useFilter();
  const { expenses, count, isLoading } = useGetExpenses(filters);
  return (
    <div className="text-primary-foreground/40 relative flex h-full flex-col items-center gap-4 text-center">
      <div className="fade-bottom w-full px-4">
        <Heading as="h1" className="mb-4 lg:text-left">
          Your Expenses
        </Heading>
        {!isLoading && <FilterSheet />}
        <div className="flex w-full gap-4">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>
          {isLoading ? (
            <ItemGroup className="flex min-w-0 grow flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonListItem key={i} />
              ))}
            </ItemGroup>
          ) : expenses.length > 0 ? (
            <div className="flex min-w-0 grow flex-col gap-4">
              <ItemGroup>
                {expenses.map((exp, i) => (
                  <ListItem expense={exp} position={i + 1} key={exp.id} />
                ))}
              </ItemGroup>
              <Pagination pageCount={count} />
            </div>
          ) : (
            <div className="relative my-12 flex w-full flex-col items-center lg:items-start">
              <div className="bg-primary/5 lg:h-70 lg:w-70 absolute right-1/2 top-1/2 flex h-40 w-40 translate-x-1/2 items-center justify-center rounded-full lg:top-0">
                <img
                  src="/Logo2.png"
                  alt="No expenses"
                  className="h-20 w-20 opacity-20 grayscale lg:h-40 lg:w-40"
                />
              </div>
              <div className="text-muted-foreground flex w-full flex-col items-center justify-center">
                <p className="text-lg font-medium">No expenses found!</p>
                <p className="text-sm">Tap the + button to add your expenses</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
