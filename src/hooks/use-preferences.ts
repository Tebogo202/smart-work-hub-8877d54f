import { useCallback, useEffect, useState } from "react";

export type Preferences = {
  theme: "light" | "dark";
  tone: string;
  length: string;
};

const STORAGE_KEY = "awpa-preferences";

const DEFAULTS: Preferences = { theme: "light", tone: "Professional", length: "Medium" };

function read(): Preferences {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Preferences>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function applyTheme(theme: Preferences["theme"]) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULTS);

  useEffect(() => {
    const stored = read();
    setPreferences(stored);
    applyTheme(stored.theme);
  }, []);

  const update = useCallback((patch: Partial<Preferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore storage failures */
      }
      if (patch.theme) applyTheme(patch.theme);
      return next;
    });
  }, []);

  return { preferences, update };
}
