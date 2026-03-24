"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useDigicalI18n } from "@/components/digical/language";

export const THEME_STORAGE_KEY = "digical-theme";

function applyTheme(mode: "light" | "dark") {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export function readStoredTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "dark" || v === "light") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function getDomMode(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const { t } = useDigicalI18n();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMode(getDomMode());
    setReady(true);
  }, []);

  const toggle = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    applyTheme(next);
  };

  const isDark = mode === "dark";

  if (!ready) {
    return (
      <div
        className="h-10 w-10 shrink-0 border border-transparent bg-transparent"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden border border-tech-border bg-tech-surface text-tech-text shadow-hard-sm transition-all hover:-translate-y-[2px] hover:shadow-hard"
      aria-label={t("themeToggle")}
      title={t("themeToggle")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-4 w-4" strokeWidth={2.25} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-4 w-4" strokeWidth={2.25} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
