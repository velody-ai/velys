import "@testing-library/jest-dom/vitest";

import { afterEach, expect } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { cleanup } from "@testing-library/react";
import { setProjectAnnotations } from "@storybook/react";
import previewAnnotations from "./.storybook/preview";

// Apply the Storybook preview config (theme decorator, parameters) to
// stories reused as tests via `composeStories`.
setProjectAnnotations(previewAnnotations);

expect.extend(axeMatchers);

afterEach(() => {
  cleanup();
});
