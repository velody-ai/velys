---
name: edit-component
description: Modify an existing Velys design-system component end-to-end — keep Figma, the vanilla-extract code, and Storybook docs in lockstep. Use when changing an already-shipped component in @velody/velys (add/rename/remove a variant or prop, retune token bindings, add a state, fix layout). Trigger on "edit the Button", "add a size to Badge", "rename the tone prop", "컴포넌트 수정", "variant 추가/이름 변경".
---

# Edit Component (Figma ↔ Code ↔ Storybook, in lockstep)

End-to-end workflow for **changing one existing** component in the Velys design system. Velys is a vanilla-extract React library (`@velody/velys`) whose Figma file is the design source of truth. This skill follows the **same rules as `new-component`** — read `AGENTS.md`, `docs/tokens.md`, and `design/DESIGN-SPEC.md` first; this skill assumes those conventions.

**Golden rule (unchanged):** every visual value binds to an existing design token. Never hardcode hex/px, never recreate token foundations (they live in `src/theme/theme.css.ts` `vars` and the Figma `Color` / `Spacing` / `Radius` Variable collections).

**Edit rule:** Figma and code define the *same* variant axes/values. Any change to one MUST be mirrored in the other in the same pass — they must never drift. Treat the change as a diff applied consistently across all five surfaces: Figma set, code recipe, stories, docs, and the design spec.

## Phase 0 — Scope the change (do first, no writing yet)

