import type { ReactNode } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { cn } from "@/shared/lib/cn";
import { ThemeContext } from "@/shared/theme/ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage(
    "isDark",
    prefersDarkMode.matches,
  );

  const changeTheme = () => setIsDark((currentTheme) => !currentTheme);

  return (
    <ThemeContext.Provider value={{ isDark, changeTheme }}>
      <div className={cn(isDark && "dark-mode")}>{children}</div>
    </ThemeContext.Provider>
  );
}
