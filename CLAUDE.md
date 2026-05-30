# Velys Design System

This is the Velys design system — a **vanilla-extract** React component library (`@velody/velys`) documented with **Storybook**, with its design source of truth in Figma.

The project is built and published. Design work happens in Figma first, then is implemented as code and documented in Storybook — use the `new-component` skill for that end-to-end flow.

## Source of Truth

- **Figma file (design original):** https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys
  - The single source of truth for design tokens (color/typography/spacing), Variables, and component sets.
  - Design work is read from / written to Figma via the Figma MCP (see the workflow below).
- **Reference design system:** Vercel [Geist](https://vercel.com/geist) — the reference standard for color scale structure, light/dark modes, and component naming.
  - Geist page snapshots are kept in `.playwright-mcp/`.

## Components

The component inventory is the code itself (`src/components/`, exported from `src/index.ts`) plus the docs (`docs/components/`, `llms.txt`). The Figma spec for tokens and components lives in `design/DESIGN-SPEC.md`. To add a component, use the `new-component` skill.

## Figma Workflow

When reading, modifying, or creating Figma designs, you **must load the following skills first**, together with the Figma MCP:

- Before calling `use_figma` (write / JS execution) → `figma:figma-use` skill
- Building/modifying the design system (tokens, Variables, component sets) → `figma:figma-generate-library`
- Frequently used recipes and mistake-avoidance for working on color palettes/tokens/component sets → `vel-utils:figma-ds-patterns`
- Mapping designs to code (Code Connect) → `figma:figma-code-connect`

Principles:
- Use design tokens/Variables instead of hardcoded values.
- Consider both light and dark modes together (following the Geist structure).
- Build components to production quality, with variant sets, states (hover/disabled, etc.), and token bindings.

## Library Stack (Stage 2)

- **Styling:** vanilla-extract (zero-runtime CSS-in-TS). Match design tokens to Figma Variables, and express themes/modes as vanilla-extract themes.
- **Documentation:** Storybook. Write stories per variant and state for each component.
- **Distribution form:** Build it to be installable as an npm package (tree-shakeable, with `.d.ts` types provided).

## Testing

Components are tested with **Vitest (jsdom) + React Testing Library**, reusing Storybook stories as fixtures and checking accessibility with **vitest-axe** (axe-core).

- **Run:** `npm test` (single run) · `npm run test:watch` (watch). Config: `vitest.config.ts` (jsdom + the React and vanilla-extract Vite plugins so `.css.ts` resolves); global setup: `vitest.setup.ts`.
- **Location:** one `src/components/{Name}/{Name}.test.tsx` per component, colocated with the source.
- **Each test file has three sections** (see `src/components/Button/Button.test.tsx` as the canonical template):
  1. **RTL direct tests** — real behavior of the component's actual API: rendering, ARIA roles/attributes, event handlers, controlled/uncontrolled state, disabled/invalid states, keyboard/portal interactions. Read the source; don't guess props.
  2. **Story smoke tests** — `composeStories(stories)` from `@storybook/react` renders every named story export without throwing. Stories double as test fixtures, so they don't need rewriting.
  3. **a11y** — `axe(container)` on one representative (visible) story with `expect(...).toHaveNoViolations()`.
- **Conventions:**
  - Vitest globals are on (`describe/it/expect/vi` — no import). Import only `render`/`screen` (`@testing-library/react`), `userEvent` (`@testing-library/user-event`), `axe` (`vitest-axe`), `composeStories` (`@storybook/react`), plus the component and `* as stories`.
  - `vitest.setup.ts` calls `setProjectAnnotations(preview)`, so the theme decorator from `.storybook/preview.tsx` applies to composed stories automatically.
  - The `vitest-axe` matcher type is re-declared for Vitest 2.x in `src/types/vitest-axe.d.ts`.
- **Known noise:** axe's color-contrast probe logs a harmless `HTMLCanvasElement.getContext` warning under jsdom (no canvas) and that rule is skipped — pixel/contrast checks belong to visual-regression testing, which is not set up yet. When adding a component (`new-component` skill) or editing one (`edit-component` skill), add/update its `.test.tsx` alongside the code and stories.

## Status

- Published to npm as `@velody/velys`. Releases are automated via GitHub Actions on `vX.Y.Z` tags (`npm version patch|minor|major` on `main` → tag push → CI publishes via npm Trusted Publishing/OIDC, with provenance).
- Storybook is deployed to Cloudflare Pages (`velys-storybook`).
