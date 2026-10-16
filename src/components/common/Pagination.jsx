import { ChevronLeft, ChevronRight } from "lucide-react";
import AppButton from "./AppButton";
import { useSearchParams } from "react-router";
import { useFilter } from "@/features/expense/hooks/useFilter";

export default function Pagination({ pageCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filters: { page: paramPage },
  } = useFilter();
  const currentPage = Number(paramPage) || 1;
  const totalPages = Math.ceil(pageCount / 10);
  function goToPage(pageNumber) {
    setSearchParams((params) => {
      params.set("page", pageNumber);
      return params;
    });
  }
  function getPages() {
    const pages = [];
    const add = (p) => pages.push(p);
    add(1);
    if (currentPage > 3) add("...");
    if (currentPage > 2) add(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) {
      add(currentPage);
    }
    if (currentPage < totalPages - 1) add(currentPage + 1);
    if (currentPage < totalPages - 2) add("...");
    if (totalPages > 1) add(totalPages);
    return pages;
  }
  const pages = getPages();
  return (
    <div className="text-primary flex w-full justify-center">
      <AppButton
        size="xs"
        className="xs:h-7 aspect-square h-6"
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft className="size-4" />
      </AppButton>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={i * 10} className="p-2">
            ...
          </span>
        ) : (
          <AppButton
            key={page}
            size="xs"
            className="xs:h-7 aspect-square h-6"
            variant="ghost"
            aria-expanded={page === currentPage}
            onClick={() => goToPage(page)}
          >
            {page}
          </AppButton>
        ),
      )}

      <AppButton
        size="xs"
        className="xs:h-7 aspect-square h-6"
        variant="ghost"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        <ChevronRight className="size-4" />
      </AppButton>
    </div>
  );
}
