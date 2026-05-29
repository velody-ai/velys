import { useCallback, useState } from "react";

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  /** Controlled open state. When provided, the hook does not own the state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseDisclosureReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/**
 * Headless open/close state for overlays and disclosures (Modal, Drawer,
 * Popover, Accordion). Supports both controlled and uncontrolled usage.
 */
export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const { defaultOpen = false, open: controlled, onOpenChange } = options;
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = controlled !== undefined;
  const open = isControlled ? controlled : internal;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const onOpen = useCallback(() => setOpen(true), [setOpen]);
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  const onToggle = useCallback(() => setOpen(!open), [setOpen, open]);

  return { open, setOpen, onOpen, onClose, onToggle };
}
