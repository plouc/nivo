import { scaleBand, ScaleBand as D3ScaleBand } from 'd3-scale'
import { ComputedSerieAxis, ScaleBand, ScaleBandSpec, StringValue, ScaleAxis } from './types'

export const bandScaleDefaults: Required<ScaleBandSpec> = {
    type: 'band',
    round: false,
}

export const createBandScale = <Input extends StringValue>(
    { round = bandScaleDefaults.round }: ScaleBandSpec,
    data: ComputedSerieAxis<Input>,
    size: number,
    axis: ScaleAxis
) => {
    const scale = scaleBand<Input>()
        .range(axis === 'x' ? [0, size] : [size, 0])
        .domain(data.all)
        .round(round)

    return castBandScale<Input>(scale)
}

export const castBandScale = <Input extends StringValue>(scale: D3ScaleBand<Input>) => {
    const typedScale = scale as ScaleBand<Input>
    typedScale.type = 'band'

    return typedScale
}
