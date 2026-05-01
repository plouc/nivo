import { NumberValue, scaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale'
import { interpolateRound, interpolateNumber } from 'd3-interpolate'
import { ScaleLinearSpec, ScaleLinear, ComputedSerieAxis, ScaleAxis } from './types'

export const linearScaleDefaults: Required<ScaleLinearSpec> = {
    type: 'linear',
    min: 0,
    max: 'auto',
    stacked: false,
    reverse: false,
    clamp: false,
    nice: true,
    round: false,
}

export const createLinearScale = <Output extends NumberValue>(
    {
        min = linearScaleDefaults.min,
        max = linearScaleDefaults.max,
        stacked = linearScaleDefaults.stacked,
        reverse = linearScaleDefaults.reverse,
        clamp = linearScaleDefaults.clamp,
        nice = linearScaleDefaults.nice,
        round = linearScaleDefaults.round,
    }: ScaleLinearSpec,
    data: ComputedSerieAxis<Output>,
    size: number,
    axis: ScaleAxis
) => {
    let minValue: NumberValue
    if (min === 'auto') {
        minValue = stacked === true ? (data.minStacked ?? 0) : data.min
    } else {
        minValue = min
    }

    let maxValue: NumberValue
    if (max === 'auto') {
        maxValue = stacked === true ? (data.maxStacked ?? 0) : data.max
    } else {
        maxValue = max
    }

    const scale = scaleLinear<number, Output>()
        .range(axis === 'x' ? [0, size] : [size, 0])
        .interpolate(round ? interpolateRound : interpolateNumber)
        .domain(reverse ? [maxValue, minValue] : [minValue, maxValue])
        .clamp(clamp)

    if (nice === true) scale.nice()
    else if (typeof nice === 'number') scale.nice(nice)

    return castLinearScale(scale, stacked)
}

export const castLinearScale = <Range, Output>(
    scale: D3ScaleLinear<Range, Output>,
    stacked = false
) => {
    const typedScale = scale as unknown as ScaleLinear<number>
    typedScale.type = 'linear'
    typedScale.stacked = stacked

    return typedScale
}
