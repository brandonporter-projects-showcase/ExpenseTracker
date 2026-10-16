import { toast } from "sonner";

export const showError = (message, options) => {
  toast.error(message, {
    className:
      "!bg-destructive !text-destructive-foreground !rounded-xl !shadow-xl !p-4 !font-sans",
    duration: 8000,
    id: message,
    ...options,
  });
};
