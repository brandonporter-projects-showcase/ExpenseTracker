import { toast } from "sonner";

export const showMessage = (message, options) => {
  toast.info(message, {
    duration: 8000,
    id: message,
    ...options,
  });
};
