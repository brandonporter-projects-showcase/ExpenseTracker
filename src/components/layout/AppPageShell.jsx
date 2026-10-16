import AppLayout from "./AppLayout";
import { NavLink, useLocation, useNavigate } from "react-router";
import AppButton from "#components/common/AppButton";
import {
  HiOutlineHome,
  HiOutlineChartPie,
  HiOutlineWallet,
  HiOutlineUser,
} from "react-icons/hi2";
import { CirclePlus, PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
const navItems = [
  { icon: HiOutlineHome, label: "home" },
  { icon: HiOutlineChartPie, label: "dashboard" },
  { icon: HiOutlineWallet, label: "budgets-and-goals" },
  { icon: HiOutlineUser, label: "profile" },
];

export default function AppPageShell({ children, Header, showButton = false }) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  return (
    <AppLayout>
      <div className="flex min-h-0 min-w-0 grow flex-col">
        <AppLayout.Header>{Header && <Header />}</AppLayout.Header>
        {children}
      </div>
      <AppLayout.Navigation isCollapsed={isCollapsed}>
        <button
          onClick={() => setIsCollapsed((p) => !p)}
          className={`mx-auto mb-4 hidden max-w-fit cursor-pointer text-sm opacity-70 hover:opacity-100 lg:block ${!isCollapsed && "ml-auto mr-0"}`}
        >
          {isCollapsed ? <PanelLeftOpen /> : <PanelRightOpen />}
        </button>
        {showButton && (
          <div
            className={clsx(
              "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2",
              "lg:static lg:mb-2 lg:w-full lg:translate-x-0 lg:translate-y-0",
            )}
          >
            <AppButton
              variant="filled"
              aria-label="Add expense"
              onClick={() =>
                navigate(`/app/expenses/add${location.search}`, { replace: true })
              }
              className={clsx(
                "bg-sidebar-primary text-sidebar shadow-primary/40 !justify-center",
                "flex h-14 w-14 rounded-full text-center shadow-lg hover:scale-110 active:scale-100",
                "lg:flex lg:w-full lg:items-center lg:gap-3 lg:rounded-xl lg:px-4 lg:py-3 lg:shadow-none lg:hover:scale-90",
                isCollapsed ? "mx-auto justify-center" : "justify-start",
              )}
            >
              <CirclePlus className="text-xl" />
              {!isCollapsed && <span className="hidden lg:block">Add expense</span>}
            </AppButton>
          </div>
        )}
        <nav>
          <ul className="mx-auto flex max-w-sm items-center justify-between lg:flex-col lg:items-stretch lg:gap-2">
            {navItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <NavLink
                  to={
                    label === "home" || label === "dashboard"
                      ? `/app/${label}${location.search}`
                      : `/app/${label}`
                  }
                >
                  {({ isActive }) => (
                    <button
                      className={clsx(
                        "cursor-pointer rounded-xl p-2 transition-all duration-200 lg:flex lg:w-full lg:items-center lg:gap-3 lg:p-3",
                        isActive && !isCollapsed
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isCollapsed
                          ? "m-auto max-w-fit justify-center"
                          : "justify-start",
                      )}
                    >
                      <Icon className="text-2xl" />

                      {!isCollapsed && (
                        <span className="hidden capitalize lg:block">
                          {label}
                        </span>
                      )}
                    </button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </AppLayout.Navigation>
    </AppLayout>
  );
}
