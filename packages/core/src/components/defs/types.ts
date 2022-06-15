import { GradientSpec } from './gradients'
import { DotPatternSpec, LinePatternSpec } from './patterns'
import { RuleSpec } from '../../lib'

export type DefSpec = GradientSpec | DotPatternSpec | LinePatternSpec

export interface DefsProps {
    defs?: DefSpec[]
}

export interface SvgDefsAndFill<T> {
    defs?: DefSpec[]
    fill?: RuleSpec<T>[]
}
