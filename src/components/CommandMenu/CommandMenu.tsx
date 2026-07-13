import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import * as css from "./CommandMenu.css";
import { SearchIcon } from "../icons";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useControllableState } from "../../internal/useControllableState";
import { useScrollLock } from "../../internal/useScrollLock";
import { useFocusTrap } from "../../internal/useFocusTrap";
import {
  useItemRegistry,
  type MoveActiveDirection,
  type RegistryItem,
} from "../../internal/useItemRegistry";

export type CommandFilter = (textValue: string, search: string) => boolean;

const defaultFilter: CommandFilter = (textValue, search) =>
  textValue.toLowerCase().includes(search.toLowerCase());

/** Per-item payload stored in the shared registry. */
interface CommandItemData {
  value: string;
  onSelect?: (value: string) => void;
}

interface CommandMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  /** `null` disables filtering entirely. */
  filter: CommandFilter | null;
  closeOnSelect: boolean;
  listId: string;
  /** Attached by CommandInput; the root autofocuses it on open. */
  inputRef: RefObject<HTMLInputElement | null>;
  items: RegistryItem<CommandItemData>[];
  register: (item: RegistryItem<CommandItemData>) => () => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  moveActive: (direction: MoveActiveDirection, options?: { wrap?: boolean }) => void;
  /** Run an item's onSelect and close per `closeOnSelect`. No-op when disabled. */
  selectItem: (item: RegistryItem<CommandItemData>) => void;
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);
const CommandGroupContext = createContext<string | undefined>(undefined);

function useCommandMenuContext(part: string): CommandMenuContextValue {
  const ctx = useContext(CommandMenuContext);
  if (!ctx) throw new Error(`<${part}> must be used within <CommandMenu>`);
  return ctx;
}

// --- shortcut matching -------------------------------------------------------

function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || nav.platform || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}

/**
 * "mod+k" grammar: modifier tokens (`mod`/`ctrl`/`meta`/`alt`/`shift`) plus a
 * single key, "+"-separated. `mod` resolves to `metaKey` on macOS-like
 * platforms and `ctrlKey` elsewhere. Modifier state must match exactly.
 */
function matchesShortcut(event: KeyboardEvent, shortcut: string): boolean {
  const tokens = shortcut
    .toLowerCase()
    .split("+")
    .map((t) => t.trim())
    .filter(Boolean);
  if (tokens.length === 0) return false;
  const key = tokens[tokens.length - 1];
  const want = { ctrl: false, meta: false, alt: false, shift: false };
  for (const token of tokens.slice(0, -1)) {
    if (token === "mod") {
      if (isApplePlatform()) want.meta = true;
      else want.ctrl = true;
    } else if (token === "ctrl") want.ctrl = true;
    else if (token === "meta") want.meta = true;
    else if (token === "alt") want.alt = true;
    else if (token === "shift") want.shift = true;
  }
  return (
    event.key.toLowerCase() === key &&
    event.ctrlKey === want.ctrl &&
    event.metaKey === want.meta &&
    event.altKey === want.alt &&
    event.shiftKey === want.shift
  );
}

// --- CommandMenu (root) ------------------------------------------------------

export interface CommandMenuProps {
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Global keyboard shortcut that toggles the menu, e.g. `"mod+k"`.
   * Tokens: `mod`/`ctrl`/`meta`/`alt`/`shift` + a single key, "+"-separated.
   * `mod` = ⌘ on macOS-like platforms, Ctrl elsewhere. Off by default.
   */
  shortcut?: string;
  /** Dialog aria-label. */
  label?: string;
  /**
   * Item filter. Defaults to case-insensitive substring matching on the
   * item's `textValue`. Pass `null` to disable filtering (e.g. when filtering
   * server-side via the controlled `search`).
   */
  filter?: CommandFilter | null;
  /** Controlled search value. */
  search?: string;
  defaultSearch?: string;
  onSearchChange?: (value: string) => void;
  /** Close the menu after an item is selected (default true). */
  closeOnSelect?: boolean;
  children?: ReactNode;
}

/**
 * cmdk-style command palette rendered as a modal dialog. Compose with
 * `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`,
 * `CommandEmpty`, and `CommandSeparator`.
 */
