import { ScaleDiverging, ScaleQuantize, ScaleSequential } from 'd3-scale'
import { OrdinalColorScale } from './ordinalColorScale'

// interfaces ScaleDiverging and ScaleSequential do not declare ticks() as a function
// However, objects created with scaleSequential and scaleDiverging do support that function
type ScaleWithTicks = {
    ticks(count?: number): number[]
}

export type AnyContinuousColorScale = ScaleWithTicks &
    (ScaleSequential<string> | ScaleDiverging<string> | ScaleQuantize<string>)
export type AnyColorScale = AnyContinuousColorScale | OrdinalColorScale<any>
