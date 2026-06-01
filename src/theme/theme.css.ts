import { createTheme } from "@vanilla-extract/css";

/**
 * Velys 디자인 토큰 — Figma Variables(시맨틱 `Color` Light/Dark, `Spacing`, `Radius`)와 1:1 일치.
 * 컬러 hex 값은 Figma에서 추출한 해석값이며, light/dark 두 모드를 제공한다.
 */

const space = {
  none: "0",
  xxs: "2px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px",
} as const;

const radius = {
  none: "0",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

const font = {
  family: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Geist Mono", "SFMono-Regular", Menlo, Consolas, monospace',
  },
  size: {
    xs: "12px",
    sm: "13px",
    md: "14px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    display: "48px",
  },
  lineHeight: {
    xs: "16px",
    sm: "18px",
    md: "20px",
    lg: "24px",
    xl: "28px",
    "2xl": "32px",
    "3xl": "40px",
    display: "56px",
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

/**
 * 모션 토큰 — light/dark 공통(모드 무관). duration/easing을 한 곳에서 관리해
 * 오버레이(Modal/Drawer/Popover)·디스클로저(Accordion)·상태 전환에서 재사용한다.
 */
const motion = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    base: "150ms",
    slow: "250ms",
    slower: "400ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.3, 0, 0, 1)",
    decelerate: "cubic-bezier(0, 0, 0, 1)",
    accelerate: "cubic-bezier(0.3, 0, 1, 1)",
  },
} as const;

/**
 * 원시 색상 팔레트 — Figma `Primitives` 컬렉션과 1:1. 모드 무관(light/dark 동일).
 * 가능하면 시맨틱 `color.*` 토큰을 쓰고, 마땅한 시맨틱 토큰이 없을 때만 직접 사용한다.
 */
const palette = {
  gray: {
    100: "#fafafa", 200: "#f4f4f5", 300: "#e4e4e7", 400: "#d4d4d8", 500: "#a1a1aa",
    600: "#71717a", 700: "#52525b", 800: "#3f3f46", 900: "#27272a", 1000: "#18181b",
  },
  blue: {
    100: "#e5f1ff", 200: "#cce3ff", 300: "#99c7ff", 400: "#66aaff", 500: "#338eff",
    600: "#0070f3", 700: "#005cc4", 800: "#004695", 900: "#003066", 1000: "#001b3a",
  },
  red: {
    100: "#ffe5e6", 200: "#ffccce", 300: "#ff999d", 400: "#ff666c", 500: "#fa383e",
    600: "#e5484d", 700: "#c4282d", 800: "#951e22", 900: "#661416", 1000: "#3a0b0c",
  },
  amber: {
    100: "#fff6e5", 200: "#ffeccc", 300: "#ffd999", 400: "#ffc666", 500: "#ffb020",
    600: "#f5a623", 700: "#c4831c", 800: "#956115", 900: "#66400e", 1000: "#3a2407",
  },
  green: {
    100: "#e6f9ed", 200: "#ccf3db", 300: "#99e7b7", 400: "#66db93", 500: "#3dd68c",
    600: "#17c964", 700: "#12a150", 800: "#0e7a3c", 900: "#095227", 1000: "#052e16",
  },
  teal: {
    100: "#eefcf9", 200: "#d3f7f0", 300: "#a8efe3", 400: "#6ee3d3", 500: "#2dd4bd",
    600: "#16bca9", 700: "#12a594", 800: "#0d8c7d", 900: "#075e54", 1000: "#04201b",
  },
  white: "#ffffff",
  black: "#000000",
  alpha: {
    100: "rgba(0, 0, 0, 0.04)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.12)",
    400: "rgba(0, 0, 0, 0.30)",
    500: "rgba(0, 0, 0, 0.50)",
  },
} as const;

