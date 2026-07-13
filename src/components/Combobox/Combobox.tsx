import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import * as css from "./Combobox.css";
import { ChevronDownIcon, CheckIcon } from "../icons";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useAnchorPosition } from "../../internal/useAnchorPosition";
import { useControllableState } from "../../internal/useControllableState";
import { useDismiss } from "../../internal/useDismiss";
import { useItemRegistry, type UseItemRegistryReturn } from "../../internal/useItemRegistry";

export type ComboboxFilter = (textValue: string, search: string) => boolean;

const defaultFilter: ComboboxFilter = (textValue, search) =>
  textValue.toLowerCase().includes(search.toLowerCase());

/** What to highlight once the popup's items have mounted. */
type PendingActive = "selected" | "first";

interface ComboboxContextValue {
  open: boolean;
  /** Open the popup, highlighting the selected item (falling back to the first visible one). */
  openWith: (pending: PendingActive) => void;
  /** Close without committing — reverts the input text (and deselects when cleared). */
  closeAndRevert: () => void;
  value: string | null;
  inputValue: string;
  /** Input text edit: fires onInputValueChange, opens the popup, re-highlights the first match. */
  changeInputValue: (next: string) => void;
  /** Commit a selection: value + input text + close (focus stays in the input). */
  selectItem: (value: string, textValue: string) => void;
  registry: UseItemRegistryReturn<string>;
  filter: ComboboxFilter | null;
  listId: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  anchorRef: React.MutableRefObject<HTMLDivElement | null>;
  /** Last known textValue per item value — survives filtering/unmount, used to revert the input. */
  labelsRef: React.MutableRefObject<Map<string, string>>;
  disabled: boolean;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useCombobox(): ComboboxContextValue {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error("Combobox subcomponents must be used within <Combobox>");
  return ctx;
}

export interface ComboboxProps {
  /** Controlled selected value (`null` = no selection). */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Controlled input text. */
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Item filter (default: case-insensitive `includes` on the item's textValue).
   * Pass `null` to disable internal filtering (external/async filtering).
   */
  filter?: ComboboxFilter | null;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Combobox({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  inputValue: inputValueProp,
  defaultInputValue = "",
  onInputValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  filter = defaultFilter,
  disabled = false,
  className,
  children,
}: ComboboxProps) {
  const [value, setValue] = useControllableState<string | null>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });
  const [inputValue, setInputValue] = useControllableState<string>({
    value: inputValueProp,
    defaultValue: defaultInputValue,
    onChange: onInputValueChange,
  });
  const { open, setOpen } = useDisclosure({ open: openProp, defaultOpen, onOpenChange });
  const registry = useItemRegistry<string>();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<Map<string, string>>(new Map());
  const pendingActiveRef = useRef<PendingActive | null>(null);

  const openWith = (pending: PendingActive) => {
    if (disabled) return;
    pendingActiveRef.current = pending;
    if (!open) setOpen(true);
  };

  const changeInputValue = (next: string) => {
    pendingActiveRef.current = "first";
    setInputValue(next);
    if (!open) setOpen(true);
  };

  const selectItem = (itemValue: string, textValue: string) => {
    setValue(itemValue);
    setInputValue(textValue);
    setOpen(false);
  };

  const closeAndRevert = () => {
    if (open) setOpen(false);
    if (inputValue === "") {
      // Cleared then closed → deselect.
      if (value !== null) setValue(null);
      return;
    }
    const reverted = value != null ? labelsRef.current.get(value) ?? "" : "";
    if (reverted !== inputValue) setInputValue(reverted);
  };

  // Keep the active (highlighted) item in sync with open state and filtering:
  // resolve a pending highlight once items have registered, and fall back to
  // the first visible item when the current one gets filtered out.
  const { items, activeId, setActiveId, moveActive } = registry;
  useEffect(() => {
    if (!open) {
      pendingActiveRef.current = null;
      setActiveId(null);
      return;
    }
    if (pendingActiveRef.current) {
      // Items mount after the popup opens — wait for them before resolving.
      if (items.length === 0) return;
      const pending = pendingActiveRef.current;
      pendingActiveRef.current = null;
      if (pending === "selected" && value != null) {
        const selected = items.find((i) => i.value === value && !i.disabled);
        if (selected) {
          setActiveId(selected.id);
          return;
        }
      }
      moveActive("first");
      return;
    }
    if (activeId != null && !items.some((i) => i.id === activeId)) {
      if (items.length === 0) setActiveId(null);
      else moveActive("first");
    }
  }, [open, items, activeId, setActiveId, moveActive, value, inputValue]);

