import { getDateRange } from "#lib/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export function useFilter() {
  const [searchParams] = useSearchParams();

  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const dateRange = getDateRange(params.dateRange);

    return {
      search: params.search ?? "",
      categories: params.categories ? params.categories.split(",") : [],
      date: { period: params.dateRange, dateRange },
      minAmount: params.minAmount ? Number(params.minAmount) : null,
      maxAmount: params.maxAmount ? Number(params.maxAmount) : null,
      page: params.page ?? 1,
    };
  }, [searchParams]);

  const appliedFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count++;
    if (filters.date.period) count++; // truthy only when dateRange param existed & non-empty
    if (filters.minAmount !== null) count++;
    if (filters.maxAmount !== null) count++;
    return count;
  }, [filters]);

  return { filters, appliedFilterCount };
}
