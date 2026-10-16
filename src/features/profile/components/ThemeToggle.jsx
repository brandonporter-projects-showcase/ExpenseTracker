import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

function getInitialDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }
  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "dark") {
    return true;
  }
  if (savedTheme === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialDarkMode);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <span>Theme Toggle</span>
      <Toggle
        variant="default"
        pressed={isDark}
        onPressedChange={setIsDark}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        <span>{isDark ? "Light" : "Dark"}</span>
      </Toggle>
    </div>
  );
}