export function CommandMenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  shortcut,
  label = "Command menu",
  filter = defaultFilter,
  search: searchProp,
  defaultSearch = "",
  onSearchChange,
  closeOnSelect = true,
  children,
}: CommandMenuProps) {
  const { open, setOpen } = useDisclosure({ open: openProp, defaultOpen, onOpenChange });
  const [search, setSearch] = useControllableState({
    value: searchProp,
    defaultValue: defaultSearch,
    onChange: onSearchChange,
  });
  const listId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { items, register, activeId, setActiveId, moveActive } =
    useItemRegistry<CommandItemData>();

  useScrollLock(open);
  useFocusTrap(panelRef, open);

  // Autofocus the input on open. This effect is declared after useFocusTrap
  // so the trap captures the trigger (not the input) as the element to
  // restore focus to on close.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Global shortcut toggles open. `openRef` keeps the listener stable.
  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => {
    if (!shortcut || typeof document === "undefined") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (matchesShortcut(e, shortcut)) {
        e.preventDefault();
        setOpen(!openRef.current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shortcut, setOpen]);

  // Escape fallback on document (the input also handles Escape directly).
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  // A search change resets the active item; the effect below re-picks the
  // first visible item once the filtered registry settles.
  useEffect(() => {
    setActiveId(null);
  }, [search, setActiveId]);

  // Keep an active item whenever the visible set changes (open, filtering,
  // unmounts). Falls back to the first enabled item.
  useEffect(() => {
    if (!open) return;
    if (items.length === 0) {
      if (activeId !== null) setActiveId(null);
      return;
    }
    const current = activeId == null ? undefined : items.find((i) => i.id === activeId);
    if (!current || current.disabled) moveActive("first");
  }, [open, items, activeId, setActiveId, moveActive]);

  const selectItem = useCallback(
    (item: RegistryItem<CommandItemData>) => {
      if (item.disabled) return;
      item.value.onSelect?.(item.value.value);
      if (closeOnSelect) setOpen(false);
    },
    [closeOnSelect, setOpen],
  );

  const ctx = useMemo<CommandMenuContextValue>(
    () => ({
      open,
      setOpen,
      search,
      setSearch,
      filter,
      closeOnSelect,
      listId,
      inputRef,
      items,
      register,
      activeId,
      setActiveId,
      moveActive,
      selectItem,
    }),
    [
      open,
      setOpen,
      search,
      setSearch,
      filter,
      closeOnSelect,
      listId,
      items,
      register,
      activeId,
      setActiveId,
      moveActive,
      selectItem,
    ],
  );

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <CommandMenuContext.Provider value={ctx}>
      <div className={css.overlay} onClick={() => setOpen(false)}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className={css.panel}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CommandMenuContext.Provider>,
    document.body,
  );
}

// --- CommandInput ------------------------------------------------------------

export interface CommandInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  placeholder?: string;
}

/** Search field. Owns the list keyboard interactions (arrows, Enter, Escape). */
export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(function CommandInput(
  { placeholder = "Type a command or search…", className, onKeyDown, ...rest },
  ref,
) {
  const ctx = useCommandMenuContext("CommandInput");

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        ctx.moveActive("next", { wrap: true });
        break;
      case "ArrowUp":
        e.preventDefault();
        ctx.moveActive("prev", { wrap: true });
        break;
      case "Enter": {
        e.preventDefault();
        const item = ctx.items.find((i) => i.id === ctx.activeId);
        if (item) ctx.selectItem(item);
        break;
      }
      case "Escape":
        e.preventDefault();
        ctx.setOpen(false);
        break;
      // Home/End are left to the text caret.
    }
  };

  return (
    <div className={css.inputRow}>
      <span className={css.inputIcon} aria-hidden>
        <SearchIcon />
      </span>
      <input
        ref={mergeRefs(ctx.inputRef, ref)}
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-controls={ctx.listId}
        aria-activedescendant={ctx.activeId ?? undefined}
        aria-autocomplete="list"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        className={cx(css.input, className)}
        value={ctx.search}
        onChange={(e) => ctx.setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    </div>
  );
});

// --- CommandList -------------------------------------------------------------

export interface CommandListProps extends HTMLAttributes<HTMLDivElement> {}

/** Scrollable listbox holding groups and items. */
export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(function CommandList(
  { className, ...rest },
  ref,
) {
  const ctx = useCommandMenuContext("CommandList");
  return <div ref={ref} id={ctx.listId} role="listbox" className={cx(css.list, className)} {...rest} />;
});

