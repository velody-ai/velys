# Mission

Build the Velys design system. It proceeds in two phases.

## Phase 1 — Figma Planning

Plan every component listed in `MVP.md` in Figma.

- Bring each to a level of completeness that can be used directly in a real MVP project.
- Each component has sufficient variants (size, state, kind, etc.).
- Bind to design tokens/Variables, and consider both light and dark modes.
- Review what work has been done so far before starting.

## Phase 2 — Component Library Implementation

Implement the components planned in Figma as code.

- Build it as a component library based on **vanilla-extract**.
- Make all components reusable and package them so they **can be installed and used as a library**.
- Create component documentation with **Storybook**.

## Notes

Keep using the existing Colors and Button that were already made.
It would be good to use Semantic Colors as aliases/variables referencing colors already in the existing palette.

## Completion Criteria (Checklist)

### Phase 1 — Figma

- [x] All components in `MVP.md` exist in Figma
- [x] Each component has all the variants needed for use in an MVP project
- [x] Color/typography/spacing bound to design tokens/Variables
- [x] Light/dark mode support
- [x] All `MVP.md` checkboxes filled in

### Phase 2 — Library

- [x] All components implemented based on vanilla-extract
- [x] Design tokens match Figma Variables (including themes/modes)
- [x] Buildable/publishable as an installable npm package
- [x] All components are tree-shakeable and provide types (d.ts)
- [x] All components documented with Storybook (including per-variant/state stories)
- [x] Storybook can be built and deployed
