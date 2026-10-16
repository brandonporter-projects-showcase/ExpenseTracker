import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "../../../services/apiAuth";
import { useNavigate } from "react-router";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error, {
        invalid_credentials: "The email or password is incorrect.",
      });
      showError(errorMessage);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/app", { replace: true });
    },
  });

  return { login, isPending };
}
