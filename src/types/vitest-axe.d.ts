// vitest-axe@0.1.0 augments the legacy `Vi` namespace, which Vitest 2.x no
// longer exposes. Re-declare the matcher against the current `vitest` module.
import "vitest";

interface AxeMatchers {
  toHaveNoViolations(): void;
}

declare module "vitest" {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