// --- CommandGroup ------------------------------------------------------------

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
}

/**
 * Labelled section of items. Auto-hides when every item in it is filtered
 * out (children stay mounted so they can re-register when the search changes).
 */
export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(function CommandGroup(
  { heading, className, children, ...rest },
  ref,
) {
  const ctx = useCommandMenuContext("CommandGroup");
  const groupId = useId();
  const headingId = useId();
  const hasVisibleItems = ctx.items.some((item) => item.groupId === groupId);

  return (
    <CommandGroupContext.Provider value={groupId}>
      <div
        ref={ref}
        role="group"
        aria-labelledby={heading != null ? headingId : undefined}
        hidden={!hasVisibleItems || undefined}
        className={cx(css.group, className)}
        {...rest}
      >
        {heading != null && (
          <div id={headingId} className={css.groupHeading}>
            {heading}
          </div>
        )}
        {children}
      </div>
    </CommandGroupContext.Provider>
  );
});

// --- CommandItem ---------------------------------------------------------------

export interface CommandItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Value passed to `onSelect`. Defaults to `textValue`. */
  value?: string;
  /** Plain-text label used for filtering. Defaults to string children. */
  textValue?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  /** Right-aligned hint slot (pairs with `Kbd`). */
  hint?: ReactNode;
  leadingIcon?: ReactNode;
}

/** Selectable command. Hidden (and unregistered) while filtered out. */
export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(function CommandItem(
  {
    value,
    textValue,
    onSelect,
    disabled,
    hint,
    leadingIcon,
    className,
    children,
    id: idProp,
    onMouseEnter,
    onClick,
    ...rest
  },
  ref,
) {
  const ctx = useCommandMenuContext("CommandItem");
  const groupId = useContext(CommandGroupContext);
  const autoId = useId();
  const id = idProp ?? autoId;
  const innerRef = useRef<HTMLDivElement>(null);

  const resolvedTextValue = textValue ?? (typeof children === "string" ? children : "");
  const resolvedValue = value ?? resolvedTextValue;
  const visible =
    ctx.filter === null || ctx.search === "" || ctx.filter(resolvedTextValue, ctx.search);

  // Keep the registered onSelect fresh without re-registering per render.
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const { register } = ctx;
  useEffect(() => {
    if (!visible) return;
    return register({
      id,
      value: { value: resolvedValue, onSelect: (v) => onSelectRef.current?.(v) },
      textValue: resolvedTextValue,
      disabled,
      groupId,
      ref: innerRef,
    });
  }, [visible, id, resolvedValue, resolvedTextValue, disabled, groupId, register]);

  if (!visible) return null;

  const active = ctx.activeId === id;

  return (
    <div
      ref={mergeRefs(innerRef, ref)}
      id={id}
      role="option"
      // cmdk convention: "selected" communicates the active (highlighted) item.
      aria-selected={active}
      aria-disabled={disabled || undefined}
      className={cx(css.item({ active, disabled }), className)}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (!disabled) ctx.setActiveId(id);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (disabled) return;
        onSelect?.(resolvedValue);
        if (ctx.closeOnSelect) ctx.setOpen(false);
      }}
      {...rest}
    >
      {leadingIcon && (
        <span className={css.itemIcon} aria-hidden>
          {leadingIcon}
        </span>
      )}
      <span className={css.itemLabel}>{children}</span>
      {hint != null && <span className={css.itemHint}>{hint}</span>}
    </div>
  );
});

// --- CommandEmpty --------------------------------------------------------------

export interface CommandEmptyProps extends HTMLAttributes<HTMLDivElement> {}

/** Shown only when a non-empty search matches zero items. */
export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(function CommandEmpty(
  { className, ...rest },
  ref,
) {
  const ctx = useCommandMenuContext("CommandEmpty");
  if (ctx.search === "" || ctx.items.length > 0) return null;
  return <div ref={ref} className={cx(css.empty, className)} {...rest} />;
});

// --- CommandSeparator ------------------------------------------------------------

export interface CommandSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

/** Hairline between sections. Hidden while searching (cmdk convention). */
export const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  function CommandSeparator({ className, ...rest }, ref) {
    const ctx = useCommandMenuContext("CommandSeparator");
    if (ctx.search !== "") return null;
    return <div ref={ref} role="separator" className={cx(css.separator, className)} {...rest} />;
  },
);
