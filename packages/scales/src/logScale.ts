import { scaleLog } from 'd3-scale'
import { ComputedSerieAxis, ScaleAxis, ScaleLog, ScaleLogSpec } from './types'

export const logScaleDefaults: Required<ScaleLogSpec> = {
    type: 'log',
    base: 10,
    min: 'auto',
    max: 'auto',
    round: false,
    reverse: false,
    nice: true,
}

export const createLogScale = (
    {
        base = logScaleDefaults.base,
        min = logScaleDefaults.min,
        max = logScaleDefaults.max,
        round = logScaleDefaults.round,
        reverse = logScaleDefaults.reverse,
        nice = logScaleDefaults.nice,
    }: ScaleLogSpec,
    data: ComputedSerieAxis<number>,
    size: number,
    axis: ScaleAxis
) => {
    const hasZero = data.all.some(v => v === 0)
    if (hasZero) {
        throw new Error(`a log scale domain must not include or cross zero`)
    }

    let sign: number
    let hasMixedSign = false
    data.all
        .filter(v => v != null)
        .forEach(v => {
            if (hasMixedSign) return
            if (sign === undefined) {
                sign = Math.sign(v)
            } else if (Math.sign(v) !== sign) {
                hasMixedSign = true
            }
        })

    if (hasMixedSign) {
        throw new Error(`a log scale domain must be strictly-positive or strictly-negative`)
    }

    let minValue: number
    if (min === 'auto') {
        minValue = data.min
    } else {
        minValue = min
    }

    let maxValue: number
    if (max === 'auto') {
        maxValue = data.max
    } else {
        maxValue = max
    }

    const scale = scaleLog<number, number>().base(base)

    const range = axis === 'x' ? [0, size] : [size, 0]
    if (round === true) scale.rangeRound(range)
    else scale.range(range)

    if (reverse === true) scale.domain([maxValue, minValue])
    else scale.domain([minValue, maxValue])

    if (nice === true) scale.nice()
    // @ts-expect-error not sure why this is not working, it's available for symlog.
    else if (typeof nice === 'number') scale.nice(nice)

    const typedScale = scale as ScaleLog
    typedScale.type = 'log'

    return typedScale
}
