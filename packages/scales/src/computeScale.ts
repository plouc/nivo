import {
    ScaleAxis,
    ScaleBand,
    ScaleBandSpec,
    ScalePoint,
    ScalePointSpec,
    ScaleSpec,
    ComputedSerieAxis,
    ScaleValue,
    StringValue,
    NumericValue,
    ScaleLinear,
    ScaleLinearSpec,
    ScaleLogSpec,
    ScaleLog,
    ScaleSymLogSpec,
} from './types'
import { createLinearScale } from './linearScale'
import { createPointScale } from './pointScale'
import { createBandScale } from './bandScale'
import { createTimeScale } from './timeScale'
import { createLogScale } from './logScale'
import { createSymLogScale } from './symLogScale'

// override for linear scale
export function computeScale<Input extends NumericValue>(
    spec: ScaleLinearSpec,
    data: ComputedSerieAxis<Input>,
    size: number,
    axis: ScaleAxis
): ScaleLinear<Input>

// override for point scale
export function computeScale<Input extends StringValue>(
    spec: ScalePointSpec,
    data: ComputedSerieAxis<Input>,
    size: number,
    axis: ScaleAxis
): ScalePoint<Input>

// override for band scale
export function computeScale<Input extends StringValue>(
    spec: ScaleBandSpec,
    data: ComputedSerieAxis<Input>,
    size: number,
    axis: ScaleAxis
): ScaleBand<Input>

// override for log scale
export function computeScale(
    spec: ScaleLogSpec,
    data: ComputedSerieAxis<number>,
    size: number,
    axis: ScaleAxis
): ScaleLog

// override for symlog scale
export function computeScale(
    spec: ScaleSymLogSpec,
    data: ComputedSerieAxis<number>,
    size: number,
    axis: ScaleAxis
): ScaleLog

export function computeScale<Input extends ScaleValue, Output>(
    spec: ScaleSpec,
    data: ComputedSerieAxis<Input>,
    size: number,
    axis: ScaleAxis
) {
    if (spec.type === 'linear') {
        return createLinearScale(spec, data, size, axis)
    } else if (spec.type === 'point') {
        return createPointScale<Input>(spec, data, size)
    } else if (spec.type === 'band') {
        return createBandScale<Input>(spec, data, size)
    } else if (spec.type === 'time') {
        return createTimeScale(spec, data, size)
    } else if (spec.type === 'log') {
        return createLogScale(spec, data, size, axis)
    } else if (spec.type === 'symlog') {
        return createSymLogScale(spec, data, size, axis)
    }

    throw new Error('invalid scale spec')
}
