import { useMutation } from "@tanstack/react-query";
import { loginOAuthAPI } from "../../../services/apiAuth";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";

export function useLoginOAuth() {
  const { mutate: loginOAuth, isPending } = useMutation({
    mutationFn: loginOAuthAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
  });
  return { loginOAuth, isPending };
}
