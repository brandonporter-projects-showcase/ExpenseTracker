import ExpensesPieChart from "./ExpensesPieChart";
import MonthlyTrendChart from "./MonthlyTrendChart";

export default function ChartSection() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[32rem_1fr]">
      <ExpensesPieChart />
      <MonthlyTrendChart />
    </div>
  );
}
