import { scaleBand } from 'd3-scale'
import { ComputedSerieAxis, ScaleBand, ScaleBandSpec, StringValue, ScaleAxis } from './types'

export const createBandScale = <Input extends StringValue>(
    { round = true }: ScaleBandSpec,
    data: ComputedSerieAxis<Input>,
    size: number,
    axis: ScaleAxis
) => {
    const scale = scaleBand<Input>()
        .range(axis === 'x' ? [0, size] : [size, 0])
        .domain(data.all)
        .round(round)

    const typedScale = scale as ScaleBand<Input>
    typedScale.type = 'band'

    return typedScale
}
