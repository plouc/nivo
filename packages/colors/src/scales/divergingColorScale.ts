import { useMemo } from 'react'
import { scaleDiverging } from 'd3-scale'
import { colorInterpolators, ColorInterpolatorId } from '../schemes'

interface DivergingColorScaleBaseConfig {
    type: 'diverging'
    minValue?: number
    maxValue?: number
    divergeAt?: number
}

export interface DivergingColorScaleSchemeConfig extends DivergingColorScaleBaseConfig {
    scheme?: ColorInterpolatorId
}

export interface DivergingColorScaleColorsConfig extends DivergingColorScaleBaseConfig {
    colors: [string, string, string]
}

export interface DivergingColorScaleInterpolatorConfig extends DivergingColorScaleBaseConfig {
    interpolator: (t: number) => string
}

export type DivergingColorScaleConfig =
    | DivergingColorScaleSchemeConfig
    | DivergingColorScaleColorsConfig
    | DivergingColorScaleInterpolatorConfig

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
    config: DivergingColorScaleConfig,
    values: DivergingColorScaleValues
) => {
    const { minValue, maxValue } = config
    const min = minValue !== undefined ? minValue : values.min
    const max = maxValue !== undefined ? maxValue : values.max
    const domain = [min, min + (max - min) / 2, max]

    const divergeAt = config.divergeAt ?? divergingColorScaleDefaults.divergeAt
    const offset = 0.5 - divergeAt

    const colorScale = scaleDiverging<string>().domain(domain).clamp(true)
    let interpolator = (t: number) => String(t) as string
    if ('colors' in config) {
        interpolator = scaleDiverging<string>()
            .domain(domain.map(x => x - offset * (max - min)))
            .range(config.colors)
            .interpolator()
    } else if ('interpolator' in config) {
        interpolator = config.interpolator
    } else {
        const scheme = config.scheme ?? divergingColorScaleDefaults.scheme
        interpolator = colorInterpolators[scheme]
    }
    const offsetInterpolator = (t: number) => interpolator(t + offset)
    return colorScale.interpolator(offsetInterpolator)
}

export const useDivergingColorScale = (
    config: DivergingColorScaleConfig,
    values: DivergingColorScaleValues
) => useMemo(() => getDivergingColorScale(config, values), [config, values])
