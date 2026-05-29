import { globalStyle } from "@vanilla-extract/css";
import { lightThemeClass, darkThemeClass, vars } from "./theme.css";

/** 테마 루트에 적용되는 기본 타이포/배경 baseline */
for (const themeClass of [lightThemeClass, darkThemeClass]) {
  globalStyle(`${themeClass}`, {
    fontFamily: vars.font.family.sans,
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.canvas,
  });
}

globalStyle(`${lightThemeClass} *, ${darkThemeClass} *`, {
  boxSizing: "border-box",
});
