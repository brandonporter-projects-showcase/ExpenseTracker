import { useNavigate } from "react-router";
import { signoutAPI } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signout, isPending } = useMutation({
    mutationFn: signoutAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries(["user"]);
    },
  });

  return { signout, isPending };
}
