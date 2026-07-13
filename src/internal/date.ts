/**
 * Zero-dependency date helpers for Calendar/DatePicker. Every function
 * operates on LOCAL time, normalized to local midnight — never construct
 * dates from "YYYY-MM-DD" strings (`new Date("YYYY-MM-DD")` parses as UTC and
 * shifts the day in negative-offset timezones); always use `new Date(y, m, d)`.
 */

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Copy of `date` at local midnight. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Add `amount` days (may be negative). Result is at local midnight. */
export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

/**
 * Add `amount` months (may be negative), clamping to the end of the target
 * month — e.g. Jan 31 + 1mo = Feb 28 (Feb 29 in leap years).
 */
export function addMonths(date: Date, amount: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const daysInTarget = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), daysInTarget));
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Calendar grid for the month containing `month`: always 6 rows x 7 days,
 * padded with outside (previous/next month) days so the grid height is stable.
 */
export function getWeeksForMonth(month: Date, weekStartsOn: WeekStartsOn = 0): Date[][] {
  const first = startOfMonth(month);
  const lead = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -lead);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) week.push(addDays(gridStart, w * 7 + d));
    weeks.push(week);
  }
  return weeks;
}

/** Clamp `date` into [min, max] (whole-day comparison). Result is at local midnight. */
export function clampDate(date: Date, min?: Date, max?: Date): Date {
  const day = startOfDay(date);
  if (min) {
    const lower = startOfDay(min);
    if (day.getTime() < lower.getTime()) return lower;
  }
  if (max) {
    const upper = startOfDay(max);
    if (day.getTime() > upper.getTime()) return upper;
  }
  return day;
}

/** Local-date ISO string, "YYYY-MM-DD" (no UTC conversion). */
export function formatISODate(date: Date): string {
  const y = String(date.getFullYear()).padStart(4, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** null unless (year, month, day) is a real calendar date (rejects Feb 30 etc.). */
function buildValidDate(year: number, month: number, day: number): Date | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(year, month - 1, day);
  // Round-trip check rejects overflowed dates (Feb 30 -> Mar 2) and, since
  // `new Date(99, ...)` maps to 1999, also years below 100.
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

type DateField = "year" | "month" | "day";

interface LocalePattern {
  order: DateField[];
  regex: RegExp;
}

// The numeric pattern of a locale (field order + literal separators) is
// learned once per locale via Intl and cached.
const localePatternCache = new Map<string, LocalePattern | null>();

function getLocalePattern(locale?: string): LocalePattern | null {
  const key = locale ?? "";
  const cached = localePatternCache.get(key);
  if (cached !== undefined) return cached;

  let pattern: LocalePattern | null = null;
  try {
    const parts = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date(2000, 10, 22));

    const order: DateField[] = [];
    let source = "^\\s*";
    let supported = true;
    for (const part of parts) {
      if (part.type === "year" || part.type === "month" || part.type === "day") {
        order.push(part.type);
        source += "(\\d{1,4})";
      } else if (part.type === "literal") {
        const escaped =
          part.value.trim() === ""
            ? "\\s+"
            : part.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s*");
        // Literals after the last field (e.g. the trailing "." in hu-HU) are optional.
        source += order.length === 3 ? `(?:${escaped})?` : escaped;
      } else {
        supported = false; // era, etc. — bail out, ISO input still works.
        break;
      }
    }
    if (supported && order.length === 3) {
      pattern = { order, regex: new RegExp(`${source}\\s*$`) };
    }
  } catch {
    pattern = null;
  }
  localePatternCache.set(key, pattern);
  return pattern;
}

/**
 * Parse user-typed date text. Always accepts ISO "YYYY-MM-DD" (parsed
 * manually — never via `new Date(string)`, which would apply the UTC shift),
 * plus the locale's numeric pattern (e.g. "12/31/2024" for en-US). Rejects
 * 2-digit years and impossible dates. Returns a Date at local midnight, or null.
 */
export function parseDateInput(text: string, locale?: string): Date | null {
  const trimmed = text.trim();
  if (trimmed === "") return null;

  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
  if (iso) return buildValidDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));

  const pattern = getLocalePattern(locale);
  if (!pattern) return null;
  const match = pattern.regex.exec(trimmed);
  if (!match) return null;

  const fields: Record<DateField, string> = { year: "", month: "", day: "" };
  pattern.order.forEach((field, index) => {
    fields[field] = match[index + 1];
  });
  if (fields.year.length < 4) return null; // reject 2-digit (and 3-digit) years
  return buildValidDate(Number(fields.year), Number(fields.month), Number(fields.day));
}
