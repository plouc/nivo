import { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import {
    SequentialColorScaleConfig,
    SequentialColorScaleValues,
    getSequentialColorScale,
} from './sequentialColorScale'
import {
    DivergingColorScaleConfig,
    DivergingColorScaleValues,
    getDivergingColorScale,
} from './divergingColorScale'
import {
    QuantizeColorScaleConfig,
    QuantizeColorScaleValues,
    getQuantizeColorScale,
} from './quantizeColorScale'
import { AnyContinuousColorScale } from './types'

export type ContinuousColorScaleConfig =
    | SequentialColorScaleConfig
    | DivergingColorScaleConfig
    | QuantizeColorScaleConfig

export type ContinuousColorScaleValues =
    | SequentialColorScaleValues
    | DivergingColorScaleValues
    | QuantizeColorScaleValues

const isSequentialColorScaleConfig = (
    config: ContinuousColorScaleConfig
): config is SequentialColorScaleConfig => config.type === 'sequential'

const isDivergingColorScaleConfig = (
    config: ContinuousColorScaleConfig
): config is DivergingColorScaleConfig => config.type === 'diverging'

const isQuantizeColorScaleConfig = (
    config: ContinuousColorScaleConfig
): config is QuantizeColorScaleConfig => config.type === 'quantize'

export const getContinuousColorScale = <Config extends ContinuousColorScaleConfig>(
    config: Config,
    values: ContinuousColorScaleValues
) => {
    if (isSequentialColorScaleConfig(config)) {
        return getSequentialColorScale(config, values)
    }

    if (isDivergingColorScaleConfig(config)) {
        return getDivergingColorScale(config, values)
    }

    if (isQuantizeColorScaleConfig(config)) {
        return getQuantizeColorScale(config, values)
    }

    throw new Error('Invalid continuous color scale config')
}

export const useContinuousColorScale = (
    config: ContinuousColorScaleConfig,
    values: ContinuousColorScaleValues
) => useMemo(() => getContinuousColorScale(config, values), [config, values])

export const computeContinuousColorScaleColorStops = (
    scale: AnyContinuousColorScale,
    steps = 16
) => {
    const domain = scale.domain()

    // quantize
    if ('thresholds' in scale) {
        const stops: {
            key: string
            offset: number
            stopColor: string
        }[] = []

        const normalizedScale = scaleLinear().domain(domain).range([0, 1])
        scale.range().forEach((color, index) => {
            const [start, end] = scale.invertExtent(color)

            stops.push({
                key: `${index}.0`,
                offset: normalizedScale(start),
                stopColor: color,
            })
            stops.push({
                key: `${index}.1`,
                offset: normalizedScale(end),
                stopColor: color,
            })
        })

        return stops
    }

    const colorStopsScale = scale.copy()
    if (domain.length === 2) {
        // sequential
        colorStopsScale.domain([0, 1])
    } else if (domain.length === 3) {
        // diverging
        colorStopsScale.domain([0, 0.5, 1])
    }

    // typescript definitions for ScaleSequential and ScaleDiverging claim that those objects
    // do not have a ticks() property. However, the actual objects produced by d3-scale do
    // have it. Suppress ts checks here until the discrepancy is resolved.
    // @ts-ignore
    return ((colorStopsScale as AnyContinuousColorScale).ticks(steps) as number[]).map(
        (value: number) => ({
            key: `${value}`,
            offset: value,
            stopColor: `${colorStopsScale(value)}`,
        })
    )
}
