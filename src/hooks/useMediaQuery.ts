import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. SSR-safe — returns `false` until mounted on
 * the client. Useful for responsive logic and `prefers-color-scheme` detection.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Convenience wrapper around `(prefers-color-scheme: dark)`. */
export function usePrefersDark(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
