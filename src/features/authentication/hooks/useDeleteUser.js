import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAPI } from "../../../services/apiAuth";
import { useNavigate } from "react-router";
import { getErrorMessage, normalizeError } from "#lib/utils";
import { showError } from "@/utils/showError";

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: deleteUserAPI,
    networkMode: "always",
    onError: (err) => {
      const error = normalizeError(err);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
    onSuccess: (data) => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { deleteUser, isPending };
}
