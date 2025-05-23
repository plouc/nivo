export const clamp = (value: number, min: number, max: number): number => {
    if (value < min) return min
    if (value > max) return max
    return value
}

export const getDecimalPlaces = (precision: number) =>
    precision > 0 ? (precision.toString().split('.')[1] || '').length : 0

export const applyPrecision = (value: number, decimalPlaces: number): number =>
    Number(value.toFixed(decimalPlaces))

/**
 * A tiny deterministic PRNG (32-bit). Pass-in any integer seed.
 * Returns a function that yields [0,1] on each call.
 */
export const mulberry32 = (seed = 0): (() => number) => {
    let t = seed >>> 0

    return () => {
        t += 0x6d2b79f5

        let r = Math.imul(t ^ (t >>> 15), 1 | t)
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)

        return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
}

export interface RandomBetweenOptions {
    seed?: (() => number) | number
    precision?: number
}

export const getRandomNumberGenerator = (seed?: (() => number) | number): (() => number) => {
    if (typeof seed === 'number') return mulberry32(seed)
    if (typeof seed === 'function') return seed
    return Math.random
}

/**
 * Produce a uniform random number in [min, max):
 * - `seed` can be an RNG function or a numeric seed
 * - `precision` snaps the result to its nearest multiple
 */
export const randomBetween = (
    min: number,
    max: number,
    { seed, precision = 0 }: RandomBetweenOptions = {}
): number => {
    const random = getRandomNumberGenerator(seed)
    let value = random() * (max - min) + min

    if (precision > 0) {
        const decimalPlaces = getDecimalPlaces(precision)
        const factor = Math.round(value / precision)

        value = applyPrecision(factor * precision, decimalPlaces)
    }

    return value
}

/**
 * Generate `count` increasing fractions in [0..1],
 * jittered by `jitter`, includes endpoints.
 */
export function generateFractions(
    count: number,
    jitter: number,
    seed?: number | (() => number)
): number[] {
    const fractions: number[] = []

    const random = getRandomNumberGenerator(seed)

    const step = 1 / (count - 1)

    let acc = 0
    for (let i = 0; i < count; i++) {
        if (i === 0) {
            fractions.push(0)
        } else if (i === count - 1) {
            fractions.push(1)
        } else {
            const minD = step * (1 - jitter)
            const maxD = step * (1 + jitter)
            let d = randomBetween(minD, maxD, { seed: random })
            const remaining = count - i - 1
            const maxAllowed = 1 - acc - remaining * minD
            const minAllowed = 1 - acc - remaining * maxD
            d = clamp(d, minAllowed, maxAllowed)
            acc += d
            fractions.push(acc)
        }
    }

    return fractions
}
