import { forwardRef, type AnchorHTMLAttributes } from "react";
import { link, externalIcon, visuallyHidden, type LinkVariants } from "./Link.css";
import { ExternalLinkIcon } from "../icons";
import { cx } from "../../utils/cx";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    LinkVariants {
  /** Open in a new tab (`target="_blank" rel="noopener noreferrer"`) with a trailing icon */
  external?: boolean;
}

function mergeRel(rel: string | undefined, external: boolean): string | undefined {
  if (!external) return rel;
  const tokens = rel ? rel.split(/\s+/).filter(Boolean) : [];
  for (const required of ["noopener", "noreferrer"]) {
    if (!tokens.includes(required)) tokens.push(required);
  }
  return tokens.join(" ");
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { tone, underline, external = false, target, rel, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(link({ tone, underline }), className)}
      target={external ? "_blank" : target}
      rel={mergeRel(rel, external)}
      {...rest}
    >
      {children}
      {external && (
        <>
          <ExternalLinkIcon className={externalIcon} />
          <span className={visuallyHidden}>(opens in new tab)</span>
        </>
      )}
    </a>
  );
});
