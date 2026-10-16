import { Calendar1, ReceiptText, Tag, Wallet } from "lucide-react";
import { useDashboardStats } from "../hooks/useDashboardStats";
import SkeletonCard from "./SkeletonCard";
import StatCard from "./StatCard";
export default function StatGroup() {
  const { stats, isLoading, totalExpensesLabel } = useDashboardStats();
  const entries = Object.entries(stats);
  const labels = {
    totalExpenses: (
      <>
        <Wallet className="size-5" /> {totalExpensesLabel}
      </>
    ),
    dailyAvg: (
      <>
        <Calendar1 className="size-5" /> Daily Average
      </>
    ),
    topCategory: (
      <>
        <Tag className="size-5" /> Top Category
      </>
    ),
    transactions: (
      <>
        <ReceiptText className="size-5" /> Transactions
      </>
    ),
  };

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {entries.map((stat) => {
        return isLoading ? (
          <SkeletonCard key={stat[0]} />
        ) : (
          <StatCard key={stat[0]} value={stat[1]}>
            {labels[stat[0]]}
          </StatCard>
        );
      })}
    </div>
  );
}
