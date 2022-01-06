import { useMemo } from 'react'
import { scaleDiverging } from 'd3-scale'
import { colorInterpolators, ColorInterpolatorId } from '../schemes'

export interface DivergingColorScaleConfig {
    type: 'diverging'
    scheme?: ColorInterpolatorId
    minValue?: number
    maxValue?: number
    divergeAt?: number
}

export interface DivergingColorScaleValues {
    min: number
    max: number
}

export const divergingColorScaleDefaults: {
    scheme: ColorInterpolatorId
    divergeAt: number
} = {
    scheme: 'red_yellow_blue',
    divergeAt: 0.5,
}

export const getDivergingColorScale = (
    {
        scheme = divergingColorScaleDefaults.scheme,
        divergeAt = divergingColorScaleDefaults.divergeAt,
        minValue,
        maxValue,
    }: DivergingColorScaleConfig,
    values: DivergingColorScaleValues
) => {
    const min = minValue !== undefined ? minValue : values.min
    const max = maxValue !== undefined ? maxValue : values.max
    const domain = [min, min + (max - min) / 2, max]

    const interpolator = colorInterpolators[scheme]
    const offset = 0.5 - divergeAt
    const offsetInterpolator = (t: number) => interpolator(t + offset)

    return scaleDiverging(offsetInterpolator).domain(domain).clamp(true)
}

export const useDivergingColorScale = (
    config: DivergingColorScaleConfig,
    values: DivergingColorScaleValues
) => useMemo(() => getDivergingColorScale(config, values), [config, values])
