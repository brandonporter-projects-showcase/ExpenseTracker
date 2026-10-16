import AppLayout from "#components/layout/AppLayout";
import ChartSection from "../components/ChartSection";
import RecentTransactions from "../components/RecentTransactions";
import StatGroup from "../components/StatGroup";

export default function Dashboard() {
  return (
    <AppLayout.Main>
      <div className="flex w-full min-w-0 flex-wrap justify-between gap-4 py-4 xl:justify-center xl:gap-x-8">
        <StatGroup />
        <ChartSection />
        <RecentTransactions />
      </div>
    </AppLayout.Main>
  );
}
