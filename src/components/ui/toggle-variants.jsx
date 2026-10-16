import { cva } from "class-variance-authority";

export const toggleVariants = cva(
  "group/toggle inline-flex cursor-pointer items-center justify-center gap-1 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",

        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-primary-foreground",
      },

      size: {
        "2xs":
          "h-5 min-w-5 px-1 text-2xs gap-1 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1",
        xs: "h-7 min-w-7 px-2 text-xs gap-1 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",

        sm: "h-8 min-w-8 px-2 text-sm gap-1 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",

        default: "h-9 min-w-9 px-2.5",

        lg: "h-10 min-w-10 px-3",

        icon: "size-8 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
