import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fallbackCategories } from "#lib/utils";
import AppButton from "#components/common/AppButton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Checkbox } from "#components/ui/checkbox";

export default function CategorySelect() {
  const [open, setOpen] = useState(false);
  const categories = useMemo(() => fallbackCategories, []);
  const { control } = useFormContext();
  const { field } = useController({
    name: "categories",
    control,
  });
  const selected = field.value || [];

  function toggleCategory(category) {
    const newValue = field.value.includes(category)
      ? field.value.filter((c) => c !== category)
      : [...field.value, category];
    field.onChange(newValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger
        render={
          <AppButton
            variant="outline"
            size="xs"
            className="w-full justify-between"
          >
            {selected.length > 0
              ? `${selected.length} selected`
              : "Select categories"}

            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </AppButton>
        }
      />

      <PopoverContent className="w-[300px] animate-none p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />

          <CommandEmpty>No category found.</CommandEmpty>

          <CommandGroup className="custom-scrollbar max-h-40 overflow-y-auto">
            {categories.map((category) => {
              const checked = selected.includes(category);

              return (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => toggleCategory(category)}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => {
                        toggleCategory(category);
                      }}
                    />
                    <span>{category}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      checked ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
