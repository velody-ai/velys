import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type LiHTMLAttributes } from "react";
import * as css from "./Breadcrumb.css";
import { ChevronRightIcon } from "../icons";
import { cx } from "../../utils/cx";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {}

/** Navigation landmark for a breadcrumb trail. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, children, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={className} {...rest}>
      {children}
    </nav>
  );
});

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {}
export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, ...rest }, ref) {
    return <ol ref={ref} className={cx(css.list, className)} {...rest} />;
  },
);

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {}
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, ...rest }, ref) {
    return <li ref={ref} className={cx(css.item, className)} {...rest} />;
  },
);

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}
export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ className, ...rest }, ref) {
    return <a ref={ref} className={cx(css.link, className)} {...rest} />;
  },
);

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {}
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, ...rest }, ref) {
    return <span ref={ref} aria-current="page" className={cx(css.page, className)} {...rest} />;
  },
);

export interface BreadcrumbSeparatorProps extends LiHTMLAttributes<HTMLLIElement> {}
export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...rest }, ref) {
    return (
      <li ref={ref} role="presentation" aria-hidden className={cx(css.separator, className)} {...rest}>
        {children ?? <ChevronRightIcon />}
      </li>
    );
  },
);
