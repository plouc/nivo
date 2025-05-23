import { getRandomNumberGenerator, randomBetween } from './helpers'
import { generateRange } from './range'

export interface GenerateBulletSingleOptions {
    id: string
    min?: number
    max?: number
    baseline?: number
    precision?: number
    value?: number
    target?: number
    rangeIds?: string[]
    rangeJitter?: number
}

export interface GenerateBulletDataOptions {
    bullets: GenerateBulletSingleOptions[]
    min?: number
    max?: number
    baseline?: number
    precision?: number
    rangeIds: string[]
    rangeJitter?: number
    seed?: number
}

export const generateBulletData = ({
    bullets,
    min = 0,
    max = 100,
    baseline: globalBaseline = 0,
    precision: globalPrecision = 0,
    rangeIds: globalRangeIds,
    rangeJitter: globalRangeJitter = 0.8,
    seed,
}: GenerateBulletDataOptions) => {
    if (max <= min) {
        throw new Error(`"max" (${max}) should be greater than "min" (${min})`)
    }

    // If we were to use the seed as is to generate subsequent values,
    // we would get the same values for everything.
    const random = getRandomNumberGenerator(seed)

    return bullets.map(bullet => {
        const bulletMin = bullet.min ?? min
        const bulletMax = bullet.max ?? max
        const baseline = bullet.baseline ?? globalBaseline
        const precision = bullet.precision ?? globalPrecision
        const rangeIds = bullet.rangeIds ?? globalRangeIds
        const rangeJitter = bullet.rangeJitter ?? globalRangeJitter

        const value =
            bullet.value ??
            randomBetween(bulletMin, bulletMax, {
                precision,
                seed: random,
            })

        const target =
            bullet.target ??
            randomBetween(bulletMin, bulletMax, {
                precision,
                seed: random,
            })

        const range = generateRange({
            samples: rangeIds.length,
            min: bulletMin,
            max: bulletMax,
            baseline,
            precision,
            jitter: rangeJitter,
            seed: random,
        })

        return {
            id: bullet.id,
            value,
            baseline: bullet.baseline,
            target,
            range: range.map((value, index) => ({
                id: bullet.rangeIds?.[index] ?? rangeIds[index],
                value,
            })),
        }
    })
}
