import { useBudgetCardGroupData } from "../hooks/useBudgetCardGroupData";
import PerCategoryCard from "./PerCategoryCard";
export default function PerCategoryCardGroup() {
  const { budgetCardsData, isLoading } = useBudgetCardGroupData();
  if (!budgetCardsData.length || isLoading) return;
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {budgetCardsData.map((budget) => {
        return (
          <PerCategoryCard
            budget={budget.budgetAmount}
            expense={budget.expenseAmount}
            fraction={budget.fraction}
            key={budget.category}
          >
            {budget.category}
          </PerCategoryCard>
        );
      })}
    </div>
  );
}
