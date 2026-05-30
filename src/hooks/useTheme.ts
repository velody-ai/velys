import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "../provider/context";

/**
 * Read and control the current theme mode. Must be used within a
 * `<VelysProvider>`.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <VelysProvider>");
  return ctx;
}