Confirm with the user, then write down:
- **Target component** (PascalCase) and whether it is compound (e.g. `Tabs`).
- **Exact diff**: which axis/value/prop/state/token binding is being **added / renamed / removed / retuned**.
- **Breaking?** Renaming or removing a variant value or prop, or changing a default, is **breaking**; adding an optional variant/prop is additive. Decide the semver bump now (pre-1.0: breaking → minor `0.x`, additive/fix → patch `0.0.x`).
- Read the component's current state as your baseline — all three code files plus its Figma page and `docs/components/<Name>.md`:
  - `src/components/<Name>/<Name>.css.ts`, `<Name>.tsx`, `index.ts`
  - mirror the patterns already used there (don't introduce a new style for an existing component).

## Phase 1 — Figma (edit in place)

Load BEFORE any Figma write: `figma:figma-use` + `figma:figma-generate-library` (+ `vel-utils:figma-ds-patterns`). File key: `tGCZO8dQPK1hwvOHGsjgJS`.

1. **Find the component's existing page and set** — enumerate pages first (one `get_metadata` call only returns the first page; the file has ~20 pages). Then on that page:
   ```js
   const set = page.findAllWithCriteria({ types: ['COMPONENT_SET'] })[0];
   return { name: set.name, props: set.variantGroupProperties };
   ```
   Do **not** create a new page or a duplicate set — edit the existing one.
2. **Reuse existing tokens** (collections `Color` `44:3`, `Spacing` `44:4`, `Radius` `44:5`); bind via `setBoundVariableForPaint` / `setBoundVariable`. Never create new variables for an edit.
3. Apply the diff:
   - **Add a variant value** → create the new COMPONENT(s) for every combination of the other axes, name them `Axis=Val, …` exactly matching the existing scheme, then `combineAsVariants` back into (or append to) the set. Re-bind all tokens on the new variants.
   - **Rename a variant value/property** → update each child component's name and `variantProperties`; this updates instances automatically. Keep names in sync with the code recipe.
   - **Remove a variant** → delete those component children (warn: detaches/orphans existing instances).
   - **Retune a token binding / state** → rebind fills/strokes/effects on the affected variants only.
4. **Resize gotcha:** setting sizing modes then calling `resize()` resets them to FIXED. For hug frames, set `primaryAxisSizingMode='AUTO'` *after* `resize()` (or use `figma.createAutoLayout()`).
5. **Keep the `— Overview` doc frame in sync** — if you added/renamed variants, rebuild that page's grouped Overview gallery (label per primary axis value, instances wrapped) so it still reflects the set.
6. Validate: `get_metadata` (structure/variant names) + `get_screenshot` (visual, both light and a Dark-mode preview). Sequential `use_figma` calls only.

## Phase 2 — Code (mirror the Figma diff)

Edit the existing files — keep the API stable unless the change is intentionally breaking.

- **`<Name>.css.ts`** — update `recipe({ variants })` so axis names/values match Figma exactly. Add/adjust `compoundVariants` for new combinations. Keep every value bound to `vars.*` (colors, `vars.space.*`, `vars.radius.*`, `vars.font.*`, `vars.shadow.*`). Focus ring stays `vars.shadow.focus`.
  - vanilla-extract selector gotcha: `&` must be the rightmost (target). Sibling-driven child state uses `` [`${input}:checked + ${base} &`] ``; `& [data-x]` descendant selectors fail at build.
- **`<Name>.tsx`** — update props/destructuring to match. Preserve `forwardRef`, native prop pass-through, and `cx`-merged `className`. Variant types flow from `RecipeVariants<typeof recipe>`, so renaming a recipe variant renames the prop — update call sites accordingly.
- If props/exports changed, update `src/index.ts` and the component's `index.ts`.

## Phase 3 — Update every usage & story

A variant/prop rename breaks call sites. **Grep the repo and fix them:**
```bash
grep -rn '<Name>' src/components/*/*.stories.tsx   # other components that compose this one
```
- Update `src/components/<Name>/<Name>.stories.tsx` to cover the new/changed axis or state (and remove stories for deleted variants).
- Fix any other component's stories that use the old API (e.g. a renamed prop), as well as composed usages.
- **Update `src/components/<Name>/<Name>.test.tsx`** (Vitest + RTL + vitest-axe — see the `## Testing` section in `CLAUDE.md`; template is `src/components/Button/Button.test.tsx`):
  - A renamed/removed prop or variant breaks the RTL assertions and the `composeStories` block — update them to the new API and drop tests for removed behavior.
  - Add RTL coverage for any new state/behavior; keep the axe check on a representative visible story.
  - If this component is composed by another component's tests, grep `src/components/*/*.test.tsx` for the old API and fix those too.

## Phase 4 — Docs, version & validation

1. **`docs/components/<Name>.md`** (English) — update the Props table, variant options, defaults, and examples to match.
2. **`design/DESIGN-SPEC.md`** — update that component's `B<N>.` entry (axes / properties / bindings).
3. **`llms.txt`** and **`llms-full.txt`** — update the one-line entry / inlined reference if the summary changed.
4. **Version bump** — apply the semver decided in Phase 0 (`npm version patch|minor` updates `package.json`; the `postversion` hook pushes tags). Note breaking changes clearly.
5. **Validate:** `npm test`, `npm run typecheck`, then `npm run build` (tsup — this is what surfaces vanilla-extract `.css.ts` errors; `tsc` alone does not compile them).
6. Optional: redeploy docs — `npm run build-storybook && npx wrangler pages deploy storybook-static --project-name velys-storybook --branch main --commit-dirty=true`.

## Checklist before calling it done

- [ ] Figma set edited in place: variant names/bindings match the intended diff, tokens bound (no hardcoded values), Overview frame refreshed, light + dark screenshots look right
- [ ] Code recipe + component updated; axis names/values identical to Figma; all visuals bound to `vars`
- [ ] Figma and code did NOT drift — same axes, same values, same defaults
- [ ] All call sites & stories updated (grep done); deleted variants' stories removed
- [ ] `<Name>.test.tsx` updated to the new API (and any composing components' tests); all tests pass
- [ ] `docs/components/<Name>.md` + `design/DESIGN-SPEC.md` + `llms.txt` + `llms-full.txt` updated (English)
- [ ] Semver bump applied if the public API changed
- [ ] `npm test`, `npm run typecheck`, and `npm run build` all pass
