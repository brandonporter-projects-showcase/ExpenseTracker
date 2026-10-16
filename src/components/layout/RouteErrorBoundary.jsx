import Heading from "#components/common/Heading";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { useNavigate, useRouteError } from "react-router";
import AppPageShell from "./AppPageShell";
import ErrorLayout from "./ErrorLayout";
function Header() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Heading
        as="h2"
        className="text-destructive font-semibold tracking-tight"
      >
        An error happened
      </Heading>
    </div>
  );
}
export default function RouteErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  const navigate = useNavigate();
  const normalizedError = normalizeError(error);
  const errorMessage = getErrorMessage(normalizedError);
  return (
    <AppPageShell Header={Header}>
      <ErrorLayout
        normalizedError={normalizedError}
        errorMessage={errorMessage}
        navigate={navigate}
      />
    </AppPageShell>
  );
}
