---
name: new-component
description: Create a new Velys design-system component end-to-end — (1) design it in Figma bound to existing tokens, (2) implement it as a vanilla-extract React component, (3) document it in Storybook. Trigger when the user wants to add a brand-new component to @velody/velys (e.g. "add a Slider component", "make a new Pagination component", "새 컴포넌트 만들자").
---

# New Component (Figma → Code → Storybook)

End-to-end workflow for adding one new component to the Velys design system. Velys is a vanilla-extract React library (`@velody/velys`) whose Figma file is the design source of truth. Read `AGENTS.md`, `docs/tokens.md`, and `design/DESIGN-SPEC.md` before starting — this skill assumes those conventions.

**Golden rule:** every visual value binds to an existing design token. Never hardcode hex/px, and never recreate the token foundations — they already exist in both code (`src/theme/theme.css.ts`, the `vars` object) and Figma (the `Color` / `Spacing` / `Radius` Variable collections).

## Phase 0 — Scope (do first, no writing yet)

Confirm with the user, then write down:
- **Name** (PascalCase, e.g. `Slider`) and whether it is compound (e.g. `Tabs` + `TabList` + `Tab`).
- **Variant axes** (e.g. `size`, `variant`, `tone`) and their values.
- **States** (default/hover/focus/active/disabled/error/checked…).
- **Props** beyond variants (slots, `ReactNode` icons, controlled value/onChange…).
- The closest **existing component to mirror** — read its three files as your template:
  - simple atom → `src/components/Button/` or `src/components/Badge/`
  - form control with native input → `src/components/Checkbox/` (sibling-selector pattern)
  - popover/portal → `src/components/Select/` (hybrid) or `src/components/DropdownMenu/`

## Phase 1 — Figma

Load these skills BEFORE any Figma write: `figma:figma-use` + `figma:figma-generate-library` (+ `vel-utils:figma-ds-patterns`). File key: `tGCZO8dQPK1hwvOHGsjgJS`.

1. **Enumerate ALL pages first** — a single `get_metadata` call returns only the first page, but the file has ~20 pages (one per component). Never conclude something is missing from one call:
   ```js
   // read-only use_figma
   return figma.root.children.map(p => ({ name: p.name, id: p.id, children: p.children.length }));
   ```
2. **Reuse existing tokens.** Fetch the semantic variable id map (collections `Color` `44:3`, `Spacing` `44:4`, `Radius` `44:5`) and bind to them via `setBoundVariableForPaint` (fills/strokes) and `setBoundVariable` (radius/padding/gap). Do NOT create new variables.
3. Create a **dedicated page** named after the component. Build the base component with auto-layout + full token bindings; validate with a screenshot.
4. Add the **variant set** (`combineAsVariants`, then grid-layout — variants stack at 0,0), component **properties** (TEXT/BOOLEAN/INSTANCE_SWAP for icons), and a `— Overview` doc frame to match the other component pages.
5. Mirror the existing components' state axes/naming so the Figma variant names line up with the code recipe variants.
6. Validate: `get_metadata` (structure) + `get_screenshot` (visual). Sequential `use_figma` calls only.

## Phase 2 — Code

Create `src/components/<Name>/` with three files, mirroring the template component.

- **`<Name>.css.ts`** — vanilla-extract. Use `recipe({ variants })` for the variant matrix (same axis names/values as Figma). Bind everything to `vars.*`:
  - colors `vars.color.{bg,text,icon,border,brand,success,warning,danger,info}.*`, spacing `vars.space.*`, radius `vars.radius.*`, type `vars.font.*`, shadow `vars.shadow.*`
  - focus ring: `selectors: { "&:focus-visible": { boxShadow: vars.shadow.focus } }` (+ `borderColor: vars.color.border.focus` for inputs)
  - vanilla-extract selector gotcha: `&` must be the rightmost (target) element. For a child driven by a sibling state use `` [`${input}:checked + ${base} &`] `` — `& [data-x]` descendant selectors fail at build.
- **`<Name>.tsx`** — `forwardRef`, extend the matching DOM attributes (`Omit<…HTMLAttributes, "size">` when redefining `size`), pass native props through, merge `className` onto the root with `cx` (from `../../utils/cx`). Derive variant types from `RecipeVariants<typeof recipe>`. Icons come from props as `ReactNode` (or the built-in set in `../icons`).
- **`index.ts`** — `export { <Name> } from "./<Name>"; export type { <Name>Props } from "./<Name>";`

Then add the component to the public barrel `src/index.ts` (both the value and `export type` lines).

## Phase 3 — Storybook

Create `src/components/<Name>/<Name>.stories.tsx` (`title: "Components/<Name>"`). Provide a `Playground` plus one story per meaningful axis/state (sizes, variants, states, disabled/error). Use the existing stories as the format reference. Light/Dark is handled globally by the toolbar theme toggle — no per-story theming needed.

## Phase 4 — Tests

Create `src/components/<Name>/<Name>.test.tsx`, mirroring `src/components/Button/Button.test.tsx` (the canonical template). The suite runs on **Vitest (jsdom) + React Testing Library + vitest-axe** — see the `## Testing` section in `CLAUDE.md` for the full conventions. Three sections:

1. **RTL direct tests** — the component's real behavior: rendering, ARIA roles/attributes, event handlers, controlled/uncontrolled state, disabled/invalid states, keyboard/portal interactions. Test the actual API you just built — don't guess.
2. **Story smoke tests** — `composeStories(stories)` from `@storybook/react` renders every named story export without throwing (assert the container is not empty). This reuses the Phase 3 stories as fixtures.
3. **a11y** — `axe(container)` on one representative (visible) story with `expect(...).toHaveNoViolations()`. Make sure that story has accessible labels (e.g. an icon-only control needs `aria-label`).

Conventions: Vitest globals are on (`describe/it/expect/vi` — no import); import only `render`/`screen` (`@testing-library/react`), `userEvent`, `axe` (`vitest-axe`), `composeStories` (`@storybook/react`), the component, and `* as stories`. Run `npm test` and fix until all pass — never leave a failing or skipped test.

## Phase 5 — Docs & validation

1. `docs/components/<Name>.md` — **English** (all docs must be English). Match the existing component docs: short intro, `import { <Name> } from "@velody/velys";`, a Props table (Prop | Type | Default | Description), and an Examples code block.
2. Add a `### B<N>. <Name>` entry to `design/DESIGN-SPEC.md` (Part B) — variant axes, properties, and token bindings, matching the existing entries — and bump the component count in the Part B heading.
3. Add the component to `llms.txt` (one-line entry in the component list) and to the inlined reference `llms-full.txt`.
4. **Validate:** `npm test`, `npm run typecheck`, then `npm run build` (tsup — this is what surfaces vanilla-extract `.css.ts` errors; `tsc` alone does not compile them).
5. Optional: refresh the docs site — `npm run build-storybook && npx wrangler pages deploy storybook-static --project-name velys-storybook --branch main --commit-dirty=true`.

## Checklist before calling it done

- [ ] Figma: dedicated page, variant set, properties, token-bound (no hardcoded values), screenshot looks right
- [ ] Code: `<Name>.tsx` / `<Name>.css.ts` / `index.ts`, exported from `src/index.ts`, all visuals bound to `vars`
- [ ] Stories cover variants + states
- [ ] `<Name>.test.tsx` added (RTL + story smoke + axe), all tests pass
- [ ] `docs/components/<Name>.md` (English) + `design/DESIGN-SPEC.md` (Part B entry) + `llms.txt` + `llms-full.txt`
- [ ] `npm test`, `npm run typecheck`, and `npm run build` all pass
