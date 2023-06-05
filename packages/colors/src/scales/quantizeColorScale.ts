import { useMemo } from 'react'
import { scaleQuantize } from 'd3-scale'
import { colorInterpolators, ColorInterpolatorId } from '../schemes'

// colors from a scheme
export interface QuantizeColorScaleSchemeConfig {
    type: 'quantize'
    domain?: [number, number]
    scheme?: ColorInterpolatorId
    steps?: number
}

// explicit colors
export interface QuantizeColorScaleColorsConfig {
    type: 'quantize'
    domain?: [number, number]
    colors: string[]
}

export type QuantizeColorScaleConfig =
    | QuantizeColorScaleSchemeConfig
    | QuantizeColorScaleColorsConfig

export interface QuantizeColorScaleValues {
    min: number
    max: number
}

export const quantizeColorScaleDefaults: {
    scheme: ColorInterpolatorId
    steps: NonNullable<QuantizeColorScaleSchemeConfig['steps']>
} = {
    scheme: 'turbo',
    steps: 7,
}

export const getQuantizeColorScale = (
    config: QuantizeColorScaleConfig,
    values: QuantizeColorScaleValues
) => {
    const colorScale = scaleQuantize<string>()
        .domain(config.domain || [values.min, values.max])
        .nice()

    if ('colors' in config) {
        colorScale.range(config.colors)
    } else {
        const scheme = config.scheme || quantizeColorScaleDefaults.scheme
        const steps = config.steps === undefined ? quantizeColorScaleDefaults.steps : config.steps
        const interpolator = colorInterpolators[scheme]
        const colors = Array.from({ length: steps }).map((_, step) =>
            interpolator(step * (1 / (steps - 1)))
        )

        colorScale.range(colors)
    }

    return colorScale
}

export const useQuantizeColorScale = (
    config: QuantizeColorScaleConfig,
    values: QuantizeColorScaleValues
) => useMemo(() => getQuantizeColorScale(config, values), [config, values])
