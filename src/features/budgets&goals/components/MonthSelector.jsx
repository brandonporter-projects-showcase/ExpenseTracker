import AppButton from "#components/common/AppButton";
import Heading from "#components/common/Heading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function MonthSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMonthParam = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
  }).format(new Date());
  const monthParam = searchParams.get("month") ?? currentMonthParam;
  useEffect(() => {
    if (!searchParams.has("month")) {
      setSearchParams(
        {
          ...Object.fromEntries(searchParams),
          month: currentMonthParam,
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams, currentMonthParam]);
  const selectedMonth = new Date(`${monthParam}-01`);

  const currentMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(selectedMonth);

  function changeMonth(amount) {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + amount);

    setSearchParams({
      month: new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
      }).format(newDate),
    });
  }

  return (
    <div className="flex items-center gap-4">
      <AppButton
        size="xs"
        variant="outline"
        className="size-6"
        onClick={() => changeMonth(-1)}
      >
        <ChevronLeft className="size-4" />
      </AppButton>

      <Heading as="h1" size="h4">
        {currentMonth}
      </Heading>

      <AppButton
        size="xs"
        variant="outline"
        className="size-6"
        onClick={() => changeMonth(1)}
      >
        <ChevronRight className="size-4" />
      </AppButton>
    </div>
  );
}
