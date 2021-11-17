import { AnimatedProps } from '@react-spring/web'
import { ValueFormat } from '@nivo/core'
import { FunctionComponent } from 'react'

export interface RadialAxisTickAnimatedProps {
    y: number
    textX: number
    rotation: number
    length: number
    opacity: number
}

export interface RadialAxisTickProps {
    label: string | number
    y: number
    rotation: number
    textX: number
    length: number
    textAnchor: 'start' | 'end'
    animated: AnimatedProps<RadialAxisTickAnimatedProps>
}
export type RadialAxisTickComponent = FunctionComponent<RadialAxisTickProps>

export interface RadialAxisConfig {
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: ValueFormat<string | number | Date>
    tickComponent?: RadialAxisTickComponent
    ariaHidden?: boolean
}

export interface CircularAxisTickAnimatedProps {
    angle: number
    x1: number
    y1: number
    x2: number
    y2: number
    textX: number
    textY: number
    opacity: number
}

export interface CircularAxisTickProps {
    label: string | number
    animated: AnimatedProps<CircularAxisTickAnimatedProps>
}
export type CircularAxisTickComponent = FunctionComponent<CircularAxisTickProps>

export interface CircularAxisConfig {
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: ValueFormat<string | number | Date>
    tickComponent?: CircularAxisTickComponent
    ariaHidden?: boolean
}
