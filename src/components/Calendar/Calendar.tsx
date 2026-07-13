import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import * as css from "./Calendar.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { cx } from "../../utils/cx";
import { useControllableState } from "../../internal/useControllableState";
import {
  addDays,
  addMonths,
  clampDate,
  getWeeksForMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  type WeekStartsOn,
} from "../../internal/date";

export interface CalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled selected date (`null` = no selection). */
  value?: Date | null;
  /** Initial selected date for uncontrolled usage. */
  defaultValue?: Date | null;
  onValueChange?: (date: Date) => void;
  /** Controlled displayed month — any day within the month. */
  month?: Date;
  /** Initial displayed month. Defaults to the selected date, or today. */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable day (inclusive, whole-day). */
  min?: Date;
  /** Latest selectable day (inclusive, whole-day). */
  max?: Date;
  /** Disable arbitrary days (e.g. weekends). */
  isDateDisabled?: (date: Date) => boolean;
  /** First day of the week: 0 = Sunday … 6 = Saturday. Default 0. */
  weekStartsOn?: WeekStartsOn;
  /** BCP 47 locale for captions/labels. Defaults to the runtime locale. */
  locale?: string;
  /** Render previous/next-month days in the grid. Default true. */
  showOutsideDays?: boolean;
  /** Focus the current day cell on mount (used by DatePicker's popup). */
  autoFocus?: boolean;
  /** Standalone chrome (1px border). Default true. */
  bordered?: boolean;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    month: monthProp,
    defaultMonth,
    onMonthChange,
    min,
    max,
    isDateDisabled,
    weekStartsOn = 0,
    locale,
    showOutsideDays = true,
    autoFocus = false,
    bordered = true,
    className,
    ...rest
  },
  ref,
) {
  const [value, setValue] = useControllableState<Date | null>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next) onValueChange?.(next);
    },
  });

  const [displayMonth, setDisplayMonthState] = useControllableState<Date>({
    value: monthProp ? startOfMonth(monthProp) : undefined,
    defaultValue: startOfMonth(defaultMonth ?? valueProp ?? defaultValue ?? new Date()),
    onChange: onMonthChange,
  });
  const setDisplayMonth = (m: Date) => setDisplayMonthState(startOfMonth(m));

  /** Roving-tabindex target. Init: selected date (or today), clamped into range. */
  const [focusedDate, setFocusedDate] = useState<Date>(() =>
    clampDate(valueProp ?? defaultValue ?? new Date(), min, max),
  );
  const didKeyboardNav = useRef(false);
  const gridRef = useRef<HTMLTableElement>(null);

  const minDay = min ? startOfDay(min) : undefined;
  const maxDay = max ? startOfDay(max) : undefined;
  const isDayDisabled = (day: Date) =>
    (minDay !== undefined && day.getTime() < minDay.getTime()) ||
    (maxDay !== undefined && day.getTime() > maxDay.getTime()) ||
    (isDateDisabled?.(day) ?? false);

  const captionFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale],
  );
  const weekdayShortFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short" }),
    [locale],
  );
  const weekdayLongFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "long" }),
    [locale],
  );
  const dayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "full" }),
    [locale],
  );

  const weeks = useMemo(
    () => getWeeksForMonth(displayMonth, weekStartsOn),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayMonth.getTime(), weekStartsOn],
  );
  const caption = captionFormatter.format(displayMonth);
  const today = startOfDay(new Date());

  // Nav buttons disable when the adjacent month is fully outside [min, max].
  const lastDayOfPrevMonth = addDays(displayMonth, -1);
  const firstDayOfNextMonth = addMonths(displayMonth, 1);
  const prevDisabled =
    minDay !== undefined && lastDayOfPrevMonth.getTime() < minDay.getTime();
  const nextDisabled =
    maxDay !== undefined && firstDayOfNextMonth.getTime() > maxDay.getTime();

  // Exactly one rendered day button is tabbable: the focused date when it is
  // visible in the current grid, otherwise the first day of the month.
  const focusedVisible =
    weeks.some((week) => week.some((d) => isSameDay(d, focusedDate))) &&
    (showOutsideDays || isSameMonth(focusedDate, displayMonth));
  const tabbableDate = focusedVisible ? focusedDate : displayMonth;

  // Move DOM focus after keyboard navigation re-renders the grid. The ref
  // guard keeps mount/prop updates from stealing focus.
  useEffect(() => {
    if (!didKeyboardNav.current) return;
    didKeyboardNav.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
  });

  useEffect(() => {
    if (autoFocus) {
      gridRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateMonth = (delta: number) => {
    const nextMonth = addMonths(displayMonth, delta);
    setDisplayMonth(nextMonth);
    if (!isSameMonth(focusedDate, nextMonth)) {
      setFocusedDate(clampDate(addMonths(focusedDate, delta), min, max));
    }
  };

  const selectDay = (day: Date) => {
    if (isDayDisabled(day)) return;
    const next = startOfDay(day);
    setValue(next);
    setFocusedDate(next);
    // Selecting an outside day also navigates to its month.
    if (!isSameMonth(next, displayMonth)) setDisplayMonth(next);
  };

  const handleGridKeyDown = (e: KeyboardEvent<HTMLTableElement>) => {
    const offsetInWeek = (focusedDate.getDay() - weekStartsOn + 7) % 7;
    let next: Date;
    switch (e.key) {
      case "ArrowLeft":
        next = addDays(focusedDate, -1);
        break;
      case "ArrowRight":
        next = addDays(focusedDate, 1);
        break;
      case "ArrowUp":
        next = addDays(focusedDate, -7);
        break;
      case "ArrowDown":
        next = addDays(focusedDate, 7);
        break;
      case "Home":
        next = addDays(focusedDate, -offsetInWeek);
        break;
      case "End":
        next = addDays(focusedDate, 6 - offsetInWeek);
        break;
      case "PageUp":
        next = addMonths(focusedDate, e.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        next = addMonths(focusedDate, e.shiftKey ? 12 : 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectDay(focusedDate);
        return;
      default:
        return;
    }
    e.preventDefault();
    const clamped = clampDate(next, min, max);
    didKeyboardNav.current = true;
    setFocusedDate(clamped);
    if (!isSameMonth(clamped, displayMonth)) setDisplayMonth(clamped);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label={caption}
      className={cx(css.root({ bordered }), className)}
      {...rest}
    >
      <div className={css.header}>
        <button
          type="button"
          className={css.navButton}
          aria-label="Previous month"
          disabled={prevDisabled}
          onClick={() => navigateMonth(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <span className={css.caption} aria-live="polite">
          {caption}
        </span>
        <button
          type="button"
          className={css.navButton}
          aria-label="Next month"
          disabled={nextDisabled}
          onClick={() => navigateMonth(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <table
        ref={gridRef}
        role="grid"
        aria-label={caption}
        className={css.table}
        onKeyDown={handleGridKeyDown}
      >
        <thead>
          <tr>
            {weeks[0].map((day) => (
              <th
                key={day.getDay()}
                role="columnheader"
                scope="col"
                abbr={weekdayLongFormatter.format(day)}
                className={css.weekday}
              >
                {weekdayShortFormatter.format(day)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day) => {
                const outside = !isSameMonth(day, displayMonth);
                if (outside && !showOutsideDays) {
                  return <td key={day.getTime()} role="gridcell" className={css.cell} />;
                }
                const selected = value !== null && isSameDay(day, value);
                const isToday = isSameDay(day, today);
                const dayDisabled = isDayDisabled(day);
                return (
                  <td
                    key={day.getTime()}
                    role="gridcell"
                    aria-selected={selected}
                    className={css.cell}
                  >
                    <button
                      type="button"
                      className={css.dayButton({
                        selected,
                        today: isToday,
                        outside,
                        disabled: dayDisabled,
                      })}
                      tabIndex={isSameDay(day, tabbableDate) ? 0 : -1}
                      disabled={dayDisabled}
                      aria-label={dayFormatter.format(day)}
                      aria-current={isToday ? "date" : undefined}
                      onClick={() => selectDay(day)}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
