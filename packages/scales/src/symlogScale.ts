import { scaleSymlog } from 'd3-scale'
import { ComputedSerieAxis, ScaleAxis, ScaleSymlog, ScaleSymlogSpec } from './types'

export const createSymlogScale = (
    { constant = 1, min = 'auto', max = 'auto', reverse = false }: ScaleSymlogSpec,
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

    const scale = scaleSymlog<number, number>()
        .constant(constant)
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .nice()

    if (reverse === true) scale.domain([maxValue, minValue])
    else scale.domain([minValue, maxValue])

    const typedScale = scale as ScaleSymlog
    typedScale.type = 'symlog'

    return typedScale
}
