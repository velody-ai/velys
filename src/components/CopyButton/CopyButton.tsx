import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";
import { copyButton, checkIcon, visuallyHidden } from "./CopyButton.css";
import { CheckIcon, CopyIcon } from "../icons";
import { cx } from "../../utils/cx";

export interface CopyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Text written to the clipboard on click. */
  value: string;
  /** Milliseconds before the copied state resets. @default 2000 */
  timeout?: number;
  /** Button dimensions (matches IconButton sm/md). @default "md" */
  size?: "sm" | "md";
  /** Called after the clipboard write succeeds. */
  onCopied?: (value: string) => void;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton(
  {
    value,
    timeout = 2000,
    size = "md",
    onCopied,
    onClick,
    className,
    type,
    "aria-label": ariaLabel = "Copy",
    ...rest
  },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return; // Clipboard unavailable or write rejected — keep the idle state.
      }
      setCopied(true);
      onCopied?.(value);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeout);
    },
    [onClick, value, onCopied, timeout],
  );

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      aria-label={copied ? "Copied" : ariaLabel}
      className={cx(copyButton({ size }), className)}
      onClick={handleClick}
      {...rest}
    >
      {copied ? <CheckIcon className={checkIcon} /> : <CopyIcon />}
      <span role="status" className={visuallyHidden}>
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
});
