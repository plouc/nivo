import { GradientSpec } from './gradients'
import { PatternSpec } from './patterns'

export type DefSpec = GradientSpec | PatternSpec

export interface DefsProps {
    defs: DefSpec[]
}
