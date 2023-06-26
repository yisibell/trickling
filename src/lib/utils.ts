export function clamp(n: number, min: number, max: number) {
  if (n < min) return min
  if (n > max) return max
  return n
}

/**
 * (Internal) converts a percentage (`0..1`) to a bar translateX
 * percentage (`-100%..0%`).
 */
export function toBarPerc(n: number, rtl?: boolean) {
  const percentage = rtl ? (1 - n) * 100 : (-1 + n) * 100

  return percentage.toFixed(4)
}