  return (
    <ComboboxContext.Provider
      value={{
        open,
        openWith,
        closeAndRevert,
        value,
        inputValue,
        changeInputValue,
        selectItem,
        registry,
        filter,
        listId,
        inputRef,
        anchorRef,
        labelsRef,
        disabled,
      }}
    >
      <div className={cx(css.root, className)}>{children}</div>
    </ComboboxContext.Provider>
  );
}

export interface ComboboxInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue" | "onChange"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput({ size = "md", invalid, className, onKeyDown, onBlur, ...rest }, ref) {
    const ctx = useCombobox();
    const { open, registry, disabled } = ctx;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      ctx.changeInputValue(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (disabled || e.defaultPrevented) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) ctx.openWith("selected");
        else registry.moveActive(e.key === "ArrowDown" ? "next" : "prev");
      } else if (e.key === "Enter") {
        if (!open) return;
        e.preventDefault();
        const active = registry.items.find((i) => i.id === registry.activeId);
        if (active && !active.disabled) ctx.selectItem(active.value, active.textValue);
      } else if (e.key === "Tab") {
        // Close without committing; let the browser move focus.
        if (open) ctx.closeAndRevert();
      }
      // Escape is handled by the list's useDismiss; Home/End keep their text-caret behavior.
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      if (!open) return;
      const next = e.relatedTarget as Node | null;
      // `null` relatedTarget (e.g. outside pointerdown) is handled by useDismiss.
      if (next && !ctx.anchorRef.current?.contains(next)) ctx.closeAndRevert();
    };

    return (
      <div ref={ctx.anchorRef} className={css.field({ size, invalid, disabled, open })}>
        <input
          {...rest}
          ref={mergeRefs(ctx.inputRef, ref)}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? ctx.listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={open && registry.activeId ? registry.activeId : undefined}
          aria-invalid={invalid || undefined}
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          className={cx(css.input, className)}
          value={ctx.inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
          className={css.chevron}
          data-open={open}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (disabled) return;
            if (open) ctx.closeAndRevert();
            else ctx.openWith("selected");
            ctx.inputRef.current?.focus();
          }}
        >
          <ChevronDownIcon />
        </button>
      </div>
    );
  },
);

export interface ComboboxListProps extends HTMLAttributes<HTMLDivElement> {}

export const ComboboxList = forwardRef<HTMLDivElement, ComboboxListProps>(
  function ComboboxList({ className, style, children, ...rest }, ref) {
    const ctx = useCombobox();
    const { open } = ctx;
    const listRef = useRef<HTMLDivElement | null>(null);

    const { coords, positioned } = useAnchorPosition(ctx.anchorRef, listRef, {
      side: "bottom",
      align: "start",
      offset: 4,
      matchWidth: true,
      enabled: open,
    });

    useDismiss({
      enabled: open,
      refs: [listRef, ctx.anchorRef],
      onDismiss: ctx.closeAndRevert,
    });

    if (!open || typeof document === "undefined") return null;

    return createPortal(
      <div
        {...rest}
        ref={mergeRefs(listRef, ref)}
        id={ctx.listId}
        role="listbox"
        data-positioned={positioned}
        className={cx(css.panel, className)}
        style={{ ...(coords ?? { top: 0, left: 0 }), ...style }}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

export interface ComboboxItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value: string;
  /** Plain-text label used for filtering and for the input text on selection. Defaults to string children, else `value`. */
  textValue?: string;
  disabled?: boolean;
}

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem(
    { value, textValue, disabled, className, children, onMouseEnter, onMouseDown, onClick, ...rest },
    ref,
  ) {
    const ctx = useCombobox();
    const id = useId();
    const itemRef = useRef<HTMLDivElement | null>(null);

    const resolvedText = textValue ?? (typeof children === "string" ? children : value);
    const visible = ctx.filter === null ? true : ctx.filter(resolvedText, ctx.inputValue);

    // Remember the label even while filtered out, so closing can revert the input text.
    useLayoutEffect(() => {
      ctx.labelsRef.current.set(value, resolvedText);
    });

    const { register } = ctx.registry;
    useLayoutEffect(() => {
      if (!visible) return;
      return register({ id, value, textValue: resolvedText, disabled, ref: itemRef });
    }, [register, id, value, resolvedText, disabled, visible]);

    if (!visible) return null;

    const selected = value === ctx.value;
    const active = id === ctx.registry.activeId;

    return (
      <div
        {...rest}
        ref={mergeRefs(itemRef, ref)}
        id={id}
        role="option"
        aria-selected={selected}
        aria-disabled={disabled || undefined}
        className={cx(css.option({ active, selected, disabled }), className)}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          if (!disabled) ctx.registry.setActiveId(id);
        }}
        onMouseDown={(e) => {
          onMouseDown?.(e);
          // Keep focus in the input while clicking an option.
          e.preventDefault();
        }}
        onClick={(e) => {
          onClick?.(e);
          if (!disabled) ctx.selectItem(value, resolvedText);
        }}
      >
        <span>{children}</span>
        {selected && (
          <span className={css.optionCheck} aria-hidden>
            <CheckIcon />
          </span>
        )}
      </div>
    );
  },
);

export interface ComboboxEmptyProps extends HTMLAttributes<HTMLDivElement> {}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty({ className, ...rest }, ref) {
    const ctx = useCombobox();
    if (!ctx.open || ctx.registry.items.length > 0) return null;
    return <div ref={ref} className={cx(css.empty, className)} {...rest} />;
  },
);
