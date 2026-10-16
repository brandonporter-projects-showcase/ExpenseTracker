import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const variantMap = {
  filled: "default",
  outline: "outline",
  ghost: "ghost",
  none: "ghost",
};

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

export default function AppButton({
  children,
  variant = "filled",
  size = "md",
  type = "button",
  fullWidth = true,
  className = "",
  ...props
}) {
  return (
    <Button
      type={type}
      variant={variantMap[variant] ?? variant}
      size={sizeMap[size] ?? size}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}
