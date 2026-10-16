import { getErrorMessage, normalizeError } from "#lib/utils";
import { useNavigate, useRouteError } from "react-router";

export default function RootErrorBoundary() {
  let error = useRouteError();
  const normalizedError = normalizeError(error);
  const errorMessage = getErrorMessage(normalizedError);
  const navigate = useNavigate();
  return (
    <ErrorLayout
      normalizedError={normalizedError}
      errorMessage={errorMessage}
      navigate={navigate}
    />
  );
}
