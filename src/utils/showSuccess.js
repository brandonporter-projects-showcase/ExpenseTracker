import { toast } from "sonner";

export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    className:
      "!bg-primary !text-primary-foreground !border-primary " +
      "!rounded-xl !shadow-xl !p-4 !font-sans",
    duration: 8000,
    id: message,
    ...options,
  });
};
