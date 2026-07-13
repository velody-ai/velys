import { useEffect, useRef, type RefObject } from "react";

export interface UseDismissOptions {
  /** Listeners are attached only while true (e.g. while the popup is open). */
  enabled: boolean;
  /** Elements considered "inside" — pointerdown within any of them is ignored. */
  refs: Array<RefObject<Element | null>>;
  onDismiss: () => void;
  /** Also dismiss on the Escape key. Default true. */
  escape?: boolean;
}

/**
 * Dismisses an overlay on outside `pointerdown` (ignoring events inside any
 * of `refs`) and, optionally, on Escape. Shared by Popover-like surfaces.
 */
export function useDismiss({ enabled, refs, onDismiss, escape = true }: UseDismissOptions): void {
  // Latest-value refs so callers can pass inline arrays/closures without
  // re-subscribing the document listeners on every render.
  const refsRef = useRef(refs);
  refsRef.current = refs;
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismissRef.current();
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (refsRef.current.some((ref) => ref.current?.contains(target))) return;
      onDismissRef.current();
    };
    if (escape) document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      if (escape) document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [enabled, escape]);
}
