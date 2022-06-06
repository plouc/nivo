import { ScaleDiverging, ScaleQuantize, ScaleSequential } from 'd3-scale'
import { OrdinalColorScale } from './ordinalColorScale'

export type AnyContinuousColorScale =
    | ScaleSequential<string>
    | ScaleDiverging<string>
    | ScaleQuantize<string>
export type AnyColorScale = AnyContinuousColorScale | OrdinalColorScale<any>
