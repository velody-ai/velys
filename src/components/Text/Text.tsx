import {
  createElement,
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";
import { text, code, kbd, type TextVariants } from "./Text.css";
import { cx } from "../../utils/cx";

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color">, TextVariants {
  /** Element to render. Defaults to "p". */
  as?: ElementType;
}

/**
 * Semantic body/inline text. Maps the Figma `body/*` text styles to code via
 * the `size`/`weight`/`tone` tokens. Render any element through `as`.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as = "p", size, weight, tone, align, truncate, className, ...rest },
  ref,
) {
  return createElement(as, {
    ref,
    className: cx(text({ size, weight, tone, align, truncate }), className),
    ...rest,
  });
});

export interface CodeProps extends HTMLAttributes<HTMLElement> {}

/** Inline monospace code token. */
export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { className, ...rest },
  ref,
) {
  return <code ref={ref as Ref<HTMLElement>} className={cx(code, className)} {...rest} />;
});

export interface KbdProps extends HTMLAttributes<HTMLElement> {}

/** Keyboard key indicator. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd({ className, ...rest }, ref) {
  return <kbd ref={ref as Ref<HTMLElement>} className={cx(kbd, className)} {...rest} />;
});
