import { forwardRef, type TextareaHTMLAttributes } from "react";
import { textarea } from "./Textarea.css";
import { cx } from "../../utils/cx";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size = "md", invalid, className, ...rest },
  ref,
) {
  return <textarea ref={ref} className={cx(textarea({ size, invalid }), className)} aria-invalid={invalid} {...rest} />;
});
