import { useEffect } from "react";

// Module-level ref count so multiple stacked overlays (Modal over Popover,
// nested menus, …) share a single body lock and only the last one restores.
let lockCount = 0;
let previousOverflow = "";

/**
 * Locks body scroll (`overflow: hidden`) while `active` is true. Ref-counted
 * across hook instances; the prior inline `overflow` value is restored when
 * the last active lock releases.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;
    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
        previousOverflow = "";
      }
    };
  }, [active]);
}
