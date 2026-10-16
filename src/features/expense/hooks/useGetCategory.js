import { fallbackCategories } from "#lib/utils";
import { getSmartCategories } from "@/services/apiCategories";
import { useQuery } from "@tanstack/react-query";

export function useGetCategory(description) {
  const {
    data: categories = [],
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    networkMode: "always",
    queryFn: () => getSmartCategories(description),
    enabled: false,
    gcTime: 0,
  });

  const labels = categories?.map((cat) => cat.label);
  return {
    getCategories: refetch,
    categories: error ? fallbackCategories : labels,
    isFetching,
  };
}
