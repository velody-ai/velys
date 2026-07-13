import {
  cloneElement,
  createContext,
  useContext,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import * as css from "./Popover.css";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useAnchorPosition } from "../../internal/useAnchorPosition";
import { useDismiss } from "../../internal/useDismiss";

export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentId: string;
}
const PopoverContext = createContext<PopoverContextValue | null>(null);
const usePopover = () => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover subcomponents must be used within <Popover>");
  return ctx;
};

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function Popover({ open, defaultOpen, onOpenChange, children }: PopoverProps) {
  const disclosure = useDisclosure({ open, defaultOpen, onOpenChange });
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();
  return (
    <PopoverContext.Provider
      value={{ open: disclosure.open, setOpen: disclosure.setOpen, triggerRef, contentId }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps {
  children: ReactElement;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef, contentId } = usePopover();
  const childRef = (children as { ref?: Ref<HTMLElement> }).ref;
  return cloneElement(children as ReactElement<any>, {
    ref: mergeRefs(triggerRef, childRef),
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
    onClick: (e: React.MouseEvent) => {
      (children.props as any).onClick?.(e);
      setOpen(!open);
    },
  });
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: PopoverSide;
  align?: PopoverAlign;
  /** Distance from the trigger in px. Default 8. */
  offset?: number;
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  offset = 8,
  className,
  children,
  ...rest
}: PopoverContentProps) {
  const { open, setOpen, triggerRef, contentId } = usePopover();
  const ref = useRef<HTMLDivElement | null>(null);

  const { coords, positioned } = useAnchorPosition(triggerRef, ref, {
    side,
    align,
    offset,
    enabled: open,
  });

  useDismiss({
    enabled: open,
    refs: [ref, triggerRef],
    onDismiss: () => setOpen(false),
  });

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={ref}
      id={contentId}
      role="dialog"
      data-positioned={positioned}
      className={cx(css.content, className)}
      style={coords ? { top: coords.top, left: coords.left } : { top: 0, left: 0 }}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  );
}
