"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// 1. Tell TypeScript that this component accepts an optional className string
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 2. Add the className to the placeholder so it doesn't jump around
    return <div className={`w-10 h-10 rounded-full ${className}`} />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // 3. Inject the passed className at the end of your default classes
      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-zinc-600 ${className}`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}