import { scaleBand } from 'd3-scale'
import { ComputedSerieAxis, ScaleBand, ScaleBandSpec, StringValue } from './types'

export const createBandScale = <Input extends StringValue>(
    _spec: ScaleBandSpec,
    data: ComputedSerieAxis<Input>,
    size: number
) => {
    const scale = scaleBand<Input>().range([0, size]).domain(data.all)

    const typedScale = scale as ScaleBand<Input>
    typedScale.type = 'band'

    return typedScale
}
