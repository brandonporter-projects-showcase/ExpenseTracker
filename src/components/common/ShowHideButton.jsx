import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useState } from "react";

export default function ShowHideButton({ inputRef, setShowPassword }) {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => {
    if (!inputRef.current) return;

    if (inputRef.current.type === "text") {
      inputRef.current.type = "password";
    } else {
      inputRef.current.type = "text";
    }
    setShow((c) => !c);
    setShowPassword((c) => !c);
  };

  return (
    <button
      className="text-muted-foreground/40 hover:text-primary absolute right-3.5 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center transition-colors focus:outline-none"
      type="button"
      tabIndex={-1}
      onClick={toggleVisibility}
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? (
        <HiOutlineEyeSlash className="text-sm" />
      ) : (
        <HiOutlineEye className="text-sm" />
      )}
    </button>
  );
}
