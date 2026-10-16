import { getErrorMessage, normalizeError } from "#lib/utils";
import { changeUserEmailAPI } from "@/services/apiProfile";
import { showError } from "@/utils/showError";
import { showMessage } from "@/utils/showMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChangeUserEmail() {
  const queryClient = useQueryClient();
  const {
    data,
    isSuccess,
    isPending,
    mutate: changeEmail,
    error,
  } = useMutation({
    mutationFn: changeUserEmailAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onSuccess: (user) => {
      showMessage(`Please confirm your new email: ${user.new_email}`);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
  return { data, isSuccess, isPending, changeEmail, error };
}
