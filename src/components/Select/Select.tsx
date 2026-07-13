import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import * as css from "./Select.css";
import { ChevronDownIcon, CheckIcon } from "../icons";
import { cx } from "../../utils/cx";
import { useCoarsePointer } from "../../internal/useCoarsePointer";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Text shown when no value is selected. Falls back to the empty-value <option>'s label. */
  placeholder?: string;
}

interface OptionData {
  value: string;
  label: string;
  disabled?: boolean;
}

function useParsedOptions(children: ReactNode): OptionData[] {
  return useMemo(() => {
    const out: OptionData[] = [];
    Children.forEach(children, (child) => {
      if (!isValidElement(child) || child.type !== "option") return;
      const props = child.props as { value?: string | number; children?: ReactNode; disabled?: boolean };
      const value = String(props.value ?? "");
      const label = typeof props.children === "string" ? props.children : String(props.children ?? "");
      out.push({ value, label, disabled: props.disabled });
    });
    return out;
  }, [children]);
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = "md", invalid, disabled, placeholder, className, children, value, defaultValue, onChange, ...rest },
  ref,
) {
  const options = useParsedOptions(children);
  const native = useCoarsePointer();
  const listId = useId();

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(() => String(defaultValue ?? ""));
  const current = isControlled ? String(value) : internal;

  const selected = options.find((o) => o.value === current);
  const isPlaceholder = !selected || selected.value === "";
  const display = isPlaceholder
    ? placeholder ?? options.find((o) => o.value === "")?.label ?? ""
    : selected!.label;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (!isControlled) setInternal(e.target.value);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  // --- Desktop custom listbox ---
  const listOptions = options.filter((o) => o.value !== "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mirrorRef = useRef<HTMLSelectElement | null>(null);

  // Fire a real `change` on the mirror <select> so consumer onChange + form value stay in sync.
  const commit = useCallback(
    (v: string) => {
      const sel = mirrorRef.current;
      if (sel) {
        const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
        setter?.call(sel, v);
        sel.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (!isControlled) {
        setInternal(v);
      }
      setOpen(false);
      buttonRef.current?.focus();
    },
    [isControlled],
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openMenu = () => {
    const sel = listOptions.findIndex((o) => o.value === current);
    setActiveIndex(sel >= 0 ? sel : 0);
    setOpen(true);
  };

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(listOptions.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(listOptions.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = listOptions[activeIndex];
      if (opt && !opt.disabled) commit(opt.value);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const fieldVariants = { size, invalid, disabled } as const;

  if (native) {
    return (
      <div ref={rootRef} className={cx(css.root, className)}>
        <div className={css.field({ ...fieldVariants })}>
          <span className={css.value} data-placeholder={isPlaceholder}>
            {display}
          </span>
          <span className={css.chevron} aria-hidden>
            <ChevronDownIcon />
          </span>
          <select
            ref={ref}
            className={css.nativeOverlay}
            value={current}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={invalid}
            {...rest}
          >
            {children}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cx(css.root, className)}>
      <button
        ref={buttonRef}
        type="button"
        className={css.field({ ...fieldVariants, open })}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-invalid={invalid}
        aria-activedescendant={open && activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onButtonKeyDown}
      >
        <span className={css.value} data-placeholder={isPlaceholder}>
          {display}
        </span>
        <span className={css.chevron} data-open={open} aria-hidden>
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <ul className={css.panel} id={listId} role="listbox">
          {listOptions.map((opt, i) => {
            const isSel = opt.value === current;
            return (
              <li
                key={opt.value}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={isSel}
                aria-disabled={opt.disabled || undefined}
                className={css.option({ active: i === activeIndex, selected: isSel, disabled: opt.disabled })}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => !opt.disabled && commit(opt.value)}
              >
                <span>{opt.label}</span>
                {isSel && (
                  <span className={css.optionCheck} aria-hidden>
                    <CheckIcon />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Hidden mirror for form submission + onChange parity in desktop mode */}
      <select
        ref={(node) => {
          mirrorRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as MutableRefObject<HTMLSelectElement | null>).current = node;
        }}
        className={css.hiddenMirror}
        tabIndex={-1}
        aria-hidden
        value={current}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
});
