import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}