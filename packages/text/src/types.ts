export type SvgTextAnchor = 'start' | 'middle' | 'end'
// Excluding values which render inconsistently across all browsers.
export type SvgTextDominantBaseline = 'text-before-edge' | 'middle' | 'text-after-edge'

export interface SvgTextLayout {
    textAnchor: SvgTextAnchor
    dominantBaseline: SvgTextDominantBaseline
}
