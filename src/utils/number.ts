export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function roundToStep(value: number, min: number, step: number) {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}
