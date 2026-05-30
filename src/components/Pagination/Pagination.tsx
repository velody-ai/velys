import { forwardRef, type HTMLAttributes } from "react";
import * as css from "./Pagination.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { cx } from "../../utils/cx";

type PageEntry = number | "start-ellipsis" | "end-ellipsis";

export function getPaginationRange(
  page: number,
  count: number,
  siblingCount = 1,
  boundaryCount = 1,
): PageEntry[] {
  const range = (start: number, end: number) =>
    Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  const result: PageEntry[] = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (["start-ellipsis"] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? (["end-ellipsis"] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];
  return result;
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  count: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showPrevNext?: boolean;
  size?: "sm" | "md";
}

/** Page navigation with truncated page ranges. */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    count,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    showPrevNext = true,
    size,
    className,
    ...rest
  },
  ref,
) {
  const entries = getPaginationRange(page, count, siblingCount, boundaryCount);
  const go = (p: number) => {
    if (p >= 1 && p <= count && p !== page) onPageChange?.(p);
  };

  return (
    <nav ref={ref} aria-label="Pagination" className={className} {...rest}>
      <ul className={css.list}>
        {showPrevNext && (
          <li>
            <button
              type="button"
              className={css.item({ size })}
              aria-label="Previous page"
              aria-disabled={page <= 1 || undefined}
              onClick={() => go(page - 1)}
            >
              <ChevronLeftIcon />
            </button>
          </li>
        )}
        {entries.map((entry, i) =>
          typeof entry === "number" ? (
            <li key={entry}>
              <button
                type="button"
                className={css.item({ size })}
                aria-current={entry === page ? "page" : undefined}
                aria-label={`Page ${entry}`}
                onClick={() => go(entry)}
              >
                {entry}
              </button>
            </li>
          ) : (
            <li key={`${entry}-${i}`} className={css.ellipsis} aria-hidden>
              …
            </li>
          ),
        )}
        {showPrevNext && (
          <li>
            <button
              type="button"
              className={cx(css.item({ size }))}
              aria-label="Next page"
              aria-disabled={page >= count || undefined}
              onClick={() => go(page + 1)}
            >
              <ChevronRightIcon />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
});
