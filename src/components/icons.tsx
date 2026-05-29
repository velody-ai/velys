import type { SVGProps } from "react";

/** Built-in default icon set (used when the consumer doesn't inject custom icons). currentColor-based. */
const base: SVGProps<SVGSVGElement> = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M3 8.5l3.3 3.3L13 5" />
  </svg>
);

export const ChevronDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M4 6l4 4 4-4" />
  </svg>
);

export const ChevronRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M6 4l4 4-4 4" />
  </svg>
);

export const ChevronLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M10 4l-4 4 4 4" />
  </svg>
);

export const ChevronUpIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M4 10l4-4 4 4" />
  </svg>
);

export const MoreHorizontalIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="3" cy="8" r="0.8" />
    <circle cx="8" cy="8" r="0.8" />
    <circle cx="13" cy="8" r="0.8" />
  </svg>
);

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

export const InfoIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6.6" />
    <path d="M8 7.4v4M8 4.9h.01" />
  </svg>
);

export const SuccessIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6.6" />
    <path d="M5.4 8.2l1.9 1.9 3.3-3.8" />
  </svg>
);

export const WarningIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M8 2.4 14.7 13.6H1.3z" />
    <path d="M8 6.6v3M8 11.6h.01" />
  </svg>
);

export const ErrorIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6.6" />
    <path d="M6 6l4 4M10 6l-4 4" />
  </svg>
);

export const MinusIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M3.5 8h9" />
  </svg>
);
