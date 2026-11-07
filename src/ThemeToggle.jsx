import React from "react";
import { useTheme } from "./useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}
