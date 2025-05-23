import {
    getDecimalPlaces,
    applyPrecision,
    getRandomNumberGenerator,
    generateFractions,
} from './helpers'

export interface GenerateRangeOptions {
    // Lower bound.
    min?: number
    // Upper bound.
    max?: number
    // Value within [min...max] to exclude if generated (virtual baseline).
    baseline?: number
    // How many values to produce (integer ≥1).
    samples: number
    // 0 = perfectly even; up to 1 = ±100% jitter on interior steps.
    jitter?: number
    // Quantization step (0 = no quantization; must be < (max-min)/(samples-1) if >0).
    precision?: number
    // Optional integer seed for reproducible jitter.
    seed?: (() => number) | number
}

/**
 * Generates `samples` numbers between `min` and `max`,
 * always including both endpoints unless equal to `baseline`,
 * and excluding any point equal to `baseline`.
 * - `jitter` adds randomness to interior positions.
 * - `precision` snaps results to multiples of that step.
 * - `seed` makes jitter reproducible.
 */
export const generateRange = ({
    min = 0,
    max = 100,
    baseline = 0,
    samples,
    jitter = 0.66,
    precision = 0,
    seed,
}: GenerateRangeOptions) => {
    // Validate inputs
    if (!Number.isInteger(samples) || samples < 1) {
        throw new Error(`"samples" must be an integer ≥1; got ${samples}`)
    }
    if (jitter < 0 || jitter > 1) {
        throw new Error(`"jitter" must be between 0 and 1; got ${jitter}`)
    }
    if (precision < 0) {
        throw new Error(`"precision" must be ≥0; got ${precision}`)
    }
    if (baseline !== undefined && (baseline < min || baseline > max)) {
        throw new Error(`"baseline" (${baseline}) must be within [min, max]`)
    }

    const span = max - min
    // Compute fractional baseline
    const baselineFraction = (baseline! - min) / span
    const baselineInterior = baseline! > min && baseline! < max

    // Determine which endpoints to include
    const endpointFracs: number[] = []
    if (baseline !== min) endpointFracs.push(0)
    if (baseline !== max) endpointFracs.push(1)
    const endpointCount = endpointFracs.length

    if (samples < endpointCount) {
        throw new Error(`samples (${samples}) less than available endpoints (${endpointCount})`)
    }

    // Number of interior samples (excluding endpoints and baseline)
    const interiorCount = samples - endpointCount
    // We reserve one extra slot if baseline is an interior to avoid it
    const rawInteriorCount = interiorCount + (baselineInterior ? 1 : 0)

    // RNG and decimal places
    const random = getRandomNumberGenerator(seed)
    const decimalPlaces = getDecimalPlaces(precision)

    // Generate raw fractions including endpoints
    const rawFractions = generateFractions(rawInteriorCount + 2, jitter, random)
    // Extract only interior fractions (drop 0 and 1)
    let interiorFractions = rawFractions.slice(1, -1)

    // If baseline is interior, drop the fraction closest to baseline
    if (baselineInterior) {
        // find index of the fraction closest to baselineFrac
        let closestIdx = 0
        let minDiff = Math.abs(interiorFractions[0] - baselineFraction)
        for (let i = 1; i < interiorFractions.length; i++) {
            const diff = Math.abs(interiorFractions[i] - baselineFraction)
            if (diff < minDiff) {
                minDiff = diff
                closestIdx = i
            }
        }
        interiorFractions.splice(closestIdx, 1)
    }
    // Now interiorFractions.length should equal interiorCount

    // Combine endpoints and interior, then sort
    const combinedFractions = [...endpointFracs, ...interiorFractions].sort((a, b) => a - b)

    // Map to actual values and quantize
    return combinedFractions.map(fraction => {
        let value = min + span * fraction
        if (precision > 0) {
            const factor = Math.round(value / precision)
            value = factor * precision
            value = applyPrecision(value, decimalPlaces)
        }

        return value
    })
}
