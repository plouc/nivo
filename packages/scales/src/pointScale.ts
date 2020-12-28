import { scalePoint } from 'd3-scale'
import { ComputedSerieAxis, ScalePoint, ScalePointSpec, StringValue } from './types'

export const createPointScale = <Input extends StringValue>(
    // @ts-ignore
    spec: ScalePointSpec,
    data: ComputedSerieAxis<Input>,
    size: number
) => {
    const scale = scalePoint<Input>().range([0, size]).domain(data.all)

    const typedScale = scale as ScalePoint<Input>
    typedScale.type = 'point'

    return typedScale
}
