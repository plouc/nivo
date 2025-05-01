import { useMemo } from 'react'
import { scaleSequential } from 'd3-scale'
import { colorInterpolators, ColorInterpolatorId } from '../schemes'

export interface SequentialColorScaleBaseConfig {
    type: 'sequential'
    minValue?: number
    maxValue?: number
}

export interface SequentialColorScaleSchemeConfig extends SequentialColorScaleBaseConfig {
    scheme?: ColorInterpolatorId
}

export interface SequentialColorScaleColorsConfig extends SequentialColorScaleBaseConfig {
    colors: [string, string]
}

export interface SequentialColorScaleInterpolatorConfig extends SequentialColorScaleBaseConfig {
    interpolator: (t: number) => string
}

export type SequentialColorScaleConfig =
    | SequentialColorScaleSchemeConfig
    | SequentialColorScaleColorsConfig
    | SequentialColorScaleInterpolatorConfig

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
    config: SequentialColorScaleConfig,
    values: SequentialColorScaleValues
) => {
    const { minValue, maxValue } = config
    const min = minValue !== undefined ? minValue : values.min
    const max = maxValue !== undefined ? maxValue : values.max

    const colorScale = scaleSequential<string>().domain([min, max]).clamp(true)
    if ('colors' in config) {
        colorScale.range(config.colors)
    } else if ('interpolator' in config) {
        colorScale.interpolator(config.interpolator)
    } else {
        const scheme = config.scheme ?? sequentialColorScaleDefaults.scheme
        colorScale.interpolator(colorInterpolators[scheme])
    }

    return colorScale
}

export const useSequentialColorScale = (
    config: SequentialColorScaleConfig,
    values: SequentialColorScaleValues
) => useMemo(() => getSequentialColorScale(config, values), [config, values])
