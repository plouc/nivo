export interface PatternDotsProps {
    id: string
    color: string
    background: string
    size: number
    padding: number
    stagger: boolean
}

export interface PatternLinesProps {
    id: string
    spacing: number
    rotation: number
    background: string
    color: string
    lineWidth: number
}

export interface PatternSquaresProps {
    id: string
    color: string
    background: string
    size: number
    padding: number
    stagger: boolean
}

export interface PatternDotsSpec extends PatternDotsProps {
    type: 'patternDots'
}

export interface PatternLinesSpec extends PatternLinesProps {
    type: 'patternLines'
}

export interface PatternSquaresSpec extends PatternSquaresProps {
    type: 'patternSquares'
}

export type PatternTypeToSpec = {
    patternDots: PatternDotsSpec
    patternLines: PatternLinesSpec
    patternSquares: PatternSquaresSpec
}

export type PatternSpec = PatternTypeToSpec[keyof PatternTypeToSpec]
