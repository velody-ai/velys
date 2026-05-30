import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
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

function computePosition(
  trigger: DOMRect,
  content: { width: number; height: number },
  side: PopoverSide,
  align: PopoverAlign,
  offset: number,
) {
  let top = 0;
  let left = 0;
  if (side === "bottom") top = trigger.bottom + offset;
  else if (side === "top") top = trigger.top - content.height - offset;
  else if (side === "right") left = trigger.right + offset;
  else left = trigger.left - content.width - offset;

  if (side === "top" || side === "bottom") {
    if (align === "start") left = trigger.left;
    else if (align === "center") left = trigger.left + trigger.width / 2 - content.width / 2;
    else left = trigger.right - content.width;
  } else {
    if (align === "start") top = trigger.top;
    else if (align === "center") top = trigger.top + trigger.height / 2 - content.height / 2;
    else top = trigger.bottom - content.height;
  }

  // Clamp into the viewport with an 8px margin.
  const margin = 8;
  left = Math.max(margin, Math.min(left, window.innerWidth - content.width - margin));
  top = Math.max(margin, Math.min(top, window.innerHeight - content.height - margin));
  return { top, left };
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
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    const reposition = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const el = ref.current;
      if (!trigger || !el) return;
      setCoords(
        computePosition(
          trigger,
          { width: el.offsetWidth, height: el.offsetHeight },
          side,
          align,
          offset,
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
  }, [open, side, align, offset, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen, triggerRef]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={ref}
      id={contentId}
      role="dialog"
      data-positioned={coords !== null}
      className={cx(css.content, className)}
      style={coords ? { top: coords.top, left: coords.left } : { top: 0, left: 0 }}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  );
}
