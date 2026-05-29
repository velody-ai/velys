import { useEffect } from "react";
import type { Preview, Decorator } from "@storybook/react";
import { lightThemeClass, darkThemeClass, vars } from "../src/theme/theme.css";
import "../src/theme/global.css";

const withTheme: Decorator = (Story, context) => {
  const isDark = context.globals.theme === "dark";
  const themeClass = isDark ? darkThemeClass : lightThemeClass;

  // Apply the theme class to <html> so portal components (e.g. Modal) are themed too
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(themeClass);
    return () => root.classList.remove(themeClass);
  }, [themeClass]);

  return (
    <div
      className={themeClass}
      style={{
        padding: 32,
        minHeight: "100vh",
        background: vars.color.bg.canvas,
        color: vars.color.text.primary,
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "fullscreen",
    options: {
      storySort: { order: ["Foundations", "Components"] },
    },
  },
  globalTypes: {
    theme: {
      description: "Theme mode (Light / Dark)",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
