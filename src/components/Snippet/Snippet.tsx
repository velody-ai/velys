import { forwardRef, type HTMLAttributes } from "react";
import { snippet, pre, code, line, promptLine, copyAction } from "./Snippet.css";
import { CopyButton } from "../CopyButton";
import { cx } from "../../utils/cx";

export interface SnippetProps extends Omit<HTMLAttributes<HTMLDivElement>, "onCopy"> {
  /** Command text. Pass an array for a multi-line snippet (copied joined with "\n"). */
  text: string | string[];
  /** Show the leading "$ " shell prompt marker (CSS-only, never copied). @default true */
  prompt?: boolean;
  /** Show the copy button at the trailing edge. @default true */
  copyable?: boolean;
  /** Called after the clipboard write succeeds. */
  onCopied?: (value: string) => void;
  /** Text size and padding. @default "md" */
  size?: "sm" | "md";
}

export const Snippet = forwardRef<HTMLDivElement, SnippetProps>(function Snippet(
  { text, prompt = true, copyable = true, onCopied, size = "md", className, ...rest },
  ref,
) {
  const lines = Array.isArray(text) ? text : [text];
  const copyValue = lines.join("\n");

  return (
    <div ref={ref} className={cx(snippet({ size }), className)} {...rest}>
      <pre className={pre}>
        <code className={code}>
          {lines.map((content, i) => (
            <span key={i} className={cx(line, prompt && promptLine)}>
              {content}
            </span>
          ))}
        </code>
      </pre>
      {copyable && (
        <CopyButton
          value={copyValue}
          size="sm"
          onCopied={onCopied}
          className={copyAction({ size })}
        />
      )}
    </div>
  );
});
