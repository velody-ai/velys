import {
  forwardRef,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import * as css from "./DatePicker.css";
import { Calendar } from "../Calendar";
import { CalendarIcon } from "../icons";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { useAnchorPosition } from "../../internal/useAnchorPosition";
import { useDismiss } from "../../internal/useDismiss";
import {
  formatISODate,
  isSameDay,
  parseDateInput,
  startOfDay,
  type WeekStartsOn,
} from "../../internal/date";

export interface DatePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "value" | "defaultValue" | "onChange" | "min" | "max"
  > {
  /** Controlled selected date (`null` = empty). */
  value?: Date | null;
  /** Initial selected date for uncontrolled usage. */
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Earliest selectable day (inclusive, whole-day). */
  min?: Date;
  /** Latest selectable day (inclusive, whole-day). */
  max?: Date;
  /** Disable arbitrary days (e.g. weekends). */
  isDateDisabled?: (date: Date) => boolean;
  /** First day of the week in the popup calendar. Default 0 (Sunday). */
  weekStartsOn?: WeekStartsOn;
  /** BCP 47 locale for display/parsing. Defaults to the runtime locale. */
  locale?: string;
  /** Class for the outer wrapper (`className` goes to the text input). */
  rootClassName?: string;
}

/** The locale's numeric date pattern, e.g. "MM/DD/YYYY" for en-US. */
function localePlaceholder(locale?: string): string {
  try {
    const parts = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(2000, 10, 22));
    let out = "";
    for (const part of parts) {
      if (part.type === "year") out += "YYYY";
      else if (part.type === "month") out += "MM";
      else if (part.type === "day") out += "DD";
      else out += part.value;
    }
    return out;
  } catch {
    return "YYYY-MM-DD";
  }
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    size = "md",
    invalid,
    disabled,
    min,
    max,
    isDateDisabled,
    weekStartsOn,
    locale,
    placeholder,
    name,
    rootClassName,
    className,
    onKeyDown,
    onBlur,
    ...rest
  },
  ref,
) {
  const [value, setValue] = useControllableState<Date | null>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });
  const [open, setOpen] = useState(false);
  /** Free-text edit buffer; null = not editing (show the formatted value). */
  const [draft, setDraft] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }),
    [locale],
  );
  const formatted = value ? displayFormatter.format(value) : "";
  const text = draft ?? formatted;
  const resolvedPlaceholder = placeholder ?? localePlaceholder(locale);

  const minDay = min ? startOfDay(min) : undefined;
  const maxDay = max ? startOfDay(max) : undefined;
  const isAccepted = (d: Date) =>
    !(minDay !== undefined && d.getTime() < minDay.getTime()) &&
    !(maxDay !== undefined && d.getTime() > maxDay.getTime()) &&
    !(isDateDisabled?.(d) ?? false);

  /** Commit typed text: "" -> null; valid + in-range -> value; otherwise revert. */
  const commitText = (raw: string) => {
    if (raw.trim() === "") {
      if (value !== null) setValue(null);
      setDraft(null);
      return;
    }
    const parsed = parseDateInput(raw, locale);
    if (parsed && isAccepted(parsed) && !(value && isSameDay(parsed, value))) {
      setValue(parsed);
    }
    setDraft(null);
  };

  const closeAndFocusInput = () => {
    setOpen(false);
    inputRef.current?.focus();
  };

  const { coords, positioned } = useAnchorPosition(rootRef, popupRef, {
    side: "bottom",
    align: "start",
    offset: 4,
    enabled: open,
  });

  // Outside pointerdown closes without stealing focus; Escape is handled on
  // the root (portal events propagate through the React tree) to also refocus.
  useDismiss({
    enabled: open,
    refs: [rootRef, popupRef],
    escape: false,
    onDismiss: () => setOpen(false),
  });

  const handleRootKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      closeAndFocusInput();
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter") {
      e.preventDefault();
      commitText(e.currentTarget.value);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true); // the Calendar autoFocuses its grid on mount
    }
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    commitText(e.currentTarget.value);
  };

  const handleCalendarSelect = (d: Date) => {
    setValue(d);
    setDraft(null);
    closeAndFocusInput();
  };

  return (
    <div ref={rootRef} className={cx(css.root, rootClassName)} onKeyDown={handleRootKeyDown}>
      <div className={css.field({ size, invalid, disabled, open })}>
        <input
          {...rest}
          ref={mergeRefs(inputRef, ref)}
          type="text"
          className={cx(css.control, className)}
          value={text}
          placeholder={resolvedPlaceholder}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
        />
        <button
          type="button"
          className={css.toggle}
          aria-label="Open calendar"
          aria-haspopup="dialog"
          aria-expanded={open}
          tabIndex={0}
          disabled={disabled}
          onClick={() => setOpen(!open)}
        >
          <CalendarIcon />
        </button>
      </div>

      {/* Hidden mirror carrying the ISO value for form submission. */}
      {name != null && (
        <input
          type="hidden"
          name={name}
          value={value ? formatISODate(value) : ""}
          disabled={disabled}
        />
      )}

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popupRef}
            role="dialog"
            aria-label="Choose date"
            data-positioned={positioned}
            className={css.popup}
            style={coords ? { top: coords.top, left: coords.left } : { top: 0, left: 0 }}
          >
            <Calendar
              bordered={false}
              autoFocus
              value={value}
              defaultMonth={value ?? undefined}
              onValueChange={handleCalendarSelect}
              min={min}
              max={max}
              isDateDisabled={isDateDisabled}
              weekStartsOn={weekStartsOn}
              locale={locale}
            />
          </div>,
          document.body,
        )}
    </div>
  );
});
