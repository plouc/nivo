import { scaleSymlog } from 'd3-scale'
import { ComputedSerieAxis, ScaleAxis, ScaleSymlog, ScaleSymlogSpec } from './types'

export const symlogScaleDefaults: Required<ScaleSymlogSpec> = {
    type: 'symlog',
    constant: 1,
    min: 'auto',
    max: 'auto',
    round: false,
    reverse: false,
    nice: true,
}

export const createSymlogScale = (
    {
        constant = symlogScaleDefaults.constant,
        min = symlogScaleDefaults.min,
        max = symlogScaleDefaults.max,
        round = symlogScaleDefaults.round,
        reverse = symlogScaleDefaults.reverse,
        nice = symlogScaleDefaults.nice,
    }: ScaleSymlogSpec,
    data: ComputedSerieAxis<number>,
    size: number,
    axis: ScaleAxis
) => {
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

    const scale = scaleSymlog<number, number>().constant(constant)

    const range = axis === 'x' ? [0, size] : [size, 0]
    if (round === true) scale.rangeRound(range)
    else scale.range(range)

    if (reverse === true) scale.domain([maxValue, minValue])
    else scale.domain([minValue, maxValue])

    if (nice === true) scale.nice()
    else if (typeof nice === 'number') scale.nice(nice)

    const typedScale = scale as ScaleSymlog
    typedScale.type = 'symlog'

    return typedScale
}
