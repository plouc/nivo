import { scaleTime, scaleUtc } from 'd3-scale'
import { createDateNormalizer } from './timeHelpers'
import { ComputedSerieAxis, ScaleTimeSpec } from './types'

export const createTimeScale = (
    {
        format = 'native',
        precision = 'millisecond',
        min = 'auto',
        max = 'auto',
        useUTC = true,
        nice = false,
    }: ScaleTimeSpec,
    data: ComputedSerieAxis<string | Date>,
    size: number
) => {
    const normalize = createDateNormalizer({ format, precision, useUTC })

    let minValue: Date
    if (min === 'auto') {
        minValue = normalize(data.min)
    } else if (format !== 'native') {
        minValue = normalize(min)
    } else {
        minValue = min
    }

    let maxValue: Date
    if (max === 'auto') {
        maxValue = normalize(data.max)
    } else if (format !== 'native') {
        maxValue = normalize(max)
    } else {
        maxValue = max
    }

    const scale = useUTC ? scaleUtc() : scaleTime()
    scale.domain([minValue, maxValue]).range([0, size])
    if (nice === true) scale.nice()
    else if (typeof nice === 'object' || typeof nice === 'number') scale.nice(nice)

    scale.type = 'time'
    scale.useUTC = useUTC

    return scale
}
