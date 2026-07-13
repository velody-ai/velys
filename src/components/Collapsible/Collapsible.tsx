import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import * as css from "./Collapsible.css";
import { cx } from "../../utils/cx";
import { useDisclosure } from "../../hooks/useDisclosure";

interface CollapsibleContextValue {
  open: boolean;
  onToggle: () => void;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}
const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);
const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error("Collapsible subcomponents must be used within <Collapsible>");
  }
  return ctx;
};

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state (uncontrolled). Default false. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Prevents the trigger from toggling. Default false. */
  disabled?: boolean;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  { open, defaultOpen = false, onOpenChange, disabled = false, children, ...rest },
  ref,
) {
  const disclosure = useDisclosure({ open, defaultOpen, onOpenChange });
  const id = useId();
  return (
    <CollapsibleContext.Provider
      value={{
        open: disclosure.open,
        onToggle: disclosure.onToggle,
        disabled,
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
      }}
    >
      <div ref={ref} data-state={disclosure.open ? "open" : "closed"} {...rest}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
});

export interface CollapsibleTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  function CollapsibleTrigger({ className, disabled, onClick, children, ...rest }, ref) {
    const ctx = useCollapsible();
    return (
      <button
        ref={ref}
        type="button"
        id={ctx.triggerId}
        aria-expanded={ctx.open}
        aria-controls={ctx.contentId}
        data-state={ctx.open ? "open" : "closed"}
        disabled={ctx.disabled || disabled}
        className={cx(css.trigger, className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) ctx.onToggle();
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent({ className, children, ...rest }, ref) {
    const { open, triggerId, contentId } = useCollapsible();
    return (
      <div
        ref={ref}
        id={contentId}
        aria-labelledby={triggerId}
        data-state={open ? "open" : "closed"}
        className={cx(css.contentOuter({ open }), className)}
        {...rest}
      >
        <div className={css.contentInner}>{children}</div>
      </div>
    );
  },
);
