import { scaleSymlog } from 'd3-scale'
import { ComputedSerieAxis, ScaleAxis, ScaleSymLog, ScaleSymLogSpec } from './types'

export const createSymLogScale = (
    { constant = 1, min = 'auto', max = 'auto', reverse = false }: ScaleSymLogSpec,
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

    const typedScale = scale as ScaleSymLog
    typedScale.type = 'symlog'

    return typedScale
}
