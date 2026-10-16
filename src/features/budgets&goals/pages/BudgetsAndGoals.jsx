import AppLayout from "#components/layout/AppLayout";
import MonthSelector from "../components/MonthSelector";
import OverviewPanel from "../components/OverviewPanel";
import PerCategoryCardGroup from "../components/PerCategoryCardGroup";
import AddBudgetButton from "../components/AddBudgetButton";

export default function BudgetsAndGoals() {
  return (
    <AppLayout.Main>
      <div className="flex justify-between">
        <MonthSelector />
        <AddBudgetButton />
      </div>
      <OverviewPanel />
      <PerCategoryCardGroup />
    </AppLayout.Main>
  );
}
