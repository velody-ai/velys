import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";

export interface RegistryItem<V = string> {
  /** Stable unique id (e.g. from `useId`). Registration is keyed by this. */
  id: string;
  value: V;
  /** Plain-text label used for typeahead/filter matching. */
  textValue: string;
  disabled?: boolean;
  /** Optional group the item belongs to (e.g. a labelled option group). */
  groupId?: string;
  ref: RefObject<HTMLElement | null>;
}

export type MoveActiveDirection = "next" | "prev" | "first" | "last";

export interface UseItemRegistryReturn<V = string> {
  /** Currently mounted items in document order. */
  items: RegistryItem<V>[];
  /**
   * Register an item (call from a mount effect). Returns the unregister
   * cleanup. Re-registering an existing id replaces it in place, which makes
   * the double `mount → cleanup → mount` of StrictMode safe.
   */
  register: (item: RegistryItem<V>) => () => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  /**
   * Move the active item, skipping disabled items. "next"/"prev" step from
   * the current active item (or the ends when nothing is active) and stay
   * put at the boundary unless `wrap` is set.
   */
  moveActive: (direction: MoveActiveDirection, options?: { wrap?: boolean }) => void;
}

/**
 * Shared item registry for listbox-ish composites (Select-like menus,
 * Combobox, CommandMenu). Items self-register on mount; the registry keeps
 * them in document order, tracks the active (highlighted) item, and scrolls
 * it into view when it changes.
 */
export function useItemRegistry<V = string>(): UseItemRegistryReturn<V> {
  const [entries, setEntries] = useState<RegistryItem<V>[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const register = useCallback((item: RegistryItem<V>) => {
    setEntries((prev) => {
      const index = prev.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        // Dedupe by id (StrictMode re-mounts, prop updates) — replace in place.
        const next = prev.slice();
        next[index] = item;
        return next;
      }
      return [...prev, item];
    });
    return () => {
      setEntries((prev) => prev.filter((i) => i.id !== item.id));
    };
  }, []);

  // Mount effects append in render order for the initial mount, but items
  // mounted later (e.g. after filtering) would append at the end — so sort by
  // DOM position whenever both elements are available. Array#sort is stable,
  // so unmeasurable entries keep their registration order.
  const items = useMemo(() => {
    return entries.slice().sort((a, b) => {
      const ae = a.ref.current;
      const be = b.ref.current;
      if (!ae || !be || ae === be) return 0;
      const position = ae.compareDocumentPosition(be);
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
  }, [entries]);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const moveActive = useCallback(
    (direction: MoveActiveDirection, { wrap = false }: { wrap?: boolean } = {}) => {
      setActiveId((current) => {
        const list = itemsRef.current;
        const enabledIndexes: number[] = [];
        list.forEach((item, index) => {
          if (!item.disabled) enabledIndexes.push(index);
        });
        if (enabledIndexes.length === 0) return current;
        const first = enabledIndexes[0];
        const last = enabledIndexes[enabledIndexes.length - 1];

        if (direction === "first") return list[first].id;
        if (direction === "last") return list[last].id;

        const currentIndex = current == null ? -1 : list.findIndex((i) => i.id === current);
        if (direction === "next") {
          for (let i = currentIndex + 1; i < list.length; i++) {
            if (!list[i].disabled) return list[i].id;
          }
          return wrap ? list[first].id : current;
        }
        // "prev" — from nothing active, step in from the end.
        const start = currentIndex === -1 ? list.length - 1 : currentIndex - 1;
        for (let i = start; i >= 0; i--) {
          if (!list[i].disabled) return list[i].id;
        }
        return wrap ? list[last].id : current;
      });
    },
    [],
  );

  useEffect(() => {
    if (activeId == null) return;
    const item = itemsRef.current.find((i) => i.id === activeId);
    item?.ref.current?.scrollIntoView?.({ block: "nearest" });
  }, [activeId]);

  return { items, register, activeId, setActiveId, moveActive };
}
