export interface PatternDotsProps {
    id: string
    color?: string
    background?: string
    size?: number
    padding?: number
    stagger?: boolean
}
export interface PatternLinesProps {
    id: string
    color?: string
    background?: string
    spacing?: number
    rotation?: number
    lineWidth?: number
}

export interface PatternDotsSpec extends PatternDotsProps {
    type: 'patternDots'
}
export interface PatternSquaresSpec extends PatternDotsProps {
    type: 'patternSquares'
}
export interface PatternLinesSpec extends PatternLinesProps {
    type: 'patternLines'
}

export type DotPatternTypeToSpec = {
    patternDots: PatternDotsSpec
    patternSquares: PatternSquaresSpec
}
export type LinePatternTypeToSpec = {
    patternLines: PatternLinesSpec
}

export type DotPatternSpec = DotPatternTypeToSpec[keyof DotPatternTypeToSpec]
export type LinePatternSpec = LinePatternTypeToSpec[keyof LinePatternTypeToSpec]
export type PatternSpec = DotPatternSpec | LinePatternSpec
