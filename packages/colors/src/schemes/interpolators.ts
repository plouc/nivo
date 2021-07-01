import { divergingColorInterpolators, DivergingColorInterpolatorId } from './diverging'
import { sequentialColorInterpolators, SequentialColorInterpolatorId } from './sequential'
import { cyclicalColorInterpolators, CyclicalColorInterpolatorId } from './cyclical'

export const colorInterpolators = {
    ...divergingColorInterpolators,
    ...sequentialColorInterpolators,
    ...cyclicalColorInterpolators,
}

export type ColorInterpolatorId =
    | DivergingColorInterpolatorId
    | SequentialColorInterpolatorId
    | CyclicalColorInterpolatorId

export const colorInterpolatorIds = Object.keys(colorInterpolators) as ColorInterpolatorId[]
