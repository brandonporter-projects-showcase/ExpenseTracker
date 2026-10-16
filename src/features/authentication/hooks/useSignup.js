import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signupAPI } from "../../../services/apiAuth";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";
export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onSuccess: (data) => {
      navigate("/app", { replace: true });
      queryClient.setQueryData(["user"], data.user);
    },
  });

  return { signup, isPending };
}
