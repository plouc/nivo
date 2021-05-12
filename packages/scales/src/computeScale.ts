import { ScaleAxis, ScaleSpec, ComputedSerieAxis, ScaleValue } from './types'
import { createLinearScale } from './linearScale'
import { createPointScale } from './pointScale'
import { createBandScale } from './bandScale'
import { createTimeScale } from './timeScale'
import { createLogScale } from './logScale'
import { createSymLogScale } from './symLogScale'

export function computeScale<Input extends ScaleValue>(
    spec: ScaleSpec,
    data: ComputedSerieAxis<any>,
    size: number,
    axis: ScaleAxis
) {
    switch (spec.type) {
        case 'linear':
            return createLinearScale(spec, data, size, axis)
        case 'point':
            return createPointScale<Input>(spec, data, size)
        case 'band':
            return createBandScale<Input>(spec, data, size)
        case 'time':
            return createTimeScale(spec, data, size)
        case 'log':
            return createLogScale(spec, data, size, axis)
        case 'symlog':
            return createSymLogScale(spec, data, size, axis)
        default:
            throw new Error('invalid scale spec')
    }
}
