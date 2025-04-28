import { scaleSymlog } from 'd3-scale'
import { ComputedSerieAxis, ScaleAxis, ScaleSymlog, ScaleSymlogSpec } from './types'

export const createSymlogScale = (
    {
        constant = 1,
        min = 'auto',
        max = 'auto',
        round = true,
        reverse = false,
        nice = true,
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
