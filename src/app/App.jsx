import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Onboarding from "../features/expense/pages/Onboarding";
import Login from "../features/authentication/pages/Login";
import Signup from "../features/authentication/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../features/expense/pages/Home";
import Profile from "../features/profile/pages/Profile";
import BasePageLayout from "../components/layout/BasePageLayout";
import EditExpense from "../features/expense/pages/EditExpense";
import AddExpense from "../features/expense/pages/AddExpense";
import HomeHeader from "../components/common/HomeHeader";
import EditExpenseHeader from "../features/expense/components/EditExpenseHeader";
import AddExpenseHeader from "../features/expense/components/AddExpenseHeader";
import { Toaster } from "sonner";
import RouteErrorBoundary from "#components/layout/RouteErrorBoundary";
import RouteNotFound from "#components/layout/RouteNotFound";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import BudgetsAndGoals from "@/features/budgets&goals/pages/BudgetsAndGoals";
import BudgetsAndGoalsHeader from "@/features/budgets&goals/components/BudgetAndGoalsHeader";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import PublicRoute from "#components/common/PublicRoute";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Onboarding />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <BasePageLayout />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />,
          },
          {
            path: "home",
            element: <Home />,
            handle: { header: HomeHeader },
          },
          {
            path: "dashboard",
            element: <Dashboard />,
            handle: { header: DashboardHeader },
          },
          {
            path: "expenses/add",
            element: <AddExpense />,
            handle: { header: AddExpenseHeader, showButton: false },
          },
          {
            path: "expenses/:expenseId",
            element: <EditExpense />,
            handle: { header: EditExpenseHeader },
          },
          {
            path: "budgets-and-goals",
            element: <BudgetsAndGoals />,
            handle: { header: BudgetsAndGoalsHeader },
          },
          {
            path: "profile",
            element: <Profile />,
            handle: { header: ProfileHeader },
          },
        ],
      },
      {
        path: "*",
        element: <RouteNotFound />,
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