const shadow = {
  light: {
    sm: "0px 2px 2px #0000000a",
    md: "0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a",
    lg: "0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a",
    xl: "0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f",
    menu: "0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f",
    modal:
      "0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f",
    tooltip: "0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px #0000000a",
    focus: "0 0 0 3px #12a59440",
  },
  dark: {
    sm: "0px 1px 2px #00000029",
    md: "0px 2px 2px #00000052, 0px 8px 8px -8px #00000029",
    lg: "0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a",
    xl: "0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f",
    menu: "0 0 0 1px #ffffff25, 0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f",
    modal:
      "0 0 0 1px #ffffff25, 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f",
    tooltip: "0 0 0 1px #ffffff25, 0px 1px 1px #00000005, 0px 4px 8px #0000000a",
    focus: "0 0 0 3px #12a59452",
  },
} as const;

const lightColor = {
  bg: {
    canvas: "#ffffff",
    default: "#ffffff",
    subtle: "#fafafa",
    muted: "#f4f4f5",
    hover: "#fafafa",
    active: "#f4f4f5",
    inverse: "#18181b",
    overlay: "#0000004d",
    disabled: "#fafafa",
  },
  brand: {
    solid: "#12a594",
    solidHover: "#0d8c7d",
    subtle: "#eefcf9",
    text: "#12a594",
    border: "#12a594",
    onSolid: "#ffffff",
  },
  text: {
    primary: "#18181b",
    secondary: "#71717a",
    tertiary: "#a1a1aa",
    disabled: "#d4d4d8",
    placeholder: "#d4d4d8",
    onBrand: "#ffffff",
    inverse: "#ffffff",
  },
  icon: { default: "#71717a", muted: "#d4d4d8" },
  border: {
    default: "#e4e4e7",
    strong: "#d4d4d8",
    subtle: "#f4f4f5",
    focus: "#12a594",
  },
  success: { solid: "#17c964", subtle: "#e6f9ed", text: "#12a150", border: "#99e7b7" },
  warning: { solid: "#f5a623", subtle: "#fff6e5", text: "#c4831c", border: "#ffd999" },
  danger: {
    solid: "#e5484d",
    solidHover: "#c4282d",
    subtle: "#ffe5e6",
    text: "#c4282d",
    border: "#ff999d",
  },
  info: { solid: "#0070f3", subtle: "#e5f1ff", text: "#005cc4", border: "#99c7ff" },
} as const;

const darkColor = {
  bg: {
    canvas: "#030706",
    default: "#060e0d",
    subtle: "#0e1614",
    muted: "#172220",
    hover: "#111c19",
    active: "#1c2825",
    inverse: "#ffffff",
    overlay: "#00000080",
    disabled: "#0e1614",
  },
  brand: {
    // Dark mode best practice: lighter, less-saturated accent + dark on-color
    // (Material 3 tonal). Avoids the vivid-teal "vibration" on dark surfaces.
    solid: "#61d1c4",
    solidHover: "#7ddccf",
    subtle: "#04201b",
    text: "#0ac7b4",
    border: "#12a594",
    onSolid: "#18181b",
  },
  text: {
    primary: "#fafafa",
    secondary: "#d4d4d8",
    tertiary: "#a1a1aa",
    disabled: "#71717a",
    placeholder: "#71717a",
    onBrand: "#ffffff",
    inverse: "#18181b",
  },
  icon: { default: "#d4d4d8", muted: "#71717a" },
  border: {
    default: "#52525b",
    strong: "#71717a",
    subtle: "#3f3f46",
    focus: "#12a594",
  },
  success: { solid: "#17c964", subtle: "#052e16", text: "#66db93", border: "#0e7a3c" },
  warning: { solid: "#f5a623", subtle: "#3a2407", text: "#ffc666", border: "#956115" },
  danger: {
    solid: "#fa383e",
    solidHover: "#ff666c",
    subtle: "#3a0b0c",
    text: "#ff666c",
    border: "#951e22",
  },
  info: { solid: "#338eff", subtle: "#001b3a", text: "#66aaff", border: "#004695" },
} as const;

export const [lightThemeClass, vars] = createTheme({
  color: lightColor,
  palette,
  space,
  radius,
  font,
  motion,
  shadow: shadow.light,
});

export const darkThemeClass = createTheme(vars, {
  color: darkColor,
  palette,
  space,
  radius,
  font,
  motion,
  shadow: shadow.dark,
});
