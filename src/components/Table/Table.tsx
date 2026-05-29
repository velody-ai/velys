import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import * as css from "./Table.css";
import { cx } from "../../utils/cx";

type Size = "sm" | "md";
const SizeContext = createContext<Size>("md");

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  size?: Size;
}

/** Data table. Wrap in a horizontally scrollable container. */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { size = "md", className, children, ...rest },
  ref,
) {
  return (
    <SizeContext.Provider value={size}>
      <div className={css.wrapper}>
        <table ref={ref} className={cx(css.table({ size }), className)} {...rest}>
          {children}
        </table>
      </div>
    </SizeContext.Provider>
  );
});

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader(props, ref) {
    return <thead ref={ref} {...props} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody(props, ref) {
    return <tbody ref={ref} {...props} />;
  },
);

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableFooter(props, ref) {
    return <tfoot ref={ref} {...props} />;
  },
);

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  interactive?: boolean;
  striped?: boolean;
}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { interactive, striped, className, ...rest },
  ref,
) {
  return (
    <tr
      ref={ref}
      className={cx(css.row({ interactive: interactive || undefined, striped: striped || undefined }), className)}
      {...rest}
    />
  );
});

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, ...rest },
  ref,
) {
  const size = useContext(SizeContext);
  return <th ref={ref} scope="col" className={cx(css.head({ size }), className)} {...rest} />;
});

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...rest },
  ref,
) {
  const size = useContext(SizeContext);
  return <td ref={ref} className={cx(css.cell({ size }), className)} {...rest} />;
});

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...rest }, ref) {
    return <caption ref={ref} className={cx(css.caption, className)} {...rest} />;
  },
);
