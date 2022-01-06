import { useMemo } from 'react'
import { scaleSequential } from 'd3-scale'
import { colorInterpolators, ColorInterpolatorId } from '../schemes'

export interface SequentialColorScaleConfig {
    type: 'sequential'
    scheme?: ColorInterpolatorId
    minValue?: number
    maxValue?: number
}

export interface SequentialColorScaleValues {
    min: number
    max: number
}

export const sequentialColorScaleDefaults: {
    scheme: ColorInterpolatorId
} = {
    scheme: 'turbo',
}

export const getSequentialColorScale = (
    {
        scheme = sequentialColorScaleDefaults.scheme,
        minValue,
        maxValue,
    }: SequentialColorScaleConfig,
    values: SequentialColorScaleValues
) => {
    const min = minValue !== undefined ? minValue : values.min
    const max = maxValue !== undefined ? maxValue : values.max

    return scaleSequential().domain([min, max]).interpolator(colorInterpolators[scheme])
}

export const useSequentialColorScale = (
    config: SequentialColorScaleConfig,
    values: SequentialColorScaleValues
) => useMemo(() => getSequentialColorScale(config, values), [config, values])
