import AppLayout from "../../../components/layout/AppLayout";
import ExpensesList from "../components/ExpensesList";

export default function Home() {
  return (
    <AppLayout.Main>
      <ExpensesList />
    </AppLayout.Main>
  );
}
