import { forwardRef, useRef, useState } from "react";

import ShowHideButton from "./ShowHideButton";
import FormField from "./FormField";

const Input = forwardRef(function Input(
  {
    type = "text",
    label = "Name",
    value,
    error,
    onChange,
    setter,
    className = "",
    placeholder = "",
    ...props
  },
  ref,
) {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isTextarea = type === "textarea";
  const isNumber = type === "number";

  const inputType = isPassword && showPassword ? "text" : type;

  const baseStyles = [
    "w-full rounded-xl border border-input",
    "bg-background text-foreground",
    "placeholder:text-muted-foreground",
    "px-4 py-3 text-xs",
    "shadow-xs",
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

  const handleChange = (event) => {
    onChange?.(event);
    setter?.(event.target.value);
  };

  const setRefs = (node) => {
    inputRef.current = node;

    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const commonProps = {
    id: label,
    value,
    onChange: handleChange,
    ref: setRefs,
    "aria-invalid": Boolean(error),
    className: [
      baseStyles,
      isNumber ? "no-number-spinner" : "",
      isPassword ? "pr-12" : "",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    ...props,
  };

  return (
    <FormField label={label} error={error}>
      {isTextarea ? (
        <textarea
          {...commonProps}
          rows={5}
          className={`${commonProps.className} resize-none`}
        />
      ) : (
        <input {...commonProps} type={inputType} placeholder={placeholder} />
      )}

      {isPassword && (
        <ShowHideButton inputRef={inputRef} setShowPassword={setShowPassword} />
      )}
    </FormField>
  );
});

export default Input;
