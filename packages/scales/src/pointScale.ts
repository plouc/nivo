import { scalePoint, ScalePoint as D3ScalePoint } from 'd3-scale'
import { ComputedSerieAxis, ScalePoint, ScalePointSpec, StringValue } from './types'

export const createPointScale = <Input extends StringValue>(
    _spec: ScalePointSpec,
    data: ComputedSerieAxis<Input>,
    size: number
) => {
    const scale = scalePoint<Input>().range([0, size]).domain(data.all)

    const typedScale = scale as ScalePoint<Input>
    typedScale.type = 'point'

    return typedScale
}

export const castPointScale = <Input extends StringValue>(scale: D3ScalePoint<Input>) => {
    const typedScale = scale as ScalePoint<Input>
    typedScale.type = 'point'

    return typedScale
}
