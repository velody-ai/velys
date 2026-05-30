import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import * as css from "./Accordion.css";
import type { RootVariants } from "./Accordion.css";
import { ChevronDownIcon } from "../icons";
import { cx } from "../../utils/cx";

type Variant = NonNullable<RootVariants["variant"]>;

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
  variant: Variant;
  headingLevel: number;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion subcomponents must be used within <Accordion>");
  return ctx;
};

interface ItemContextValue {
  value: string;
  open: boolean;
  triggerId: string;
  contentId: string;
}
const ItemContext = createContext<ItemContextValue | null>(null);
const useItem = () => {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error("AccordionTrigger/Content must be used within <AccordionItem>");
  return ctx;
};

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  type?: "single" | "multiple";
  /** Allow closing the open item in single mode. Default true. */
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string[]) => void;
  variant?: Variant;
  /** Heading level wrapping each trigger (a11y). Default 3. */
  headingLevel?: number;
  children?: ReactNode;
}

const toArray = (v: string | string[] | undefined): string[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = "single",
    collapsible = true,
    value,
    defaultValue,
    onValueChange,
    variant = "bordered",
    headingLevel = 3,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState<string[]>(toArray(defaultValue));
  const isControlled = value !== undefined;
  const openValues = isControlled ? toArray(value) : internal;

  const toggle = (itemValue: string) => {
    let next: string[];
    const isOpen = openValues.includes(itemValue);
    if (type === "multiple") {
      next = isOpen ? openValues.filter((v) => v !== itemValue) : [...openValues, itemValue];
    } else {
      next = isOpen ? (collapsible ? [] : openValues) : [itemValue];
    }
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle, variant, headingLevel }}>
      <div ref={ref} className={cx(css.root({ variant }), className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, className, children, ...rest },
  ref,
) {
  const { openValues, variant } = useAccordion();
  const id = useId();
  const open = openValues.includes(value);
  return (
    <ItemContext.Provider
      value={{ value, open, triggerId: `${id}-trigger`, contentId: `${id}-content` }}
    >
      <div ref={ref} className={cx(css.item({ variant }), className)} {...rest}>
        {children}
      </div>
    </ItemContext.Provider>
  );
});

export interface AccordionTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "type"> {
  disabled?: boolean;
}
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, disabled, ...rest }, ref) {
    const { toggle, headingLevel } = useAccordion();
    const { value, open, triggerId, contentId } = useItem();
    return (
      <div role="heading" aria-level={headingLevel} className={css.heading}>
        <button
          ref={ref}
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={contentId}
          disabled={disabled}
          className={cx(css.trigger, className)}
          onClick={() => toggle(value)}
          {...rest}
        >
          <span>{children}</span>
          <ChevronDownIcon className={css.icon} />
        </button>
      </div>
    );
  },
);

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...rest }, ref) {
    const { open, triggerId, contentId } = useItem();
    return (
      <div ref={ref} className={css.contentOuter({ open })} {...rest}>
        <div className={css.contentInner}>
          <div
            role="region"
            id={contentId}
            aria-labelledby={triggerId}
            className={cx(css.contentBody, className)}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
