import { forwardRef, type HTMLAttributes } from "react";
import { separator, type SeparatorVariants } from "./Separator.css";
import { cx } from "../../utils/cx";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement>, SeparatorVariants {
  /** Purely decorative (default). When false, exposes a separator role. */
  decorative?: boolean;
}

/** Visual divider between content. */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", spacing, decorative = true, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cx(separator({ orientation, spacing }), className)}
      {...rest}
    />
  );
});
