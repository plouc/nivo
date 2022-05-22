import { PatternDots } from './PatternDots'
import { PatternLines } from './PatternLines'
import { PatternSquares } from './PatternSquares'

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

export const patternTypes = {
    patternDots: PatternDots,
    patternLines: PatternLines,
    patternSquares: PatternSquares,
}
