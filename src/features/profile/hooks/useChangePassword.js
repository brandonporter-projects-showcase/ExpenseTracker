import { getErrorMessage, normalizeError } from "#lib/utils";
import { changePasswordAPI } from "@/services/apiProfile";
import { showError } from "@/utils/showError";
import { showSuccess } from "@/utils/showSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChangePassword() {
  const queryClient = useQueryClient();
  const {
    data,
    isSuccess,
    isPending,
    mutate: changePassword,
    error,
  } = useMutation({
    mutationFn: changePasswordAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onSuccess: () => {
      showSuccess("Your password was changed successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
  return { data, isSuccess, isPending, changePassword, error };
}
