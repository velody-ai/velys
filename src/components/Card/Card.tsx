import { forwardRef, type HTMLAttributes } from "react";
import { card, cardTitle, cardDescription, type CardVariants } from "./Card.css";
import { cx } from "../../utils/cx";

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardVariants {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, padding, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(card({ variant, padding }), className)} {...rest}>
      {children}
    </div>
  );
});

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...rest }, ref) {
    return <h3 ref={ref} className={cx(cardTitle, className)} {...rest} />;
  },
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return <p ref={ref} className={cx(cardDescription, className)} {...rest} />;
  },
);
