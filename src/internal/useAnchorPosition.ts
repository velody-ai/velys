import { useLayoutEffect, useState, type RefObject } from "react";

export type Side = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";

/** DOMRect-like shape — accepted so the math can be unit-tested with synthetic rects. */
export interface AnchorRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface ComputePositionOptions {
  side: Side;
  align: Align;
  /** Distance from the anchor in px. */
  offset: number;
  /** When true the floating element takes the anchor's width. */
  matchWidth?: boolean;
  /** Viewport size used for clamping. Defaults to the window dimensions. */
  viewport?: { width: number; height: number };
}

export interface AnchorCoords {
  top: number;
  left: number;
  /** Present only when `matchWidth` is enabled — the anchor's width in px. */
  width?: number;
}

/**
 * Pure positioning math shared by anchored overlays (Popover, Select-like
 * menus, Combobox, DatePicker). Places `content` on the given `side` of
 * `anchor` with the given `align`ment and `offset`, then clamps the result
 * into the viewport with an 8px margin.
 */
export function computePosition(
  anchor: AnchorRect,
  content: { width: number; height: number },
  { side, align, offset, matchWidth, viewport }: ComputePositionOptions,
): AnchorCoords {
  const width = matchWidth ? anchor.width : content.width;
  const height = content.height;

  let top = 0;
  let left = 0;
  if (side === "bottom") top = anchor.bottom + offset;
  else if (side === "top") top = anchor.top - height - offset;
  else if (side === "right") left = anchor.right + offset;
  else left = anchor.left - width - offset;

  if (side === "top" || side === "bottom") {
    if (align === "start") left = anchor.left;
    else if (align === "center") left = anchor.left + anchor.width / 2 - width / 2;
    else left = anchor.right - width;
  } else {
    if (align === "start") top = anchor.top;
    else if (align === "center") top = anchor.top + anchor.height / 2 - height / 2;
    else top = anchor.bottom - height;
  }

  // Clamp into the viewport with an 8px margin.
  const margin = 8;
  const vw = viewport?.width ?? window.innerWidth;
  const vh = viewport?.height ?? window.innerHeight;
  left = Math.max(margin, Math.min(left, vw - width - margin));
  top = Math.max(margin, Math.min(top, vh - height - margin));

  if (matchWidth) return { top, left, width };
  return { top, left };
}

export interface UseAnchorPositionOptions {
  side?: Side;
  align?: Align;
  /** Distance from the anchor in px. Default 8. */
  offset?: number;
  /** When true the floating element's width is set to the anchor's width. */
  matchWidth?: boolean;
  /** Position only while true (e.g. while the popup is open). Default true. */
  enabled?: boolean;
}

/**
 * Positions a floating element relative to an anchor element and keeps it in
 * place on scroll (capture) and resize. Returns `coords` (null until the
 * first measurement, and while `enabled` is false) and a `positioned` flag.
 */
export function useAnchorPosition(
  anchorRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  {
    side = "bottom",
    align = "center",
    offset = 8,
    matchWidth = false,
    enabled = true,
  }: UseAnchorPositionOptions = {},
): { coords: AnchorCoords | null; positioned: boolean } {
  const [coords, setCoords] = useState<AnchorCoords | null>(null);

  useLayoutEffect(() => {
    if (!enabled) {
      setCoords(null);
      return;
    }
    const reposition = () => {
      const anchor = anchorRef.current?.getBoundingClientRect();
      const el = floatingRef.current;
      if (!anchor || !el) return;
      if (matchWidth) el.style.width = `${anchor.width}px`;
      setCoords(
        computePosition(
          anchor,
          { width: el.offsetWidth, height: el.offsetHeight },
          { side, align, offset, matchWidth },
        ),
      );
    };
    reposition();
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [enabled, side, align, offset, matchWidth, anchorRef, floatingRef]);

  return { coords, positioned: coords !== null };
}
