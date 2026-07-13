import { forwardRef, type HTMLAttributes } from "react";
import { stack, type StackVariants } from "./Stack.css";
import { cx } from "../../utils/cx";

export interface StackProps extends HTMLAttributes<HTMLDivElement>, StackVariants {}

/** Flexbox layout primitive that stacks children with token-based gaps. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction, gap, align, justify, wrap, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(stack({ direction, gap, align, justify, wrap }), className)}
      {...rest}
    >
      {children}
    </div>
  );
});
