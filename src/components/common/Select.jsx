import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import FormField from "./FormField";
const Select = forwardRef(function Select(
  {
    options = [],
    label = "Name",
    name,
    setValue,
    watch,
    error,
    className = "",
    value,
    ...props
  },
  forwardedRef,
) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);

  const watchedValue = watch?.(name);
  const selected = value ?? watchedValue;

  const hasSelection =
    selected !== undefined && selected !== null && selected !== "";

  const selectedLabel = hasSelection ? selected : "Select an option";

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) {
      return options;
    }

    return options.filter((option) =>
      String(option).toLocaleLowerCase().includes(query),
    );
  }, [options, search]);

  const baseStyles = [
    "w-full cursor-pointer rounded-xl border border-input",
    "bg-background text-foreground",
    "px-4 py-3 text-xs",
    "transition-[color,box-shadow] duration-200",
    "outline-none",
    "focus-visible:border-ring",
    "focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:cursor-not-allowed",
    "disabled:bg-muted disabled:text-muted-foreground",
    "disabled:opacity-50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  ].join(" ");

  function assignRefs(element) {
    triggerRef.current = element;

    if (typeof forwardedRef === "function") {
      forwardedRef(element);
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }
  }

  function openDropdown() {
    setOpen(true);
  }

  function closeDropdown({ returnFocus = false } = {}) {
    setOpen(false);
    setSearch("");

    if (returnFocus) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  }

  function toggleDropdown() {
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function handleSelect(option) {
    setValue?.(name, option, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    closeDropdown({ returnFocus: true });
  }

  function handleTriggerKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openDropdown();
    }

    if (event.key === "Escape") {
      closeDropdown();
    }
  }

  function handleDropdownKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown({ returnFocus: true });
    }
  }

  useEffect(() => {
    if (!open) return;

    const animationFrame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [open]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <FormField label={label} error={error}>
      <div ref={containerRef} className="relative">
        <button
          {...props}
          ref={assignRefs}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          onClick={toggleDropdown}
          onKeyDown={handleTriggerKeyDown}
          className={`${baseStyles} flex items-center justify-between gap-2 ${className}`}
        >
          <span
            className={
              hasSelection
                ? "text-foreground truncate"
                : "text-muted-foreground truncate"
            }
          >
            {selectedLabel}
          </span>

          <IoChevronDownOutline
            aria-hidden="true"
            className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          onKeyDown={handleDropdownKeyDown}
          className={[
            "absolute z-50 mt-2 w-full origin-top overflow-hidden",
            "border-border rounded-xl border",
            "bg-popover text-popover-foreground shadow-lg",
            "transition-all duration-200",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          ].join(" ")}
        >
          <div className="border-border border-b p-2">
            <div className="relative">
              <IoSearchOutline
                aria-hidden="true"
                className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"
              />

              <input
                ref={searchInputRef}
                type="search"
                role="searchbox"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search options..."
                autoComplete="off"
                className={[
                  "border-input w-full rounded-lg border",
                  "bg-background py-2.5 pl-9 pr-3 text-xs",
                  "text-foreground outline-none",
                  "placeholder:text-muted-foreground",
                  "focus:border-ring focus:ring-ring/30 focus:ring-2",
                ].join(" ")}
              />
            </div>
          </div>

          <div
            role="listbox"
            aria-label={label}
            className="custom-scrollbar max-h-60 overflow-y-auto py-1"
          >
            {filteredOptions.map((option) => {
              const isSelected = option === selected;

              return (
                <button
                  key={String(option)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={[
                    "w-full cursor-pointer px-4 py-3 text-left text-xs",
                    "transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:bg-accent",
                    "focus-visible:text-accent-foreground",
                    "focus-visible:outline-none",
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "text-popover-foreground",
                  ].join(" ")}
                >
                  {option}
                </button>
              );
            })}

            {options.length === 0 && (
              <div className="text-muted-foreground px-4 py-3 text-xs">
                No options available
              </div>
            )}

            {options.length > 0 && filteredOptions.length === 0 && (
              <div className="text-muted-foreground px-4 py-3 text-xs">
                No options match “{search}”
              </div>
            )}
          </div>
        </div>
      </div>
    </FormField>
  );
});

export default Select;
