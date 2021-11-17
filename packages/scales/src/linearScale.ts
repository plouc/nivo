import { NumberValue, scaleLinear, ScaleLinear as D3ScaleLinear } from 'd3-scale'
import { ScaleLinearSpec, ScaleLinear, ComputedSerieAxis, ScaleAxis } from './types'

export const createLinearScale = <Output extends NumberValue>(
    {
        min = 0,
        max = 'auto',
        stacked = false,
        reverse = false,
        clamp = false,
        nice = false,
    }: ScaleLinearSpec,
    data: ComputedSerieAxis<Output>,
    size: number,
    axis: ScaleAxis
) => {
    let minValue: NumberValue
    if (min === 'auto') {
        minValue = stacked === true ? data.minStacked ?? 0 : data.min
    } else {
        minValue = min
    }

    let maxValue: NumberValue
    if (max === 'auto') {
        maxValue = stacked === true ? data.maxStacked ?? 0 : data.max
    } else {
        maxValue = max
    }

    const scale = scaleLinear<number, Output>()
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .domain(reverse ? [maxValue, minValue] : [minValue, maxValue])
        .clamp(clamp)

    if (nice === true) scale.nice()
    else if (typeof nice === 'number') scale.nice(nice)

    return castLinearScale<number, Output>(scale, stacked)
}

export const castLinearScale = <Range, Output>(
    scale: D3ScaleLinear<Range, Output>,
    stacked = false
) => {
    const typedScale = (scale as unknown) as ScaleLinear<number>
    typedScale.type = 'linear'
    typedScale.stacked = stacked

    return typedScale
}
