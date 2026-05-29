import { useState, type ReactNode, type ReactElement } from "react";
import * as css from "./Tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactElement;
  /** Always visible (for docs/stories) */
  open?: boolean;
}

export function Tooltip({ content, side = "top", children, open }: TooltipProps) {
  const [hovered, setHovered] = useState(false);
  const visible = open ?? hovered;
  return (
    <span
      className={css.wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {children}
      {visible && (
        <span role="tooltip" className={css.bubble({ side })}>
          {content}
          <span className={css.arrow({ side })} />
        </span>
      )}
    </span>
  );
}
