import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { avatar, image, glyph, type AvatarVariants } from "./Avatar.css";
import { cx } from "../../utils/cx";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, AvatarVariants {
  /** Image URL */
  src?: string;
  alt?: string;
  /** Initials shown when no image is provided */
  initials?: string;
  /** Icon shown when no image/initials */
  icon?: ReactNode;
}

const FallbackIcon = () => (
  <svg className={glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="9" r="4" />
    <path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7z" />
  </svg>
);

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size, shape, src, alt, initials, icon, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(avatar({ size, shape }), className)} {...rest}>
      {src ? (
        <img className={image} src={src} alt={alt ?? ""} />
      ) : initials ? (
        initials
      ) : (
        icon ?? <FallbackIcon />
      )}
    </span>
  );
});
