import { GradientSpec } from './gradients'
import { DotPatternSpec, LinePatternSpec } from './patterns'

export type DefSpec = GradientSpec | DotPatternSpec | LinePatternSpec

export interface DefsProps {
    defs: DefSpec[]
}
