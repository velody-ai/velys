import {
  addDays,
  addMonths,
  clampDate,
  formatISODate,
  getWeeksForMonth,
  isSameDay,
  isSameMonth,
  parseDateInput,
  startOfDay,
  startOfMonth,
} from "./date";

// All dates in this file are constructed via `new Date(y, m, d)` (local time)
// on purpose — never from strings.

describe("startOfDay", () => {
  it("normalizes to local midnight", () => {
    const d = new Date(2024, 5, 15, 13, 45, 30, 123);
    const result = startOfDay(d);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5);
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("does not mutate the input", () => {
    const d = new Date(2024, 5, 15, 13, 45);
    startOfDay(d);
    expect(d.getHours()).toBe(13);
  });
});

describe("isSameDay / isSameMonth", () => {
  it("compares days ignoring time", () => {
    expect(isSameDay(new Date(2024, 0, 31, 1), new Date(2024, 0, 31, 23))).toBe(true);
    expect(isSameDay(new Date(2024, 0, 31), new Date(2024, 1, 1))).toBe(false);
    // Same day-of-month, different month/year.
    expect(isSameDay(new Date(2024, 0, 15), new Date(2024, 1, 15))).toBe(false);
    expect(isSameDay(new Date(2024, 0, 15), new Date(2023, 0, 15))).toBe(false);
  });

  it("compares months ignoring day and time", () => {
    expect(isSameMonth(new Date(2024, 1, 1), new Date(2024, 1, 29))).toBe(true);
    expect(isSameMonth(new Date(2024, 1, 1), new Date(2024, 2, 1))).toBe(false);
    // Same month index, different year.
    expect(isSameMonth(new Date(2024, 1, 1), new Date(2023, 1, 1))).toBe(false);
  });
});

describe("addDays", () => {
  it("adds within a month", () => {
    expect(isSameDay(addDays(new Date(2024, 5, 10), 5), new Date(2024, 5, 15))).toBe(true);
  });

  it("crosses month and year boundaries", () => {
    expect(isSameDay(addDays(new Date(2024, 0, 31), 1), new Date(2024, 1, 1))).toBe(true);
    expect(isSameDay(addDays(new Date(2024, 11, 31), 1), new Date(2025, 0, 1))).toBe(true);
    expect(isSameDay(addDays(new Date(2024, 2, 1), -1), new Date(2024, 1, 29))).toBe(true); // leap
    expect(isSameDay(addDays(new Date(2023, 2, 1), -1), new Date(2023, 1, 28))).toBe(true);
  });

  it("normalizes to midnight even from a timed date", () => {
    const result = addDays(new Date(2024, 5, 10, 18, 30), 1);
    expect(result.getHours()).toBe(0);
    expect(isSameDay(result, new Date(2024, 5, 11))).toBe(true);
  });
});

describe("addMonths", () => {
  it("adds plain months", () => {
    expect(isSameDay(addMonths(new Date(2024, 3, 15), 1), new Date(2024, 4, 15))).toBe(true);
    expect(isSameDay(addMonths(new Date(2024, 3, 15), -2), new Date(2024, 1, 15))).toBe(true);
  });

  it("clamps to the end of shorter target months", () => {
    // Jan 31 + 1mo = Feb 29 in a leap year, Feb 28 otherwise.
    expect(isSameDay(addMonths(new Date(2024, 0, 31), 1), new Date(2024, 1, 29))).toBe(true);
    expect(isSameDay(addMonths(new Date(2023, 0, 31), 1), new Date(2023, 1, 28))).toBe(true);
    // Mar 31 - 1mo clamps into February too.
    expect(isSameDay(addMonths(new Date(2024, 2, 31), -1), new Date(2024, 1, 29))).toBe(true);
    // May 31 + 1mo = Jun 30.
    expect(isSameDay(addMonths(new Date(2024, 4, 31), 1), new Date(2024, 5, 30))).toBe(true);
  });

  it("crosses year boundaries", () => {
    expect(isSameDay(addMonths(new Date(2024, 10, 30), 3), new Date(2025, 1, 28))).toBe(true);
    expect(isSameDay(addMonths(new Date(2024, 0, 15), -1), new Date(2023, 11, 15))).toBe(true);
  });
});

describe("startOfMonth", () => {
  it("returns the first of the month at midnight", () => {
    const result = startOfMonth(new Date(2024, 6, 20, 10, 0));
    expect(isSameDay(result, new Date(2024, 6, 1))).toBe(true);
    expect(result.getHours()).toBe(0);
  });
});

describe("getWeeksForMonth", () => {
  it("always returns 6 weeks of 7 days", () => {
    for (const month of [new Date(2024, 1, 1), new Date(2024, 5, 1), new Date(2023, 1, 1)]) {
      const weeks = getWeeksForMonth(month, 0);
      expect(weeks).toHaveLength(6);
      for (const week of weeks) expect(week).toHaveLength(7);
    }
  });

  it("pads with outside days and contains the whole month (weekStartsOn 0)", () => {
    // June 2024 starts on a Saturday.
    const weeks = getWeeksForMonth(new Date(2024, 5, 1), 0);
    const flat = weeks.flat();
    expect(isSameDay(flat[0], new Date(2024, 4, 26))).toBe(true); // Sunday May 26
    expect(flat[6].getDay()).toBe(6);
    for (let day = 1; day <= 30; day++) {
      expect(flat.some((d) => isSameDay(d, new Date(2024, 5, day)))).toBe(true);
    }
    // Consecutive days throughout the grid.
    for (let i = 1; i < flat.length; i++) {
      expect(isSameDay(flat[i], addDays(flat[i - 1], 1))).toBe(true);
    }
    // Every cell is at local midnight.
    for (const d of flat) expect(d.getHours()).toBe(0);
  });

  it("respects weekStartsOn 1 (Monday)", () => {
    // June 2024: with Monday start, the grid starts Monday May 27.
    const weeks = getWeeksForMonth(new Date(2024, 5, 15), 1);
    const flat = weeks.flat();
    expect(flat[0].getDay()).toBe(1);
    expect(isSameDay(flat[0], new Date(2024, 4, 27))).toBe(true);
    expect(flat[6].getDay()).toBe(0); // week ends on Sunday
  });

  it("starts the grid a full week early when the 1st falls on the week start", () => {
    // September 2024 starts on a Sunday; with weekStartsOn 0 there is no lead padding.
    const weeks = getWeeksForMonth(new Date(2024, 8, 1), 0);
    expect(isSameDay(weeks[0][0], new Date(2024, 8, 1))).toBe(true);
    // December 2025 has 31 days starting Monday: with weekStartsOn 1, last row is all January.
    const dec = getWeeksForMonth(new Date(2025, 11, 1), 1);
    expect(isSameDay(dec[0][0], new Date(2025, 11, 1))).toBe(true);
    expect(dec[5].every((d) => d.getMonth() === 0 && d.getFullYear() === 2026)).toBe(true);
  });
});

describe("clampDate", () => {
  const min = new Date(2024, 0, 10);
  const max = new Date(2024, 0, 20);

  it("returns the (normalized) date when in range", () => {
    const result = clampDate(new Date(2024, 0, 15, 12, 30), min, max);
    expect(isSameDay(result, new Date(2024, 0, 15))).toBe(true);
    expect(result.getHours()).toBe(0);
  });

  it("clamps below min and above max", () => {
    expect(isSameDay(clampDate(new Date(2024, 0, 1), min, max), min)).toBe(true);
    expect(isSameDay(clampDate(new Date(2024, 1, 5), min, max), max)).toBe(true);
  });

  it("treats bounds as whole days", () => {
    // Same day as min but earlier clock time is not clamped away.
    const result = clampDate(new Date(2024, 0, 10, 0, 0), new Date(2024, 0, 10, 23, 59), max);
    expect(isSameDay(result, new Date(2024, 0, 10))).toBe(true);
  });

  it("works with only one bound or none", () => {
    expect(isSameDay(clampDate(new Date(2024, 0, 1), min), min)).toBe(true);
    expect(isSameDay(clampDate(new Date(2024, 5, 1), undefined, max), max)).toBe(true);
    expect(isSameDay(clampDate(new Date(2024, 5, 1)), new Date(2024, 5, 1))).toBe(true);
  });
});

describe("formatISODate", () => {
  it("formats with zero padding", () => {
    expect(formatISODate(new Date(2024, 0, 5))).toBe("2024-01-05");
    expect(formatISODate(new Date(2024, 11, 31))).toBe("2024-12-31");
    expect(formatISODate(new Date(987, 8, 9))).toBe("0987-09-09");
  });

  it("round-trips through parseDateInput", () => {
    const d = new Date(2024, 1, 29);
    expect(isSameDay(parseDateInput(formatISODate(d))!, d)).toBe(true);
  });
});

describe("parseDateInput — ISO", () => {
  it("parses YYYY-MM-DD as a local date at midnight", () => {
    const result = parseDateInput("2024-06-15");
    expect(result).not.toBeNull();
    expect(result!.getFullYear()).toBe(2024);
    expect(result!.getMonth()).toBe(5);
    expect(result!.getDate()).toBe(15);
    expect(result!.getHours()).toBe(0); // no UTC shift
  });

  it("accepts single-digit month/day and surrounding whitespace", () => {
    expect(isSameDay(parseDateInput("2024-6-5")!, new Date(2024, 5, 5))).toBe(true);
    expect(isSameDay(parseDateInput("  2024-06-15  ")!, new Date(2024, 5, 15))).toBe(true);
  });

  it("accepts Feb 29 only in leap years", () => {
    expect(isSameDay(parseDateInput("2024-02-29")!, new Date(2024, 1, 29))).toBe(true);
    expect(parseDateInput("2023-02-29")).toBeNull();
    expect(isSameDay(parseDateInput("2000-02-29")!, new Date(2000, 1, 29))).toBe(true); // 400-year rule
    expect(parseDateInput("1900-02-29")).toBeNull(); // 100-year rule
  });

  it("rejects impossible dates and malformed input", () => {
    expect(parseDateInput("2024-02-30")).toBeNull();
    expect(parseDateInput("2024-13-01")).toBeNull();
    expect(parseDateInput("2024-00-10")).toBeNull();
    expect(parseDateInput("2024-04-31")).toBeNull();
    expect(parseDateInput("2024-01-00")).toBeNull();
    expect(parseDateInput("24-01-05")).toBeNull(); // 2-digit year
    expect(parseDateInput("")).toBeNull();
    expect(parseDateInput("   ")).toBeNull();
    expect(parseDateInput("hello")).toBeNull();
    expect(parseDateInput("2024-06-15T00:00:00Z")).toBeNull();
  });
});

describe("parseDateInput — en-US locale", () => {
  it("parses M/D/YYYY", () => {
    const result = parseDateInput("12/31/2024", "en-US");
    expect(result).not.toBeNull();
    expect(isSameDay(result!, new Date(2024, 11, 31))).toBe(true);
    expect(isSameDay(parseDateInput("1/5/2024", "en-US")!, new Date(2024, 0, 5))).toBe(true);
    expect(isSameDay(parseDateInput("02/29/2024", "en-US")!, new Date(2024, 1, 29))).toBe(true);
  });

  it("still accepts ISO alongside the locale pattern", () => {
    expect(isSameDay(parseDateInput("2024-06-15", "en-US")!, new Date(2024, 5, 15))).toBe(true);
  });

  it("rejects 2-digit years in locale format", () => {
    expect(parseDateInput("12/31/24", "en-US")).toBeNull();
    expect(parseDateInput("1/2/99", "en-US")).toBeNull();
  });

  it("rejects impossible locale dates and wrong separators", () => {
    expect(parseDateInput("2/30/2024", "en-US")).toBeNull();
    expect(parseDateInput("13/01/2024", "en-US")).toBeNull();
    expect(parseDateInput("12-31-2024", "en-US")).toBeNull(); // en-US uses "/"
    expect(parseDateInput("12/31", "en-US")).toBeNull();
  });
});
