import { Outlet, useMatches } from "react-router";
import HomeHeader from "../common/HomeHeader";
import AppPageShell from "./AppPageShell";

export default function BasePageLayout() {
  const matches = useMatches();

  const currentRoute = [...matches]
    .reverse()
    .find(
      (match) => match.handle?.header || match.handle?.showButton !== undefined,
    );
  const showButton = currentRoute?.handle?.showButton ?? true;
  const CurrentHeader = currentRoute?.handle?.header || HomeHeader;

  return (
    <AppPageShell Header={CurrentHeader} showButton={showButton}>
      <Outlet />
    </AppPageShell>
  );
}
