import { getCurrentUserAPI } from "@/services/apiProfile";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserAPI,
  });
  return { user, isLoading };
}
